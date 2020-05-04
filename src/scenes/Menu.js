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
            fontFamily: 'Helvetica',
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

        this.add.text(centerX, (centerY - (centerY/2)), ' Endless Climber ', menuConfig).setOrigin(0.5);
        menuConfig.fontSize = '24px';
        menuConfig.color = '#33E6FF';
        this.add.text(centerX, centerY + (centerY/2)-150, ' Instructions: ', menuConfig).setOrigin(0.5);
        this.add.text(centerX, centerY + (centerY/2)-90, ' Press              to move to the right ', menuConfig).setOrigin(0.5);
        this.add.image(centerX -70, centerY + (centerY/2)-90, 'RightArrow1').setScale(.5, .5).setOrigin(0.5);
        this.add.text(centerX, centerY + (centerY/2)-45, ' Press              to move to the left ', menuConfig).setOrigin(0.5);
        this.add.image(centerX -70, centerY + (centerY/2)-40, 'LeftArrow').setScale(.5, .5).setOrigin(0.5);
        this.add.text(centerX, centerY + (centerY/2)+10, ' Press        to jump ', menuConfig).setOrigin(0.5);
        this.add.image(centerX -10, centerY + (centerY/2)+10, 'UpArrow').setScale(.5, .5).setOrigin(0.5);
        this.add.text(centerX, centerY + (centerY/2)+70, ' Press SPACEBAR to Start ', menuConfig).setOrigin(0.5);

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