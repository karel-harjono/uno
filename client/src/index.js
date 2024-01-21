import Phaser from "phaser";
import Game from "./scenes/game";

const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  scale: {
    mode: Phaser.Scale.FIT,
    parent: "game-container",
    autoCenter: Phaser.Scale.CENTER_BOTH,
    backgroundColor: "#ffffff",
    width: window.innerWidth,
    height: window.innerHeight,
  },
  scene: [Game],
};

const game = new Phaser.Game(config);
