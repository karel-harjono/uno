import constants from "../../constants";
import Card from "../cards/Card";
import CardBack from "../cards/CardBack";
import Player from "./Player";

export default class Enemy extends Player {
  constructor(scene, x, y, rotate) {
    super(scene, x, y);
    this.rotate = rotate;
    this.cardSpacing = 10;
  }

  addCard(cardData) {
    if (cardData instanceof Array) {
      for (let i = 0; i < cardData.length; i++) {
        this.addCard(cardData[i]);
      }
    } else {
      const cardX = this.calculateCardX(this.cards.length);
      const cardY = this.y; // Y position for the cards
      const card = new CardBack(this.scene, cardX, cardY, this.rotate);
      this.cards.push(card);
      this.renderCards(); // Adjust positions of all cards
    }
    console.log("player cards: ", this.cards);
  }

  playCard(dropZone) {
    if (this.cards.length > 0) {
      const card = this.cards.pop();
      this.scene.tweens.add({
        targets: card,
        x: dropZone.x,
        y: dropZone.y,
        ease: "Power1",
        duration: 300,
        onComplete: () => {},
      });
      this.renderCards();
    }
  }
}
