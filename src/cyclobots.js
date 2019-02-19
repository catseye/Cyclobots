var TWO_PI = Math.PI * 2;
var RADIANS_PER_DEGREE = TWO_PI / 360;

Cyclobot = function() {
    this.init = function(config) {
        this.x = config.x;
        this.y = config.y;
        this.theta = config.theta;          // radians
        this.speed = config.speed;
        this.dexterity = config.dexterity;  // radians
        this.next = config.next;
        if (config.onInitBot) {
            config.onInitBot(this);
        }
        return this;
    };

    this.move = function() {
        var dx = this.speed * Math.cos(this.theta);
        var dy = this.speed * Math.sin(this.theta);

        this.x += dx;
        this.y += dy;
    };

    this.adjust = function() {
        var rho = Math.atan2(this.y - this.next.y, this.x - this.next.x) + Math.PI;
        this.rho_deg = Math.floor(rho / RADIANS_PER_DEGREE);

        this.theta_deg = Math.floor(this.theta / RADIANS_PER_DEGREE);

        // stolen from http://prog21.dadgum.com/96.html
        var angle_diff = (this.rho_deg - this.theta_deg + 540) % 360 - 180;
        if (angle_diff < 0) {
            this.theta -= this.dexterity;
        } else {
            this.theta += this.dexterity;
        }
        if (this.theta <= 0) this.theta += TWO_PI;
        if (this.theta > TWO_PI) this.theta -= TWO_PI;
    };
};


Cyclobots = function() {
    var selected = undefined;

    var numbots = 50;
    var drawAngles = false;
    var dragging;
    var lastX = undefined;
    var lastY = undefined;

    this.init = function(config) {
        this.bots = [];
        this.numbots = 50;
        this.onUpdateBot = config.onUpdateBot;
        for (var i = 0; i < this.numbots; i++) {
            var bot = (new Cyclobot()).init({
                x: 50 + Math.random() * (config.width - 100),
                y: 50 + Math.random() * (config.height - 100),
                theta: Math.random() * TWO_PI,
                speed: 2,
                dexterity: 2 * RADIANS_PER_DEGREE,
                onInitBot: config.onInitBot
            });
            this.bots.push(bot);
        }
        this.linkUpBots();
        return this;
    };

    this.linkUpBots = function() {
        var numBots = this.bots.length;
        for (var i = 0; i < numBots - 1; i++) {
            this.bots[i].next = this.bots[i + 1];
        }
        this.bots[numBots - 1].next = this.bots[0];
    };

    this.update = function() {
        for (var i = 0; i < this.bots.length; i++) {
            var bot = this.bots[i];
            bot.move();
            bot.adjust();
            if (this.onUpdateBot) this.onUpdateBot(bot);
        }
    };

    this.massConfusion = function() {
        for (var i = 0; i < this.bots.length; i++) {
            this.bots[i].theta = Math.random() * TWO_PI;
        }
    };

    this.shuffle = function() {
        var newBots = [];
        while (this.bots.length > 0) {
            newBots.push(this.bots.splice(Math.random() * this.bots.length, 1)[0]);
        }
        this.bots = newBots;
        this.linkUpBots();
    };
};
