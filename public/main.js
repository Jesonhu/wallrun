$(function() {
  var FADE_TIME = 150; // ms
  var TYPING_TIMER_LENGTH = 400; // ms
  var COLORS = [
    '#e21400', '#91580f', '#f8a700', '#f78b00',
    '#58dc00', '#287b00', '#a8f07a', '#4ae8c4',
    '#3b88eb', '#3824aa', '#a700ff', '#d300e7'
  ];

  // Initialize variables
  var $window = $(window);
  var $usernameInput = $('.usernameInput'); // 用户名输入框
  var $messages = $('.messages'); // 准备用了显示信息的ul
  var $inputMessage = $('.inputMessage'); // 聊天信息输入框

  var $loginPage = $('.login.page'); // The login page
  var $chatPage = $('.chat.page'); // The chatroom page

  // Prompt for setting a username
  var username;
  var connected = false;
  var typing = false; // 是否正在输入
  var lastTypingTime;
  var $currentInput = $usernameInput.focus();

  var socket = io();

  // 过程分析：
  // 输入聊天姓名后触发键盘事件。键盘事件执行函数2;
  // 函数2执行6(将输入框的内容清空)，并触发事件2,事件2触发会发送请求到后台;
  // 后台发送事件'login'。浏览器监听到该事件后触发on('login')。执行4(欢迎节点插入前面) 1,
  // 1执行后触发执行4,4执行触发执行8(创建节点);
  // 当输入框正在输入的时候触发input事件input,input事件触发执行13(更新是否正在输入状态)。
  // 初始typing为false !typeing。发布事件3。服务端监听到该事件，然后广播typing。
  // 浏览器监听到事件typeing触发事件9，事件9执行11(信息为正在输入中...)，执行7，
  // 7执行触发执行9(当前正在输入的人被筛选出来) 10(随机颜色) 8(创建dem节点)；
  // 内容输入完点击Enter后，触发键盘事件(如果此时已经登录了)触发执行5事件4且typing = false,
  // 函数5执行触发事件1执行6(清空input),7执行同上;
  // 服务监听到事件1，处理后返回触发事件6，事件6执行7，7执行同上

  // 新用户登录（如果自己已经登录）触发事件2,服务端监听到事件2，返回事件emit('login'),
  // broadcast.emit('user joined'),浏览器监听到触发事件7，执行1 4

  // 用户离开触发服务端on('disconnect'),发送事件emit('user left')
  // 浏览器监听到触发事件8,

/**
 * 涉及到得函数
 */
  // 1 addParticipantsMessage 显示在线人数函数。执行:4;事件:无
  // 2 setUsername 输入用户名回车及发送信息操作。执行:6;事件:2
  // 3 addParticipantsMessage 显示在线人数
  // 4 log 页面显示信息设置函数li添加.log及内容设置。执行8
  // 5 sendMessage 判断内容和是否连接发送信息。执行:6 7;事件1
  // 6 cleanInput 发送信息input内容设置为空。执行:无;事件:无
  // 7 addChatMessage。执行:8 9 10。事件:无 
  // 8 addMessageElement 添加显示信息的元素到文档中。执行:无;事件:无
  // 9 getTypingMessages 执行:无;事件:无
  // 10 getUsernameColor 随机颜色。执行:无;事件:无
  // 11 addChatTyping 是否正在输入。执行:7;事件:无
  // 12 removeChatTyping 执行:9;事件:无
  // 13 updateTyping 执行:无;事件:3 4

  /**
   * 键盘事件
   */
  // 1 keydown 判断是否点击Enter 执行:5 2;事件:4

/**
 * socket.io事件
 */
  // 1 emit('new message', data)
  // 2 emit('add user', data)
  // 3 emit('typing', data)
  // 4 emit('stop typing')
  // 5 on('login') 执行:1 4
  // 6 on('new message') 执行:7
  // 7 on('user joined') 执行:1 4
  // 8 on('user left') 执行:1 4 11
  // 9 on('typing') 执行:11
  // 10 on('stop typing') 执行:12
  // 11 on('disconnect') 执行:4
  // 12 on('reconnect') 执行:4;事件:2
  // 13 on('reconnect_error') 执行:4

  // 在线人数设置函数
  // 显示1人或者实际人数, 调用log函数
  function addParticipantsMessage (data) {
    var message = '';
    if (data.numUsers === 1) {
      message += "当前1人在线";
    } else {
      message += "当前" + data.numUsers + "人在线";
    }
    log(message);
  }

  // Sets the client's username
  // 用户名设置。
  // 输入用户名后回车操作
  function setUsername () {
    username = cleanInput($usernameInput.val().trim());

    // If the username is valid
    // 用户名不为空的时候
    if (username) {
      $loginPage.fadeOut();
      $chatPage.show();
      $loginPage.off('click');
      $currentInput = $inputMessage.focus();

      // Tell the server your username
      socket.emit('add user', username);
    }
  }

  // Sends a chat message
  // 向后台发送一个聊天信息
  function sendMessage () {
    var message = $inputMessage.val();
    // Prevent markup from being injected into the message
    message = cleanInput(message);
    // if there is a non-empty message and a socket connection
    // 消息不为空并且有WebSocket连接
    if (message && connected) {
      $inputMessage.val('');
      addChatMessage({
        username: username,
        message: message
      });
      // tell server to execute 'new message' and send along one parameter
      socket.emit('new message', message);
    }
  }

  // Log a message
  // 页面显示信息设置函数
  function log (message, options) {
    var $el = $('<li>').addClass('log').text(message);
    addMessageElement($el, options);
  }

  // Adds the visual chat message to the message list
  function addChatMessage (data, options) {
    // Don't fade the message in if there is an 'X was typing'
    var $typingMessages = getTypingMessages(data);
    options = options || {};
    if ($typingMessages.length !== 0) {
      options.fade = false;
      $typingMessages.remove();
    }

    var $usernameDiv = $('<span class="username"/>')
      .text(data.username)
      .css('color', getUsernameColor(data.username));
    var $messageBodyDiv = $('<span class="messageBody">')
      .text(data.message);

    var typingClass = data.typing ? 'typing' : '';
    var $messageDiv = $('<li class="message"/>')
      .data('username', data.username)
      .addClass(typingClass)
      .append($usernameDiv, $messageBodyDiv);

    addMessageElement($messageDiv, options);
  }

  // Adds the visual chat typing message
  function addChatTyping (data) {
    data.typing = true;
    data.message = '正在输入中...';
    addChatMessage(data);
  }

  // Removes the visual chat typing message
  function removeChatTyping (data) {
    getTypingMessages(data).fadeOut(function () {
      $(this).remove();
    });
  }

  // Adds a message element to the messages and scrolls to the bottom
  // el - The element to add as a message
  // options.fade - If the element should fade-in (default = true)
  // options.prepend - If the element should prepend
  //   all other messages (default = false)
  // 添加显示信息的元素到文档中
  function addMessageElement (el, options) {
    var $el = $(el);

    // Setup default options
    if (!options) {
      options = {};
    }
    if (typeof options.fade === 'undefined') {
      options.fade = true;
    }
    if (typeof options.prepend === 'undefined') {
      options.prepend = false;
    }

    // Apply options
    if (options.fade) {
      $el.hide().fadeIn(FADE_TIME);
    }
    if (options.prepend) {
      $messages.prepend($el); // 插入开头
    } else {
      $messages.append($el); // 插入末尾
    }
    $messages[0].scrollTop = $messages[0].scrollHeight;
  }

  // Prevents input from having injected markup
  function cleanInput (input) {
    return $('<div/>').text(input).text();
  }

  // Updates the typing event
  function updateTyping () {
    if (connected) {
      if (!typing) {
        typing = true;
        socket.emit('typing');
      }
      lastTypingTime = (new Date()).getTime();

      setTimeout(function () {
        var typingTimer = (new Date()).getTime();
        var timeDiff = typingTimer - lastTypingTime;
        if (timeDiff >= TYPING_TIMER_LENGTH && typing) {
          socket.emit('stop typing');
          typing = false;
        }
      }, TYPING_TIMER_LENGTH);
    }
  }

  // Gets the 'X is typing' messages of a user
  // 当a正在输入的时候b显示 a正在输入中...
  function getTypingMessages (data) {
    return $('.typing.message').filter(function (i) {
      return $(this).data('username') === data.username;
    });
  }

  // Gets the color of a username through our hash function
  function getUsernameColor (username) {
    // Compute hash code
    var hash = 7;
    for (var i = 0; i < username.length; i++) {
       hash = username.charCodeAt(i) + (hash << 5) - hash;
    }
    // Calculate color
    var index = Math.abs(hash % COLORS.length);
    return COLORS[index];
  }

  // Keyboard events 键盘事件
  $window.keydown(function (event) {
    // Auto-focus the current input when a key is typed 输入框获取光标
    if (!(event.ctrlKey || event.metaKey || event.altKey)) {
      $currentInput.focus();
    }
    // When the client hits ENTER on their keyboard
    if (event.which === 13) {
      if (username) {
        sendMessage();
        socket.emit('stop typing');
        typing = false;
      } else {
        setUsername();
      }
    }
  });

  $inputMessage.on('input', function() {
    updateTyping();
  });

  // Click events

  // Focus input when clicking anywhere on login page
  $loginPage.click(function () {
    $currentInput.focus();
  });

  // Focus input when clicking on the message input's border
  $inputMessage.click(function () {
    $inputMessage.focus();
  });

  // Socket events

  // Whenever the server emits 'login', log the login message
  socket.on('login', function (data) {
    connected = true;
    // Display the welcome message
    var message = "欢迎来到在线聊天室–";
    log(message, {
      prepend: true
    });
    addParticipantsMessage(data);
  });

  // Whenever the server emits 'new message', update the chat body
  socket.on('new message', function (data) {
    addChatMessage(data);
  });

  // Whenever the server emits 'user joined', log it in the chat body
  socket.on('user joined', function (data) {
    log(data.username + ' 加入');
    addParticipantsMessage(data);
  });

  // Whenever the server emits 'user left', log it in the chat body
  socket.on('user left', function (data) {
    log(data.username + ' 离开');
    addParticipantsMessage(data);
    removeChatTyping(data);
  });

  // Whenever the server emits 'typing', show the typing message
  socket.on('typing', function (data) {
    addChatTyping(data);
  });

  // Whenever the server emits 'stop typing', kill the typing message
  socket.on('stop typing', function (data) {
    removeChatTyping(data);
  });

  socket.on('disconnect', function () {
    log('你掉线了请重新连接');
  });

  socket.on('reconnect', function () {
    log('恭喜，重新连接成功');
    if (username) {
      socket.emit('add user', username);
    }
  });

  socket.on('reconnect_error', function () {
    log('尝试重新连接失败');
  });

});
