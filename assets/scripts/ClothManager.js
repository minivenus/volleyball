var c = ["DaiJi", "QianJin", "HouTui", "JieQiu", "JieQiu2", "KouQiu", "ShengLi", "ShiBai"];
cc.Class({
    extends: cc.Component,
    properties: {
        person: {
            default: null,
            type: cc.Node
        },
        headGoodsList: {
            default: [],
            type: cc.Node
        },
        legsGoodsList: {
            default: [],
            type: cc.Node
        },
        BodyGoodsList: {
            default: [],
            type: cc.Node
        },
        shoesGoodsList: {
            default: [],
            type: cc.Node
        },
        clothIndex: 0,
        animIndex: 0,
        _armature: null,
        _armatureDisplay: null,
        Max: 2
    },
    onLoad: function() {
        this._armatureDisplay = this.person.getComponent(dragonBones.ArmatureDisplay), this._armature = this._armatureDisplay.armature();
        for (var a = 0; 8 > a; a++) this.BodyGoodsList[a].addComponent("ClothChangeButton").init(a, this._armature, this.Max);
        for (var b = 0; 8 > b; b++) {
            var c = this.headGoodsList[b].addComponent("HeadChangeButton"),
                d = new cc.Node();
            d.addComponent(cc.Label).string = "头" + (b + 1), this.headGoodsList[b].addChild(d),
                d.setPosition(0, 0), c.init(b, this._armature, this.Max);
        }
        for (var e = 0; 8 > e; e++) this.legsGoodsList[e].addComponent("LegsChangeButton").init(e, this._armature, this.Max);
        for (var f = 0; 8 > f; f++) this.shoesGoodsList[f].addComponent("ShoesChangeButton").init(f, this._armature, this.Max);
    },
    run: function() {
        this._armatureDisplay.playAnimation(c[this.animIndex++ % c.length]);
    }
});