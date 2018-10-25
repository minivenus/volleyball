cc.Class({
    extends: cc.Component,
    properties: {
        showArea: {
            default: [],
            type: cc.Sprite
        }
    },
    changeImage: function(a, b, c) {
        this.showArea[0].spriteFrame = a, this.showArea[1].spriteFrame = b, this.showArea[2].spriteFrame = c;
    }
});