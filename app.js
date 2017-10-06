var express = require ("express");
var app = express();

var server = require("http").Server(app);

//因為socket.io需要一個HTTP伺服器才可以運作，我們需要把socket.io黏附到一個HTTP伺服器
var io = require("socket.io")(server);

app.use(express.static(__dirname+"/public"));

//首先，好像HTTP伺服器，我們要有一個Callback給Socket.io去應付我們的Socket連線
//socket.broadcast.emit()透過這個語法把訊息給所有人
io.on("connection",function(socket){
    socket.on("send",function(data){
        socket.broadcast.emit("receive",data);
    });
});


server.listen(process.env.PORT||3000);