cc.Class({
    extends: cc.Component,
    properties: {
        tipsLabel: cc.Label
    },
    playAnimation: function(a) {
        this.tipsLabel.string = a, this.node.active = !0, this.getComponent(cc.Animation).play();
    }
});