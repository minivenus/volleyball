cc.Class({
    extends: cc.Component,
    properties: {
        Main: {
            default: null,
            type: cc.PageView
        }
    },
    onEnable: function() {
        this.Main.content = this.node;
    }
});