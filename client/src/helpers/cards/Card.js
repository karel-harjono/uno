export default class Card extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, cardData, inHands) {
    super(scene, x, y, cardData);
    scene.add.existing(this);
    console.log("card rendering: ", cardData);
    // Initialize the sprite
    this.startingX = x;
    this.startingY = y;
    this.startingZ = parseInt(this.depth);
    this.setScale(0.2);
    this.setData("card", cardData);
    console.log("startingZ: ", this.startingZ);

    if (inHands) {
      this.enableDragAndDrop(scene);
    }
  }

  enableDragAndDrop = (scene) => {
    const hoverOffset = 20;

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
      console.log("dragZ: ", this.depth);
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
          ease: "Power1",
          duration: 100,
          onComplete: () => {
            scene.socket.emit(
              "cardPlayed",
              this.getData("card"),
              scene.socket.id
            );
            // TODO: CONTINUE THIS, optimize to only keep the top of the discard pile
            scene.player1.removeCard(this);
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

    // Drop event
    // this.on("drop", (pointer, dropZone) => {
    //   this.clearTint();
    //   this.disableInteractive();
    //   dropZone.data.values.cards.push(this);
    //   scene.tweens.add({
    //     targets: this,
    //     x: this.scene.dropZone.x,
    //     y: this.scene.dropZone.y,
    //     ease: "Power1",
    //     duration: 300,
    //     onComplete: () => {},
    //   });
    //   scene.socket.emit("cardPlayed", this.getData("card"), scene.socket.id);
    //   console.log("card played: ", this.getData("card"));
    // });
  };
}
