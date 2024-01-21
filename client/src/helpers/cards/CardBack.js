export default class CardBack extends Phaser.GameObjects.Image {
  constructor(scene, x, y, rotate) {
    super(scene, x, y, "card-back");
    this.setScale(0.2);
    this.setData("card", "card-back");
    this.angle = rotate;
    scene.add.existing(this);
  }
}
