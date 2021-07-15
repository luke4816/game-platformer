function ConfigureScene(scene) {
    scene.platforms = scene.physics.add.staticGroup();
    scene.stars = scene.physics.add.staticGroup();
    scene.enemies = scene.physics.add.group();
    scene.leftX = [];
    scene.rightX = [];
    scene.maxY = 0;
    scene.gameOver = false;

    scene.background = scene.add.image(400, 300, "sky");
    scene.background.setScrollFactor(0);

    if (!game.scene.getScene("MenuScene").backgroundMusic.isPlaying) {
        game.scene.getScene("MenuScene").backgroundMusic.play();
    }

    scene.cursors = scene.input.keyboard.createCursorKeys();

    scene.anims.create({
        key: "left",
        frames: scene.anims.generateFrameNumbers("dude", {
            start: 0,
            end: 3,
        }),
        frameRate: 10,
        repeat: -1,
    });

    scene.anims.create({
        key: "turn",
        frames: [
            {
                key: "dude",
                frame: 4,
            },
        ],
        frameRate: 20,
    });

    scene.anims.create({
        key: "right",
        frames: scene.anims.generateFrameNumbers("dude", {
            start: 5,
            end: 8,
        }),
        frameRate: 10,
        repeat: -1,
    });
}

function collectStar(player, star) {
    star.disableBody(true, true);
    this.coinSound.play();

    this.score += 10;
    this.scoreText.setText("Score: " + this.score);

    // Win
    if (this.stars.countActive(true) === 0) {
        game.scene.getScene("MenuScene").backgroundMusic.pause();
        this.victorySound.play();

        if (this.score > this.highscore) {
            this.highscore = this.score;
            localStorage.setItem("highscore_" + this.image, this.highscore);
        }

        this.physics.pause();
        player.setTint(0x00ff00);
        player.anims.play("turn");
        this.gameOver = true;

        var winText = this.add.text(225, 150, "You Win!", {
            fontSize: "75px",
            fill: "#00ff00",
        });
        winText.setScrollFactor(0);
    }
}

function hitEnemy(player, enemy) {
    if (player.body.touching.down && enemy.body.touching.up) {
        this.enemyDeathSound.play();
        enemy.disableBody(true, true);
        this.score += 50;
        this.scoreText.setText("Score: " + this.score);
    } else {
        Die(this);
    }
}

function Die(scene) {
    if (game.scene.getScene("MenuScene").backgroundMusic.isPlaying) game.scene.getScene("MenuScene").backgroundMusic.stop();
    scene.deathSound.play();
    scene.physics.pause();
    scene.player.setTint(0xff0000);
    scene.player.anims.play("turn");

    // For each enemy
    scene.enemies.children.iterate((child) => {
        child.anims.play("turn");
    });

    scene.gameOver = true;

    let loseText = scene.add.text(225, 150, "You Lose!", {
        fontSize: "75px",
        fill: "#ff0000",
    });
    loseText.setScrollFactor(0);
}

function ShowEndMenu(scene) {
    let restartText = scene.add.text(100, 450, "Restart", {
        fontSize: "50px",
        fill: "#000",
    });
    restartText.setScrollFactor(0);
    restartText.setInteractive();

    restartText.on("pointerdown", () => {
        if (scene.victoryMusic.isPlaying) scene.victoryMusic.stop();
        if (scene.loseMusic.isPlaying) scene.loseMusic.stop();
        game.scene.stop(scene.scene.key);
        game.scene.start(scene.scene.key);
    });

    restartText.on("pointerover", () => {
        restartText.setBackgroundColor("#dddddd60");
    });

    restartText.on("pointerout", () => {
        restartText.setBackgroundColor("#ffffff00");
    });

    let menuText = scene.add.text(400, 450, "Choose Level", {
        fontSize: "50px",
        fill: "#000",
    });

    menuText.setScrollFactor(0);
    menuText.setInteractive();

    menuText.on("pointerdown", () => {
        if (scene.victoryMusic.isPlaying) scene.victoryMusic.stop();
        if (scene.loseMusic.isPlaying) scene.loseMusic.stop();
        game.scene.stop(scene.scene.key);
        game.scene.start("ChooseLevel");
    });

    menuText.on("pointerover", () => {
        menuText.setBackgroundColor("#dddddd60");
    });

    menuText.on("pointerout", () => {
        menuText.setBackgroundColor("#ffffff00");
    });
}

function Update(scene, playerCanMove = true) {
    // Die
    if (!scene.gameOver && scene.player != null && playerCanMove) {
        if (scene.player.y - 64 > scene.maxY) {
            Die(scene);
        }
    }

    if (scene.gameOver) {
        return;
    }

    if (scene.player != null && scene.cursors != null) {
        if (playerCanMove) {
            // Move
            if (scene.cursors.left.isDown) {
                scene.player.setVelocityX(-160);
                scene.player.anims.play("left", true);
            } else if (scene.cursors.right.isDown) {
                scene.player.setVelocityX(160);
                scene.player.anims.play("right", true);
            } else {
                scene.player.setVelocityX(0);
                scene.player.anims.play("turn", true);
            }

            if (scene.cursors.up.isDown && scene.player.body.touching.down) {
                scene.player.setVelocityY(-330);
            }
        } else {
            scene.player.anims.play("turn", true);
        }
    }

    // For each enemy
    let i = 0;
    scene.enemies.children.iterate((child) => {
        if (child.x <= scene.leftX[i]) {
            child.setVelocityX(160);
            child.anims.play("right", true);
        } else if (child.x >= scene.rightX[i]) {
            child.setVelocityX(-160);
            child.anims.play("left", true);
        }
        i++;
    });
}
