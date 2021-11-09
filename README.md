# Game Platformer

- [Game Platformer](#game-platformer)
- [Context](#context)
- [Technologies](#technologies)
- [What's in this game ?](#whats-in-this-game-)
- [How levels are generated ?](#how-levels-are-generated-)
- [How can I add other levels ?](#how-can-i-add-other-levels-)
  - [Blue Pixel](#blue-pixel)
  - [Black Pixel](#black-pixel)
  - [Yellow Pixel](#yellow-pixel)
  - [Green Pixel](#green-pixel)
  - [Transparent Pixel](#transparent-pixel)
- [Copyrights Disclaimer](#copyrights-disclaimer)

# Context
This game was created during an internship. It was used as a base to create a course to teach how to create a video game in JavaScript.

# Technologies
This game is made in JavaScript thanks to the framework [Phaser](https://phaser.io/ "Phaser's Homepage"). This game has a Docker image that uses the alpine version of [NGINX](https://www.nginx.com/ "NGINX's Homepage") as a web server. A Docker Compose file is also provided to allow this game to run in a Docker Compose environment or a Docker Swarm environment.

# What's in this game ?
This game is a platformer game where you control a character that desperately needs to pick up stars and jump on enemies. In this game, all levels are generated based on images.

# How levels are generated ?
The game loads all images of the levels. When the player load a level, the game scans this image pixel by pixel. It then placed all platforms, stars, enemies and the player.

# How can I add other levels ?
First you need to create a image. One pixel of the image corresponds to one block in the game. You can use differents colors for a pixel in the image :

## Blue Pixel
A blue pixel corresponds to the start position of the player. (Maximum 1 pixel).
## Black Pixel
A black pixel corresponds to a platform.

## Yellow Pixel
A yellow pixel corresponds to a star.

## Green Pixel
A green pixel corresponds to the start position of an enemy.

## Transparent Pixel
A transparent pixel will be ignored during the generation of the level.

/!\ **Make sure your image is an png file** /!\ (or change the code in ```Menu.js```)

Put your image in the ```assets``` folder. Then, in  ```Menu.js```, add the name of image in the array ```images```.

``` javascript
class MenuScene extends Phaser.Scene {
    constructor() {
        super({
            key: "MenuScene",
        });
        this.images = ["level_1", "level_2", "my_image"];
    }

    // Other functions here
}
```

That's all! Now, if your reload the page, you'll see that that a new level has been added to the **Choose Level** screen and, if you click on it, you'll be able to play your level.

# Copyrights Disclaimer
All musics in this game (**theme**, **victory_music** and **lose**) are free no-copyright musics from [**Bensound**](https://bensound.com "Bensound's Homepage"). I can't remember where I got all sounds effects but the **Coins** and **enemy_death** sounds are from **Mario**, the **death** sound is from **Mortal Kombat** and the **victory** sound is from **Final Fantasy VII**. The player's spritesheet, the bomb and the star are from this [tutorial](https://phaser.io/tutorials/making-your-first-phaser-3-game/part1 "Tutorial's link") made by **Phaser**. The background image is from [OpenGameart](https://opengameart.org/content/backgrounds-for-2d-platformers "OpenGameart's page") and all platforms image are from **Internet** (I can't be more precise). All defaults levels are made by me. You can use them as you want.
