cc.Class({
    extends: cc.Component,
    properties: {
        settingUI: {
            default: null,
            type: cc.Node
        }
    },
    onLoad: function() {
        this.node.on("touchstart", function() {
            this.settingUI.active = !0;
        }, this);
    },
    start: function() {}
});