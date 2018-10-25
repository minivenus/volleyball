var d = require("AIControler");
cc.Class({
    extends: cc.Component,
    properties: {
        collider: {
            default: null,
            type: cc.PhysicsBoxCollider
        },
        rigidBody: {
            default: null,
            type: cc.RigidBody
        },
        isPlayer: !1,
        ai: {
            default: null,
            type: d
        },
        PlayerNode: {
            default: null,
            type: cc.Node
        },
        EX: {
            default: null,
            type: cc.Animation
        },
        startCount: !0,
        countTime: 0
    },
    start: function() {
        this.powerOFF();
    },
    startCountTime: function() {
        this.countTime = 0, this.startCount = !0;
    },
    endCountTime: function() {
        this.countTime = !1;
    },
    onLoad: function() {
        this.ai = cc.find("AIControler").getComponent("AIControler"), this.collider = this.node.getComponent(cc.PhysicsBoxCollider),
            this.rigidBody = this.node.getComponent(cc.RigidBody), this.powerOFF();
    },
    powerON: function() {
        this.rigidBody.enabled = !0, this.collider.enabled = !0, this.startCountTime();
    },
    powerOFF: function() {
        this.rigidBody.enabled = !1, this.collider.enabled = !1, this.endCountTime();
    },
    onBeginContact: function(b, g, e) {
        if ("ball" === e.node.name) {
            e.node.getComponent(cc.RigidBody).gravityScale = 5;
            var j, i, k, m = f(f(this.PlayerNode.getPosition().x) - 480),
                n = f(m / 100 - 4),
                o = this.getComponent(cc.Animation),
                a = e.node.getComponent(cc.RigidBody),
                l = a.getWorldPosition();
            "hit" === o.currentClip.name || "EneHit" === o.currentClip.name || "hit2" === o.currentClip.name ? (i = 7 * Math.random() + 12 + 2 * n,
                    k = 7 * Math.random() + 19 + 1.5 * n) : "serve" === o.currentClip.name || "EneServe" === o.currentClip.name ? (i = 57.5,
                    k = 57.5) : (i = 5 * Math.random() + 42 + 2.5 * n, k = 2.5 * -(6 * Math.random() + 8)),
                this.isPlayer || (i = -i), a.linearVelocity = cc.v2(), a.applyLinearImpulse(cc.v2(1.4142135623730951 * i, 1.4142135623730951 * k), l);
            var h = a.linearVelocity;
            if (j = this.countDownPoint(h, l.y), this.EX.node.setPosition(cc.find("Canvas").convertToNodeSpaceAR(l)),
                this.EX.node.active = !0, this.EX.play(), this.isPlayer) {
                var d = Math.random();
                this.scheduleOnce(function() {
                    this.ai.transTarget(cc.v2(j.x + l.x, j.y + l.y), e.node);
                }, d);
            }
            cc.find("ball").setPosition(j.x + l.x, j.y + l.y);
        }
    },
    countDownPoint: function(c, f) {
        for (var e = c.x, g = c.y, i = b(e * e + g * g), j = e / i, a = 0, k = 0, l = 0;; l += .1)
            if ((k = i * (g / i) * l - 25 * l * l) <= 0 - 32 * (f - 260) && 1 < l) {
                a = l;
                break;
            }
        var h = cc.v2(i * j * a / 32, k / 32);
        return this.powerOFF(), h;
    },
    HitBall: function(b, d, e) {
        var g = this.getComponent(cc.Animation),
            h = 420 * Math.random() + f(e.x - 480) + 30,
            i = (f(e),
                void 0);
        if ("hit" === g.currentClip.name || "EneHit" === g.currentClip.name) i = 195 - 195 * (this.countTime / .45);
        else {
            if ("hit2" !== g.currentClip.name) return void b.applyLinearImpulse(cc.v2(23, 23), e);
            i = 195 - 195 * (this.countTime / .53);
        }
        var j = 3 - d / 10,
            a = (i + 400 * j / 2 * j / 2) / j / 2;
        a += 400 * j / 2;
        var c = h / j;
        return this.isPlayer || (c = -c), b.linearVelocity = cc.v2(c / .6, a), cc.v2(h, 0);
    },
    update: function(a) {
        this.node.setPosition(0, 550), this.startCount && (this.countTime += a);
    }
});