cc.Class({
    extends: cc.Component,
    properties: {
        icon: cc.Sprite,
        nameLabel: cc.Label,
        nameTitle: cc.Label,
        score: cc.Label
    },
    onLoad: function() {
        this.icon.spriteFrame = cc.find("ResourceMng").getComponent("ResourceMng").getPlayerIcon(),
            console.log(this.icon.spriteFrame), this.nameLabel.string = cc.find("ResourceMng").getComponent("ResourceMng").getNickName();
        var a = this,
            b = cc.find("ResourceMng").getComponent("ResourceMng").getOpenID();
        console.log("ready to updata ID" + b);
        var c = {
            openId: b
        };
        console.log(c), cc.sys.platform === cc.sys.WECHAT_GAME && wx.request({
            url: "https://xjgams.wenqi.xin/guser/queryGameUserInfo",
            data: c,
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            success: function(b) {
                console.log("download data    " + b.data.data);
                var c = JSON.parse(b.data.data);
                console.log(c);
                var d = c.userTitle,
                    e = c.level;
                console.log(d + "     " + e), void 0 === d ? (a.nameTitle.string = "未挑战", a.score.string = "0") : (a.nameTitle.string = d,
                    a.score.string = e);
            },
            fail: function(b) {
                console.log(b), a.nameTitle.string = "未连接服务器";
            }
        });
    },
    start: function() {}
});