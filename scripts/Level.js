class Level extends Phaser.Scene {
    constructor() {
        super({
            key: "Level",
        });
    }

    create() {
        this.score = 0;
        if (this.image == null) this.image = "level_1";

        GenerateLevel(this, this.image);

        this.scoreText = this.add.text(16, 16, "Score: 0", {
            fontSize: "32px",
            fill: "#000",
        });

        this.scoreText.setScrollFactor(0);

        this.coinSound = this.sound.add("coin");

        this.deathSound = this.sound.add("death");

        this.loseMusic = this.sound.add("lose");
        this.loseMusic.setLoop(true);

        this.victorySound = this.sound.add("victory");

        this.victoryMusic = this.sound.add("victory_music");
        this.victoryMusic.setLoop(true);

        this.enemyDeathSound = this.sound.add("enemy_death");

        this.highscore = localStorage.getItem("highscore_" + this.image);

        if (this.highscore == null) {
            this.highscore = 0;
        }

        let highscoreText = this.add.text(16, 50, "Highscore : " + this.highscore, {
            fontSize: "32px",
            fill: "#000",
        });
        highscoreText.setScrollFactor(0);
    }

    update() {
        if (
            !this.deathSound.isPlaying &&
            !game.scene.getScene("MenuScene").backgroundMusic.isPlaying &&
            this.stars.countActive(true) != 0 &&
            !this.loseMusic.isPlaying
        ) {
            this.loseMusic.play();
            ShowEndMenu(this);
        }

        if (
            !this.victorySound.isPlaying &&
            !game.scene.getScene("MenuScene").backgroundMusic.isPlaying &&
            !this.victoryMusic.isPlaying &&
            this.stars.countActive(true) === 0
        ) {
            this.victoryMusic.play();
            ShowEndMenu(this);
        }

        Update(this);
    }
}
