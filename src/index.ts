import { WebSocketServer, WebSocket } from "ws";

const wss= new WebSocketServer({ port: 8080 });

interface User{
        socket: WebSocket;
        room: string;
}

let userCount = 0;
let allSockets: User[] = [];

wss.on("connection",(socket)=>{
    socket.on("message",(message)=>{
        const parsedMessage = JSON.parse(message.toString())
        console.log(parsedMessage)
        if(parsedMessage.type === "join"){
            console.log("user wants to join")
            allSockets.push({
                socket,
                room: parsedMessage.payload?.roomId
            })
        }
        if(parsedMessage.type === "chat"){
            console.log("user wants to message")
            let currentUserRoom = null;
            for(let i=0;i<allSockets.length;i++){
                if(allSockets[i].socket === socket){
                    currentUserRoom = allSockets[i].room
                }
            }

            for(let i=0;i<allSockets.length;i++){
                if(allSockets[i].room === currentUserRoom){
                    allSockets[i].socket.send(parsedMessage.payload.message)
                }
            }
        }
    })
})