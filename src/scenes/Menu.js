class Menu extends Phaser.Scene {
    constructor() {
        super('menuScene');
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
        this.add.text(centerX, centerY + (centerY/2), 'Press SPACEBAR to Start', menuConfig).setOrigin(0.5);

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