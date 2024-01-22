import DeckHandler from "./DeckHandler";
import DrawPile from "./DrawPile";
import ZoneHandler from "./ZoneHandler";
import Card from "./cards/Card";
import Enemy from "./players/Enemy";
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

    this.buildDrawCardPile = () => {
      scene.drawPile = new DrawPile(
        scene,
        this.DRAW_PILE_LOCATION[0],
        this.DRAW_PILE_LOCATION[1]
      );
    };

    this.buildPlayerAreas = () => {
      this.zoneHandler.renderPlayerHandArea1();
      this.zoneHandler.renderPlayerHandArea2();
    };

    this.buildUI = () => {
      scene.player1 = new Player(scene);
      scene.player1.addCard(["red-1", "red-2", "red-3", "red-4", "red-5"]);
      scene.enemy1 = new Player(scene, {
        x: scene.cameras.main.centerX,
        y: scene.cameras.main.centerY - 220,
        rotate: 180,
        isEnemy: true,
        startingHand: ["blue-1", "blue-2", "blue-3", "blue-4", "blue-5"],
      });
      scene.enemy2 = new Player(scene, {
        x: scene.cameras.main.centerX - 300,
        y: scene.cameras.main.centerY,
        rotate: 90,
        isEnemy: true,
        startingHand: ["blue-1", "blue-2", "blue-3", "blue-4", "blue-5"],
      });
      scene.enemy3 = new Player(scene, {
        x: scene.cameras.main.centerX + 350,
        y: scene.cameras.main.centerY,
        rotate: 270,
        isEnemy: true,
        startingHand: ["blue-1", "blue-2", "blue-3", "blue-4", "blue-5"],
      });
      // scene.enemy1.drawCard();
      // scene.enemy2.drawCard();
      // scene.enemy3.drawCard();
      this.buildDrawCardPile();

      this.buildZone();
    };
  }
}
