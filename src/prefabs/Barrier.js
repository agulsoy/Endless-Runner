//Based on code from Nathan Altice's Paddle Parkour 3 
//https://github.com/nathanaltice/PaddleParkourP3

class Barrier extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, velocity) {
        // call Phaser Physics Sprite constructor 
        super(scene, Phaser.Math.Between(0, game.config.width - paddleWidth), 0, 'platform');  

        // set up physics sprite
        scene.add.existing(this);               // add to existing scene, displayList, updateList
        scene.physics.add.existing(this);       // add physics body
        this.body.setAllowGravity(false);       // dont want gravity to pull down barriers
        this.setVelocityY(-1 * velocity);       // set y velocity
        this.setImmovable();                    
        this.newBarrier = true;                 

        this.scene = scene;
        this.velocity = velocity;
    }

    update() {
        // override physics sprite update()
        super.update();

        // add new barrier when existing barrier hits center Y/2
        if(this.newBarrier && this.y > (centerY/2)) {
            this.newBarrier = false;
            // call parent scene method from this context
            this.scene.addBarrier(this.parent, this.velocity);
        }

        // make  barrier move left/right to increase difficulty
        // wait unitil after 10
        if (level > 10){
            // if the level is evem
            if ((level % 2) == 0){
                this.body.velocity.x = Phaser.Math.Between(-60, 60);
            }
        }

        // destroy paddle if it reaches the bottom edge of the screen
        if(this.y > (game.config.height)) {
            this.destroy();
        }
    }
}