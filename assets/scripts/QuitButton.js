cc.Class({
    extends: cc.Component,
    properties: {},
    onLoad: function() {
        this.node.on("touchstart", function() {
            cc.director.resume(), cc.director.loadScene("Begin");
        }, this);
    }
});