class Barrier extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, velocity) {
        // call Phaser Physics Sprite constructor
        //super(scene, Phaser.Math.Between(paddleHeight/2, game.config.height - paddleHeight/2), 0, 'platform');  
        super(scene, Phaser.Math.Between(0, game.config.width - paddleWidth), 0, 'platform');  

        // set up physics sprite
        scene.add.existing(this);               // add to existing scene, displayList, updateList
        scene.physics.add.existing(this);       // add physics body
        this.body.setAllowGravity(false);
        this.setVelocityY(-1 * velocity);            // make it go!
        this.setImmovable();                    
        this.tint = Math.random() * 0xFFFFFF;   // randomize tint
        this.newBarrier = true;                 // custom property to control barrier spawning

        this.scene = scene;
        this.velocity = velocity;
    }

    update() {
        // override physics sprite update()
        super.update();

        // add new barrier when existing barrier hits center X
        if(this.newBarrier && this.y > centerY) {
            this.newBarrier = false;
            // call parent scene method from this context
            this.scene.addBarrier(this.parent, this.velocity);
        }

        // destroy paddle if it reaches the left edge of the screen
        if(this.y > (game.config.height)) {
            this.destroy();
        }
    }
}