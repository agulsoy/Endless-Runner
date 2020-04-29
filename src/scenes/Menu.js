class Menu extends Phaser.Scene {
    constructor() {
        super('menuScene');
    }

    create() {
        // add menu screen text
        this.add.text(centerX, (centerY - (centerY/2)), 'Endless Climber', { fontFamily: 'Helvetica', fontSize: '48px', color: '#33A2FF' }).setOrigin(0.5);
        this.add.text(centerX, centerY + (centerY/2), 'Press SPACEBAR to Start', { fontFamily: 'Helvetica', fontSize: '24px', color: '#33E6FF' }).setOrigin(0.5);

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