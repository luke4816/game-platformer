class MenuScene extends Phaser.Scene {
    constructor() {
        super({
            key: "MenuScene",
        });
        this.images = ["level_1", "level_2"];
    }

    preload() {
        const progressBar = this.add.graphics();
        const progressBox = this.add.graphics();
        progressBox.fillStyle(0x0000ff, 0.8);
        progressBox.fillRect(240, 270, 320, 50);
        const loadingText = this.add.text(400, 250, "Loading...", {
            font: "20px monospace",
            fill: "#ffffff",
        });
        loadingText.setOrigin(0.5, 0.5);

        const percentText = this.add.text(400, 295, "0%", {
            font: "18px monospace",
            fill: "#ffffff",
        });
        percentText.setOrigin(0.5, 0.5);

        const assetText = this.add.text(400, 350, "", {
            font: "18px monospace",
            fill: "#ffffff",
        });
        assetText.setOrigin(0.5, 0.5);

        this.load.image("sky", "assets/background.png");
        this.load.image("ground", "assets/platform_v2.png");
        this.load.image("ground_middle", "assets/platform_middle.png");
        this.load.image("ground_left", "assets/platform_left.png");
        this.load.image("ground_right", "assets/platform_right.png");
        this.load.image("star", "assets/star.png");

        this.load.spritesheet("dude", "assets/dude.png", {
            frameWidth: 32,
            frameHeight: 48,
        });

        this.load.image("level_0", "assets/testlevel.png");

        // Load all levels' images
        for (let i = 0; i < this.images.length; i++) {
            this.load.image(this.images[i], "assets/" + this.images[i] + ".png");
        }

        this.load.audio("coin", "assets/coins.mp3");
        this.load.audio("death", "assets/death.mp3");
        this.load.audio("lose", "assets/bensound-perception.mp3");
        this.load.audio("victory", "assets/victory.mp3");
        this.load.audio("victory_music", "assets/bensound-anewbeginning.mp3");
        this.load.audio("enemy_death", "assets/enemy_death.wav");
        this.load.audio("theme", "assets/bensound-clearday.mp3");

        this.load.on("progress", (value) => {
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(250, 280, 300 * value, 30);
            percentText.setText(parseInt(value * 100) + "%");
        });

        this.load.on("fileprogress", (file) => {
            assetText.setText("Loading asset: " + file.src);
        });

        this.load.on("complete", () => {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
            assetText.destroy();
        });
    }

    create() {
        this.backgroundMusic = this.sound.add("theme");
        this.backgroundMusic.setLoop(true);
        this.backgroundMusic.volume = 0.2;
        if (!this.backgroundMusic.isPlaying) this.backgroundMusic.play();

        GenerateLevel(this, "level_0", false);

        this.add
            .text(75, 112, "Test Game", {
                fontSize: "120px",
                fill: "#000",
            })
            .setScrollFactor(0);

        let playText = this.add.text(250, 380, "Start", {
            fontSize: "90px",
            fill: "#000",
        });
        playText.setScrollFactor(0);
        playText.setInteractive();

        playText.on("pointerover", () => {
            playText.setBackgroundColor("#dddddd60");
        });

        playText.on("pointerout", () => {
            playText.setBackgroundColor("#ffffff00");
        });
        playText.on("pointerdown", () => {
            game.scene.switch("MenuScene", "ChooseLevel");
        });
    }

    update() {
        Update(this, false);
    }
}
