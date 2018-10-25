cc.Class({
    extends: cc.Component,
    properties: {
        ball: {
            default: null,
            type: cc.Node
        },
        firePoint: {
            default: null,
            type: cc.Node
        },
        EX: {
            default: null,
            type: cc.Animation
        },
        count: 7,
        isOver: !1
    },
    onLoad: function() {
        this.ball = cc.find("Canvas/ball"), this.EX = cc.find("Canvas/EX").getComponent(cc.Animation),
            this.shotBall();
    },
    shotBall: function() {
        this.isOver ? cc.find("Canvas/ShowScore").getComponent("ScoreMng").checkBallMaker() : this.scheduleOnce(function() {
            this.ball.getChildByName("tail").active = !1, this.ball.setPosition(cc.find("Canvas").convertToNodeSpaceAR(this.node.convertToWorldSpaceAR(this.firePoint.getPosition()))),
                this.EX.node.setPosition(cc.find("Canvas").convertToNodeSpaceAR(this.node.convertToWorldSpaceAR(this.firePoint.getPosition()))),
                this.ball.getComponent(cc.RigidBody).type = cc.RigidBodyType.Static;
            var a = this.ball.getComponent(cc.RigidBody);
            a.type = cc.RigidBodyType.Dynamic;
            var b = a.getWorldPosition();
            this.ball.getComponent("Ball").init(), a.applyLinearImpulse(cc.v2(-25, 15), b),
                a.gravityScale = 2.5, this.ball.getChildByName("tail").active = !0, this.EX.play(),
                0 >= this.count-- && (this.isOver = !0);
        }, 4);
    }
});