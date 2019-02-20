/*
 * pixi-min.js and cyclobots.js must be loaded before this source.
 * After loading this source, call launch() to create and start the gewgaw.
 */

function launch(config) {
  var app = new PIXI.Application({ 
    width: config.width,
    height: config.height,
    forceCanvas: false,
    antialias: true,
    backgroundColor : 0xffffff
  });

  config.container.appendChild(app.view);

  var c = new Cyclobots().init({
    width: config.width,
    height: config.height,
    onInitBot: function(bot) {
      var graphics = new PIXI.Graphics();
      graphics.lineStyle(0);
      graphics.beginFill(0xff0000);
      graphics.drawCircle(0, 0, 10);
      graphics.endFill();
      app.stage.addChild(graphics);
      bot.graphics = graphics;
    },
    onUpdateBot: function(bot) {
      bot.graphics.x = bot.x;
      bot.graphics.y = bot.y;
    }
  });

  app.ticker.add(function(delta) {
    c.update();
  });

  if (config.controlPanel) {
    function makeButton(container, labelText, fun) {
      var button = document.createElement('button');
      button.innerHTML = labelText;
      container.appendChild(button);
      button.onclick = fun;
      return button;
    }
    makeButton(config.controlPanel, "Mass confusion!", function(e) { c.massConfusion(); });
    makeButton(config.controlPanel, "Revolution!", function(e) { c.shuffle(); });
  }
}
