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
        Reactivity: 1,
        startCount: !0,
        countTime: 0,
        power: 0
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
            this.rigidBody = this.node.getComponent(cc.RigidBody), this.EX = cc.find("Canvas/EX").getComponent(cc.Animation),
            this.powerOFF();
    },
    powerON: function(a) {
        this.rigidBody.enabled = !0, this.collider.enabled = !0, this.startCountTime(),
            this.power = a;
    },
    powerOFF: function() {
        this.rigidBody.enabled = !1, this.collider.enabled = !1, this.endCountTime();
    },
    onBeginContact: function(j, k, e) {
        if ("ball" === e.node.name) {
            if (j.disabled = !0, e.node.getComponent("Ball").getIsGround()) return;
            var n = j.getWorldManifold().points,
                i = 2.5 + (this.power - 5) / 10;
            e.node.getComponent(cc.RigidBody).gravityScale = i;
            var o, q, s, h = f(f(this.PlayerNode.getPosition().x) - 480),
                a = f(h / 100 - 4),
                c = this.getComponent(cc.Animation),
                t = e.node.getComponent(cc.RigidBody),
                d = t.getWorldPosition();
            "hit" === c.currentClip.name || "EneHit" === c.currentClip.name || "hit2" === c.currentClip.name ? (q = 10 * Math.random() + 10 + 2 * a,
                    s = 10 * Math.random() + 18 + 1.5 * a, e.getComponent("Ball").setState(1)) : "serve" === c.currentClip.name || "EneServe" === c.currentClip.name ? (q = 23,
                    s = 23, e.getComponent("Ball").setState(1)) : (q = 5 * Math.random() + 42 + 2 * a,
                    s = -10, e.getComponent("Ball").setState(1.5)), this.isPlayer || (q = -q), t.linearVelocity = cc.v2(),
                t.applyLinearImpulse(cc.v2(q * b(i / 2.5), s * b(i / 2.5)), d);
            var u = t.linearVelocity;
            if (o = this.countDownPoint(u, d.y), this.EX.node.setPosition(cc.find("Canvas").convertToNodeSpaceAR(n[0])),
                this.EX.node.active = !0, this.EX.play(), this.isPlayer) {
                var p = cc.find("Canvas/Role/Enemy");
                if (null !== p) {
                    p = p.getComponent("Enemy");
                    var g = Math.random() * p.getFlex();
                    p.setCanSpike(this.checkSpike(d, u.x, u.y, i)), this.scheduleOnce(function() {
                        this.ai.transTarget(cc.v2(o.x + d.x, o.y + d.y), e.node);
                    }, g);
                }
            }
        }
    },
    countDownPoint: function(f, g) {
        for (var e = 2.5 + (this.power - 5) / 10, i = f.x, j = f.y, k = b(i * i + j * j), a = i / k, c = 0, l = 0, h = 0;; h += .1)
            if ((l = k * (j / k) * h - 10 * (.5 * e) * h * h) <= 0 - 32 * (g - 260) && 1 < h) {
                c = h;
                break;
            }
        var d = cc.v2(k * a * c / 32, l / 32);
        return this.powerOFF(), d;
    },
    checkSpike: function(b, d, e, g) {
        var h = cc.find("Canvas/Role/Enemy").getPosition().x,
            i = cc.find("Canvas").convertToNodeSpaceAR(b),
            j = f(h - i.x - 30) / d,
            a = e * j - 32 * (5 * g) * j * j + i.y;
        return 80 < a && 160 > a;
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
        this.node.setPosition(0, 82.5), this.startCount && (this.countTime += a);
    }
});