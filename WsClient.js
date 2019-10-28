//客户端


//判断浏览器是否支持H5使用WebSocket
// if(!(WebSocket in window)){
//     alert("您的浏览器版本过低，请升级浏览器。");
//     return;
// }

//HTML5新增了原生对象WebSocket(跟XMLHttpRequest,Promise，Set，Map，Date，Array是一样的)

//创建webSocket对象
var ws = new WebSocket('ws://127.0.0.1:9000/');

//当连接上服务器端，即的打开连接后，触发onopen
ws.onopen = function(){
    ws.send('大家好');  //send函数、会触发服务器端的onmessage事件
}
//当接收到（服务器端的）信息后，即服务器端send函数，触发这里的onmessage事件
ws.onmessage = function(event){
    var chatroom = document.getElementById('chatroom');
    chatroom.innerHTML += '<br/>' + event.data;
}

//当服务器端关闭时，触发onclose
ws.onclose = function(){
    alert("服务器关了");
}
//当出错时，触发onerror
ws.onerror = function(err){
    alert('Error:' + err);
}