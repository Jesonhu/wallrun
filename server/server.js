var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

let PORT = 3200;

//在线用户
var onlineUserList = [];
//当前在线人数
var onlineUserCount = 0;

io.on('connection', function (socket) {
    console.log('新连接已创建 !');

    //监听新用户加入
    socket.on('login', function (obj) {
        // console.log('obj before', obj);
        obj = sigleHexToDec(obj); // unicode转中文
        // console.log('obj after', obj);

        socket.socketId = obj.userId;
        //检查在线列表，如果不在里面就加入

        var sign = false; // 标记是否已经存在于列表组中 false:不在
        for (var i = 0; i < onlineUserList.length; i++) {
            if (obj.userId === onlineUserList[i].userId) {
                sign = true;
                break;
            }
        }
        if (!sign) onlineUserList.push(obj);
        //向除自己以外的所有客户端广播:有新用户加入
        this.broadcast.emit('login', {onlineUserList: onlineUserList, onlineUserCount: onlineUserCount, msgUser: obj});
        this.emit('loginSuccess', {onlineUserList: onlineUserList, sign: 1});
        console.log(obj.userName + '加入了群聊');
    });

    //监听用户退出
    socket.on('disconnect', function () {
        // 将退出的用户从在线列表中删除
        var exitObj = {};
        var sign = false;
        for (var i = 0; i < onlineUserList.length; i++) {
            if (onlineUserList[i].userId === socket.socketId) {
                onlineUserList[i].userId = -1;
                exitObj = onlineUserList[i];
                sign = true;
                break;
            }
        }
        var a = [];
        if (sign) {
            for (var i = 0; i < onlineUserList.length; i++) {
                if (onlineUserList[i].userId !== -1) {
                    a.push(onlineUserList[i]);
                }
            }
            onlineUserList = a;
            onlineUserCount--;
            //向所有客户端广播用户退出
            this.broadcast.emit('logout', {onlineUserList: onlineUserList, onlineUserCount: onlineUserCount, msgUser: exitObj});
            console.log(exitObj.userName + '退出了群聊');
        }
    });

    //监听用户发布聊天内容
    socket.on('message', function (obj) {
        obj.onlineUserList = onlineUserList;
        obj.user.userName = hexToDec( obj.user.userName );
        this.broadcast.emit('message', obj); // 广播给自己以外的所有用户
        console.log(obj.user.userName + '说：' + obj.msg);
    });

});

// unicode 编码转换
// 中文转unicode
function decToHex(str) {
    var res=[];
    for(var i=0;i < str.length;i++)
        res[i]=("00"+str.charCodeAt(i).toString(16)).slice(-4);
    console.log('cn to unicode');
    return "\\u"+res.join("\\u");
};
// unicode转中文
function hexToDec(str) {
    // console.log('str', str);
    str=str.replace(/\\/g,"%");
    let str1 = unescape(str);
    // console.log( str1 );
    return unescape(str);
};
function totalHexToDec(arr) { // 将数组转成中文
    if (arr.length > 0) {
        arr.forEach((item) => {
        item.userName = hexToDec( item.userName );
        });
    }
    return arr;
};
function sigleHexToDec(obj) {
    obj.userName = hexToDec( obj.userName );
    return obj;
};

http.listen(PORT, function () {
    console.log(`聊天室，监听端口: ${PORT}`);
});
