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
            var j, k, a, l = f(f(this.PlayerNode.getPosition().x) - 480),
                i = (f(l / 100 - 4),
                    this.getComponent(cc.Animation)),
                m = e.node.getComponent(cc.RigidBody),
                c = m.getWorldPosition();
            if ("hit" === i.currentClip.name || "EneHit" === i.currentClip.name || "hit2" === i.currentClip.name) {
                if (a = this.HitBall(m, 10, c), this.isPlayer) {
                    var n = Math.random();
                    this.scheduleOnce(function() {
                        this.ai.transTarget(cc.v2(a.x + c.x, a.y + c.y), e.node);
                    }, n);
                }
                return;
            }
            if ("serve" !== i.currentClip.name && "EneServe" !== i.currentClip.name) {
                if (a = this.HitBall(m, 5, c), this.isPlayer) {
                    var h = Math.random();
                    this.scheduleOnce(function() {
                        this.ai.transTarget(cc.v2(a.x + c.x, a.y + c.y), e.node);
                    }, h);
                }
                return;
            }
            j = 23, k = 23, this.isPlayer || (j = -j), m.linearVelocity = cc.v2(), m.applyLinearImpulse(cc.v2(j, k), c);
            var d = m.linearVelocity;
            if (a = this.countDownPoint(d, c.y), this.EX.node.setPosition(cc.find("Canvas").convertToNodeSpaceAR(c)),
                this.EX.node.active = !0, this.EX.play(), this.isPlayer) {
                var o = Math.random();
                this.scheduleOnce(function() {
                    this.ai.transTarget(cc.v2(a.x + c.x, a.y + c.y), e.node);
                }, o);
            }
        }
    },
    countDownPoint: function(c, f) {
        for (var e = c.x, g = c.y, i = b(e * e + g * g), j = e / i, a = 0, k = 0, l = 0;; l += .1)
            if ((k = i * (g / i) * l - 12.5 * l * l) <= 0 - 32 * (f - 260) && 1 < l) {
                a = l;
                break;
            }
        var h = cc.v2(i * j * a / 32, k / 32);
        return this.powerOFF(), h;
    },
    HitBall: function(g, j, e) {
        var k = this.getComponent(cc.Animation),
            i = 420 * Math.random() + f(e.x - 450),
            m = 370 - e.y,
            n = e.y - 260;
        if ("hit" === k.currentClip.name || "EneHit" === k.currentClip.name) this.countTime,
            m = 100 + m;
        else {
            if ("hit2" !== k.currentClip.name) return void g.applyLinearImpulse(cc.v2(23, 23), e);
            this.countTime, m = 100 + m;
        }
        var a, c, l = 3;
        for (a = 1; 5 >= a; a += .01) {
            c = (m + 32 * (10 * (.5 * a)) * l * l) / l;
            var o = b(2 * m / (c - 32 * (10 * a))),
                h = b(2 * (m + n) / (32 * (10 * a)));
            if (o + h <= l && c * o <= 32 * (10 * a) * o + m) {
                l = o + h;
                break;
            }
        }
        var d = i / l;
        return this.isPlayer || (d = -d), g.linearVelocity = cc.v2(d, c), g.gravityScale = a,
            cc.v2(i, n);
    },
    update: function(a) {
        this.node.setPosition(0, 550), this.startCount && (this.countTime += a);
    }
});