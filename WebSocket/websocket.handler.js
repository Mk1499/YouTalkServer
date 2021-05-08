const webSocket = (socket) => {
  socket.on("message", function incoming(message) {
    console.log("received: %s", message);
  });
  socket.send(
    JSON.stringify({
      name: "welcome",
      payload: "Mohamed Khaled",
    })
  );
};

module.exports = webSocket;