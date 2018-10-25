var d = cc.Enum({
    moveLeft: -1,
    moveRight: -1,
    hit: -1,
    spike: -1,
    idle: -1,
    serve: -1,
    cannotControl: -1
});
cc.Class({
    extends: cc.Component,
    properties: {
        targetPos: {
            default: void 0,
            type: cc.v2
        },
        targetBall: {
            default: void 0,
            type: cc.Node
        },
        armAnim: {
            default: null,
            type: cc.Animation
        },
        state: {
            default: d.idle,
            type: d
        },
        canPlayAnim: !0,
        strength: 5,
        speed: 5,
        flex: 1.5,
        smartCom: !1,
        canSpike: !1
    },
    getFlex: function() {
        return this.flex;
    },
    initAbility: function(a, b, c, d) {
        this.strength = a, this.speed = b, this.flex = c, this.smart = d;
    },
    start: function() {
        this.armAnim = this.node.getChildByName("Arm").getComponent(cc.Animation), this.dragonBone = this.getComponent(dragonBones.ArmatureDisplay),
            this.dragonBone.playAnimation("DaiJi");
    },
    setValue: function(a, b) {
        this.strength = a, this.speed = b;
    },
    AIBegin: function(a, b) {
        this.targetPos = a, this.targetBall = b;
    },
    justMove: function(a) {
        this.targetPos = a;
    },
    moveTo: function() {
        var a = this.targetPos;
        if (10 <= this.node.getPosition().x - a.x) {
            if (this.state === d.spike) return;
            this.state = d.moveLeft, !0 === this.canPlayAnim && (this.dragonBone.playAnimation("QianJin"),
                this.canPlayAnim = !1);
        } else if (-10 >= this.node.getPosition().x - a.x) {
            if (this.state === d.spike) return;
            this.state = d.moveRight, !0 === this.canPlayAnim && (this.dragonBone.playAnimation("HouTui"),
                this.canPlayAnim = !1);
        } else this.targetPos = void 0, this.state = d.idle, this.dragonBone.playAnimation("DaiJi"),
            this.canPlayAnim = !0;
    },
    ballDownGround: function() {
        var a = cc.find("Canvas/Role/Player/Arm").getComponent("ArmPhysics");
        cc.director.getScheduler().unscheduleAllForTarget(this), cc.director.getScheduler().unscheduleAllForTarget(a),
            this.targetPos = void 0, this.targetBall = void 0, this.canPlay = !0, this.canPlayAnim = !0,
            this.state = d.idle, this.dragonBone.playAnimation("DaiJi");
    },
    enemyHoldBall: function() {
        cc.director.getScheduler().unscheduleAllForTarget(this), this.targetPos = void 0,
            this.targetBall = void 0, this.dragonBone.playAnimation("DaiJi"), this.state = d.serve,
            this.node.setPosition(450, this.node.getPosition().y);
        var a = cc.find("Canvas/ball");
        this.armAnim.node.setRotation(276), a.getChildByName("tail").active = !1, a.setPosition(410, this.node.getPosition().y + 50),
            a.getComponent(cc.RigidBody).type = cc.RigidBodyType.Static, this.ball = a, this.isServe = !0,
            this.scheduleOnce(function() {
                this.enemyServeBall();
            }, 1);
    },
    enemyServeBall: function() {
        if (this.state === d.serve) {
            var a = 2.5 + (this.strength - 5) / 10;
            this.isServe = !1, this.state = d.cannotControl, this.armAnim.play("EneServe"),
                this.armAnim.node.getComponent("ArmPhysics").powerON(this.strength), this.dragonBone.playAnimation("FaQiu", 1);
            var c = this.ball.getComponent(cc.RigidBody);
            c.type = cc.RigidBodyType.Dynamic, c.gravityScale = a;
            var e = c.getWorldPosition();
            this.ball.getComponent("Ball").init(), c.applyLinearImpulse(cc.v2(0, 25 * b(a / 2.5)), e),
                this.ball.getChildByName("tail").active = !0, this.scheduleOnce(function() {
                    this.state = d.idle, this.canPlay = !0, this.canPlayAnim = !0, this.armAnim.node.getComponent("ArmPhysics").powerOFF(),
                        this.dragonBone.playAnimation("DaiJi", 1), this.smartCom && this.justMove(cc.v2(240, 0));
                }, 1.15);
        }
    },
    setCanSpike: function(a) {
        this.canSpike = a;
    },
    updateState: function() {
        var a = cc.find("Canvas").convertToNodeSpaceAR(this.targetPos);
        if (!(5 > a.x || this.smartCom && 516 < a.x))
            if (this.canSpike && this.state !== d.spike && this.smartCom) 150 > this.node.getPosition().x - this.targetBall.getPosition().x && (this.state = d.spike,
                this.canPlay = !0, this.canPlayAnim = !0);
            else if (55 <= this.node.getPosition().x - a.x) {
            if (this.state === d.spike) return;
            this.state = d.moveLeft, !0 === this.canPlayAnim && (this.dragonBone.playAnimation("QianJin"),
                this.canPlayAnim = !1);
        } else if (-10 >= this.node.getPosition().x - a.x) {
            if (this.state === d.spike) return;
            this.state = d.moveRight, !0 === this.canPlayAnim && (this.dragonBone.playAnimation("HouTui"),
                this.canPlayAnim = !1);
        } else if (80 > this.targetBall.getPosition().y && this.state !== d.hit && -100 < this.targetBall.getPosition().x - this.node.getPosition().x && void 0 !== this.targetPos) {
            if (this.state === d.spike) return;
            this.state = d.hit, this.canPlay = !0, this.canPlayAnim = !0;
        } else if (!1 !== this.canPlay) {
            if (this.state === d.spike) return;
            this.state = d.idle, this.dragonBone.playAnimation("DaiJi"), this.canPlayAnim = !0;
        }
    },
    update: function(a) {
        if (void 0 !== this.targetPos) {
            void 0 === this.targetBall ? this.moveTo() : this.updateState();
            var b;
            switch (this.state) {
                case d.moveLeft:
                    b = cc.moveBy(a, -4 - (this.speed - 5) / 10, 0), this.node.runAction(b);
                    break;

                case d.moveRight:
                    b = cc.moveBy(a, 3 + (this.speed - 5) / 10, 0), this.node.runAction(b);
                    break;

                case d.hit:
                    !0 === this.canPlay && void 0 !== this.targetBall && (this.canPlay = !1, this.armAnim.play("EneHit"),
                        this.armAnim.node.getComponent("ArmPhysics").powerON(this.strength), this.dragonBone.playAnimation("JieQiu", 1),
                        this.scheduleOnce(function() {
                            this.armAnim.node.setRotation(135), this.armAnim.node.getComponent("ArmPhysics").powerOFF(),
                                this.state = d.idle, this.canPlay = !0, this.targetPos = void 0, this.targetBall = void 0,
                                this.dragonBone.playAnimation("DaiJi");
                        }, .46));
                    break;

                case d.spike:
                    !0 === this.canPlay && void 0 !== this.targetBall && (this.canPlay = !1, this.armAnim.play("EneSpike"),
                        this.dragonBone.playAnimation("KouQiu", 1), this.scheduleOnce(function() {
                            this.armAnim.node.getComponent("ArmPhysics").powerON(this.strength);
                        }, .21), this.scheduleOnce(function() {
                            this.armAnim.node.getComponent("ArmPhysics").powerOFF(), this.armAnim.node.setRotation(135);
                        }, .33), this.scheduleOnce(function() {
                            this.state = d.idle, this.canPlay = !0, this.targetPos = void 0, this.targetBall = void 0,
                                this.canSpike = !1, this.dragonBone.playAnimation("DaiJi");
                        }, .83));
                    break;

                case d.idle:
                    this.dragonBone.playAnimation("DaiJi");
            }
        }
    }
});