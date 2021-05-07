const express = require("express");
const http = require("http");
const Server = require("socket.io").Server;
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res
    .json({
      message: "Success",
    })
    .status(200);
});

const server = http.Server(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    // methods: ["GET", "POST"],
    // credentials: true,
    // path: "socket.io",
  },
});

io.on("connection", (socket) => {
  console.log("New Connection : ", socket);
});

server.listen(3000);
