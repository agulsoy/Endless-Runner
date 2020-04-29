'use strict';

// define and configure main Phaser game object


let config = {
    parent: 'myGame',
    type: Phaser.CANVAS,
    height: 480,
    width: 640,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },

    physics: {
        default: 'arcade',
        arcade: {
            //debug: true,
            gravity: {
                x: 0,
                y: 0
            }
        }
    } //,
    //scene: [ Menu, Play ]

}


// define game
let game = new Phaser.Game(config);
