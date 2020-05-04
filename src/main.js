//Based on code from Nathan Altice's Paddle Parkour 3 
//https://github.com/nathanaltice/PaddleParkourP3

'use strict';

//

// define and configure main Phaser game object
let titleScene = new TitleScene();
let menuScene = new Menu();
let playScene = new Play();

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
    },
    scene: [ TitleScene, Menu, Play, GameOver ]

}


// define game
let game = new Phaser.Game(config);

game.scene.add('TitleScene', titleScene);
game.scene.start('menuScene');

game.scene.add('menuScene', menuScene);

game.scene.add('playScene', playScene);

// define globals
let centerX = game.config.width/2;
let centerY = game.config.height/2;
const textSpacer = 50;
let paddle = null;
const paddleWidth = 150;
const paddleHeight = 40;
const paddleVelocity = 75;
let level;
let highScore;
let newHighScore = false;
let cursors;

// reserve keyboard vars
let keySPACE

