cc.Class({
    extends: cc.Component,
    properties: {
        BG: {
            default: null,
            type: cc.Node
        },
        PauseUI: {
            default: null,
            type: cc.Node
        }
    },
    onLoad: function() {
        this.PauseUI.getComponent(cc.Sprite).spriteFrame = cc.find("ResourceMng").getComponent("ResourceMng").getPauseUI(),
            this.BG.getComponent(cc.Sprite).spriteFrame = cc.find("ResourceMng").getComponent("ResourceMng").getBG(),
            this.BG.getComponent(cc.AudioSource).clip = cc.find("ResourceMng").getComponent("ResourceMng").getBGMusic();
    },
    start: function() {
        this.BG.getComponent(cc.AudioSource).rewind();
    }
});