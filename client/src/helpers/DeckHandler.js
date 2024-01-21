import Card from "./cards/Card";
import CardBack from "./cards/CardBack";

export default class DeckHandler {
  constructor(scene) {
    this.dealCard = (x, y, cardData, isPlayerCard) => {
      const randomCardPath =
        scene.allPossibleCards[
          Math.floor(Math.random() * scene.allPossibleCards.length)
        ];

      let card;
      if (isPlayerCard) {
        card = new Card(scene).render(x, y, cardData, isPlayerCard);
      } else {
        card = new CardBack(scene).render(x, y, cardData, isPlayerCard);
      }
      return card;
    };
  }
}
