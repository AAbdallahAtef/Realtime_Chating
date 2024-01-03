const express = require("express");
const socket = require("socket.io");
const PORT = process.env.PORT || 7050;
const app = express();

app.use(express.static("public_html"));

const server = app.listen(PORT,()=>{console.log("http://localhost:"+PORT)})
var sio = socket(server);
sio.on("connection",(visitor)=>{
    console.log(`new visitor with  id : ${visitor.id}`);
    visitor.on("message",(data)=>{
        sio.sockets.emit('new_message',data)
    })
    visitor.on('broad',(data)=>{
        visitor.broadcast.emit('new_broad',data);
    })
})