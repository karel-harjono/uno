import CardHandler from "../helpers/CardHandler";
import DeckHandler from "../helpers/DeckHandler";
import GameHandler from "../helpers/GameHandler";
import SocketHandler from "../helpers/SocketHandler";
import Player from "../helpers/players/Player";
// import InteractivityHandler from "../helpers/InteractivityHandler";
// import PlayerHandler from "../helpers/PlayerHandler";
// import TableHandler from "../helpers/TableHandler";
import UIHandler from "../helpers/UIHandler";

import constants from "../constants";

export default class Game extends Phaser.Scene {
  constructor() {
    super({
      key: "Game",
    });
  }

  init(data) {
    this.cardHandler = new CardHandler(this);
    this.deckHandler = new DeckHandler(this);
    this.SocketHandler = new SocketHandler(this);
    this.GameHandler = new GameHandler(this);
    this.UIHandler = new UIHandler(this);
    this.player1 = new Player(this);
    this.GameHandler.createRoom(data.roomName, data.username);
  }

  preload() {
    const basePath = "assets/cards/";
    for (let cardPath of constants.CARDS.ALL) {
      this.load.image(cardPath, `${basePath}${cardPath}.png`);
    }
    this.load.image("card-back", `${basePath}${"card-back"}.png`);
  }

  create() {
    this.UIHandler.buildUI();

    // this.GameHandler.joinRoom(this.roomName);

    const startButton = this.add.text(100, 100, "Start Game!", {
      fill: "#0f0",
    });
    startButton.setInteractive();
    startButton.on("pointerdown", () => {
      this.GameHandler.roomMasterAnnounceStart();
    });
  }

  update() {}
}
