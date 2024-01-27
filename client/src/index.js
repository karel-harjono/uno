import Phaser from "phaser";
import Game from "./scenes/Game";
import WelcomeScene from "./scenes/WelcomeScene";

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
  dom: {
    createContainer: true,
  },
  scene: [WelcomeScene, Game],
};

const game = new Phaser.Game(config);
