export default class InteractivityHandler {
  constructor(scene) {
    console.log("InteractivityHandler", scene.drawCardPileSprite);

    // scene.drawCardPileSprite
    scene.drawCardPileSprite.on("pointerdown", () => {
      console.log("drawCardPileSprite pointerdown");
      scene.socket.emit("drawCard", scene.socket.id);
      scene.drawCardPileSprite.disableInteractive();

      scene.tweens.add({
        targets: scene.drawCardPileSprite,
        scaleX: 0.2,
        scaleY: 0.2,
        duration: 300,
        ease: "Power1",
      });
    });

    scene.drawCardPileSprite.on("pointerover", () => {
      scene.tweens.add({
        targets: scene.drawCardPileSprite,
        scaleX: 0.25,
        scaleY: 0.25,
        duration: 300,
        ease: "Power1",
      });
    });

    scene.drawCardPileSprite.on("pointerout", () => {
      scene.tweens.add({
        targets: scene.drawCardPileSprite,
        scaleX: 0.2,
        scaleY: 0.2,
        duration: 300,
        ease: "Power1",
      });
    });

    scene.input.on("dragstart", (pointer, gameObject) => {
      gameObject.setTint(0x777777);
      scene.children.bringToTop(gameObject);
    });

    scene.input.on("drag", (pointer, gameObject, dragX, dragY) => {
      gameObject.x = dragX;
      gameObject.y = dragY;
    });

    scene.input.on("dragend", (pointer, gameObject, dropped) => {
      gameObject.setTint();
      if (!dropped) {
        gameObject.x = gameObject.input.dragStartX;
        gameObject.y = gameObject.input.dragStartY;
      }
    });

    scene.input.on("drop", (pointer, gameObject, dropZone) => {
      const cardDropped = gameObject.data.values.cardData;

      dropZone.data.values.cards.push(gameObject);
      gameObject.x = dropZone.x;
      gameObject.y = dropZone.y;
      scene.input.setDraggable(gameObject, false);
      console.log();
      scene.socket.emit(
        "cardPlayed",
        gameObject.data.values.cardPath,
        scene.socket.id
      );
    });
  }
}
