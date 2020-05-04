class Menu extends Phaser.Scene {
    constructor() {
        super('menuScene');
    }
    preload(){
        this.load.image('RightArrow1', './assets/right_Arrow1.png');
        this.load.image('LeftArrow', './assets/left_Arrow.png');
        this.load.image('UpArrow', './assets/up_Arrow.png');
        // load audio
        this.load.audio('background', './assets/background.wav');
        this.load.audio('bounce', './assets/bounce.wav');
    }

    create() {
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

        this.add.text(centerX, (centerY - (centerY/2)), 'Endless Climber', menuConfig).setOrigin(0.5);
        menuConfig.fontSize = '24px';
        menuConfig.color = '#33E6FF';
        this.add.text(centerX, centerY + (centerY/2)-180, 'Instructions:', menuConfig).setOrigin(0.5);
        this.add.text(centerX, centerY + (centerY/2)-120, 'Press              to move to the right', menuConfig).setOrigin(0.5);
        this.add.image(centerX -70, centerY + (centerY/2)-120, 'RightArrow1').setScale(.5, .5).setOrigin(0.5);
        this.add.text(centerX, centerY + (centerY/2)-75, 'Press              to move to the left', menuConfig).setOrigin(0.5);
        this.add.image(centerX -70, centerY + (centerY/2)-70, 'LeftArrow').setScale(.5, .5).setOrigin(0.5);
        this.add.text(centerX, centerY + (centerY/2)-20, 'Press        to jump', menuConfig).setOrigin(0.5);
        this.add.image(centerX -10, centerY + (centerY/2)-20, 'UpArrow').setScale(.5, .5).setOrigin(0.5);
        this.add.text(centerX, centerY + (centerY/2)+10, 'Move to the floating bars and press jump', menuConfig).setOrigin(0.5);
        this.add.text(centerX, centerY + (centerY/2)+40, 'To avoid falling into the fire', menuConfig).setOrigin(0.5);
        this.add.text(centerX, centerY + (centerY/2)+80, 'Press SPACEBAR to Start', menuConfig).setOrigin(0.5);

        // define keys
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    }

    
    update() {
        // check for SPACE input
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.scene.start('playScene');
        }
    }

}