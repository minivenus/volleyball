cc.Class({
    extends: cc.Component,
    properties: {
        index: 0,
        _armature: null,
        Max: 0
    },
    init: function(a, b, c) {
        this.index = a, this._armature = b, this.Max = c, this.node.on("touchend", this.changeCloth, this);
    },
    changeCloth: function() {
        this._armature.getSlot("YouShangBi").displayIndex = this.index % this.Max, this._armature.getSlot("YouXiaoBi").displayIndex = this.index % this.Max,
            this._armature.getSlot("ZuoShangBi").displayIndex = this.index % this.Max, this._armature.getSlot("ZuoXiaoBi").displayIndex = this.index % this.Max,
            this._armature.getSlot("Xiong").displayIndex = this.index % this.Max;
    }
});