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

const rooms = {};

io.on("connection", (socket) => {
  console.log("a user connected: ", socket.id);

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("createRoom", (roomName, playerName, cb) => {
    if (rooms[roomName]) {
      cb(constants.RESPONSE_STATUS.FAILURE);
      return;
    }
    socket.join(roomName);
    rooms[roomName] = {
      players: {
        [playerName]: {
          id: socket.id,
          name: playerName,
          cards: [],
        },
      },
      turnCount: 0,
      roomMaster: socket.id,
    };
    cb(constants.RESPONSE_STATUS.SUCCESS);
    console.log(`User ${socket.id}:${playerName} created room ${roomName}`);
    console.log("Rooms: ", rooms);
  });

  socket.on("joinRoom", (roomName, playerName, cb) => {
    if (!rooms[roomName]) {
      cb(constants.RESPONSE_STATUS.FAILURE);
      return;
    }
    io.to(roomName).emit("playerJoined", socket.id);
    socket.join(roomName);
    rooms[roomName].players[playerName] = {
      id: socket.id,
      name: playerName,
      cards: [],
    };
    cb("joinRoom success");
    console.log(`User ${socket.id}:${playerName} joined room ${roomName}`);
    console.log("Rooms: ", rooms);
  });

  socket.on("startGameAnnounce", (roomName) => {
    console.log("Start game in room: ", roomName);
    const room = rooms[roomName];
    if (!room) {
      console.error("Room not found:", roomName);
      return;
    }

    // Dealing cards to each player in the room
    Object.keys(room.players).forEach((playerName) => {
      const player = room.players[playerName];
      const playerCards = shuffle.pick(constants.CARDS, { picks: 5 });
      player.cards = playerCards;
      console.log(player);

      // Emitting 'startGame' event to each player with their cards
      io.to(player.id).emit("startGame", playerCards);
    });
  });

  socket.on("leaveRoom", (roomName) => {
    socket.leave(roomName);
    rooms[roomName] = rooms[roomName].filter((id) => id !== socket.id);
    if (rooms[roomName].length === 0) {
      delete rooms[roomName];
    }
    io.to(roomName).emit("playerLeft", roomName);
  });

  socket.on("startGame", (roomName) => {});

  socket.on("drawCard", (socketId) => {
    const randomCard = shuffle.pick(constants.CARDS);
    console.log(`drawing card ${randomCard} for ${socketId}`);
    io.to(socketId).emit("drawCard", randomCard);
  });
});
