class ChooseLevel extends Phaser.Scene {
    constructor() {
        super({
            key: "ChooseLevel",
        });
    }

    create() {
        this.add.image(400, 300, "sky");

        if (!game.scene.getScene("MenuScene").backgroundMusic.isPlaying) {
            game.scene.getScene("MenuScene").backgroundMusic.play();
        }

        const menuText = this.add.text(16, 16, "Menu", {
            fontSize: "32px",
            fill: "#000",
        });
        menuText.setInteractive();

        menuText.on("pointerover", () => {
            menuText.setBackgroundColor("#dddddd60");
        });

        menuText.on("pointerout", () => {
            menuText.setBackgroundColor("#ffffff00");
        });
        menuText.on("pointerdown", () => {
            game.scene.switch("ChooseLevel", "MenuScene");
        });

        this.add.text(300, 100, "Levels", {
            fontSize: "50px",
            fill: "#000",
        });

        for (let i = 0; i < game.scene.getScene("MenuScene").images.length; i++) {
            const textLevel = this.add.text(40 * ((i % 4) + 1) + 145 * (i % 4), 200 + 100 * parseInt(i / 4), "Level " + (i + 1), {
                fontSize: "32px",
                fill: "#000",
            });

            textLevel.setInteractive();

            textLevel.on("pointerover", () => {
                textLevel.setBackgroundColor("#dddddd60");
            });

            textLevel.on("pointerout", () => {
                textLevel.setBackgroundColor("#ffffff00");
            });
            textLevel.on("pointerdown", () => {
                // game.scene.stop("ChooseLevel");
                game.scene.getScene("Level").image = game.scene.getScene("MenuScene").images[i];
                // game.scene.start("Level");
                game.scene.switch("ChooseLevel", "Level");
            });
        }
    }
}
