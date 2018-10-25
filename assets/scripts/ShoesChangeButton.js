cc.Class({
    extends: cc.Component,
    properties: {
        index: 0,
        _armature: null,
        Max: 0
    },
    init: function(a, b, c) {
        this.index = a, this._armature = b, this.Max = c, this.node.on("touchend", this.changeHand, this);
    },
    changeHand: function() {
        this._armature.getSlot("ZuoXie").displayIndex = this.index % this.Max, this._armature.getSlot("YouXie").displayIndex = this.index % this.Max;
    }
});