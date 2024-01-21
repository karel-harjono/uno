import io from "socket.io-client";

export default class SocketHandler {
  constructor(scene) {
    scene.socket = io("http://localhost:3000");

    scene.socket.on("connect", () => {
      console.log("connected");
      scene.socket.emit("joinGame", scene.socket.id);
    });

    scene.socket.on("drawCard", (cards) => {
      console.log("drawCard :", cards);
    });

    scene.socket.on("firstTurn", () => {});

    scene.socket.on("disconnect", () => {
      console.log("disconnected");
    });
  }
}
