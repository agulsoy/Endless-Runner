class Menu extends Phaser.Scene {
    constructor() {
        super('menuScene');
    }
    preload(){
        this.load.image('menuBack', './assets/menu_Back.png')
        this.load.image('RightArrow1', './assets/right_Arrow1.png');
        this.load.image('LeftArrow', './assets/left_Arrow.png');
        this.load.image('UpArrow', './assets/up_Arrow.png');
        // load audio
        this.load.audio('background', './assets/background.wav');
        this.load.audio('bounce', './assets/bounce.wav');
    }

    create() {
        //Menu background
        this.menuBack = this.add.tileSprite(0, 0, 640, 480, 'menuBack').setOrigin(0, 0);

        //menu configuration
        let menuConfig = {
            fontFamily: 'Times New Roman',
            fontSize: '48px',
            backgroundColor: '#000000',
            color: '#33A2FF',
            align: 'center',
            padding: {
                top:5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        // add menu screen text
        let centerX = game.config.width/2;
        let centerY = game.config.height/2;
        let textSpacer = 64;

        this.add.text(centerX, (centerY - (centerY/2))-60, ' Jump For Life ', menuConfig).setOrigin(0.5);
        menuConfig.fontSize = '25px';
        menuConfig.color = '#33E6FF';
        this.add.text(90, centerY + (centerY/2)-210, ' Instructions: ', menuConfig).setOrigin(0.5);
        this.add.text(196, centerY + (centerY/2)-160, ' Press              to move to the right ', menuConfig).setOrigin(0.5);
        this.add.image(196 -70, centerY + (centerY/2)-160, 'RightArrow1').setScale(.5, .5).setOrigin(0.5);
        this.add.text(191, centerY + (centerY/2)-100, ' Press              to move to the left ', menuConfig).setOrigin(0.5);
        this.add.image(191 -70, centerY + (centerY/2)-100, 'LeftArrow').setScale(.5, .5).setOrigin(0.5);
        this.add.text(118, centerY + (centerY/2)-30, ' Press        to jump ', menuConfig).setOrigin(0.5);
        this.add.image(118 -10, centerY + (centerY/2)-30, 'UpArrow').setScale(.5, .5).setOrigin(0.5);
        this.add.text(centerX, centerY + (centerY/2)+80, ' Press SPACEBAR to Start ', menuConfig).setOrigin(0.5);

        menuConfig.backgroundColor= '#000000';
        menuConfig.color= '#33A2FF';
        this.add.text(centerX+210, centerY + (centerY/2)-135, ' Move to the \nfloating bars \nand press jump ', menuConfig).setOrigin(0.5);
        this.add.text(centerX+210, centerY + (centerY/2)-30, ' To avoid falling \ninto the fire ', menuConfig).setOrigin(0.5);
        
        // define keys
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    }

    
    update() {
        //scrolling background
        this.menuBack.tilePositionY -= 5;

        // check for SPACE input
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.scene.start('playScene');
        }
    }

}