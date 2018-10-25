cc.Class({
    extends: cc.Component,
    properties: {
        ChallengeMng: a("ChallengeModeRuler"),
        loseUI: cc.Node,
        tips: a("Tips"),
        adCount: 0
    },
    onLoad: function() {
        var a = this;
        (this.adCount = cc.find("ResourceMng").getComponent("ResourceMng").getAdCount(),
            cc.sys.platform === cc.sys.WECHAT_GAME) && (this.rewardedVideoAd = wx.createRewardedVideoAd({
            adUnitId: "adunit-eca9c1d7b26a2846"
        }), null == this.rewardedVideoAd && console.log("Max watch count"), this.rewardedVideoAd.onClose(function(b) {
            if (b && b.isEnded || void 0 === b) {
                var c = cc.find("ResourceMng").getComponent("ResourceMng").getOpenID();
                a.ChallengeMng.restartThisRound(), a.loseUI.active = !1, console.log("观看完整激励广告" + b);
                var d = {
                    openId: c,
                    advertCount: (++a.adCount).toString()
                };
                cc.find("ResourceMng").getComponent("ResourceMng").setAdCount(a.adCount.toString()),
                    console.log(d), wx.request({
                        url: "https://xjgams.wenqi.xin/guser/updateAdvertCount",
                        data: d,
                        header: {
                            "content-type": "application/x-www-form-urlencoded"
                        },
                        method: "POST",
                        success: function() {
                            console.log("successs updata adCount");
                        }
                    });
            } else console.log("未观看完整激励广告" + b);
        }));
        var b;
        this.rewardedVideoAd.onError(function(a) {
            console.log(a.errMsg + "   " + a.Code);
        }), this.node.on("touchstart", function() {
            var a = this;
            if (cc.sys.platform === cc.sys.WECHAT_GAME) {
                if (10 <= this.adCount) return void this.tips.playAnimation("今日观看广告次数已达到上限，\n无法继续挑战");
                this.rewardedVideoAd.show().catch(function(c) {
                    console.log(c), b = a.rewardedVideoAd.load().then(function() {
                        return a.rewardedVideoAd.show();
                    });
                });
            } else cc.director.loadScene("Challenge");
            console.log(b);
        }, this);
    }
});