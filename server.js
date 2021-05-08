const WebSocket = require("ws");
const port = process.env.PORT || 3000;
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const bodyParser = require("body-parser");
const wss = new WebSocket.Server({ server });
const socketHandler = require("./WebSocket/websocket.handler");
app.use(bodyParser.json());

app.get("/", (req, res) => {
  console.log("New Req ");
  res.status(200).send({
    message: "Success",
  });
});

wss.on("connection", function connection(ws) {
  console.log("New Connection : ");
  socketHandler(ws);  
});

server.listen(port, () => {
  console.log("Server started on Port : ", port);
});
