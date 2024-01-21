import CardHandler from "../helpers/CardHandler";
import DeckHandler from "../helpers/DeckHandler";
import GameHandler from "../helpers/GameHandler";
import SocketHandler from "../helpers/SocketHandler";
// import InteractivityHandler from "../helpers/InteractivityHandler";
// import PlayerHandler from "../helpers/PlayerHandler";
// import TableHandler from "../helpers/TableHandler";
import UIHandler from "../helpers/UIHandler";

import Constants from "../constants";

export default class Game extends Phaser.Scene {
  constructor() {
    super({
      key: "Game",
    });
  }

  preload() {
    const basePath = "assets/cards/";
    this.allPossibleCards = this._getAllPossibleCards();
    for (let cardPath of this.allPossibleCards) {
      this.load.image(cardPath, `${basePath}${cardPath}.png`);
    }
    console.log("this.allPossibleCards: ", this.allPossibleCards);
    console.log("CARD IMAGES IS LOADED");
  }

  create() {
    this.cardHandler = new CardHandler(this);
    this.deckHandler = new DeckHandler(this);
    this.GameHandler = new GameHandler(this);
    this.SocketHandler = new SocketHandler(this);
    this.UIHandler = new UIHandler(this);
    this.UIHandler.buildUI();

    // this.InteractivityHandler = new InteractivityHandler(this);
  }

  update() {}

  _getAllPossibleCards() {
    const cardPaths = [];
    for (let color of Constants.CARDS.COLORS) {
      for (let special of Constants.CARDS.SPECIALS) {
        cardPaths.push(`${color}-${special}`);
      }
      for (let number = 1; number <= 9; number++) {
        cardPaths.push(`${color}-${number}`);
      }
    }
    cardPaths.push("wild");
    cardPaths.push("wild-plus-4");
    cardPaths.push("card-back");
    return cardPaths;
  }
}
