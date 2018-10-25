cc.Class({
    extends: cc.Component,
    properties: {
        enemy: {
            default: null,
            type: cc.Node
        }
    },
    transTarget: function(a, b) {
        null !== this.enemy && this.enemy.getComponent("Enemy").AIBegin(a, b);
    },
    setEnemy: function(a) {
        this.enemy = a;
    },
    start: function() {}
});