$(function() {
    let WantMaxVal = 12;
    let MaxVal;
    let MinVal = 1;
    let movePersonList;
    let inputVal;
    let selectIndex; // 当前选中的商品列表的索引

    // 奖品列表
    getInitGift();
    function getInitGift() {
        $.ajax({
            type: 'POST',
            url: `${Config.baseDomain}${Config.pcGetGift}`,
            success: function(resData) {
                // console.log(resData);
                if (resData.code == 1) {
                    renderGift(resData.gift);
                }
            },
            error: function(err) {
                console.log(err);
            }
        });
    };

    // 抽奖滚动用户头像
    getMovePerson();
    function getMovePerson() {
        $.ajax({
            type: 'POST',
            url: `${Config.baseDomain}${Config.pcMoveGift}`,
            // url: './js/pcMoveGift.json',
            success: function(resData) {
                // console.log( resData );
                if (resData.code == 1) {
                    movePersonList = resData.user;
                    MaxVal = movePersonList.length >= WantMaxVal ? WantMaxVal : movePersonList.length;    
                    joinPersonNum();
                }
            },
            error: function(err) {
                console.log(err);
            }
        })
    }

    function renderGift(arr) {
        if (arr.length > 0) {
            let lis = '';
            arr.forEach((item, index) => {
                lis += `
                    <li class="options" data-id="${item.id}" data-img="${item.picture}">${item.giftname}</li>
                `
            });
            $('.select-options').html(lis);
            itemClick();
        }
    }


    // 点击input操作
    $('.select-btn').on('click', function() {
        $('.select-options').removeClass('hide');
    });

    // 奖品列表点击
    function itemClick() {
        $('.select-options li').on('click', function() {
            let text = $(this).text();
            let dataImg = $(this).attr('data-img');
            let dataId = $(this).attr('data-id');

            // dataImg = `http://img01.taopic.com/160117/318752-16011F9334648.jpg`;
            $('.select-btn span').text( text );
            $('.select-options').toggleClass('hide');
            let img = `
                <img src="${Config.baseDomain}scene/${dataImg}">
            `
            // console.log(img);
            $('.award-img-wrapper').html(img)
            $('.lottery-num-inp').attr('data-id', dataId);
        });
    }

    // 参与人数控制（增加 减少按钮）
    // joinPersonNum();
    function joinPersonNum() {
        // 减少按钮
        $('.minus').on('click', function() {
            $('.twinkle-wrapper .default').addClass('hide');
            $('.twinkle-wrapper .item').removeClass('hide');

            inputVal = $('.lottery-num-inp').val();
            
            inputVal--;
            if (inputVal <= MinVal) {
                inputVal = MinVal
            }
            $('.lottery-num-inp').val(inputVal);
            renderJoinPerson(inputVal);
            console.log('减少');
        });

        $('.add').on('click', function() {
            $('.twinkle-wrapper .default').addClass('hide');
            $('.twinkle-wrapper .item').removeClass('hide');

            inputVal = $('.lottery-num-inp').val();
            inputVal++;
            if (inputVal >= MaxVal) {
                inputVal = MaxVal
            }
            $('.lottery-num-inp').val(inputVal);
            renderJoinPerson(inputVal);
            console.log('增加');
        });
    }

    // 增加参与的人数
    function renderJoinPerson(len) {
        if (len >= MaxVal) {
            len = MaxVal;
        }
        let person = '';
        for (let i = 0; i < len; i++) {
            person += `
                <div class="item more">
                    <div class="avatar">
                        <img src="./images/avatar_default.png" alt="" width="150" hegiht="150">
                    </div>
                    <div class="shadow"></div>
                    <div class="name">......</div>
                </div>
            `
        }
        $('.twinkle-wrapper').addClass('more').html(person);
    }

    let timer;
    // let a = movePersonList
    function auto() {
        timer = setInterval(function() {
            console.log('auto');
            // let a = [{"accountid":4,"nickname":"测试1","headimgurl":"http:\/\/wx.qlogo.cn\/mmopen\/6kA4xS3TFQEp3JYvcRrZmoJoqbfgLicXoSRmm4ZHNSAFUibvKlczVKlkI384icmCmrl8CztuJ3njAsb1QfBouq8zQzic6N9yyVEX\/0"},{"accountid":5,"nickname":"测试2","headimgurl":null},{"accountid":6,"nickname":"测试3","headimgurl":null},{"accountid":7,"nickname":"测试4","headimgurl":null},{"accountid":8,"nickname":"测试5","headimgurl":null},{"accountid":9,"nickname":"测试6","headimgurl":null},{"accountid":10,"nickname":"测试7","headimgurl":null},{"accountid":11,"nickname":"测试8","headimgurl":null},{"accountid":12,"nickname":"测试9","headimgurl":null},{"accountid":13,"nickname":"测试10","headimgurl":"http:\/\/wx.qlogo.cn\/mmopen\/6kA4xS3TFQEp3JYvcRrZmoJoqbfgLicXoSRmm4ZHNSAFUibvKlczVKlkI384icmCmrl8CztuJ3njAsb1QfBouq8zQzic6N9yyVEX\/0"},{"accountid":3,"nickname":"吾皇的迷妹","headimgurl":"http:\/\/wx.qlogo.cn\/mmopen\/97bicCOGcMuzQjTtqBRqhE6AkLQDM64H4O0XCeSxBxaYsvZL1EYTZiajSyEfQyiapolOMB5HDClriazzOPbSTU8TiaTZvt2Nb6sdl\/0"},{"accountid":0,"nickname":"测试11","headimgurl":null},{"accountid":0,"nickname":"测试12","headimgurl":null},{"accountid":0,"nickname":"测试13","headimgurl":null},{"accountid":0,"nickname":"测试14","headimgurl":null},{"accountid":0,"nickname":"测试15","headimgurl":null},{"accountid":0,"nickname":"测试16","headimgurl":null},{"accountid":0,"nickname":"测试17","headimgurl":null},{"accountid":0,"nickname":"测试18","headimgurl":null}];
            // console.log( getRandomArr(3, a) );
            let a = movePersonList;
            // console.log(movePersonList);
            let renderItemArr = getRandomArr(inputVal, a);
            renderItem(renderItemArr);
        }, 200);
    }
    
    // 随机得到指定长度的数组
    function getRandomArr(num, arr) {
        // console.log(arr);
        let copyArr = [];
        copyArr = copyArr.concat(arr);
        let arrLen;
        let resultArr = [];
        for (let i = 0; i < num; i++) {
            arrLen = copyArr.length;
            let startIndex = Math.random() * arrLen;
            let randomArr = copyArr.splice(startIndex, 1);
            resultArr.push(randomArr);
        }
        // console.log(resultArr);
        return resultArr;
    }

    // 渲染item
    function renderItem(arr) {
        if (arr.length > 0) {
            let items = '';
            for (let i = 0; i < arr.length; i++) {
                // console.log(arr[i][0].nickname);
                items += `
                <div class="item more people">
                    <div class="avatar">
                        <img src="${arr[i][0].headimgurl}" alt="" width="150" hegiht="150">
                    </div>
                    <div class="shadow"></div>
                    <div class="name">${arr[i][0].nickname}</div>
                </div>
                `
            }
            // console.log(items);
            $('.twinkle-wrapper').html( items );
        }
    }

    // 抽奖开关（抽奖按钮点击）
    let lotterySymbol = false; // 抽奖按钮开关
    let isWin = false; // 标记该奖品是否已经中奖（没用上）
    $('.lottery-btn').on('click', function() {
        if (!lotterySymbol) {
            auto();
            lotterySymbol = true;
            $('.lottery-btn').text('停止抽奖');
        } else{
            let giftid = $('.lottery-num-inp').attr('data-id');
            let number = $('.lottery-num-inp').val();

            lotterySymbol = false;

            $.ajax({
                type: 'POST',
                data: {
                    giftid: giftid,
                    number: number
                },
                url: `${Config.baseDomain}${Config.pcResultGift}`,
                success: function(resData) {
                    console.log( 'win', resData ); // 中奖结果
                    if (resData.code == 1) {
                        let resultArr = resData.win;
                        isWin = true;
                        $('.lottery-btn').text('开始抽奖');
                        clearInterval(timer);
                        renderWinItem( resultArr );
                    } else if ( resData.code == 0 ) {
                        isWin = true;
                        $('.lottery-btn').text('开始抽奖');
                        clearInterval(timer);
                        // alert( resData.msg );
                        new $.zui.Messager(resData.msg, {
                            icon: 'warning',
                            type: 'warning',
                            placement: 'center' // 定义显示位置
                        }).show();
                    }
                },
                error: function(err) {
                    console.log(err);
                }
            })
        }
    });

    function renderWinItem(arr) {
        // console.log(arr);
        if (arr.length > 0) {
            let items = '';

            arr.forEach((item) => {
                // console.log(item);
                items += `
                <div class="item">
                    <div class="avatar">
                        <img src="${item.headimgurl}" alt="" width="150" hegiht="150">
                    </div>
                    <div class="shadow"></div>
                    <div class="name">${item.nickname}</div>
                </div>
                `
            })
            $('.twinkle-wrapper').html( items );
        }
    }
});
  