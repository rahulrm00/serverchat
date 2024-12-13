import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
const app = express();
const server = http.createServer(app);
const io =new Server(server,{
    cors:{
        origin: "https://client-ivory-tau.vercel.app/",
        methods:["GET","POST"],
    }
});
app.use(cors());
io.on("connection",(socket)=>{
    console.log(socket.id);
socket.on("send",(data)=>{
    socket.broadcast.emit("allmsg",data);
})
socket.on("disconnect",()=>{
    console.log("Client disconnected");
})
});
server.listen(4000,()=>{
    console.log("Server is running on port 4000");
});