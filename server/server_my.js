let app = require('express');
let http = require('http').Server(app);
let io = require('socket.io')(http);

let PORT = 3200;

// 在线用户
let onlineUserList = [];
// 在线人数
let onlineUserCount = 0;

io.on('connection', function(socket) { // 需要使用 io对象，这里不能写成箭头函数
    console.log('new connect create');
    // console.log(this);

    // 监听用户加入
    socket.on('login', function(obj) {
        console.log(obj);
        socket.socketId = obj.userId;

        // 检查是否在线
        let sign = false;
        if (onlineUserList.length > 0) {
            for (let i = 0; i < onlineUserList[i].userId; i++) {
                if (obj.userId === onlineUserList[i].userId) { // 已在线
                    sign = true;
                    break;
                }
            }
        }

        if(!sign) onlineUserList.push(obj); // 新加入的
        // 向处理自己以外的所有客户端广播：有新用户加入
        this.broadcast.emit('login', {onlineUserList: onlineUserList, onlineUserCount: onlineUserCount, msgUser: obj});
        this.emit('loginSuccess', {onlineUserList: onlineUserList, sign: 1});
        console.log(`${obj.userName}加入了群聊`);
    });

    // 监听用户退出
    socket.on('disconnect', () => {
        // 将退出的用户从列表中删除
        let exitObj = {}; // 保存退出的成员
        let sign = false;
        for (let i = 0; i < onlineUserList.length; i++) {
            if (onlineUserList[i].userId === socket.socketId) {
                onlineUserList[i].userId = -1;
                exitObj = onlineUserList[i]; // 取得退出的这位成员
                sign = true;
                break;
            }
        }

        let a = []; // 用来保存当前在线的成员

        if (sign) { // 退出了
            for (let i = 0; i < onlineUserList.length; i++) {
                if (onlineUserList[i].userId !== -1) { // 得到在线的成员
                    a.push(onlineUserList[i]);
                }
            }
            onlineUserList = a; // 更新在线列表
            onlineUserCount--; // 总是变化

            // 向所有客户端广播该用户的退出
            this.broadcast.emit('logout', {onlineUserList: onlineUserList, onlineUserCount: onlineUserCount, msgUser: exitObj});
            console.log(`${exitObj.userName}退出了群聊`);
        }
    });

    // 监听聊天信息
    socket.on('message', (obj) => {
        obj.onlineUserList = onlineUserList;
        this.broadcast.emit('message', obj);
        console.log(`${obj.user.userName}说： ${obj.msg}`);
    });
});

http.listen(PORT, () => {
    console.log(`聊天室，监听端口: ${PORT}`);
});

