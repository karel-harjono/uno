import Card from "../cards/Card";
import CardBack from "../cards/CardBack";
import constants from "../../constants";

export default class Player {
  constructor(
    scene,
    { x, y, rotate = 0, isEnemy = false, startingHand = [] } = {}
  ) {
    this.scene = scene;
    this.x = x || scene.cameras.main.centerX;
    this.y = y || scene.cameras.main.height - 200;
    this.rotate = rotate;
    this.isEnemy = isEnemy;
    this.cards = [];
    this.cardSpacing = isEnemy ? 10 : 30;
    if (startingHand.length > 0) {
      this.addCard(startingHand);
    }
  }

  drawCard(cards) {
    if (typeof cards === "undefined") {
      cards = [Phaser.Utils.Array.GetRandom(constants.CARDS.ALL)];
    }
    // if cards is an integer, draw that many "back of card" cards
    if (typeof cards === "number") {
      cards = new Array(cards).fill(constants.CARDS.BACK);
    }

    // Create a new card at the draw pile position
    for (let i = 0; i < cards.length; i++) {
      let card;
      if (this.isEnemy) {
        card = new CardBack(this.scene, drawPileX, drawPileY, this.rotate);
      } else {
        card = new Card(
          this.scene,
          this,
          this.scene.drawPile.x,
          this.scene.drawPile.y,
          cards[i],
          true
        );
      }
      card.depth = this.cards.length;
      this.cards.push(card);

      // Tween the card from the draw pile to the next hand position
      const nextHandPositionX = this.calculateCardX(this.cards.length - 1);
      card.disableInteractive();
      this.scene.tweens.add({
        targets: card,
        x: nextHandPositionX,
        y: this.y, // The y position of the player's hand
        ease: "Power1",
        duration: 300,
        onComplete: () => {
          this.renderCards(); // Adjust all card positions after the new card is added
          card.setInteractive();
        },
      });
    }
  }

  addCard(cardData) {
    if (cardData instanceof Array) {
      for (let i = 0; i < cardData.length; i++) {
        this.addCard(cardData[i]);
      }
    } else {
      const cardX = this.calculateCardX(this.cards.length);
      const cardY = this.calculateCardY(this.cards.length); // Y position for the cards
      let card;
      if (this.isEnemy) {
        card = new CardBack(this.scene, cardX, cardY, this.rotate);
      } else {
        card = new Card(
          this.scene,
          this,
          cardX,
          cardY,
          cardData,
          true,
          this.rotate
        );
      }

      this.cards.push(card);
      this.renderCards(); // Adjust positions of all cards
    }
  }

  removeCard(card) {
    const index = this.cards.indexOf(card);
    if (index !== -1) {
      this.cards.splice(index, 1);
      // card.destroy(); // Remove the card
      this.renderCards(); // Adjust positions of remaining cards
    }
  }

  renderCards() {
    this.cards.forEach((card, index) => {
      const targetX = this.calculateCardX(index);
      const targetY = this.calculateCardY(index);
      card.startingX = targetX; // Update the starting X position of the card
      card.startingY = targetY;
      card.depth = index;
      card.startingZ = card.depth;
      card.disableInteractive();
      this.scene.tweens.add({
        targets: card,
        x: targetX,
        y: targetY,
        duration: 200,
        ease: "Power1",
        onComplete: () => {
          card.setInteractive();
        },
      });
    });
  }

  calculateCardX(index) {
    if (this.rotate === 90 || this.rotate === 270) {
      return this.x;
    }
    const totalWidth = this.cards.length * this.cardSpacing;
    return this.x - totalWidth / 2 + index * this.cardSpacing;
  }
  calculateCardY(index) {
    if (this.rotate === 180 || this.rotate === 0) {
      return this.y;
    }
    const totalHeight = this.cards.length * this.cardSpacing;
    return this.y - totalHeight / 2 + index * this.cardSpacing;
  }
}
