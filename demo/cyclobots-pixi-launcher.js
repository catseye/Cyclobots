/*
 * pixi-min.js, pixi-viewport.js, and cyclobots.js must be loaded before this source.
 * After loading this source, call launch() to create and start the gewgaw.
 */

function makeDiv(container, innerHTML) {
  var div = document.createElement('div');
  div.innerHTML = innerHTML || '';
  container.appendChild(div);
  return div;
}

function makeButton(container, labelText, fun) {
  var button = document.createElement('button');
  button.innerHTML = labelText;
  container.appendChild(button);
  button.onclick = fun;
  return button;
}

function makeSelect(container, labelText, optionsArray, fun) {
  var label = document.createElement('label');
  label.innerHTML = labelText;
  container.appendChild(label);
  var select = document.createElement("select");
  for (var i = 0; i < optionsArray.length; i++) {
    var op = document.createElement("option");
    op.value = optionsArray[i].value;
    op.text = optionsArray[i].text;
    select.options.add(op);
  }
  select.onchange = function(e) {
    fun(optionsArray[select.selectedIndex]);
  };
  select.selectedIndex = 0;
  label.appendChild(select);
  return select;
};

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

  var controlPanel = makeDiv(config.container);

  /*----- renderer panel -----*/
  var panel = makeDiv(controlPanel);
  var renderer = getRenderer(app);
  panel.innerHTML = "Renderer: " + renderer + ".";
  if (renderer !== "Canvas") {
    makeButton(panel, "Force canvas renderer", function(e) {
      removeVisuals(cyclobots);
      app.destroy(true, true);
      r = setUpPixiApp(config, cyclobots);
      app = r.app;
      viewport = r.viewport;
      setClassicVisuals(cyclobots, viewport);
    });
  }

  /*----- visuals panel -----*/
  var panel = makeDiv(controlPanel);
  makeSelect(panel, "Visuals:", [
    { text: "Classic", value: "1", setVisuals: setClassicVisuals },
    { text: "Blurred", value: "2", setVisuals: setBlurredVisuals }
  ], function(selection) {
    removeVisuals(cyclobots);
    selection.setVisuals(cyclobots, viewport);
  });

  makeButton(controlPanel, "Mass confusion!", function(e) { cyclobots.massConfusion(); });
  makeButton(controlPanel, "Revolution!", function(e) { cyclobots.shuffle(); });
}
