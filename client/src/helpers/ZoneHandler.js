export default class ZoneHandler {
  constructor(scene) {
    this.renderDropZone = () => {
      const width = 300;
      const height = 180;
      let dropZone = scene.add
        .zone(
          scene.sys.game.config.width / 2,
          scene.sys.game.config.height / 2,
          width,
          height
        )
        .setRectangleDropZone(width, height);
      dropZone.setData({ cards: [] });
      dropZone.putCard = (card) => {
        dropZone.data.values.cards.push(card);
        if (dropZone.data.values.cards.length > 1) {
          dropZone.data.values.cards[0].destroy();
          dropZone.data.values.cards.shift();
        }
      };

      return dropZone;
    };

    this.renderOutline = (dropZone) => {
      scene.add
        .graphics()
        .lineStyle(4, 0xff69b4)
        .strokeRect(
          dropZone.x - dropZone.input.hitArea.width / 2,
          dropZone.y - dropZone.input.hitArea.height / 2,
          dropZone.input.hitArea.width,
          dropZone.input.hitArea.height
        );
    };

    this.renderPlayerHandArea1 = () => {
      // Assuming you want to maintain the width and height of the rectangle
      const rectWidth = 800;
      const rectHeight = 180;

      // Calculate the x and y position
      // x is centered, and y is at the bottom minus half the height of the rectangle
      const x = scene.sys.game.config.width / 2;
      const y = scene.sys.game.config.height - rectHeight / 2 - 50;

      scene.playerHandAreas = scene.add
        .rectangle(x, y, rectWidth, rectHeight)
        .setStrokeStyle(4, 0xffffff);
    };

    this.renderPlayerHandArea2 = () => {
      // Assuming you want to maintain the width and height of the rectangle
      const rectWidth = 800;
      const rectHeight = 180;

      // Calculate the x and y position
      // x is centered, and y is at the bottom minus half the height of the rectangle
      const x = scene.sys.game.config.width / 2;
      const y = rectHeight / 2 + 100;

      scene.playerHandAreas = scene.add
        .rectangle(x, y, rectWidth, rectHeight)
        .setStrokeStyle(4, 0xffffff);
    };
  }
}
