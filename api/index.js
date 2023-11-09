const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const connection = require("./config/db");
const cors = require("cors");
require("dotenv").config();

const initializeDataEmitter = require("./Emitter/emitter");
const initializeDataListener = require("./Listener/listener");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(cors());

app.get('/home', (req, res) => {
  return res.send('This is User home')
})
initializeDataEmitter(io);
initializeDataListener(io);

const PORT = process.env.PORT || 5000;

server.listen(PORT, async () => {
  try {
    await connection;
    console.log("Connected to Database");
  } catch (e) {
    console.log("Error connecting to database");
    res.status(404).send(e.message);
  }
  console.log(`Server is running on port ${PORT}`);
});
