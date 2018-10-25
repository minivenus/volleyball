cc.Class({
    extends: cc.Component,
    properties: {
        a: 0,
        b: 0,
        c: 0,
        top: {
            default: null,
            type: cc.Node
        },
        land: {
            default: null,
            type: cc.Node
        }
    },
    start: function() {
        this.whenHitIt();
    },
    whenHitIt: function() {
        var b = this.node.getPosition().x,
            c = this.node.getPosition().y,
            d = f(b) + 300 * Math.random(),
            e = c + -160 - c,
            g = 50 * Math.random(),
            h = b + f((d - b) / 2),
            i = 40 - c + g;
        this.top.setPosition(h, i), this.land.setPosition(d, e), this.b = ((c - e) * (b * b - h * h) - (c - i) * (b * b - d * d)) / ((b - d) * (b * b - h * h) - (b - h) * (b * b - d * d)),
            this.a = (c - i - this.b * (b - h)) / (b * b - h * h), this.c = c - this.a * b * b - this.b * b,
            this.speedX = (d - b) / .5, this.canMove = !0;
    },
    update: function(a) {
        if (this.canMove) {
            var b = this.node.getPosition().x + a * this.speedX,
                c = this.a * (b * b) + this.b * b + this.c;
            this.node.setPosition(b, c);
        }
    }
});