// const Chat = {
//     joinBtn: $('.join'),
//     sendMsgBtn: $('.send'),
//     usename: null,  //保存用户登录时输入的用户名
//     userid: null,   //保存用户登录时候的id
//     socket: null,   //保存 WebSocket服务
//     init: function(username){  //初始化
//         this.socket = io.connect('/'); //客户端发起 connect连接
//         this.username = username; //给用户名赋值
//         this.userId = new Date().getTime() +''+ Math.floor(Math.random()*899+100); 
//         this.socket.emit('login', {name: this.username, userid:this.userId}); //向服务端提交名为'login'的信息 
//         this.socket.on('login', function(data){ //监听名为'login'由服务端发来的信息
//             Chat.updateSystemMsg(data, 'login'); //?? Chat
//             //console.log(this);
//         });
//         //服务端发来'logout'退出信息时
//         this.socket.on('logout', function(data){
//            Chat.updateSystemMsg(data, 'logout');
//         });
//         //服务端发来 chat的聊天消息
//         this.socket.on('chat', function(data){
//             //console.log(data);
//             Chat.updateSystemMsg(data, 'chat');
//         });
//     },
//     updateSystemMsg: function(data, action){
//         let $con = $('#con'),
//             html = $con.html(),
//             $userList = $('.userlist'),
//             userList = '',
//             $num = $('.num'),
//             numList = $num.html();
//             //console.log(data);
//         if(action === 'login'){ //当是登录时候
//             html += `<p>${data.data.name}进入了聊天室`;
//             numList = `当前在线人数${data.data.num}`;
//             $userList.empty();
//             for(let i in data.userList){
//                 userList +=  `<p>${data.userList[i]}</p>`;
//             };
//             $userList.html('<h3>当前在线列表:</h3>'+userList);
//             $num.html(numList);
//         }else if(action === 'logout'){ //当是退出的时候
//             //console.log(this.username);
//             html += `<p>${data.name}退出了聊天室`;
//             numList = `当前在线人数${data.num}`;
//             $userList.empty();
//             for(let i in data.userList){
//                 userList +=  `<p>${data.userList[i]}</p>`;
//             };
//             $userList.html('<h3>当前在线列表:</h3>'+userList);
//             $num.html(numList);
//         }else if(action === 'chat'){
//             html += `<p>${data.username}:${data.content}</p>`;
//         }
//         $con.html(html);
//     },
//     submit: function(){ //发送信息
//         let $sendMsgInp = $('.send-con'),
//             sendCon = $sendMsgInp.val();
//         if(sendCon){ //信息输入框输入的有内容
//             this.socket.emit('msg', {username:this.username, content:sendCon}); //发送 msg
//         }else{
//             alert('发送的内容不能为空');
//         }
//     },
//     login: function(){ //加入聊天室
//         const $name = $('.name').val();
//         $name && this.init($name); //$name不为空时 执行后面语句
//     }
// }    

 io.connect('/');
 const socket = io.connect('/'), //开始连接 将连接保存起来
       joinBtn = document.querySelector('.join'),
       div = document.getElementById('con');

let name,userId;
  joinBtn.onclick = function () { //输入用户名 点击进入聊天室
    name = document.querySelector('.name').value();
    userId = '123';
    socket.emit('login', {name: name, userId: userId});
};
socket.on('login', function (data) {
    div.innerHTML += `${data.name}加入聊天室<br>`;
});
function submit(){
  let txt = document.getElementsByTagName('input')[0].value;
  socket.emit('msg', {content: txt});
};
socket.on('liaotian', function (data) {
    div.innerHTML += `${data.content}<br>`;
})

socket.on('wulv', function (data) { //前台监听到后台发送的信息后输出
    console.log(data);
    socket.emit('xiexie', {name:'收到'}); //前台收到信息时给服务器发送信息
});