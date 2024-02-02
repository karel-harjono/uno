import constants from "../constants";

// create a constant for the player positions(coordinate) depending on the number of players in the game
const playerPositions = {
  2: [],
};

export default class GameHandler {
  constructor(scene) {
    this.scene = scene;
    scene.gameState = {
      roomName: scene.roomName,
      username: scene.username,
      gameStatus: undefined,
      turnCount: 0,
      myHand: [],
      otherPlayers: {},
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

  createRoom = (roomName, username) => {
    return new Promise((resolve, reject) => {
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
          resolve(res); // Resolve the promise successfully
        } else {
          console.log(`${roomName} already exists`);
          reject(res); // Reject the promise with the response
        }
      });
    });
  };

  joinRoom = (roomName, username) => {
    return new Promise((resolve, reject) => {
      this.scene.socket.emit("joinRoom", roomName, username, (response) => {
        if (response === constants.RESPONSE_STATUS.NOT_FOUND) {
          console.log(
            `ERROR in joinRoom: ${response}, Room: ${roomName} not found`
          );
          reject(response); // Reject the promise
        } else {
          this.scene.gameState.roomName = roomName;
          this.scene.gameState.username = username;
          this.scene.gameState.gameStatus = constants.GAME_STATUS.WAITING;
          console.log(
            `${this.scene.gameState.username} joined room ${this.scene.gameState.roomName}, callback: ${response}`
          );
          resolve(response); // Resolve the promise
        }
      });
    });
  };

  addOtherPlayer = (playerId) => {
    this.scene.gameState.otherPlayers[playerId] = {
      id: playerId,
      cardCount: undefined,
      turnId: undefined,
    };
  };

  dealCards = (cards) => {
    const cardCount = cards.length;
    this.scene.gameState.myHand = cards;
    this.scene.player1.drawCard(cards);
    Object.keys(this.scene.gameState.otherPlayers).forEach((player) => {
      this.scene.gameState.otherPlayers[player].drawCard(player.cardCount);
    });
  };
}
