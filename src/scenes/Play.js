class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }

    create() {
        // add menu screen text
        this.add.text(centerX, (centerY - (centerY/2)), 'Test', { fontFamily: 'Helvetica', fontSize: '48px', color: '#33A2FF' }).setOrigin(0.5);
    }
}
