import cors from "cors";
import express from "express";
import http from "http";
import morgan from "morgan";
import { Server as SocketServer } from "socket.io";
import { PORT } from "./port.js";

const app = express();
const server = http.createServer(app);
const io = new SocketServer(server, {
  cors: {
    origin: "*",
  },
});

app.use(cors());
app.use(morgan("dev"));

io.on("connection", socket => {
  socket.on("message", msg => {
    socket.broadcast.emit("message", { body: msg.body, user: msg.user });
  });
});

server.listen(PORT);
console.log(`Server started on port: ${PORT}`);
