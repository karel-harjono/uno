import CardHandler from "../helpers/CardHandler";
import DeckHandler from "../helpers/DeckHandler";
import GameHandler from "../helpers/GameHandler";
import SocketHandler from "../helpers/SocketHandler";
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

  preload() {
    const basePath = "assets/cards/";
    for (let cardPath of constants.CARDS.ALL) {
      this.load.image(cardPath, `${basePath}${cardPath}.png`);
    }
    this.load.image("card-back", `${basePath}${"card-back"}.png`);
  }

  create() {
    this.cardHandler = new CardHandler(this);
    this.deckHandler = new DeckHandler(this);
    this.GameHandler = new GameHandler(this);
    this.SocketHandler = new SocketHandler(this);
    this.UIHandler = new UIHandler(this);
    this.UIHandler.buildUI();
  }

  update() {}
}
