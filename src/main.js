/*Name of Game: Jump For Life

  Team members: Pierce Sullivan, Lucky Medikonda, Alex Gulsoy

  Date Completed: 3 May 2020, 5/3/2020
  
  Creative Tilt: We find that our game is technically interesting because 
  the player must move in both the x and y axes, while constantly having to keep jumping 
  rather than simply sliding up. In order to make our character jump we used the 
  Phaser Arcade Physics engine to make sure we achieved a very unique jumping effect. 
  Additionally, we made certain that the platforms moved slightly side to side after 10 seconds. 
  Furthermore, Our game has a great visual aesthetic to it because each asset is custom drawn by hand,
  and we added a title screen with an animation which we found visually appealing.
*/
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

