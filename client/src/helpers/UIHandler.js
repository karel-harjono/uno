import DeckHandler from "./DeckHandler";
import DrawPile from "./DrawPile";
import ZoneHandler from "./ZoneHandler";
import Card from "./cards/Card";
import HandUI from "./players/HandUI";
import Player from "./players/Player";

export default class UIHandler {
  constructor(scene) {
    this.DRAW_PILE_LOCATION = [
      scene.sys.game.config.width / 2 + 200,
      scene.sys.game.config.height / 2,
    ];

    this.zoneHandler = new ZoneHandler(scene);

    this.buildZone = () => {
      scene.dropZone = this.zoneHandler.renderDropZone();
      this.zoneHandler.renderOutline(scene.dropZone);
    };

    this.buildDrawCardPileSprite = () => {
      new DrawPile(
        scene,
        this.DRAW_PILE_LOCATION[0],
        this.DRAW_PILE_LOCATION[1]
      );
    };

    this.buildCardPileSprite = () => {
      const cardPath = "red-skip";
      scene.cardPile = new Card(scene, 0, 0, cardPath, true);
      scene.cardPileSprite = scene.add
        .image(
          scene.sys.game.config.width / 2 - 50,
          scene.sys.game.config.height / 2,
          cardPath
        )
        .setScale(0.2)
        .setData({
          cardPath: cardPath,
        });
    };

    this.buildPlayerAreas = () => {
      this.zoneHandler.renderPlayerHandArea1();
      this.zoneHandler.renderPlayerHandArea2();
    };

    this.buildUI = () => {
      // this.buildGameText();
      this.buildDrawCardPileSprite();
      this.buildCardPileSprite();
      this.buildZone();
      // new DeckHandler(scene).drawCard();
      this.buildPlayerAreas();

      // new HandUI(scene).render(
      //   scene.sys.game.config.width / 2,
      //   scene.sys.game.config.height - 100,
      //   0
      // );

      scene.player1 = new Player(scene, true);
      scene.player1.addCard(["red-1", "red-2", "red-3", "red-4", "red-5"]);
    };
  }
}
