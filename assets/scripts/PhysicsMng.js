cc.Class({
    extends: cc.Component,
    properties: {},
    onLoad: function() {
        var a = cc.director.getCollisionManager();
        a.enabled = !0, a.enabledDebugDraw = !0, a.enabledDrawBoundingBox = !0, cc.director.getPhysicsManager().enabled = !0;
    },
    start: function() {}
});