/*
 * dam.js, dam-widgets.js, pixi-min.js, pixi-viewport.js, and cyclobots.js must be loaded before this source.
 * After loading this source, call launch() to create and start the gewgaw.
 */

function removeVisuals(cyclobots) {
  cyclobots.forEachBot(function(bot) {
    if (bot.graphics) {
      bot.graphics.destroy();
    }
    bot.graphics = undefined;
  });
}

function setClassicVisuals(cyclobots, viewport) {
  cyclobots.forEachBot(function(bot) {
    if (bot.graphics) return;
    var graphics = new PIXI.Graphics();
    graphics.lineStyle(0);
    graphics.beginFill(0xff0000);
    graphics.drawCircle(0, 0, 10);
    graphics.endFill();
    viewport.addChild(graphics);
    bot.graphics = graphics;
  });
}

function setBlurredVisuals(cyclobots, viewport) {
  cyclobots.forEachBot(function(bot) {
    if (bot.graphics) return;
    var graphics = new PIXI.Graphics();
    graphics.lineStyle(0);
    graphics.beginFill(0xff0000);
    graphics.drawCircle(0, 0, 10);
    graphics.endFill();
    graphics.filters = [new PIXI.filters.BlurFilter()];
    viewport.addChild(graphics);
    bot.graphics = graphics;
  });
}

function setUpPixiApp(config, cyclobots) {
  var app = new PIXI.Application({ 
    width: config.width,
    height: config.height,
    forceCanvas: config.forceCanvas,
    antialias: true,
    backgroundColor : 0xffffff
  });

  var viewport = new PIXI.extras.Viewport({
      screenWidth: config.width,
      screenHeight: config.height,
      worldWidth: 1000,
      worldHeight: 1000,
      interaction: app.renderer.plugins.interaction
  });

  app.stage.addChild(viewport);
  viewport.drag();

  config.container.insertBefore(app.view, config.container.firstChild);

  app.ticker.add(function(delta) {
    cyclobots.update();
  });

  return { app: app, viewport: viewport };
}

function getRenderer(app) {
  if (app.renderer instanceof PIXI.WebGLRenderer) {
     return "WebGL";
  } else if (app.renderer instanceof PIXI.CanvasRenderer) {
     return "Canvas";
  }
  return "unknown";
}

function launch(config) {
  var cyclobots = new Cyclobots().init({
    width: config.width,
    height: config.height,
    onUpdateBot: function(bot) {
      if (!bot.graphics) return;
      bot.graphics.x = bot.x;
      bot.graphics.y = bot.y;
    }
  });

  var r = setUpPixiApp(config, cyclobots);
  var app = r.app;
  var viewport = r.viewport;

  setClassicVisuals(cyclobots, viewport);

  var div=DAM.maker('div'), button=DAM.maker('button'), span=DAM.maker('span');

  /*----- renderer panel -----*/
  var renderer = getRenderer(app);
  var rendererSpan = span("Renderer: " + renderer + ".");
  var forceRendererButton = null;
  if (renderer !== "Canvas") {
    forceRendererButton = button(
      "Force Canvas renderer",
      {
        onclick: function(e) {
          removeVisuals(cyclobots);
          app.destroy(true, true);
          config.forceCanvas = true;
          r = setUpPixiApp(config, cyclobots);
          app = r.app;
          viewport = r.viewport;
          setClassicVisuals(cyclobots, app.stage);
          forceRendererButton.remove();
          rendererSpan.innerHTML = "Renderer: Canvas.";
        }
      }
    );
  }
  var rendererPanel = div(
    rendererSpan,
    forceRendererButton
  );

  /*----- visuals panel -----*/
  var visualsPanel = div(
    DAM.makeSelect(
      {
        title: "Visuals:",
        options: [
          { text: "Classic", value: "1", setVisuals: setClassicVisuals },
          { text: "Blurred", value: "2", setVisuals: setBlurredVisuals }
        ],
        onchange: function(option) {
          removeVisuals(cyclobots);
          option.setVisuals(cyclobots, viewport);
        }
      }
    )
  );

  var actionsPanel = div(
    button("Mass confusion!", { onclick: function(e) { cyclobots.massConfusion(); } }),
    button("Revolution!", { onclick: function(e) { cyclobots.shuffle(); } })
  );

  config.container.appendChild(div(rendererPanel, visualsPanel, actionsPanel));
}
