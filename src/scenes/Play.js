class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }

    preload() {
        //load images
        this.load.image('paddle', './assets/Endless Runner Character.png');
        this.load.image('platform', './assets/PlatformLong.png');

        // load spritesheet
        this.load.spritesheet('fire', './assets/Fire.png', {frameWidth: 640, frameHeight: 40, startFrame: 0, endFrame: 6});
    }

    create() {
         // reset parameters
         this.barrierSpeed = -75;
         this.barrierSpeedMax = -100;
         level = 0;
         this.extremeMODE = false;
         this.shadowLock = false;

         //set up world physics
         this.physics.world.gravity.y = 500;
         this.JUMP_VELOCITY = -500;
         this.hasJumped = false;
 
         // set up cursor keys
         cursors = this.input.keyboard.createCursorKeys();

         // set up fire (physics sprite)
         this.fire = this.physics.add.sprite(centerX, 640, 'fireani').setOrigin(0.5);
         this.fire.setCollideWorldBounds(true);
         this.fire.setImmovable();
 
         // set up paddle (physics sprite)
         paddle = this.physics.add.sprite(centerX, 448, 'paddle').setOrigin(0.5);
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
            frames: this.anims.generateFrameNumbers('fire', { start: 0, end: 6, first: 0}),
            frameRate: 2,
            repeat: -1
        });
         
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
             }

             //if paddle sprite is changed remember to check hardcoded value paddleWidth!
             if(paddle.y > ((centerY * 2) - (33))) {
                this.hasJumped = false;
             }

             if(level >= 7) {
                if(paddle.y > ((centerY * 2) - (30))){
                    paddle.destroyed = true;                    // turn off collision checking
                    this.difficultyTimer.destroy();             // shut down timer
                    // kill paddle
                    paddle.destroy();              
                    this.scene.start('gameOverScene');
                }
             }
             // check for collisions
             this.physics.world.collide(paddle, this.barrierGroup, this.paddleCollision, null, this);
             //this.physics.add.collider(paddle, this.barrierGroup);

         }

         // hide fire if time not past 7
         if(level < 7){
             this.fire.alpha = 0;
         }
         else {
             this.fire.alpha = 1;
         }
 
         // spawn rainbow trail if in EXTREME mode
         if(this.extremeMODE && !this.shadowLock && !paddle.destroyed) {
             this.spawnShadowPaddles();
             this.shadowLock = true;
             // lock shadow paddle spawning to a given time interval
             this.time.delayedCall(15, () => { this.shadowLock = false; })
         }

         this.isJumping = false;

         //play animations
         this.fire.anims.play('fireani');
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
         // set HARD mode
         if(level == 45) {
             paddle.scaleY = 0.75;
         }
         // set EXTREME mode
         if(level == 75) {
             paddle.scaleY = 0.5;
             this.extremeMODE = true;
         }
     }
 
     spawnShadowPaddles() {
         // add a "shadow paddle" at main paddle position
         let shadowPaddle = this.add.image(paddle.x, paddle.y, 'paddle').setOrigin(0.5);
         shadowPaddle.scaleY = paddle.scaleY;            // scale to parent paddle
         shadowPaddle.tint = Math.random() * 0xFFFFFF;   // tint w/ rainbow colors
         shadowPaddle.alpha = 0.5;                       // make semi-transparent
         // tween alpha to 0
         this.tweens.add({ 
             targets: shadowPaddle, 
             alpha: { from: 0.5, to: 0 }, 
             duration: 750,
             ease: 'Linear',
             repeat: 0 
         });
         // set a kill timer for trail effect
         this.time.delayedCall(750, () => { shadowPaddle.destroy(); } );
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
