class TitleScene extends Phaser.Scene{
    constructor(){
        super({key:'TitleScene'});
    }

    preload(){
        this.load.image('slimeBall', './assets/regular_Ball.png');
        this.load.spritesheet('Explosion', './assets/Explosion.png', {frameWidth: 640, frameHeight: 480, startFrame: 0, endFrame: 22});
    }

    create(){
        var config = {
            key: 'explode',
            frames: this.anims.generateFrameNumbers('Explosion', {start: 0, end: 22, first: 0}),
            frameRate: 17,
            repeat: -1
        };
        this.anims.create(config);

        var Explosion = this.add.sprite(game.config.width/2-280, game.config.height/2-300, 'Explosion').setOrigin(0,0);
        Explosion.anims.play('explode');

        //adding animation
        // this.anims.create({
        //      key: 'explode',
        //      frames: this.anims.generateFrameNumbers('Explosion', {start: 0, end: 7, first: 0}),
        //      frameRate: 20
        // });

        //adding text for title scene
        let centerX = game.config.width/2;
        let centerY = game.config.height/2;
        let textSpacer = 64;

        let titleConfig = {
            fontFamily: 'Times New Roman',
            fontSize: '28px',
            color: '#33A2FF',
            align: 'center',
        }
        let titleText = this.add.text(centerX-80, centerY/2+220, 'Jump For Life', titleConfig).setOrigin(0, 0); 
        
        let subtitleConfig = {
            fontFamily: 'Times New Roman',
            fontSize: '21px',
            color: '#FFFF00',
            align: 'center',
        }
        let subtitleText = this.add.text(game.config.width/2-80, game.config.height/2+150, 'Made with Phaser 3', subtitleConfig).setOrigin(0, 0); 
        
        let transitionConfig = {
            fontFamily: 'Times New Roman',
            fontSize: '15px',
            color: '#FFFF00',
            align: 'center',
        }
        let TransitionText = this.add.text(game.config.width/2-125, game.config.height/2+190, 'Click anywhere on the screen to continue',
         transitionConfig).setOrigin(0, 0); 
        
       
        this.input.once('pointerdown', function (event){
            this.scene.transition({target: 'menuScene', duration: 100 })
        }, this);
    }
    

    update(){
        //  let boom = this.add.sprite('Explosion').setOrigin(0, 0);
        //  boom.anims.play('explode'); //play explode animation
        //  boom.on('animationcomplete', () => {  //callback after animation complete
        //      boom.destroy(); //remove explosion sprite
        //  });
    }
}