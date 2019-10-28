//socket.io的核心：
//服务器端和客户端之间的联系，靠事件的相互触发，
//当服务器要给客户端发信息时：客户端定义一个事件，服务器端触发，触发时，就可以把服务器端的数据顺便传过去
//当客户端要给服务器发信息时：服务器端定义一个事件，客户端触发，触发时，就可以把客户端的数据顺便传过去

var app = require('http').createServer(function(req, res) {});
var io = require('socket.io').listen(app);

app.listen(707,function(){
    console.log("监听开始");
});
//保存所有的客户端
var clients = {};
//服务器端的connection事件，当客户端连接时，触发该事件
io.sockets.on('connection', function (clientSocket) {
    console.log("connection被触发了");
    //回调函数会触发客户端的connect事件
    
    //绑定一个自定义事件：ferret，在客户端触发，有客户端连接，发送消息
    clientSocket.on('ferret', function (sayer, fn) {        //
        console.log("ferret被触发了");
        //如果没有保存改客户端，那么就保存该客户端
        if(!clients[sayer]){
            clients[sayer] = this;
        }
        fn();   //调用的是客户端的emit事件
    });
    //客户端的socket发送消息时，触发
    clientSocket.on('message', function (data) {
        // console.log(data);
        broadcast(data);
    });
});

function  broadcast(data){
    for(let key in clients){
        clients[key].emit('news',data);
    }
}