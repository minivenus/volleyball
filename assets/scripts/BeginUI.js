cc.Class({
    extends: cc.Component,
    properties: {
        soloButton: {
            default: null,
            type: cc.Node
        },
        challengeButton: {
            default: null,
            type: cc.Node
        },
        shareButton: {
            default: null,
            type: cc.Node
        },
        shareUrl: {
            default: null,
            url: cc.Texture2D
        },
        rankBoardButton: {
            default: null,
            type: cc.Node
        },
        rankBoardCloseButton: {
            default: null,
            type: cc.Node
        },
        rankBoardNextButton: {
            default: null,
            type: cc.Node
        },
        rankBoardBeforeButton: {
            default: null,
            type: cc.Node
        },
        rankBoard: cc.Sprite,
        rankDisplay: cc.Sprite,
        updataBegin: !1
    },
    onLoad: function() {
        cc.find("Canvas/BeginBG").getComponent(cc.Sprite).spriteFrame = cc.find("ResourceMng").getComponent("ResourceMng").getBeginUI();
    },
    start: function() {
        var a = this;
        this.tex = new cc.Texture2D(), this.soloButton.on("touchstart", function() {
            cc.director.loadScene("Main");
        }), this.challengeButton.on("touchstart", function() {
            cc.director.loadScene("Challenge");
        }), this.shareButton.on("touchstart", function() {
            console.log("clickShareButton"), wx.shareAppMessage({
                title: "快点来局排球吧！",
                imageUrl: a.shareUrl,
                success: function() {
                    console.log("转发成功!!!" + data), cc.find("GameMng").getComponent("GameMng").hitIt();
                },
                fail: function() {
                    console.log("转发失败!!!" + data);
                }
            });
        }, this), this.rankBoardButton.on("touchstart", function() {
            this.rankBoard.node.active = !0;
            var a = wx.getOpenDataContext();
            console.log(a), a.postMessage({
                message: "showFriendScore"
            }), console.log("sendMassage :showFriendScore");
        }, this), this.rankBoardNextButton.on("touchstart", function() {
            var a = wx.getOpenDataContext();
            console.log(a), a.postMessage({
                message: "nextPage"
            });
        }, this), this.rankBoardBeforeButton.on("touchstart", function() {
            var a = wx.getOpenDataContext();
            console.log(a), a.postMessage({
                message: "beforePage"
            });
        }, this), this.rankBoardCloseButton.on("touchstart", function() {
            this.updataBegin = !1, this.rankBoard.node.active = !1, wx.getOpenDataContext().postMessage({
                message: "hideFriendScore"
            });
        }, this);
    },
    updateSubDomainCanvas: function() {
        if (this.tex) {
            var a = wx.getOpenDataContext().canvas;
            this.tex.initWithElement(a), this.tex.handleLoadedTexture(), this.rankDisplay.spriteFrame = new cc.SpriteFrame(this.tex);
        }
    },
    update: function() {
        this.updataBegin && this.updateSubDomainCanvas();
    }
});