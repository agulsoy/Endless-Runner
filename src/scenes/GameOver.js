class GameOver extends Phaser.Scene {
    constructor() {
        super('gameOverScene');
    }

    
    create() {
        //Based on code from Nathan Altice's Paddle Parkour 3 
        //https://github.com/nathanaltice/PaddleParkourP3
        // check for high score in local storage
        if(localStorage.getItem('hiscore') != null) {
            let storedScore = parseInt(localStorage.getItem('hiscore'));
            // check if current score > stored score
            if(level > storedScore) {
                localStorage.setItem('hiscore', level.toString());
                highScore = level;
                newHighScore = true;
            } else {
                highScore = parseInt(localStorage.getItem('hiscore'));
                newHighScore = false;
            }
        } else {
            highScore = level;
            localStorage.setItem('hiscore', highScore.toString());
            newHighScore = true;
        }


        this.add.text(centerX, (centerY - (centerY/2)), 'Game Over', { fontFamily: 'Helvetica', fontSize: '48px', color: '#33A2FF' }).setOrigin(0.5);
        this.add.text(centerX, (centerY), `Your score is: ${level} The high score is: ${highScore}`, { fontFamily: 'Helvetica', fontSize: '24px', color: '#33A2FF' }).setOrigin(0.5);
        this.add.text(centerX, centerY + (centerY/2), 'Press SPACEBAR to return to menu', { fontFamily: 'Helvetica', fontSize: '24px', color: '#33E6FF' }).setOrigin(0.5);

        // define keys
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        
    }

    update() {
        // check for SPACE input
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.scene.start('menuScene');
        }
    }
}