cc.Class({
    extends: cc.Component,
    properties: {
        pauseBG: {
            default: null,
            type: cc.Node
        }
    },
    onLoad: function() {
        this.node.on("touchstart", function() {
            cc.director.resume(), this.pauseBG.active = !1;
        }, this);
    }
});