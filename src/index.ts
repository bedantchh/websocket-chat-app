import { WebSocketServer } from "ws";

const wss= new WebSocketServer({ port: 8080 });

let userCount = 0;

wss.on("connection",(socket)=>{
    userCount++;
    console.log(`current user count: ${userCount}`)
    socket.send("Welcome to WebSocketServer!")
    socket.on("message",(data)=>{
        socket.send("Hello!")
    })
})