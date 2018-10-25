cc.Class({
    extends: cc.Component,
    start: function() {
        this.getComponent(cc.Animation).on("finished", this.whenAnimEnd, this);
    },
    whenAnimEnd: function() {
        this.node.active = !1;
    }
});