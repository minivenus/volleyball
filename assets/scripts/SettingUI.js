cc.Class({
    extends: cc.Component,
    properties: {
        BGSound: {
            default: null,
            type: cc.AudioSource
        },
        musicOff: !1,
        effectOff: !1,
        effectSound: {
            default: null,
            type: cc.AudioSource
        },
        closeButton: {
            default: null,
            type: cc.Node
        },
        musicToggle: {
            default: null,
            type: cc.Node
        },
        effectToggle: {
            default: null,
            type: cc.Node
        }
    },
    onLoad: function() {
        this.closeButton.on("touchstart", function() {
            this.node.active = !1;
        }, this), this.musicToggle.on("touchstart", this.musicToggleOn, this), this.effectToggle.on("touchstart", this.effectToggleOn, this);
    },
    onEnable: function() {
        var a = cc.find("ResourceMng").getComponent("ResourceMng").getMusicTog();
        this.musicToggle.getChildByName("checkmark").active = a, this.musicOff = !a;
        var b = cc.find("ResourceMng").getComponent("ResourceMng").getEffectTog();
        this.effectToggle.getChildByName("checkmark").active = b, this.effectOff = !b;
    },
    start: function() {},
    musicToggleOn: function() {
        if (this.musicOff = !this.musicOff, this.musicOff) {
            var a = cc.find("ResourceMng").getComponent("ResourceMng").getSoundID();
            console.log(a), cc.audioEngine.setVolume(0, 0);
        } else cc.find("ResourceMng").getComponent("ResourceMng").getSoundID(), cc.audioEngine.setVolume(0, 1);
        this.musicToggle.getChildByName("checkmark").active = !this.musicOff, cc.find("ResourceMng").getComponent("ResourceMng").saveMusicTog(!this.musicOff);
    },
    effectToggleOn: function() {
        this.effectOff = !this.effectOff, this.effectToggle.getChildByName("checkmark").active = !this.effectOff,
            this.effectSound.mute = this.effectOff, cc.find("ResourceMng").getComponent("ResourceMng").saveEffectTog(!this.effectOff);
    }
});