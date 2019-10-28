//服务器端

//引入ws模块的Server属性，他是一个类，用来创建webSocket服务器
var WebSocketServer = require('ws').Server;

//创建服务器的socket，同时绑定端口号
var wss =  new WebSocketServer({port:9000});

//定义一个对象，保存所有的客户端对象
var clientMap = new Object();
var i = 0;  //这是客户端的编号

//给webSocket的服务器绑定连接事件，connection:表示有客户端连接
//回调函数里的参数是服务器端保存的客户端对象
wss.on('connection',function(wsClient){
    console.log(wsClient + '上线了');
    //1、记录连接的客户端
    wsClient.name = ++i; //给客户端对象增加一个name属性
    clientMap[wsClient.name] = wsClient;//把客户端保存在服务器端里
    
    //2、给连接来的客户端对象绑定message事件(客户端发送信息时，触发)
    wsClient.on('message',function(str){
        let endStr = wsClient.name+"说："+str;
        console.log(endStr);
        //把客户端发送的信息广播给其他区啊客户端
        broadcast(endStr,wsClient);
    });
    //3、给连接来的和客户端对象绑定close事件，某个客户端关闭了（下线）
    wsClient.on('close',function(){
        //global.gc()  //调用内存回收
        console.log(wsClient.name+'离开了');
        broadcast("离开了",wsClient);
    });

});
    //广播信息
    function broadcast(msg,wsClient){
        //循环这个保存着所有客户端对象的集合
        for(var key in clientMap){
            if(clientMap[key]!=wsClient){
                //把信息发给除过自己的每一个客户端
                clientMap[key].send(msg);
            }
        }
    }
