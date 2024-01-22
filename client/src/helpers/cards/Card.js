export default class Card extends Phaser.GameObjects.Sprite {
  constructor(scene, player, x, y, cardData, inHands, rotate = 0) {
    super(scene, x, y, cardData);
    scene.add.existing(this);
    this.player = player;
    this.startingX = x;
    this.startingY = y;
    this.startingZ = parseInt(this.depth);
    this.setScale(0.3);
    this.setData("card", cardData);
    this.angle = rotate;

    if (inHands) {
      this.enableDragAndDrop(scene);
    }
  }

  enableDragAndDrop = (scene) => {
    const hoverOffset = 40;

    this.setInteractive();
    scene.input.setDraggable(this);

    this.on("pointerover", () => {
      scene.tweens.add({
        targets: this,
        y: this.y - hoverOffset,
        duration: 100,
        ease: "Power1",
      });
    });

    this.on("pointerout", () => {
      this.depth = this.startingZ;
      scene.tweens.add({
        targets: this,
        x: this.startingX,
        y: this.startingY,
        duration: 200,
        ease: "Power1",
      });
    });

    this.on("dragstart", (pointer) => {
      this.setTint(0x777777);
      scene.children.bringToTop(this);
    });

    this.on("drag", (pointer, dragX, dragY) => {
      this.x = dragX;
      this.y = dragY;
    });

    this.on("dragend", (pointer, endX, endY, dropped) => {
      this.clearTint();
      if (dropped) {
        this.disableInteractive();
        scene.tweens.add({
          targets: this,
          x: this.scene.dropZone.x,
          y: this.scene.dropZone.y,
          scale: 0.2,
          ease: "Power1",
          duration: 100,
          onComplete: () => {
            scene.socket.emit(
              "cardPlayed",
              this.getData("card"),
              scene.socket.id
            );
            // TODO: CONTINUE THIS, optimize to only keep the top of the discard pile
            this.player.removeCard(this);
            console.log(
              "dropZone cards before: ",
              scene.dropZone.getData("cards")
            );
            scene.dropZone.putCard(this);
            console.log(
              "dropZone cards after: ",
              scene.dropZone.getData("cards")
            );
          },
        });
      } else {
        this.disableInteractive();
        this.depth = this.startingZ;
        scene.tweens.add({
          targets: this,
          x: this.startingX,
          y: this.startingY,
          ease: "Power1",
          duration: 300,
          onComplete: () => {
            this.setInteractive();
          },
        });
      }
    });
  };
}
