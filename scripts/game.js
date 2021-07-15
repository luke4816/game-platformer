const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: "arcade",
        arcade: {
            gravity: {
                y: 300,
            },
            debug: false,
        },
    },
};

const game = new Phaser.Game(config);
$.getScript("scripts/utils.js", () => {
    $.getScript("scripts/GenerateLevel.js", () => {
        $.getScript("scripts/Level.js", () => {
            $.getScript("scripts/Menu.js", () => {
                game.scene.add("MenuScene", MenuScene);
                $.getScript("scripts/ChooseLevel.js", () => {
                    game.scene.add("ChooseLevel", ChooseLevel);
                    game.scene.add("Level", Level);
                    game.scene.start("MenuScene");
                });
            });
        });
    });
});
