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
        this.coinSound.volume = 0.3;

        this.deathSound = this.sound.add("death");
        this.deathSound.volume = 0.7;

        this.loseMusic = this.sound.add("lose");
        this.loseMusic.setLoop(true);
        this.loseMusic.volume = 0.2;

        this.victorySound = this.sound.add("victory");
        this.victorySound.volume = 0.7;

        this.victoryMusic = this.sound.add("victory_music");
        this.victoryMusic.setLoop(true);
        this.victoryMusic.volume = 0.2;

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
