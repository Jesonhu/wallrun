$(function() {
    // 页面初始化
    let pageNum = 0; // ajax请求的页码
    let nowItmes; // 当前items总数即总共的签到人数
    let onePage = 18; // 每页页码的数量18（每页最多可以显示的数量）
    let nowResCount; // 当前页ajax返回了多少条数据
    let listHeight;
    let qrcode;
    let timer;
    /** 
     * 当前每个签到的总数 $('.signin-con > .list .item').length -----a
     * 每页总数 18 ----b
     *  a / b 获取商的整数部分，如果有整数 下次请求整数 + 1，如果没有整数，请求1
     * 但我是append还是html()？
     */
    setInterval(function() {
        if (pageNum == 0) { // 第一次ajax请求
            console.log('sign ',1);

            $('.signin-con > .list').html();
            pageNum++;
            $.ajax({
                type: 'POST',
                url: `${Config.baseDomain}${Config.pcGetSignWall}`,
                data: {
                    page: pageNum,
                },
                success: function(resData) {
                    if (resData.code === 1) {
                        // console.log(resData)

                        // 渲染dom--初始清空list 使用html()
                        renderDom(resData.list);
                        function renderDom(arr) {
                            $('.header1 .num').text(arr.length);
                            let lis = '';

                            if (arr.length > 0) {
                                arr.forEach((item) =>{
                                    // console.log(item.headimgurl);
                                    if ((item.nickname != null || item.nickname != undefined) && (item.headimgurl != null || item.nickname != undefined)) {
                                        lis += `
                                        <li class="item">
                                            <div class="item-img" style="background-image:url('${item.headimgurl}')"></div>
                                            <div class="item-text">${item.nickname}</div>
                                        </li>
                                        `
                                    } else if (item.headimgurl == null || item.headimgurl == undefined) {
                                        console.log('erro load avatar')
                                        lis += `
                                        <li class="item">
                                            <div class="item-img" style="background-image:url('http://wx.qlogo.cn/mmopen/6kA4xS3TFQEp3JYvcRrZmoJo…KlkI384icmCmrl8CztuJ3njAsb1QfBouq8zQzic6N9yyVEX/0')"></div>
                                            <div class="item-text">${item.nickname}</div>
                                        </li>
                                        `
                                    }
                                })
                                $('.signin-con > .list').html(lis);
                                setTimeout(() =>{
                                    $('.signin-con > .list .item').addClass('show');
                                }, 50);
                            } else {
                                console.log('初始-数组为空');
                            }
                        }
                    }
                },
                error: function(error) {
                    fnLog('ajax error');
                }
            });
        } else { // 以后的ajax请求
            nowItmes = $('.signin-con > .list > .item').length;
            
            integers = Math.floor( nowItmes / onePage );
            console.log(nowItmes);
            console.log(integers < pageNum);
            console.log(integers +','+ pageNum);

            $('.header1 .num').text( nowItmes ); // 当前title应该显示的签到总数
            if (integers < pageNum) { // 当前数据没有填充当前页
                console.log('sign ',2.1);
                $.ajax({
                    type: 'POST',
                    url: `${Config.baseDomain}${Config.pcGetSignWall}`,
                    data: {
                        page: pageNum,
                    },
                    success: function(resData) {
                        if (resData.code === 1) {
                            
                            let nowRes = resData.list; // 当前返回的数量
                            let isResCountMoreSymbol = false; // 是否返回的数据大于当前页数量标记
                            let resCountMoreLen; // 返回的数据多出来多少条

                            // console.log(resData.list)
                            nowResCount = resData.list.length;

                            // 判断当前返回的数据是否大于当前页的数量 
                            // 每次返回的数量 [0, 18]
                            // 当前页显示的数量  nowItmes / pageNum
                            resCountMoreLen = (nowResCount - (nowItmes / pageNum));
                            isResCountMoreSymbol = resCountMoreLen > 0 ? true : false;
                            // 当前返回的数量-当前页显示的数量 > 0 说明返回的数量多些 
                            // 当前返回的数量-当前页显示的数量 = 0 说明返回的数量一样（没新人签到）

                            if (!isResCountMoreSymbol) { // 如果当前返回的数量不大于当前页显示的数量 => 直接返回不再渲染dom
                                return;
                            } else { // 返回的数量大于当前页显示的数量 => 多出来的数量追加到一页里面
                                // 当前 [1, 2]
                                // 返回 [1, 2, 3]
                                let nowIndex = (nowItmes / pageNum); // 当前显示的item数量在每页18条中的索引+1
                                let showRederArr = nowRes.splice(nowIndex, resCountMoreLen);
                                // console.log(showRederArr);
                                // 渲染dom--append() 方式
                                renderDom(showRederArr);
                                function renderDom(arr) {
                                    
                                    let lis = '';

                                    if (arr.length > 0) {
                                        arr.forEach((item) =>{
                                            // console.log(item.headimgurl);
                                            if ((item.nickname != null || item.nickname != undefined) && (item.headimgurl != null || item.nickname != undefined)) {
                                                lis += `
                                                <li class="item">
                                                    <div class="item-img" style="background-image:url('${item.headimgurl}')"></div>
                                                    <div class="item-text">${item.nickname}</div>
                                                </li>
                                                `
                                            } else if (item.headimgurl == null || item.headimgurl == undefined) {
                                                console.log('erro load avatar')
                                                lis += `
                                                <li class="item">
                                                    <div class="item-img" style="background-image:url('http://wx.qlogo.cn/mmopen/6kA4xS3TFQEp3JYvcRrZmoJo…KlkI384icmCmrl8CztuJ3njAsb1QfBouq8zQzic6N9yyVEX/0')"></div>
                                                    <div class="item-text">${item.nickname}</div>
                                                </li>
                                                `
                                            }
                                        })
                                        $('.signin-con > .list').append(lis);
                                        setTimeout(() =>{
                                            $('.signin-con > .list .item').addClass('show');
                                        }, 50);
                                    } else {
                                        console.log('No sign new person')
                                    }
                                }
                            }
                        }
                    },
                    error: function(error) {
                        fnLog('ajax error');
                    }
                });
            } else { // 已经填充当前页了
                console.log('sign ',2.2);
                pageNum++;
                console.log('已经填充一页了');
                $.ajax({
                    type: 'POST',
                    url: `${Config.baseDomain}${Config.pcGetSignWall}`,
                    data: {
                        page: pageNum,
                    },
                    success: function(resData) {
                        if (resData.code === 1) {
                            // console.log(resData.list)
                            renderDom(resData.list);
                        }
                    },
                    error: function(error) {
                        fnLog('ajax error');
                    }
                });

            }

            
        }
    }, 2000);

    // 滚动条到底部
    autoBottom();
    function autoBottom() {
        timer = setInterval(() => {
            // 滚动条一直显示在底部
            let itemHei = $('.signin-con > .list')
            // console.log( listHeight );
            console.log('scrollTop');
            $('.signin-con').scrollTop( listHeight );
        }, 500);
    }
    $('.viewport').on('mouseenter', function() {
        clearInterval(timer);
    });
    $('.viewport').on('mouseleave', function() {
        autoBottom();
    });
    
    // 渲染dom
    function renderDom(arr) {
        // $('.header1 .num').text(arr.length);
        let lis = '';

        if (arr.length > 0) {
            arr.forEach((item) =>{
                // console.log(item.headimgurl);
                if ((item.nickname != null || item.nickname != undefined) && (item.headimgurl != null || item.nickname != undefined)) {
                    lis += `
                    <li class="item">
                        <div class="item-img" style="background-image:url('${item.headimgurl}')"></div>
                        <div class="item-text">${item.nickname}</div>
                    </li>
                    `
                } else if (item.headimgurl == null || item.headimgurl == undefined) {
                    console.log('erro load avatar')
                    lis += `
                    <li class="item">
                        <div class="item-img" style="background-image:url('http://wx.qlogo.cn/mmopen/6kA4xS3TFQEp3JYvcRrZmoJo…KlkI384icmCmrl8CztuJ3njAsb1QfBouq8zQzic6N9yyVEX/0')"></div>
                        <div class="item-text">${item.nickname}</div>
                    </li>
                    `
                }
            })
            $('.signin-con > .list').append(lis);
            setTimeout(() =>{
                $('.signin-con > .list .item').addClass('show');
            }, 50);
        } else {
            console.log('No sign new person')
        }
    }
});