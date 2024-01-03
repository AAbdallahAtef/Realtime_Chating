var socket = io.connect("https://realtim-chatting-site.onrender.com")
var userName = document.getElementById("username");
var message = document.getElementById("message");
var send = document.getElementById("send");
var chat = document.getElementById("chat-messages")
var broadcast = document.getElementById("broadcat")
send.addEventListener('click',()=>{
    socket.emit('message',{
        userName:userName.value,
        message:message.value
    });
    message.value = '';
})
message.addEventListener('keypress',()=>{
    socket.emit('broad',{
        userName:userName.value,
    });
})
socket.on('new_message',(data)=>{
broadcast.innerHTML = '';
chat.innerHTML += '<div class=" mb-3"> <div class="card-header text-warning text-bg-dark border border-0">' + data.userName + '</div><div class="card-body text-bg-info rounded px-2 fs-5"><p class="card-text">'+data.message+'</p></div></div>';
});

socket.on('new_broad',(data)=>{
    broadcast.innerHTML = '<span>'+data.userName+'</span> typing  <img class="rounded-pill" width="4%"  src="write.gif" alt="writing">';
    });
