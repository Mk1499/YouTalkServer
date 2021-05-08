const ws = require("ws");

const socketRooms = {};
const audioRooms = {};

const webSocket = (socket) => {
  socket.on("message", (message) => {
    try {
      let msg = JSON.parse(message);
      eventHandler(msg, socket);
    } catch (err) {
      console.log("Err : ", err);
    }
  });
  socket.send(
    JSON.stringify({
      name: "welcome",
      payload: "Mohamed Khaled",
    })
  );
};

const eventHandler = (msg, socket) => {
  switch (msg.event) {
    case "joinRoom":
      joinRoom(msg.data.roomID, socket);
      break;
    case "newListener":
      newListener(msg.data.roomID, msg.data.peerID, socket);
      break;
    case "BCJoined":
      BCJoined(msg.data.roomID, socket);
  }
};

const joinRoom = (roomID, socket) => {
  if (socketRooms[roomID] && !socketRooms[roomID].includes(socket)) {
    socketRooms[roomID] = [...socketRooms[roomID], socket];
  } else if (!socketRooms[roomID]) {
    socketRooms[roomID] = [socket];
  }
  //   console.log("socketRooms Now : ", socketRooms);
};

const newListener = (roomID, peerID, userSocket) => {
  if (audioRooms[roomID] && !audioRooms[roomID].includes(peerID)) {
    let data = {
      peerID,
    };
    audioRooms[roomID] = [...audioRooms[roomID], peerID];
    broadCasting("newListener", data, socketRooms[roomID], userSocket);
  } else if (!audioRooms[roomID]) {
    audioRooms[roomID] = [peerID];
  }
  console.log("Audio Rooms: ", audioRooms);
};

const BCJoined = (roomID, userSocket) => {
  let dataString;
  if (audioRooms[roomID]) {
    dataString = JSON.stringify(audioRooms[roomID]);
  } else {
    dataString = [];
  }
  userSocket.send(dataString);
};

broadCasting = (eventName, data, socketsArr, userSocket) => {
  socketsArr.map((socket) => {
    if (socket.readyState === ws.OPEN && socket !== userSocket) {
      let stringData = JSON.stringify({ event: eventName, data: data });
      socket.send(stringData);
    }
  });
};

const joinRoomold = (roomID, peerID) => {
  if (socketRooms[roomID] && !socketRooms[roomID].includes(peerID)) {
    socketRooms[roomID] = [...socketRooms[roomID], peerID];
  } else if (!socketRooms[roomID]) {
    socketRooms[roomID] = [peerID];
  }
  //   console.log("socketRooms Now : ", socketRooms);
};

module.exports = webSocket;
