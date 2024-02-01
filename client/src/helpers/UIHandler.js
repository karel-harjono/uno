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

    this.createLoginForm = () => {
      // Center position
      const centerX = scene.cameras.main.centerX;
      const centerY = scene.cameras.main.centerY;

      // Create a container for the form
      const formContainer = scene.add.container(centerX, centerY).setDepth(1);

      // Card background with elevated effect
      const cardBackground = scene.add
        .rectangle(0, 40, 320, 280, 0xffffff)
        .setStrokeStyle(2, 0x000000);
      formContainer.add(cardBackground);

      // Username Label and Input
      const usernameLabel = scene.add.text(-140, -80, "Username:", {
        font: "18px Arial",
        color: "#000",
      });
      const usernameInput = scene.add.dom(0, -50, "input", {
        type: "text",
        name: "username",
        placeholder: "Username",
        "font-size": "16px",
        padding: "10px",
        margin: "10px",
        width: "200px",
      });
      formContainer.add(usernameLabel);
      formContainer.add(usernameInput);

      // Room Name Label and Input (only if roomNameFromURL is null)
      let roomNameInput;
      if (!scene.roomNameFromURL) {
        const roomNameLabel = scene.add.text(-140, -10, "Room Name:", {
          font: "18px Arial",
          color: "#000",
        });
        roomNameInput = scene.add.dom(0, 20, "input", {
          type: "text",
          name: "roomName",
          placeholder: "Room Name",
          "font-size": "16px",
          padding: "10px",
          margin: "10px",
          width: "200px",
        });
        formContainer.add(roomNameLabel);
        formContainer.add(roomNameInput);
      }

      // Create Room Button
      const createRoomButton = scene.add.dom(
        0,
        100,
        "button",
        {
          "font-size": "18px",
          padding: "10px",
          margin: "10px",
          width: "200px",
        },
        !!scene.roomNameFromURL ? "Join Room" : "Create Room"
      );
      formContainer.add(createRoomButton);

      // Button Event Listener
      createRoomButton.addListener("click");
      createRoomButton.on("click", () => {
        const username = usernameInput.node.value;
        const roomName =
          scene.roomNameFromURL ||
          (roomNameInput ? roomNameInput.node.value : "");
        if (username !== "" && roomName !== "") {
          const error = startGame(username, roomName);
        } else {
          // Handle empty input fields
        }
      });

      const startGame = async (username, roomName) => {
        try {
          let error;
          if (!scene.roomNameFromURL) {
            await scene.GameHandler.createRoom(roomName, username);
          } else {
            await scene.GameHandler.joinRoom(roomName, username);
          }
          formContainer.destroy();
          scene.UIHandler.buildUI();
        } catch (error) {
          console.log("startGame catch ERROR: ", error);
        }
      };
    };

    this.buildStartGameButton = () => {
      const endX = scene.cameras.main.width;
      const centerY = scene.cameras.main.centerY;
      // create start game button with phaser text
      const startGameButton = scene.add
        .text(endX - 200, 200, "Start Game", {
          font: "24px Arial",
          color: "#fff",
        })
        .on("pointerdown", () => {
          scene.GameHandler.roomMasterAnnounceStart();
          startGameButton.destroy();
        });
      startGameButton.setInteractive();
    };

    this.buildUI = () => {
      this.buildDrawCardPile();
      this.buildStartGameButton();
      // scene.player1 = new Player(scene);
      // scene.player1 = new Player(scene);
      // scene.player1.drawCard(["red-1", "red-2", "red-3", "red-4", "red-6"]);
      // scene.enemy1 = new Player(scene, {
      //   x: scene.cameras.main.centerX,
      //   y: scene.cameras.main.centerY - 220,
      //   rotate: 180,
      //   isEnemy: true,
      //   startingHand: ["blue-1", "blue-2", "blue-3", "blue-4", "blue-5"],
      // });
      // scene.enemy2 = new Player(scene, {
      //   x: scene.cameras.main.centerX - 300,
      //   y: scene.cameras.main.centerY,
      //   rotate: 90,
      //   isEnemy: true,
      //   startingHand: ["blue-1", "blue-2", "blue-3", "blue-4", "blue-5"],
      // });
      // scene.enemy3 = new Player(scene, {
      //   x: scene.cameras.main.centerX + 350,
      //   y: scene.cameras.main.centerY,
      //   rotate: 270,
      //   isEnemy: true,
      //   startingHand: ["blue-1", "blue-2", "blue-3", "blue-4", "blue-5"],
      // });
      // scene.enemy1.drawCard();
      // scene.enemy2.drawCard();
      // scene.enemy3.drawCard();

      this.buildZone();
    };
  }
}
