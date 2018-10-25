cc.Class({
    extends: cc.Component,
    properties: {
        pauseBG: {
            default: null,
            type: cc.Node
        }
    },
    onLoad: function() {
        this.node.on("touchstart", this.GamePause, this);
    },
    GamePause: function() {
        cc.director.pause(), this.pauseBG.active = !0;
    }
});