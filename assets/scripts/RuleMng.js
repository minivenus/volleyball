var c = require("PlayerMove"),
    d = require("Enemy");
cc.Class({
    extends: cc.Component,
    properties: {
        player: {
            default: null,
            type: c
        },
        enemy: {
            default: null,
            type: d
        }
    },
    start: function() {
        this.player = cc.find("Canvas/Role/Player").getComponent("PlayerMove"), this.enemy = cc.find("Canvas/Role/Enemy").getComponent("Enemy");
    },
    getPlayer: function() {
        return this.player;
    },
    getEnemy: function() {
        return this.enemy;
    }
});