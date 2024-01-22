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

  drawCard() {
    // Select a random card from all possible cards
    const randomCardData = Phaser.Utils.Array.GetRandom(constants.CARDS.ALL);
    console.log("random card is drawn: ", randomCardData);

    // Calculate the position of the draw pile
    const drawPileX = this.scene.sys.game.config.width / 2 + 200;
    const drawPileY = this.scene.sys.game.config.height / 2;

    // Create a new card at the draw pile position
    let card;
    if (this.isEnemy) {
      card = new CardBack(this.scene, drawPileX, drawPileY, this.rotate);
    } else {
      card = new Card(
        this.scene,
        this,
        drawPileX,
        drawPileY,
        randomCardData,
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
