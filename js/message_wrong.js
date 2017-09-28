$(function() {
    // 页面初始化
    let pageNum = 0; // ajax请求的页码
    let nowItmes; // 当前items总数即总共的签到人数
    let onePageLen = 3; // 每页页码的数量3（每页最多可以显示的数量）
    let nowResCount; // 当前页ajax返回了多少条数据
    let qrcode;
    let timer;
    let time; // 向下滚动时间
    /** 
     * 当前每个签到的总数 $('.message-con-wrap > .message-list .message-item').length -----a
     * 每页总数 18 ----b
     *  a / b 获取商的整数部分，如果有整数 下次请求整数 + 1，如果没有整数，请求1
     * 但我是append还是html()？
     */
    setInterval(function() {
        if (pageNum == 0) { // 第一次ajax请求
            console.log('msg ',1);
            pageNum++
            $.ajax({
                type: 'POST',
                url: `${Config.baseDomain}${Config.pcScreen}`,
                data: {
                    page: pageNum,
                },
                success: function(resData) {
                    if (resData.code === 1) {
                        // console.log(resData)

                        // 渲染dom--初始清空list 使用html()
                        renderDom(resData.list);
                        function renderDom(arr) {
                            let lis = '';

                            if (arr.length > 0) {
                                arr.forEach((item, index) =>{
                                    // console.log(item.headimgurl);
                                    if ((item.nickname != null || item.nickname != undefined) && (item.headimgurl != null || item.nickname != undefined)) {
                                        lis += `
                                            <li class="message-item clearfix" style="height:197.333px;">
                                                <div class="message-wrap-outer">
                                                    <div class="avatar-wrap fl">
                                                        <div class="avatar">
                                                            <img src="${item.headimgurl}" alt="">
                                                        </div>
                                                    </div>
                                                    <div class="msg-info">
                                                        <div class="name">${item.nickname}</div>
                                                        <div class="message">${item.content}</div>
                                                    </div>
                                                    <div class="corner">
                                                        <div class="index">${pageNum+index}</div>
                                                    </div>
                                                </div>
                                            </li>
                                        `
                                    } else if (item.headimgurl == null || item.headimgurl == undefined) {
                                        console.log('erro load avatar')
                                        lis += `
                                            <li class="message-item clearfix" style="height:197.333px;">
                                                <div class="message-wrap-outer">
                                                    <div class="avatar-wrap fl">
                                                        <div class="avatar">
                                                            <img src="http://wx.qlogo.cn/mmopen/6kA4xS3TFQEp3JYvcRrZmoJo…KlkI384icmCmrl8CztuJ3njAsb1QfBouq8zQzic6N9yyVEX/0" alt="">
                                                        </div>
                                                    </div>
                                                    <div class="msg-info">
                                                        <div class="name">${item.nickname}</div>
                                                        <div class="message">${item.content}</div>
                                                    </div>
                                                    <div class="corner">
                                                        <div class="index">${pageNum+index}</div>
                                                    </div>
                                                </div>
                                            </li>
                                        `
                                    }
                                });
                                $('.message-con-wrap > .message-list').html(lis);
                                setTimeout(() =>{
                                    $('.message-con-wrap > .message-list .message-item').addClass('show');
                                }, 50);
                            } else {
                                console.log('初始-数组为空');
                            }
                        }
                    }
                },
                error: function(error) {
                    fnLog(error);
                }
            });  
        } else { // 以后的ajax请求
            nowItmes = $('.message-con-wrap > .message-list > .message-item').length;
            
            integers = Math.floor( nowItmes / onePageLen );
            // console.log(nowItmes);
            // console.log(integers < pageNum);
            // console.log(integers +','+ pageNum);

            $('.header1 .num').text( nowItmes ); // 当前title应该显示的签到总数
            if (integers < pageNum) { // 当前页没有填充满
                console.log('msg ',2.1);
                $.ajax({
                    type: 'POST',
                    url: `${Config.baseDomain}${Config.pcScreen}`,
                    data: {
                        page: pageNum,
                    },
                    success: function(resData) {
                        if (resData.code === 1) {
                            
                            let nowRes = resData.list; // 当前返回的数量
                            let isResCountMoreSymbol = false; // 是否返回的数据大于当前页数量标记
                            let resCountMoreLen; // 返回的数据多出来多少条

                            // console.log(resData.message-list)
                            nowResCount = resData.list.length;

                            // 判断当前返回的数据是否大于当前页的数量 
                            // 每次返回的数量 [0, 18]
                            // 当前页显示的数量  nowItmes / pageNum
                            resCountMoreLen = (nowResCount - (nowItmes / pageNum));
                            resCountMoreLen > 0 ? isResCountMoreSymbol = true : isResCountMoreSymbol = false;
                            // 当前返回的数量-当前页显示的数量 > 0 说明返回的数量多些 
                            // 当前返回的数量-当前页显示的数量 = 0 说明返回的数量一样（没新人签到）

                            if (!isResCountMoreSymbol) { // 如果当前返回的数量不大于当前页显示的数量 => 直接返回不再渲染dom
                                return;
                            } else { // 返回的数量大于当前页显示的数量 => 多出来的数量追加到一页里面
                                // 当前 [1, 2]
                                // 返回 [1, 2, 3]
                                let nowIndex = (nowItmes / pageNum); // 当前显示的item数量在每页18条中的索引+1
                                let showRederArr = nowRes.splice(nowIndex, resCountMoreLen);
                                console.log(showRederArr);
                                // 渲染dom--append() 方式
                                renderDom(showRederArr);
                            }
                        }
                    },
                    error: function(error) {
                        fnLog(error);
                    }
                });
            } else { // 已经填充当前页了
                console.log('msg ',2.2);
                pageNum++;
                console.log('已经填充一页了')
                $.ajax({
                    type: 'POST',
                    url: `${Config.baseDomain}${Config.pcScreen}`,
                    data: {
                        page: pageNum,
                    },
                    success: function(resData) {
                        if (resData.code === 1) {
                            // console.log(resData.message-list)
                            renderDom(resData.list);
                        }
                    },
                    error: function(error) {
                        fnLog(error);
                    }
                });

            }
        }
    }, 2000);

    // 右下角编号显示
    setInterval(function() {
        $('.message-item').each(function(index) {
            let num = $(this).index() + 1
            $(this).find('.corner .index').text(num);

            // 字体大小控制
            let txtLength = $(this).find('.message').text();
            if (txtLength.length >= 70) {
                $(this).find('.message').css({'font-size': '18px', 'line-height': '20px'});
            }
        })
    }, 50);


    // 是否自动滚动和自动滚动长度
    configScroll();
    function configScroll() {
        $.ajax({
            type: 'POST',
            url: `${Config.baseDomain}${Config.pcInfo}`,
            success: function(res) {
                let isLoop = res.isLoop; // 是否循环
                time = res.time*1000;
                autoBottom( time );
            },
            error: function(err) {
                console.log(err);
            } 
        });
    }

    // item点击
    $(document).on('click', '.message-item', function() {
        let index = $(this).index();
        let src = $(this).find('.avatar img').attr('src');
        let name = $(this).find('.name').text();
        let message = $(this).find('.message').text();

        $('.view-big').removeClass('hide');
        // $('.view-big').css({'width': $('.message-con-wrap').width() +'px', 'height': $('.message-con-wrap').height() +'px'});
        $('.view-big').find('.slide-left img').attr('src', src);
        $('.view-big').find('.title').text( name );
        $('.view-big').find('.info').text( message );
        $('.view-big').find('.index').text( $(this).index() + 1 );

        $('.view-big .close').on('click', function() {
            $('.view-big').addClass('hide');
            clearInterval( autoItemConTimer );
        });

        

        // 当详情弹出框显示的时候移入停止自动切换内容移除开始自动切换
        let isHide = $('.view-big').is(':hidden');
        if ( !isHide ) { // 显示的时候
            // 鼠标移开内容自动切换
            // console.log('info show');
            $('.viewport').on('mouseleave', function() {
                let curIndex = $('.view-big').find('.index').text() - 1;
                setTimeout(() => {
                    autoChangeItemCon( curIndex );
                }, 1000)
            });
            // 鼠标移入
            $('.viewport').on('mouseenter', function() {
                clearInterval( autoItemConTimer );
            });
        }
    });

    // item详情内容自动切换
    let autoItemConTimer;
    function autoChangeItemCon(index) {
        autoItemConTimer = setInterval(() => {
            // console.log('itemConChange');
            let curItemLen = $(document).find('.message-item').length;
            if ( index < curItemLen - 1 ) {
                index++;
            } else if( index == curItemLen - 1 ) { // 达到最后一个解释轮播
                clearInterval( autoItemConTimer );
            }

            let curItem = $(document).find('.message-item').eq( index );
            let src = curItem.find('.avatar img').attr('src');
            let name = curItem.find('.name').text();
            let message = curItem.find('.message').text();
            // $('.view-big').css({'width': $('.message-con-wrap').width() +'px', 'height': $('.message-con-wrap').height() +'px'});
            $('.view-big').find('.slide-left img').attr('src', src);
            $('.view-big').find('.title').text( name );
            $('.view-big').find('.info').text( message );
            $('.view-big').find('.index').text( index + 1 );
        }, 2000);
    }
    
    // 渲染dom
    function renderDom(arr) {
        // $('.header1 .num').text(arr.length);
        let lis = '';

        if (arr.length > 0) {
            arr.forEach((item, index) =>{
                // console.log(item.headimgurl);
                if ((item.nickname != null || item.nickname != undefined) && (item.headimgurl != null || item.nickname != undefined)) {
                    lis += `
                    <li class="message-item clearfix">
                        <div class="message-wrap-outer">
                            <div class="avatar-wrap fl">
                                <div class="avatar">
                                    <img src="${item.headimgurl}" alt="">
                                </div>
                            </div>
                            <div class="msg-info">
                                <div class="name">${item.nickname}</div>
                                <div class="message">${item.content}</div>
                            </div>
                            <div class="corner">
                                <div class="index">${pageNum+index}</div>
                            </div>
                        </div>
                    </li>
                    `
                } else if (item.headimgurl == null || item.headimgurl == undefined) {
                    console.log('erro load avatar')
                    lis += `
                    <li class="message-item clearfix" style="">
                        <div class="message-wrap-outer">
                            <div class="avatar-wrap fl">
                                <div class="avatar">
                                    <img src="http://wx.qlogo.cn/mmopen/6kA4xS3TFQEp3JYvcRrZmoJo…KlkI384icmCmrl8CztuJ3njAsb1QfBouq8zQzic6N9yyVEX/0" alt="">
                                </div>
                            </div>
                            <div class="msg-info">
                                <div class="name">${item.nickname}</div>
                                <div class="message">${item.content}</div>
                            </div>
                            <div class="corner">
                                <div class="index">${pageNum+index}</div>
                            </div>
                        </div>
                    </li>
                    `
                }
            })
            $('.message-con-wrap > .message-list').append(lis);
            setTimeout(() =>{
                $('.message-con-wrap > .message-list .message-item').addClass('show');
            }, 50);
        } else {
            console.log('No sign new person')
        }
    }
    // item 循环生成兼容性处理（避免没有头像问题）append()方法
    function itemRenderHar(arr) {
        if (arr.length > 0) {
            arr.forEach((item, index) =>{
                // console.log(item.headimgurl);
                if ((item.nickname != null || item.nickname != undefined) && (item.headimgurl != null || item.nickname != undefined)) {
                    lis += `
                        <li class="message-item clearfix" style="height:197.333px;">
                            <div class="message-wrap-outer">
                                <div class="avatar-wrap fl">
                                    <div class="avatar">
                                        <img src="${item.headimgurl}" alt="">
                                    </div>
                                </div>
                                <div class="msg-info">
                                    <div class="name">${item.nickname}</div>
                                    <div class="message">${item.content}</div>
                                </div>
                                <div class="corner">
                                    <div class="index">${pageNum+index}</div>
                                </div>
                            </div>
                        </li>
                    `
                } else if (item.headimgurl == null || item.headimgurl == undefined) {
                    console.log('erro load avatar')
                    lis += `
                        <li class="message-item clearfix" style="height:197.333px;">
                            <div class="message-wrap-outer">
                                <div class="avatar-wrap fl">
                                    <div class="avatar">
                                        <img src="http://wx.qlogo.cn/mmopen/6kA4xS3TFQEp3JYvcRrZmoJo…KlkI384icmCmrl8CztuJ3njAsb1QfBouq8zQzic6N9yyVEX/0" alt="">
                                    </div>
                                </div>
                                <div class="msg-info">
                                    <div class="name">${item.nickname}</div>
                                    <div class="message">${item.content}</div>
                                </div>
                                <div class="corner">
                                    <div class="index">${pageNum+index}</div>
                                </div>
                            </div>
                        </li>
                    `
                }
            })
            $('.message-con-wrap > .message-list').append(lis);
            setTimeout(() =>{
                $('.message-con-wrap > .message-list .message-item').addClass('show');
            }, 50);
        } else {
            console.log('No sign new person')
        }
    }

    // 滚动条到底部
    let currItemIndex = 0;
    let speed = 1;
    function autoBottom(time) {
        time = time || 2000;
        timer = setInterval(() => {
            // 滚动条一直显示在底部
            let itemLength = $('.message-con-wrap > .message-list .message-item').length;
            let itemHei = $('.message-con-wrap').height() / 3;
            // console.log(currItemIndex, itemHei, itemLength);
            if (currItemIndex <= itemLength ) {
                currItemIndex += speed;
                $('.message-con-wrap').scrollTop( itemHei * currItemIndex );
            } else {
                let listHeight = $('.message-con-wrap > .message-list').height() - 20;
            // console.log( listHeight );
                $('.message-con-wrap').scrollTop( listHeight );
            }
            console.log( currItemIndex, '准备到底部' );
        }, time);
    }
    // $('.viewport').on('mouseenter', function() {
    //     // console.log('timer', timer);
    //     clearInterval(timer);
    // });
    // $('.viewport').on('mouseleave', function() {
    //     autoBottom();
    // });

    // 自动高度
    setInterval(function() {    
        let screenHei = $(window).height();
        //                   
        let outerHei = ((screenHei * 0.9) * 0.9 - 40);
        let itmeHei = outerHei / 3;
        // console.log( outerHei / 3 );
        $('.message-con-wrap').height(outerHei + 'px');
        $('.message-con-wrap > .message-list > li').height((itmeHei - 20)  +'px');
    }, 50);


    // 控制按钮点击
    let isAuto = true;
    clickControlBar();
    function clickControlBar() {
        $('.c-footer .navbar.fr .item').on('click', function() {
            let index = $(this).index();
            switch (index) {
                case 0: // 点击了第一页
                    console.log('click第一页');
                    if (timer) clearInterval(timer);
                    $('.message-con-wrap').scrollTop( 0 );
                    if (isAuto) {
                        currItemIndex = 0;
                        autoBottom();
                    }
                    break;
                case 1: // 点击了上一页
                    console.log('click上一页');
                    if (timer) clearInterval(timer);
                    let messageConWrapHei1 = $('.message-con-wrap').height();
                    let nowScrollTop1 = $('.message-con-wrap').scrollTop();
                    let needScrollTop1 = nowScrollTop1 - messageConWrapHei1;
                    $('.message-con-wrap').scrollTop( needScrollTop1 );
                    if (isAuto) {
                        currItemIndex = Math.floor( $('.message-con-wrap').scrollTop() / ($('.message-con-wrap').height() / 3 ) );
                        autoBottom();
                    }
                    break;
                case 2: // 点击了开始/暂停
                    console.log('开始，暂停', isAuto);
                    if (!isAuto) {
                        currItemIndex = Math.floor( $('.message-con-wrap').scrollTop() / ($('.message-con-wrap').height() / 3 ) );
                        autoBottom();
                        // console.log('开始');
                        $(this).find('em').removeClass('pause').addClass('play');
                    } else {
                        clearInterval(timer);
                        // console.log('暂停');
                        $(this).find('em').removeClass('play').addClass('pause');
                    }
                    isAuto = !isAuto;
                    break;
                case 3: // 点击了下一页
                    console.log('click 下一页');
                    if (timer) clearInterval(timer);
                    let messageConWrapHei2 = $('.message-con-wrap').height();
                    let nowScrollTop2 = $('.message-con-wrap').scrollTop();
                    let needScrollTop2 = nowScrollTop2 + messageConWrapHei2;
                    $('.message-con-wrap').scrollTop( needScrollTop2 );
                    if (isAuto) {
                        currItemIndex = Math.floor( $('.message-con-wrap').scrollTop() / ($('.message-con-wrap').height() / 3 ) );
                        autoBottom();
                    }
                    break;
                case 4: // 点击了最后一页
                    console.log('click 最后一页');
                    if (timer) clearInterval(timer);
                    // 滚动条一直显示在底部
                    let listHeight = $('.message-con-wrap > .message-list').height();
                    $('.message-con-wrap').scrollTop( listHeight );
                    if (isAuto) {
                        currItemIndex = Math.floor( $('.message-con-wrap').scrollTop() / ($('.message-con-wrap').height() / 3 ) );
                        autoBottom();
                    }
                    break;            
            }
        })
    }

    // 鼠标中键滚动控制
    let isMidScroll = false;
    let handTriggerScroll = false;
    $('.viewport').on('mouseenter', function() {
        clearInterval(timer);

        // handTriggerScroll = true;
        
        //     $('.message-con-wrap').on('scroll', function() { // 如何区分是手动滚动还是定时器触发的呢？ 暂时未找到区分方法，改为划入终止定时器 划出开启
        //         // console.log('mid scroll');
        //         if ( handTriggerScroll ) {
        //             clearInterval(timer);
        //         }
        //         isMidScroll = true;
        //     });
        
    });
    $('.viewport').on('mouseleave', function() {
        // if ( isMidScroll ) {
        //     isMidScroll = false;
        //     handTriggerScroll = false;
        //     if ( isAuto ) {
        //         currItemIndex = Math.floor( $('.message-con-wrap').scrollTop() / ($('.message-con-wrap').height() / 3 ) );
        //         // console.log( '当前应该显示的索引', currItemIndex );
        //         autoBottom(3000);
        //     }
        // }
        if ( isAuto ) {
            currItemIndex = Math.floor( $('.message-con-wrap').scrollTop() / ($('.message-con-wrap').height() / 3 ) );
            // console.log( '当前应该显示的索引', currItemIndex );
            autoBottom(3000);
        }
    });
    
});