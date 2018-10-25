cc.Class({
    extends: cc.Component,
    properties: {
        EquipPage: {
            default: [],
            type: cc.Node
        }
    },
    changePage: function(a, b) {
        for (var c = 0; c < this.EquipPage.length; c++) this.EquipPage[c].active = !1, c.toString() === b && (this.EquipPage[c].active = !0);
    }
});