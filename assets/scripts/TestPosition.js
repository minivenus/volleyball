cc.Class({
    extends: cc.Component,
    properties: {},
    onLoad: function() {
        console.log("testPos" + this.node.getPosition().x + "   " + this.node.getPosition().y);
    },
    start: function() {}
});