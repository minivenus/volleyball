cc.Class({
    extends: cc.Component,
    properties: {
        isGround: !1,
        sound: {
            default: null,
            type: cc.AudioSource
        },
        tail: {
            default: null,
            type: cc.Node
        },
        state: 1
    },
    init: function() {
        this.isGround = !1;
    },
    setState: function(a) {
        this.state = a;
    },
    onBeginContact: function(a, b, c) {
        "Ground" !== c.node.name || this.isGround ? "Arm" === c.node.name && this.sound.play() : (cc.find("Canvas/ShowScore").getComponent("ScoreMng").updateScore(this.node.getPosition().x, this.state),
            this.isGround = !0);
    },
    getIsGround: function() {
        return this.isGround;
    }
});