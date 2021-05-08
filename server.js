const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 3000 });

wss.on("connection", function connection(ws) {
  console.log("New Connection : ", ws);
  ws.send(
    JSON.stringify({
      name: "welcome",
      payload: "Mohamed Khaled",
    })
  );
  ws.on("message", function incoming(message) {
    console.log("received: %s", message);
  });

  ws.send("something");
});
