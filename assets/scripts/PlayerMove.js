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
        state: {
            default: d.idle,
            type: d
        },
        secState: {
            default: d.idle,
            type: d
        },
        armAnim: {
            default: null,
            type: cc.Animation
        },
        dragonBone: {
            default: null,
            type: dragonBones.ArmatureDisplay
        },
        isServe: !1,
        ball: cc.node,
        speed: 5,
        strength: 5
    },
    start: function() {
        this.state = d.idle, cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.move, this),
            cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.moveReverce, this), this.armAnim = this.node.getChildByName("Arm").getComponent(cc.Animation),
            this.dragonBone = this.getComponent(dragonBones.ArmatureDisplay);
        var a = cc.find("Canvas/Button/Left"),
            b = cc.find("Canvas/Button/Right"),
            c = cc.find("Canvas/Button/Hit"),
            e = cc.find("Canvas/Button/Spike");
        a.on("touchstart", function() {
            this.state === d.idle && (this.state = d.moveLeft, this.dragonBone.playAnimation("HouTui")),
                this.secState = d.moveLeft;
        }, this), a.on("touchmove", function(a) {
            cc.log(a.touch._point), 350 < a.touch._point.y || 380 < a.touch._point.x ? (this.state !== d.moveLeft && this.state !== d.moveRight || (this.state = d.idle,
                this.dragonBone.playAnimation("DaiJi")), this.secState = d.idle) : 200 < a.touch._point.x ? (this.state !== d.idle && this.state !== d.moveLeft || (this.state = d.moveRight,
                this.dragonBone.playAnimation("QianJin")), this.secState = d.moveRight) : (this.state !== d.idle && this.state !== d.moveRight || (this.state = d.moveLeft,
                this.dragonBone.playAnimation("HouTui")), this.secState = d.moveLeft);
        }, this), a.on("touchend", function() {
            this.state !== d.moveLeft && this.state !== d.moveRight || (this.state = d.idle,
                this.dragonBone.playAnimation("DaiJi")), this.secState = d.idle;
        }, this), a.on("touchcancel", function() {
            this.state !== d.moveLeft && this.state !== d.moveRight || (this.state = d.idle,
                this.dragonBone.playAnimation("DaiJi")), this.secState = d.idle;
        }, this), b.on("touchstart", function() {
            this.state === d.idle && (this.state = d.moveRight, this.dragonBone.playAnimation("QianJin")),
                this.secState = d.moveRight;
        }, this), b.on("touchend", function() {
            this.state !== d.moveLeft && this.state !== d.moveRight || (this.state = d.idle,
                this.dragonBone.playAnimation("DaiJi")), this.secState = d.idle;
        }, this), b.on("touchmove", function(a) {
            350 < a.touch._point.y || 380 < a.touch._point.x ? (this.state !== d.moveLeft && this.state !== d.moveRight || (this.state = d.idle,
                this.dragonBone.playAnimation("DaiJi")), this.secState = d.idle) : 200 < a.touch._point.x ? (this.state !== d.idle && this.state !== d.moveLeft || (this.state = d.moveRight,
                this.dragonBone.playAnimation("QianJin")), this.secState = d.moveRight) : (this.state !== d.idle && this.state !== d.moveRight || (this.state = d.moveLeft,
                this.dragonBone.playAnimation("HouTui")), this.secState = d.moveLeft);
        }, this), b.on("touchcancel", function() {
            this.state !== d.moveLeft && this.state !== d.moveRight || (this.state = d.idle,
                this.dragonBone.playAnimation("DaiJi")), this.secState = d.idle;
        }, this), c.on("touchstart", function() {
            if (this.state === d.idle || this.state === d.serve || this.state === d.moveLeft || this.state === d.moveRight) {
                if (this.isServe) return void this.playerServeBall();
                this.state = d.hit, this.canPlay = !0;
            }
        }, this), e.on("touchstart", function() {
            (this.state !== d.idle || this.isServe) && this.state !== d.moveLeft && this.state !== d.moveRight || (this.state = d.spike,
                this.canPlay = !0);
        }, this);
        var f = cc.find("Canvas/ball");
        this.ball = f, "Challenge" !== cc.director.getRunningScene().name && this.playerHoldBall();
    },
    stopAnyAction: function() {
        cc.director.getScheduler().unscheduleAllForTarget(this), this.dragonBone.playAnimation("DaiJi"),
            this.state = d.cannotControl;
    },
    comeBacktoPlay: function() {
        this.dragonBone.playAnimation("DaiJi"), this.state = d.idle;
    },
    cannotControl: function() {
        this.isServe = !0;
    },
    playerHoldBall: function() {
        cc.director.getScheduler().unscheduleAllForTarget(this), this.dragonBone.playAnimation("DaiJi"),
            this.node.setPosition(-450, this.node.getPosition().y), this.armAnim.node.setRotation(264),
            this.ball.getChildByName("tail").active = !1, this.ball.setPosition(-410, this.node.getPosition().y + 50),
            this.ball.getComponent(cc.RigidBody).type = cc.RigidBodyType.Static, this.state = d.serve,
            this.isServe = !0;
    },
    playerServeBall: function() {
        if (this.isServe && this.state === d.serve) {
            this.isServe = !1, this.state = d.cannotControl, this.armAnim.play("serve"), this.dragonBone.playAnimation("FaQiu", 1),
                this.scheduleOnce(function() {
                    this.armAnim.node.getComponent("ArmPhysics").powerON(this.strength);
                }, .5);
            var a = this.ball.getComponent(cc.RigidBody);
            a.type = cc.RigidBodyType.Dynamic;
            var c = a.getWorldPosition();
            this.ball.getComponent("Ball").init();
            var e = 2.5 + (this.strength - 5) / 10;
            a.gravityScale = e, a.applyLinearImpulse(cc.v2(0, 25 * b(e / 2.5)), c), this.ball.getChildByName("tail").active = !0,
                this.scheduleOnce(function() {
                    this.state = d.idle, this.armAnim.node.getComponent("ArmPhysics").powerOFF(), this.dragonBone.playAnimation("DaiJi", 1);
                }, 1);
        }
    },
    move: function(a) {
        switch (a.keyCode) {
            case cc.KEY.a:
                this.state === d.idle && (this.state = d.moveLeft, this.dragonBone.playAnimation("HouTui"));
                break;

            case cc.KEY.d:
                this.state === d.idle && (this.state = d.moveRight, this.dragonBone.playAnimation("QianJin"));
                break;

            case cc.KEY.w:
                (this.state !== d.idle || this.isServe) && this.state !== d.moveLeft && this.state !== d.moveRight || (this.state = d.spike,
                    this.canPlay = !0);
                break;

            case cc.KEY.s:
                if (this.state === d.idle || this.state === d.serve || this.state === d.moveLeft || this.state === d.moveRight) {
                    if (this.isServe) return void this.playerServeBall();
                    this.state = d.hit, this.canPlay = !0;
                }
        }
    },
    buttonMoveReverce: function() {
        switch (this.state = this.secState, this.state) {
            case d.moveLeft:
                this.dragonBone.playAnimation("HouTui");
                break;

            case d.moveRight:
                this.dragonBone.playAnimation("QianJin");
                break;

            case d.idle:
                this.dragonBone.playAnimation("DaiJi");
        }
    },
    moveReverce: function(a) {
        a.keyCode !== cc.KEY.a && a.keyCode !== cc.KEY.d || this.state !== d.moveLeft && this.state !== d.moveRight || (this.state = d.idle,
            this.dragonBone.playAnimation("DaiJi"));
    },
    checkNextTimePos: function(a) {
        var b = this.ball.getPosition().y,
            c = this.ball.getComponent("cc.RigidBody").gravityScale;
        return b - (.23 * f(a) + .23 * (.23 * (160 * c)));
    },
    update: function(a) {
        if (this.state !== d.idle)
            if (this.state === d.moveRight) {
                if (-30 > this.node.getPosition().x) {
                    var b = cc.moveBy(a, 5 + (this.speed - 5) / 10, 0);
                    this.node.runAction(b);
                }
            } else if (this.state === d.moveLeft) {
            if (-450 < this.node.getPosition().x) {
                var c = cc.moveBy(a, -4 - (this.speed - 5) / 10, 0);
                this.node.runAction(c);
            }
        } else if (!(this.state === d.hit)) this.state === d.spike && this.canPlay && (this.armAnim.node.setRotation(-120),
            this.getComponent(dragonBones.ArmatureDisplay).playAnimation("KouQiu", 1), this.armAnim.play("spike"),
            this.armAnim.node.setRotation(-120), this.scheduleOnce(function() {
                this.armAnim.node.getComponent("ArmPhysics").powerON(this.strength);
            }, .21), this.scheduleOnce(function() {
                this.armAnim.node.getComponent("ArmPhysics").powerOFF(), this.armAnim.node.setRotation(45);
            }, .33), this.scheduleOnce(function() {
                this.buttonMoveReverce();
            }, .83), this.canPlay = !1);
        else if (this.canPlay) {
            var e = this.ball.getComponent(cc.RigidBody); -
            9 >= this.checkNextTimePos(e.linearVelocity.y) ? (this.armAnim.play("hit"), this.getComponent(dragonBones.ArmatureDisplay).playAnimation("JieQiu", 1),
                this.scheduleOnce(function() {
                    this.armAnim.node.getComponent("ArmPhysics").powerON(this.strength);
                }, .1), this.scheduleOnce(function() {
                    this.armAnim.node.setRotation(45), this.armAnim.node.getComponent("ArmPhysics").powerOFF(),
                        this.buttonMoveReverce();
                }, .46), this.canPlay = !1) : (this.armAnim.play("hit2"), this.getComponent(dragonBones.ArmatureDisplay).playAnimation("JieQiu2", 1),
                this.scheduleOnce(function() {
                    this.armAnim.node.getComponent("ArmPhysics").powerON(this.strength);
                }, .1), this.scheduleOnce(function() {
                    this.armAnim.node.getComponent("ArmPhysics").powerOFF(), this.armAnim.node.setRotation(45),
                        this.buttonMoveReverce();
                }, .46), this.canPlay = !1);
        }
    }
});