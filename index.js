let http = require('http'),
    express = require('express'),
    app = express(),
    ws = require('socket.io');

const port = process.env.PORT || 8066,
      ip = '192.168.1.15';    

// 静态资源设置
app.use(express.static(__dirname + '/public'));
// 如果router没设置且public下面有index.html
// 输入网址：端口会直接加载这个index.html文件
app.use('/', express.static(__dirname + '/public'));

// 使用路由
// app.use('/', require('./router/index.js'));

// 创建服务器
let server = http.createServer(app).listen(port);


// 在线聊天室
let io = ws(server);
let userList = {},
    usernum = 0;

io.on('connection', (socket) => {

    // 正常聊天
    socket.on('msg', (data) => {
        io.emit('chat', data);
    });

    // 登录
    socket.on('login', (data) => {
        userList[data.userid] = data.name;
        socket.name = data.name;
        socket.userid = data.userId;
        usernum++;
        data.num = usernum;
        io.emit('login', {data: data, userList: userList});
        
        console.log(`${socket.name} login onlineCount ${usernum}`);
    });

    // 退出
    socket.on('logout', ({userName}) => {
        getStatus();
        delete userList[socket.userid];
        usernum--;
        io.emit('logout', {name: socket.name, num: usernum, userList: userList, msg: userName});
        console.log(userList);
        console.log(`${socket.name} logout onlineCount ${usernum}`);
    });
    
    // 聊天室状态
    function getStatus(data) {
        socket.on('status', () => {
            io.emit('status', data);
        });
    }
});



// 友情提示服务器开启了
console.log(`Nodejs Server running on ${ip}:${port}`);