class Menu extends Phaser.Scene {
    constructor() {
        super('menuScene');
    }

    create() {
        // add menu screen text
        this.add.text(centerX, (centerY - (centerY/2)), 'Endless Climber', { fontFamily: 'Helvetica', fontSize: '48px', color: '#33A2FF' }).setOrigin(0.5);
        this.add.text(centerX, centerY + (centerY/2), 'Press ANY KEY to Start', { fontFamily: 'Helvetica', fontSize: '24px', color: '#33E6FF' }).setOrigin(0.5);

        // set up cursor keys
        //cursors = this.input.keyboard.createCursorKeys();
    }

    /*
    update() {
        // check for UP input
        if (Phaser.Input.Keyboard.JustDown(cursors.up)) {
            this.scene.start('playScene');
        }
    }
    */
}