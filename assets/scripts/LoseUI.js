cc.Class({
    extends: cc.Component,
    properties: {
        reLoad: {
            default: null,
            type: cc.Node
        },
        quit: {
            default: null,
            type: cc.Node
        }
    },
    onLoad: function() {
        cc.sys.platform === cc.sys.WECHAT_GAME && (this.rewardedVideoAd = wx.createRewardedVideoAd({
            adUnitId: "adunit-eca9c1d7b26a2846"
        }), this.rewardedVideoAd.onClose(function(a) {
            (a && a.isEnded || void 0 === a) && r;
        }), this.rewardedVideoAd), this.reLord.on("touchstart", function() {
            cc.director.loadScene("Challenge");
        }, this), this.quit.on("touchstart", function() {
            cc.director.loadScene("Begin");
        }, this), this.node.active = !1;
    }
});