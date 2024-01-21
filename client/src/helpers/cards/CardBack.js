import constants from "../../constants";
import Card from "./Card";

export default class CardBack extends Card {
  constructor(scene) {
    super(scene);
    this.cardData = {
      color: null,
      number: null,
      special: null,
      cardPath: constants.CARD_BACK_PATH,
    };
  }
}
