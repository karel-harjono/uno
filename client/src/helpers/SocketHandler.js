import io from "socket.io-client";
import constants from "../constants";

export default class SocketHandler {
  static instance = null;

  constructor(scene) {
    this.scene = scene;
    if (SocketHandler.instance) {
      scene.socket = SocketHandler.instance;
      return;
    }

    // scene.socket = io("http://143.198.33.208:3000");
    scene.socket = io("https://143.198.33.208:443");
    this.setupSocketListeners(scene.socket);
    SocketHandler.instance = scene.socket;
  }

  setupSocketListeners(socket) {
    socket.on("connect", () => {
      console.log("connected to game server");
      socket.emit("joinGame", socket.id);
    });

    socket.on("drawCard", (cards) => {
      console.log("drawCard :", cards);
    });

    socket.on("playerJoined", (playerId) => {
      console.log("playerJoined :", playerId);
    });

    socket.on("startGame", (playerCards) => {
      console.log("startGame :", playerCards);
      console.log(this.scene);
      this.scene.GameHandler.dealCards(playerCards);
    });

    socket.on("firstTurn", () => {});

    socket.on("disconnect", () => {
      console.log("disconnected");
    });
  }

  startGame(roomName) {
    console.log("starting game");
    SocketHandler.instance.emit("startGame", roomName);
  }
}
