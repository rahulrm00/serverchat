import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["https://client-ivory-tau.vercel.app", "http://localhost:3000"],
        methods: ["GET", "POST"],
    },
    transports: ["websocket", "polling"],
});
const messageroom ={};
app.use(cors());
io.on("connection",(socket)=>{
    console.log(socket.id);
socket.on("send",({room,message})=>{
    console.log(`Received message for room ${room}:`, message);
    if(!messageroom[room]){
        messageroom[room] = [];
    }
    messageroom[room].push( message);
    console.log(messageroom[room]);
    io.emit("newmsg", message);
})
socket.on("joinroom",(room)=>{
    console.log(`${socket.id} joined room: ${room}`);
    socket.join(room);
    if(messageroom[room]){
        io.emit("allmsg",messageroom[room]);
    }
})
socket.on("leaveroom",(room)=>{
socket.leave(room);
}
)
socket.on("disconnect",()=>{
    console.log("Client disconnected");
})
});
server.listen(5002,()=>{
    console.log("Server is running on port 5002");
});
