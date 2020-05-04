//Based on code from Mathan Altice's Paddle Parkour 3 
//https://github.com/nathanaltice/PaddleParkourP3

class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }

    preload() {
        //load images
        //this.load.image('paddle', './assets/Endless Runner Character.png');
        this.load.image('platform', './assets/PlatformLong.png');
        this.load.image('background1', './assets/Endless Runner Background2.png');

        // load spritesheet
        this.load.spritesheet('fireani', './assets/Fire.png', {frameWidth: 640, frameHeight: 40, startFrame: 0, endFrame: 6});
        this.load.spritesheet('playerani', './assets/Endless Runner Character Bounce Animation.png', {frameWidth: 32, frameHeight: 32, startFrame: 0, endFrame: 19});

    }

    create() {
         // reset parameters
         this.barrierSpeed = -75;
         this.barrierSpeedMax = -100;
         level = 0;

         //set up world physics
         this.physics.world.gravity.y = 500;
         this.JUMP_VELOCITY = -500;
         this.hasJumped = false;
 
         // set up cursor keys
         cursors = this.input.keyboard.createCursorKeys();

         //place tilesprite
         this.background1 = this.add.tileSprite(0, 0, 640, 480, 'background1').setOrigin(0, 0);

         //background music
        this.sound.play('background');
 
         // set up paddle (physics sprite)
         paddle = this.physics.add.sprite(centerX, 448, 'playerani').setOrigin(0.5);
         paddle.setCollideWorldBounds(true);
         paddle.setBounce(0.5);
         paddle.setImmovable();
         paddle.setMaxVelocity(600, 1200);
         paddle.setDragX(200);
         paddle.setDepth(1);         // ensures that paddle z-depth remains above shadow paddles
         paddle.destroyed = false;   // custom property to track paddle life
 
         
         // set up barrier group and add first barrier to kick things off
         this.barrierGroup = this.add.group({
             runChildUpdate: true    // make sure update runs on group children
         });
         this.addBarrier();

         // set up fire (physics sprite)
         this.fire = this.physics.add.sprite(centerX, 640, 'fireani').setOrigin(0.5);
         this.fire.setCollideWorldBounds(true);
         this.fire.setImmovable();
         this.fire.setDepth(1);
 
         // set up difficulty timer (triggers callback every second)
         this.difficultyTimer = this.time.addEvent({
             delay: 1000,
             callback: this.levelBump,
             callbackScope: this,
             loop: true
         });

        // fire animation config
        this.anims.create({
            key: 'fireani',
            frames: this.anims.generateFrameNumbers('fireani', { start: 0, end: 6, first: 0}),
            frameRate: 2,
            repeat: -1
        });

        // bounce animation config
        this.anims.create({
            key: 'playerani',
            frames: this.anims.generateFrameNumbers('playerani', { start: 0, end: 19, first: 0}),
            frameRate: 10
        });

        //play animations
        this.fire.anims.play('fireani');
         
     }
 
     addBarrier() {
         let barrier = new Barrier(this, this.barrierSpeed);     // create new barrier
         this.barrierGroup.add(barrier);                         // add it to existing group
     }
 
     
     update() {
         if(!paddle.destroyed) {
             // check for player input
             if(cursors.left.isDown) {
                 paddle.body.velocity.x -= paddleVelocity;
             } else if(cursors.right.isDown) {
                 paddle.body.velocity.x += paddleVelocity;
             }

             // check for jump input
             if(Phaser.Input.Keyboard.DownDuration(cursors.up, 150) && (this.hasJumped === false)) {
                 paddle.body.velocity.y = this.JUMP_VELOCITY;
                 this.hasJumped = true;
                 //bounce sfx
                 this.sound.play('bounce');
                 //play animations
                 paddle.anims.play('playerani');
             }

             //if on the ground, we can jump again
             if(paddle.y > ((centerY * 2) - (33))) {
                this.hasJumped = false;
                 
             }

             //if the player touches the fire game over, fire only spawns after 7
             if(level >= 7) {
                if(paddle.y > ((centerY * 2) - (30))){
                    paddle.destroyed = true;                    // turn off collision checking
                    this.difficultyTimer.destroy();             // shut down timer
                    // kill paddle
                    paddle.destroy(); 
                    game.sound.stopAll();             
                    this.scene.start('gameOverScene');
                }
             }
             // check for collisions
             this.physics.world.collide(paddle, this.barrierGroup, this.paddleCollision, null, this);
             //this.physics.add.collider(paddle, this.barrierGroup);

         }

         // scroll background
        this.background1.tilePositionY -= 5;

         // hide fire if time not past 7
         if(level < 7){
             this.fire.alpha = 0;
         }
         else {
             this.fire.alpha = 1;
         }

         this.isJumping = false;
     }
 
     levelBump() {
         // increment level (aka score)
         level++;
 
         // bump speed every 5 levels
         if(level % 5 == 0) {
             //console.log(`level: ${level}, speed: ${this.barrierSpeed}`);
             if(this.barrierSpeed >= this.barrierSpeedMax) {     // increase barrier speed
                 this.barrierSpeed -= 25;
             }
         }
     }
 
     /*
     paddleCollision() {
         paddle.destroyed = true;                    // turn off collision checking
         this.difficultyTimer.destroy();             // shut down timer
         // kill paddle
         paddle.destroy();              
         // switch states after timer expires
         //this.time.delayedCall(3000, () => { this.scene.start('gameOverScene'); });
         this.scene.start('gameOverScene');
     }
     */

    paddleCollision() {
        this.hasJumped = false;
        
    }

 }
