cc.Class({
    extends: cc.Component,
    properties: {
        leftScoreLabel: {
            default: null,
            type: cc.Node
        },
        rightScoreLabel: {
            default: null,
            type: cc.Node
        },
        scoreAnimation: {
            default: null,
            type: cc.Node
        },
        leftScore: 0,
        rightScore: 0,
        points: {
            default: [],
            type: cc.SpriteFrame
        },
        animPoints: {
            default: [],
            type: cc.SpriteFrame
        }
    },
    start: function() {
        this.leftScoreLabel = this.node.getChildByName("LeftScore"), this.rightScoreLabel = this.node.getChildByName("RightScore");
    },
    updateScore: function(b) {
        var d = Math.floor,
            f = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 0;
        if (0 < b && 516 > b || -506 > b) {
            ++this.rightScore;
            var e = d(this.rightScore / 100),
                g = d(this.rightScore / 10) % 10,
                h = this.rightScore % 10;
            if (this.leftScoreLabel.getComponent("ShowNumber").changeImage(this.points[h], this.points[g], this.points[e]),
                this.scoreAnimation.getChildByName("LeftScore").getComponent("ShowNumber").changeImage(this.animPoints[h], this.animPoints[g], this.animPoints[e]),
                this.scoreAnimation.getComponent(cc.Animation).play(), "Challenge" === cc.director.getRunningScene().name) {
                if (cc.find("Canvas/ChallengeModeRuler").getComponent("ChallengeModeRuler").gainScore(f),
                    this.checkWinOrLose()) return;
                if (null !== cc.find("Canvas/Role/BallMaker")) {
                    var i = cc.find("Canvas/Role/BallMaker");
                    return void(null !== i && i.getComponent("ballMaker").shotBall());
                }
                cc.find("Canvas/Role/Player").getComponent("PlayerMove").cannotControl(), this.scheduleOnce(function() {
                    cc.find("Canvas/Role/Player").getComponent("PlayerMove").playerHoldBall();
                }, 2);
            } else cc.find("RuleMng").getComponent("RuleMng").getPlayer().cannotControl(), cc.find("RuleMng").getComponent("RuleMng").getEnemy().ballDownGround(),
                this.scheduleOnce(function() {
                    cc.find("RuleMng").getComponent("RuleMng").getPlayer().playerHoldBall();
                }, 2);
        } else {
            ++this.leftScore;
            var j = d(this.leftScore / 100),
                a = d(this.leftScore / 10) % 10,
                c = this.leftScore % 10;
            if (this.rightScoreLabel.getComponent("ShowNumber").changeImage(this.points[c], this.points[a], this.points[j]),
                this.scoreAnimation.getChildByName("RightScore").getComponent("ShowNumber").changeImage(this.animPoints[c], this.animPoints[a], this.animPoints[j]),
                this.scoreAnimation.getComponent(cc.Animation).play(), "Challenge" === cc.director.getRunningScene().name) {
                if (this.checkWinOrLose()) return;
                if (null !== cc.find("Canvas/Role/Enemy")) this.scheduleOnce(function() {
                    cc.find("Canvas/Role/Enemy").getComponent("Enemy").enemyHoldBall();
                }, 2);
                else {
                    var k = cc.find("Canvas/Role/BallMaker");
                    null !== k && k.getComponent("ballMaker").shotBall();
                }
            } else cc.find("RuleMng").getComponent("RuleMng").getEnemy().ballDownGround(), this.scheduleOnce(function() {
                cc.find("RuleMng").getComponent("RuleMng").getEnemy().enemyHoldBall();
            }, 2);
        }
    },
    checkBallMaker: function() {
        this.leftScore > this.rightScore ? cc.find("Canvas/ChallengeModeRuler").getComponent("ChallengeModeRuler").lose() : cc.find("Canvas/ChallengeModeRuler").getComponent("ChallengeModeRuler").win();
    },
    checkWinOrLose: function() {
        if ("Challenge" === cc.director.getRunningScene().name) {
            var a = cc.find("Canvas/ChallengeModeRuler").getComponent("ChallengeModeRuler").getEnemy();
            if ("Enemy" === a.name) {
                if (a.getComponent("Enemy").ballDownGround(), 7 <= this.leftScore && 2 <= this.leftScore - this.rightScore) return cc.find("Canvas/ChallengeModeRuler").getComponent("ChallengeModeRuler").lose(), !0;
                if (7 <= this.rightScore && 2 <= this.rightScore - this.leftScore) return cc.find("Canvas/ChallengeModeRuler").getComponent("ChallengeModeRuler").win(), !0;
            }
        } else cc.find("RuleMng").getComponent("RuleMng").getEnemy().ballDownGround();
        return !1;
    },
    cleanScore: function() {
        this.leftScore = 0, this.rightScore = 0, this.rightScoreLabel.getComponent("ShowNumber").changeImage(this.points[0], this.points[0], this.points[0]),
            this.leftScoreLabel.getComponent("ShowNumber").changeImage(this.points[0], this.points[0], this.points[0]),
            this.scoreAnimation.getChildByName("RightScore").getComponent("ShowNumber").changeImage(this.animPoints[0], this.animPoints[0], this.animPoints[0]),
            this.scoreAnimation.getChildByName("LeftScore").getComponent("ShowNumber").changeImage(this.animPoints[0], this.animPoints[0], this.animPoints[0]);
    }
});