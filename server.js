const server = require("express")();
const cors = require("cors");
const shuffle = require("shuffle-array");
const constants = require("./constants");
const http = require("http").createServer(server);
const io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:8080",
    method: ["GET", "POST"],
  },
});

http.listen(3000, () => {
  console.log("game server is listening on localhost:3000");
});

io.on("connection", (socket) => {
  console.log("a user connected: ", socket.id);

  // for testing join room1 by default
  const roomName = "room1";
  socket.join(roomName);
  console.log(`user ${socket.id} joined room ${roomName}`);

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  const rooms = {
    room1: {
      players: {
        player1: {
          id: socket.id,
          name: "player1",
          cards: [],
        },
        player2: {
          id: socket.id,
          name: "player2",
          cards: [],
        },
      },
      turnCount: 0,
    },
  };

  socket.on("joinRoom", (roomName) => {
    socket.join(roomName);
    if (rooms[roomName]) {
      rooms[roomName].push(socket.id);
    } else {
      rooms[roomName] = [socket.id];
    }
    io.to(roomName).emit("playerJoined", socket.id);
  });

  socket.on("leaveRoom", (roomName) => {
    socket.leave(roomName);
    rooms[roomName] = rooms[roomName].filter((id) => id !== socket.id);
    if (rooms[roomName].length === 0) {
      delete rooms[roomName];
    }
    io.to(roomName).emit("playerLeft", roomName);
  });

  socket.on("drawCard", (socketId) => {
    const randomCard = shuffle.pick(constants.CARDS);
    console.log(`drawing card ${randomCard} for ${socketId}`);
    io.to(socketId).emit("drawCard", randomCard);
  });
});
