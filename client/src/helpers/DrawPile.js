import Card from "./cards/Card";
import CardBack from "./cards/CardBack";

export default class DrawPile extends Phaser.GameObjects.Image {
  constructor(scene, x, y) {
    super(
      scene,
      scene.sys.game.config.width / 2 + 200,
      scene.sys.game.config.height / 2,
      "card-back"
    );
    this.setScale(0.2);

    if (scene.socket.id === scene.currentPlayer) {
      this.setInteractive();
    } else {
      this.disableInteractive();
    }

    this.setInteractive(); // DELETE THIS LATER

    this.on("pointerdown", () => {
      console.log("draw pile clicked");
      scene.player1.drawCard();
      // scene.socket.emit("drawCard");
    });
    scene.add.existing(this);
  }
}
