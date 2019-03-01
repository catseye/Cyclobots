/*
 * pixi-min.js and cyclobots.js must be loaded before this source.
 * After loading this source, call launch() to create and start the gewgaw.
 */

function launch(config) {
  var app = new PIXI.Application({ 
    width: config.width,
    height: config.height,
    forceCanvas: (('' + window.location).indexOf('forceCanvas') !== -1),
    antialias: true,
    backgroundColor : 0xffffff
  });

  config.container.appendChild(app.view);

  var c = new Cyclobots().init({
    width: config.width,
    height: config.height,
    onUpdateBot: function(bot) {
      if (!bot.graphics) return;
      bot.graphics.x = bot.x;
      bot.graphics.y = bot.y;
    }
  });

  function removeVisuals(c) {
    c.forEachBot(function(bot) {
      if (bot.graphics) {
        bot.graphics.destroy();
      }
      bot.graphics = undefined;
    });
  }

  function setVisuals(c) {
    c.forEachBot(function(bot) {
      if (bot.graphics) return;
      var graphics = new PIXI.Graphics();
      graphics.lineStyle(0);
      graphics.beginFill(0xff0000);
      graphics.drawCircle(0, 0, 10);
      graphics.endFill();
      //graphics.filters = [new PIXI.filters.BlurFilter()];
      app.stage.addChild(graphics);
      bot.graphics = graphics;
    });
  }

  setVisuals(c);

  app.ticker.add(function(delta) {
    c.update();
  });

  if (true) {
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
    function makeSelect(container, labelText, optionsArray, fun, def) {
      var label = document.createElement('label');
      label.innerHTML = labelText;
      container.appendChild(label);
      var select = document.createElement("select");
      for (var i = 0; i < optionsArray.length; i++) {
        var op = document.createElement("option");
        op.value = optionsArray[i][0];
        op.text = optionsArray[i][1];
        select.options.add(op);
      }
      select.onchange = function(e) {
        fun(optionsArray[select.selectedIndex][0]);
      };
      select.selectedIndex = 0;
      label.appendChild(select);
      return select;
    };
    function makeRendererPanel(container) {
      var panel = makeDiv(container);
      var renderer = "unknown";
      if (app.renderer instanceof PIXI.WebGLRenderer) {
         renderer = "WebGL";
      } else if (app.renderer instanceof PIXI.CanvasRenderer) {
         renderer = "Canvas";
      }
      panel.innerHTML = "Renderer: " + renderer + ".";
      if (renderer !== "Canvas") {
        panel.innerHTML += ' <a href="?forceCanvas=1">Force Canvas renderer</a>.';
      }
    }
    function makeVisualsPanel(container) {
      var panel = makeDiv(container);
      makeButton(panel, "Classic", function(e) { setVisuals(c); });
      makeButton(panel, "Remove", function(e) { removeVisuals(c); });
    }

    var controlPanel = makeDiv(config.container);
    var rendererPanel = makeRendererPanel(controlPanel);
    var visualsPanel = makeVisualsPanel(controlPanel);
    makeButton(controlPanel, "Mass confusion!", function(e) { c.massConfusion(); });
    makeButton(controlPanel, "Revolution!", function(e) { c.shuffle(); });
  }
}
