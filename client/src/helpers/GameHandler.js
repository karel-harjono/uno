import constants from "../constants";

export default class GameHandler {
  constructor(scene) {
    this.scene = scene;
    scene.gameState = {
      roomName: scene.roomName,
      username: scene.username,
      gameStatus: undefined,
      turnCount: 0,
      myHand: [],
      playerIds: undefined,
      opponentHandCounts: undefined,
      discardPile: undefined,
    };

    this.scene.gameState.username = scene.username;

    this.endTurn = () => {
      this.isMyTurn = false;
      this.turnCount++;
    };

    this.setGameState = (newGameState) => {
      this.gameState = newGameState;
    };
  }

  roomMasterAnnounceStart = () => {
    console.log("roomMasterAnnounceStart");
    this.scene.socket.emit("startGameAnnounce", this.scene.gameState.roomName);
  };

  startGame = () => {
    if (typeof this.scene.gameState.gameStatus === "undefined") return;
    this.scene.gameState.gameStatus = "started";
    this.scene.socket.emit("startGame", this.scene.gameState.roomName);
    console.log(
      "Starting game, emitting startGame with roomName: ",
      this.scene.gameState.roomName
    );
  };

  createRoom = (roomName, username) => {
    console.log("creating room");
    this.scene.socket.emit("createRoom", roomName, username, (res) => {
      if (res === constants.RESPONSE_STATUS.SUCCESS) {
        console.log(
          `create room ${roomName} success by roomMaster ${username}`
        );
        this.scene.gameState.roomName = roomName;
        this.scene.gameState.username = username;
        this.scene.gameState.gameStatus = constants.GAME_STATUS.WAITING;
        console.log(this.scene.gameState);
      } else {
        console.log(`${roomName} already exists`);
      }
    });
  };

  joinRoom = (roomName) => {
    this.scene.socket.emit(
      "joinRoom",
      this.scene.gameState.roomName,
      this.scene.gameState.username,
      (response) => {
        this.scene.gameState.roomName = roomName;
        this.scene.gameState.gameStatus = constants.GAME_STATUS.WAITING;
        console.log(
          `${this.scene.gameState.username} joined room ${this.scene.gameState.roomName}`
        );
      }
    );
  };

  dealCards = (cards) => {
    this.scene.player1.drawCard(cards);
  };
}
