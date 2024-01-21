import Card from "../cards/Card";

export default class Player {
  constructor(scene, x, y, rotate) {
    this.scene = scene;
    this.x = x || scene.cameras.main.centerX; // Default to centerX if x is not provided
    this.y = y || scene.cameras.main.height - 200; // Default to a position near the bottom if y is not provided
    this.rotate = rotate || 0;
    this.cards = [];
    this.cardSpacing = 30; // Spacing between cards
  }

  addCard(cardData) {
    if (cardData instanceof Array) {
      for (let i = 0; i < cardData.length; i++) {
        this.addCard(cardData[i]);
      }
    } else {
      const cardX = this.calculateCardX(this.cards.length);
      const cardY = this.calculateCardY(this.cards.length); // Y position for the cards
      const card = new Card(
        this.scene,
        this,
        cardX,
        cardY,
        cardData,
        true,
        this.rotate
      );
      this.cards.push(card);
      this.renderCards(); // Adjust positions of all cards
    }
    console.log("player cards: ", this.cards);
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
      this.scene.tweens.add({
        targets: card,
        x: targetX,
        y: targetY,
        duration: 300,
        ease: "Power1",
      });
      card.depth = this.cards.length - index + 1;
      card.startingZ = card.depth;
      console.log("render cards: ", targetX);
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
