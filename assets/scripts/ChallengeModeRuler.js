var d = ["扣球练习", "初级爱好者", "高级爱好者", "资深爱好者", "初级教练", "高级教练", "资深教练", "BOSS", "神"];
cc.Class({
    extends: cc.Component,
    properties: {
        ball: {
            default: null,
            type: cc.Node
        },
        EnemyQueue: {
            default: [],
            type: cc.Prefab
        },
        Round: 3,
        Score: 0,
        spawnPoint: {
            default: null,
            type: cc.Node
        },
        Hero: {
            default: null,
            type: cc.Node
        },
        Enemy: {
            default: null,
            type: cc.Node
        },
        challengeScore: {
            default: null,
            type: cc.Node
        },
        ScoreMng: {
            default: null,
            type: cc.Node
        },
        winAnimation: {
            default: null,
            type: cc.Animation
        },
        RoundAnimation: {
            default: null,
            type: cc.Animation
        },
        designation: {
            default: [],
            type: cc.Node
        },
        loseUI: {
            default: null,
            type: cc.Node
        },
        winAnim: cc.Animation
    },
    onLoad: function() {
        this.newRound();
    },
    restartThisRound: function() {
        this.Round--, console.log("replay round:" + this.Round), this.ScoreMng.getComponent("ScoreMng").cleanScore(),
            this.newRound(), 1 == this.Round && cc.find("Canvas/Role/Player").getComponent("PlayerMove").comeBacktoPlay();
    },
    newRound: function() {
        var a = this,
            b = cc.instantiate(this.EnemyQueue[this.Round]);
        cc.find("Canvas/Role").addChild(b), 0 === this.Round ? (b.getComponent("ballMaker").shotBall(),
                b.setPosition(300, -12)) : (b.getComponent("Enemy").initAbility(5 + .5 * this.Round, 5 + .2 * this.Round, 1.5 - .03 * this.Round, function() {
                    return 20 <= a.Round;
                }), b.setPosition(this.spawnPoint.getPosition()), b.name = "Enemy", cc.find("AIControler").getComponent("AIControler").setEnemy(b),
                cc.find("Canvas/Role/Player").getComponent("PlayerMove").cannotControl(), cc.find("Canvas/Role/Player").getComponent("PlayerMove").playerHoldBall(),
                this.ScoreMng.getComponent("ScoreMng").cleanScore()), null !== this.Enemy && this.Enemy.destroy(),
            this.Enemy = b;
        for (var c = 0; 8 > c; c++) this.designation[c].active = !1, c === this.Round && (this.designation[c].active = !0);
        this.Round++;
    },
    gainScore: function(a) {
        this.Score += 10 * this.Round * a, this.challengeScore.getComponent(cc.Label).string = this.Score;
    },
    win: function() {
        this.Hero.getComponent("PlayerMove").stopAnyAction(), this.Hero.getComponent(dragonBones.ArmatureDisplay).playAnimation("ShengLi"),
            1 !== this.Round && this.Enemy.getComponent(dragonBones.ArmatureDisplay).playAnimation("ShiBai", 1),
            this.RoundAnimation.node.getComponent(cc.Label).string = "Round:" + (this.Round + 1),
            this.RoundAnimation.play(), this.winAnimation.play(), this.Score += 100 * this.Round,
            8 == this.Round ? this.lastRoundWin() : this.scheduleOnce(this.newRound, 4);
    },
    lastRoundWin: function() {
        this.winAnim.play();
        var b = this.Score.toString(),
            a = cc.find("ResourceMng").getComponent("ResourceMng").getOpenID();
        console.log("ready to updata ID" + a);
        var c = {
            openId: a
        };
        console.log(c);
        var f, g = this;
        wx.request({
            url: "https://xjgams.wenqi.xin/guser/queryGameUserInfo",
            data: c,
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            success: function(h) {
                console.log("download data    " + h.data.data);
                var e = JSON.parse(h.data.data);
                if (console.log(e), void 0 === (f = e.level) || JSON.parse(f) < JSON.parse(b)) {
                    var i = cc.find("ResourceMng").getComponent("ResourceMng").getOpenID();
                    console.log("ready to updata ID" + i);
                    var j = {
                        openId: i,
                        level: b,
                        userTitle: d[g.Round - 1]
                    };
                    console.log(j), wx.request({
                        url: "https://xjgams.wenqi.xin/guser/gResultGame",
                        data: j,
                        header: {
                            "content-type": "application/x-www-form-urlencoded"
                        },
                        method: "POST",
                        success: function() {
                            console.log("ready to update score" + a);
                            var a = wx.getOpenDataContext();
                            a.postMessage({
                                message: "updataUserScore",
                                score: b
                            });
                        }
                    });
                }
            }
        });
    },
    lose: function() {
        cc.find("Canvas/Role/Player").getComponent("PlayerMove").stopAnyAction(), this.Hero.getComponent(dragonBones.ArmatureDisplay).playAnimation("ShiBai", 1),
            1 != this.Round && this.Enemy.getComponent(dragonBones.ArmatureDisplay).playAnimation("ShengLi");
        var b = this.Score.toString(),
            a = cc.find("ResourceMng").getComponent("ResourceMng").getOpenID();
        console.log("ready to updata ID" + a);
        var c = {
            openId: a
        };
        console.log(c);
        var f, g = this;
        wx.request({
            url: "https://xjgams.wenqi.xin/guser/queryGameUserInfo",
            data: c,
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            success: function(h) {
                console.log("download data    " + h.data.data);
                var e = JSON.parse(h.data.data);
                if (console.log(e), void 0 === (f = e.level) || JSON.parse(f) <= JSON.parse(b)) {
                    var i = cc.find("ResourceMng").getComponent("ResourceMng").getOpenID();
                    console.log("ready to updata ID" + i);
                    var j = {
                        openId: i,
                        level: b,
                        userTitle: d[g.Round - 1]
                    };
                    console.log(j), wx.request({
                        url: "https://xjgams.wenqi.xin/guser/gResultGame",
                        data: j,
                        header: {
                            "content-type": "application/x-www-form-urlencoded"
                        },
                        method: "POST",
                        success: function() {
                            console.log("ready to update score" + a);
                            var a = wx.getOpenDataContext();
                            a.postMessage({
                                message: "updataUserScore",
                                score: b
                            });
                        }
                    });
                }
            }
        }), this.scheduleOnce(function() {
            this.loseUI.active = !0;
        }, 4);
    },
    getEnemy: function() {
        return this.Enemy;
    },
    start: function() {}
});