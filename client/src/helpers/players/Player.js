import Card from "../cards/Card";

export default class Player {
  constructor(scene) {
    this.scene = scene;
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
      const cardY = this.scene.cameras.main.height - 200; // Y position for the cards
      const card = new Card(this.scene, cardX, cardY, cardData, true);
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
      card.startingX = targetX; // Update the starting X position of the card
      this.scene.tweens.add({
        targets: card,
        x: targetX,
        duration: 300,
        ease: "Power1",
      });
      card.depth = this.cards.length - index + 1;
      card.startingZ = card.depth;
      console.log("render cards: ", targetX);
    });
  }

  calculateCardX(index) {
    // Calculate the X position for each card based on its index
    const totalWidth = this.cards.length * this.cardSpacing;
    const centerX = this.scene.cameras.main.centerX;
    return centerX - totalWidth / 2 + index * this.cardSpacing;
  }
}
