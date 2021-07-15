function GenerateLevel(scene, imageToload, playerCanMove = true) {
    ConfigureScene(scene);
    const src = scene.textures.get(imageToload).getSourceImage();

    const worldWidth = src.width * 64 + 32;
    const worldHeight = src.height * 64 + 32;

    const canvas = scene.textures
        .createCanvas("map_" + scene.scene.key + "_" + Phaser.Math.FloatBetween(0, 100), src.width, src.height)
        .draw(0, 0, src);
    let pixel = new Phaser.Display.Color();
    let pixelLeft = new Phaser.Display.Color();
    let pixelRight = new Phaser.Display.Color();
    for (let x = 0; x < src.width; x++) {
        for (let y = 0; y < src.height; y++) {
            canvas.getPixel(x, y, pixel);
            if (pixel.a == 255) {
                if (pixel.r == 255 && pixel.g == 255 && pixel.b == 0) {
                    scene.stars.create(x * 64 + 32, y * 64 + 32, "star"); // Star
                } else if (pixel.r == 0 && pixel.g == 0 && pixel.b == 0) {
                    // Ground
                    // if platform has a platform at platform.x - 1, platform.y => left
                    // if platform has a platform at platform.x - 1, platform.y && at platform.x + 1, platform.y => middle
                    // if platform has a platform at platform.x + 1, platform.y => right
                    if (x > 0 && x < src.width - 1) {
                        canvas.getPixel(x - 1, y, pixelLeft);
                        canvas.getPixel(x + 1, y, pixelRight);
                        if (
                            pixelLeft.r == 0 &&
                            pixelLeft.g == 0 &&
                            pixelLeft.b == 0 &&
                            pixelLeft.a == 255 &&
                            pixelRight.r == 0 &&
                            pixelRight.g == 0 &&
                            pixelRight.b == 0 &&
                            pixelRight.a == 255
                        ) {
                            // The platform is between 2 platforms
                            scene.platforms.create(x * 64 + 32, y * 64 + 32, "ground_middle");
                        } else if (pixelLeft.r == 0 && pixelLeft.g == 0 && pixelLeft.b == 0 && pixelLeft.a == 255) {
                            // The platform has one platform to its left
                            scene.platforms.create(x * 64 + 32, y * 64 + 32, "ground_right");
                        } else if (pixelRight.r == 0 && pixelRight.g == 0 && pixelRight.b == 0 && pixelRight.a == 255) {
                            // The platform has one platform to its right
                            scene.platforms.create(x * 64 + 32, y * 64 + 32, "ground_left");
                        } else {
                            // The platform doesn't have a platform next to it
                            scene.platforms.create(x * 64 + 32, y * 64 + 32, "ground");
                        }
                    } else if (x == 0) {
                        canvas.getPixel(x + 1, y, pixelRight);
                        if (pixelRight.r == 0 && pixelRight.g == 0 && pixelRight.b == 0 && pixelRight.a == 255) {
                            // The platform has a platform to its right
                            scene.platforms.create(x * 64 + 32, y * 64 + 32, "ground_left");
                        } else {
                            // The platform doesn't have a platform next to it
                            scene.platforms.create(x * 64 + 32, y * 64 + 32, "ground");
                        }
                    } else if (x == src.width - 1) {
                        canvas.getPixel(x - 1, y, pixelLeft);
                        if (pixelLeft.r == 0 && pixelLeft.g == 0 && pixelLeft.b == 0 && pixelLeft.a == 255) {
                            // The platform has a platform to its left
                            scene.platforms.create(x * 64 + 32, y * 64 + 32, "ground_right");
                        } else {
                            // The platform doesn't have a platform next to it
                            scene.platforms.create(x * 64 + 32, y * 64 + 32, "ground");
                        }
                    }
                    if (y * 64 > scene.maxY) scene.maxY = y * 64;
                } else if (pixel.r == 0 && pixel.g == 0 && pixel.b == 255) {
                    scene.player = scene.physics.add.sprite(x * 64 + 32, y * 64 + 32, "dude"); // Player
                } else if (pixel.r == 0 && pixel.g == 255 && pixel.b == 0) {
                    let enemy = scene.physics.add.sprite(x * 64 + 32, y * 64 + 32, "dude");
                    enemy.setTint(0x00ffff);
                    scene.enemies.add(enemy);

                    let canMove = true;
                    let pixelMove = new Phaser.Display.Color();
                    let i = 1;
                    while (canMove) {
                        canvas.getPixel(x - i, y + 1, pixelMove);

                        if (pixelMove.a == 255 && pixelMove.r == 0 && pixelMove.g == 0 && pixelMove.b == 0 && x - i >= 0) {
                            i++;
                        } else {
                            scene.leftX.push((x - i + 1) * 64 + 32);
                            canMove == false;
                            break;
                        }
                    }

                    i = 1;
                    canMove = true;
                    while (canMove) {
                        canvas.getPixel(x + i, y + 1, pixelMove);
                        if (pixelMove.a == 255 && pixelMove.r == 0 && pixelMove.g == 0 && pixelMove.b == 0 && x + i < src.width) {
                            i++;
                        } else {
                            scene.rightX.push((x + i - 1) * 64 + 32);
                            canMove == false;
                            break;
                        }
                    }
                }
            }
        }
    }

    scene.cameras.main.setBounds(0, 0, worldWidth, worldHeight);
    scene.physics.world.setBounds(0, 0, worldWidth, worldHeight);

    if (scene.platforms != null) {
        if (scene.player != null) {
            scene.physics.add.collider(scene.player, scene.platforms);
            scene.player.setCollideWorldBounds(true);
            scene.cameras.main.startFollow(scene.player, true, 0.08, 0.08);
        }
        if (scene.enemies != null) {
            scene.physics.add.collider(scene.enemies, scene.platforms);
            // For each enemy
            scene.enemies.children.iterate((child) => {
                child.setVelocityX(-160);
                child.anims.play("left");
            });
        }
    }

    if (scene.player != null && playerCanMove) {
        if (scene.stars != null) scene.physics.add.overlap(scene.player, scene.stars, collectStar, null, scene);
        if (scene.enemies != null) scene.physics.add.collider(scene.player, scene.enemies, hitEnemy, null, scene);
    }
}
