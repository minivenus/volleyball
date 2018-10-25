cc.Class({
    extends: cc.Component,
    properties: {
        BG: {
            default: null,
            type: cc.SpriteFrame
        },
        PauseUI: {
            default: null,
            type: cc.SpriteFrame
        },
        BGMusic: {
            default: null,
            type: cc.AudioClip
        },
        loadingBG: {
            default: null,
            type: cc.Node
        },
        BeginUI: {
            default: null,
            type: cc.SpriteFrame
        },
        RankUI: {
            default: null,
            type: cc.SpriteFrame
        },
        loginButton: {
            default: null,
            url: cc.Texture2D
        },
        loadingAnim: cc.Node,
        readyToPlay: !1,
        hitButton: !1,
        nickName: "",
        playerIcon: cc.SpriteFrame,
        selfID: "",
        adCount: "",
        musicTog: !0,
        effectTog: !0
    },
    getAdCount: function() {
        return JSON.parse(this.adCount);
    },
    setAdCount: function(a) {
        return this.adCount = a;
    },
    getMusicTog: function() {
        return this.musicTog;
    },
    getEffectTog: function() {
        return this.effectTog;
    },
    saveMusicTog: function(a) {
        this.musicTog = a;
    },
    saveEffectTog: function(a) {
        this.effectTog = a;
    },
    onLoad: function() {
        var a = this;
        cc.sys.platform === cc.sys.WECHAT_GAME ? wx.login({
            success: function(b) {
                wx.getUserInfo({
                    success: function(c) {
                        var d = c.userInfo;
                        a.nickName = d.nickName, console.log("successButtonLoad", d);
                        var e = d.avatarUrl + "?aaa=aa.jpg";
                        console.log("readyToLoad!!!" + e), cc.loader.load(e, function(b, c) {
                            console.log(b), a.playerIcon = new cc.SpriteFrame(c);
                        }), a.hitButton = !0, a.loadRes();
                        var f = {
                            code: b.code,
                            headImg: d.avatarUrl + "?aaa=aa.jpg",
                            nickName: a.nickName
                        };
                        b.code ? (console.log(b.code), wx.request({
                            url: "https://xjgams.wenqi.xin/guser/addGameUser",
                            data: f,
                            header: {
                                "content-type": "application/x-www-form-urlencoded"
                            },
                            method: "POST",
                            success: function(b) {
                                console.log(b);
                                var c = b.data.data.openid,
                                    d = b.data.data.advertcount;
                                a.selfID = c, cc.find("ResourceMng").getComponent("ResourceMng").setOpenID(c), cc.find("ResourceMng").getComponent("ResourceMng").setAdCount(d),
                                    console.log("openid" + c), wx.getOpenDataContext().postMessage({
                                        message: "updataUserOpenID",
                                        openid: c
                                    }), console.log(a.selfID);
                            }
                        })) : console.log("用户登录失败！" + b.errMsg);
                    },
                    fail: function() {
                        console.log("fail Login");
                        var c, d;
                        wx.getSystemInfo({
                            success: function(a) {
                                c = a.screenWidth, d = a.screenHeight;
                            },
                            fail: function() {
                                c = 740, d = 150;
                            }
                        });
                        var e = wx.createUserInfoButton({
                            type: "image",
                            image: a.loginButton,
                            style: {
                                left: c - 150,
                                top: d - 60,
                                width: 168,
                                height: 70,
                                lineHeight: 40,
                                backgroundColor: "#ff0000",
                                color: "#ffffff",
                                textAlign: "center",
                                fontSize: 16,
                                borderRadius: 4
                            }
                        });
                        e.onTap(function(c) {
                            a.hitButton = !0;
                            var d = c.userInfo;
                            a.nickName = d.nickName, console.log("successButtonLoad", d);
                            var f = d.avatarUrl + "?aaa=aa.jpg";
                            console.log("readyToLoad!!!" + f), cc.loader.load(f, function(c, e) {
                                console.log(c), a.playerIcon = new cc.SpriteFrame(e);
                                var f = {
                                    code: b.code,
                                    headImg: d.avatarUrl + "?aaa=aa.jpg",
                                    nickName: a.nickName
                                };
                                b.code ? (console.log(b.code), wx.request({
                                    url: "https://xjgams.wenqi.xin/guser/addGameUser",
                                    data: f,
                                    header: {
                                        "content-type": "application/x-www-form-urlencoded"
                                    },
                                    method: "POST",
                                    success: function(b) {
                                        cconsole.log(b);
                                        var c = b.data.data.openid,
                                            d = b.data.data.adCount;
                                        cc.find("ResourceMng").getComponent("ResourceMng").setAdCount(d), cc.find("ResourceMng").getComponent("ResourceMng").setOpenID(c),
                                            console.log("openid" + c);
                                        var e = wx.getOpenDataContext();
                                        e.postMessage({
                                            message: "updataUserOpenID",
                                            openid: c
                                        }), e.postMessage({
                                            message: "updataUserScore",
                                            score: "0"
                                        }), console.log(a.selfID);
                                    }
                                })) : console.log("用户登录失败！" + b.errMsg);
                            }), a.loadRes(), e.hide();
                        });
                    }
                });
            }
        }) : (this.loginButton, this.hitButton = !0, this.loadRes());
    },
    loadRes: function() {
        this.loadingAnim.active = !0, this.BG = new cc.SpriteFrame(), this.PauseUI = new cc.SpriteFrame(),
            cc.game.addPersistRootNode(this.node);
        var a = this;
        cc.loader.load("http://jsf-file.wenqi.xin/img/e2000c367a304805a1bf285d668d1e14.png", function(b, c) {
            cc.log(b), a.PauseUI.setTexture(c);
        }), cc.loader.load("http://jsf-file.wenqi.xin/img/d143f04ec73d4cf9956315121451326b.png", function(b, c) {
            cc.log(b), a.BG.setTexture(c);
        }), cc.loader.load("http://jsf-file.wenqi.xin/teaching-videos/1710cdca220a44d9bcf878b029bb1355.mp3", function(a, b) {
            cc.log(a), this.soundID = cc.audioEngine.play(b, !0);
        }), cc.loader.load("http://jsf-file.wenqi.xin/img/ba2882e5fa7b4fa9be3a1f7a4f19b9f2.png", function(b, c) {
            cc.log(b);
            var d = new cc.SpriteFrame(c);
            a.BeginUI = d;
        }), a = this, cc.loader.load("http://jsf-file.wenqi.xin/img/2a3678ac70b94575ab54ae30500e6e69.jpg", function(b, c) {
            cc.log(b);
            var d = new cc.SpriteFrame(c);
            a.RankUI = d;
        }), this.readyToPlay = !0;
    },
    getNickName: function() {
        if (null !== this.nickName) return this.nickName;
    },
    getPlayerIcon: function() {
        if (null !== this.playerIcon) return this.playerIcon;
    },
    getBG: function() {
        if (null !== this.BG) return this.BG;
    },
    getPauseUI: function() {
        if (null !== this.PauseUI) return this.PauseUI;
    },
    getBGMusic: function() {
        if (null !== this.BGMusic) return this.PauseUI;
    },
    getBeginUI: function() {
        if (null !== this.BeginUI) return this.BeginUI;
    },
    getRankUI: function() {
        if (null !== this.RankUI) return console.log(this.RankUI.nativeUrl + "nativeUrl"),
            console.log(this.RankUI._native + "nativeUrl"), this.RankUI;
    },
    setOpenID: function(a) {
        this.selfID = a, console.log("save open ID" + this.selfID);
    },
    getOpenID: function() {
        if (console.log("Get Open ID" + this.selfID), null !== this.selfID) return this.selfID;
    },
    getSoundID: function() {
        return this.soundID;
    },
    update: function() {
        this.readyToPlay && null !== this.BG && null !== this.PauseUI && null !== this.BeginUI && this.hitButton && null !== this.RankUI && (this.scheduleOnce(function() {
            cc.director.loadScene("Begin");
        }, 2), this.readyToPlay = !1);
    }
});