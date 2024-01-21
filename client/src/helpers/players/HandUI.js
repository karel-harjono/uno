import Card from "../cards/Card";

export default class HandUI {
  constructor(scene) {
    this.render = (x, y, rotate) => {
      // players cards
      // const playerPlayableCards = scene.players[scene.socket.id].cards || [];
      const playerPlayableCards = [
        "red-1",
        "red-2",
        "red-3",
        "red-4",
        "red-5",
        "red-2",
        "red-3",
        "red-4",
        "red-5",
        "red-2",
        "red-3",
        "red-4",
        "red-5",
        "red-2",
        "red-3",
        "red-4",
        "red-5",
        "red-2",
        "red-3",
        "red-4",
        "red-5",
      ];
      this.cardsContainer = scene.add.container(
        scene.cameras.main.centerX,
        scene.cameras.main.height - 100
      );

      this.displayPlayerCards(playerPlayableCards);
    };

    this.displayPlayerCards = (playerPlayableCards) => {
      // Clear existing cards from the container
      this.cardsContainer.removeAll(true);

      const cardWidth = 80; // Adjust as per your card sprite
      const cardSpacing = -60; // Space between cards
      let totalWidth =
        (cardWidth + cardSpacing) * playerPlayableCards.length - cardSpacing;

      playerPlayableCards.forEach((cardPath, index) => {
        const cardX = index * (cardWidth + cardSpacing) - totalWidth / 2;
        const card = new Card(scene, cardX, 0, cardPath, true);
        this.cardsContainer.add(card);
      });

      // Center the container
      this.cardsContainer.x =
        scene.cameras.main.centerX - this.cardsContainer.width / 2;
    };
  }
}
