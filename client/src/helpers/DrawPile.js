import Card from "./cards/Card";
import CardBack from "./cards/CardBack";

export default class DrawPile extends Phaser.GameObjects.Image {
  constructor(scene, x, y) {
    super(scene, x, y, "card-back");
    this.x = x;
    this.y = y;
    this.setScale(0.2);

    if (scene.socket.id === scene.currentPlayer) {
      this.setInteractive();
    } else {
      this.disableInteractive();
    }

    this.setInteractive(); // DELETE THIS LATER

    this.on("pointerdown", () => {
      scene.player1.drawCard();
      // scene.socket.emit("drawCard");
    });
    scene.add.existing(this);
  }
}
