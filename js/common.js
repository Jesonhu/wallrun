// let Cookie; // cookie.js

$(function() {
    // 二维码效果
    $('.qrcode-btn').on('click', function() {
        $('.qrcode-mod-con').removeClass('hide');
    });
    $('.qrcode-img').on('click', function() {
        $('.qrcode-mod-con').removeClass('hide');
    });
    $('.qrcode-mod-con').on('click', function() {
        $('.qrcode-mod-con').addClass('hide');
    });

    // 底部鼠标划入 划出效果
    $('.c-footer').on('mouseenter', function() {
        $(this).addClass('active');
    });
    $('.c-footer').on('mouseleave', function() {
        $(this).removeClass('active');
    });
    // 底部悬浮效果
    $('.c-footer .list > .item').on('mouseenter', function() {
        $(this).addClass('active')
        .siblings().removeClass('active');
    });
    $('.c-footer .list > .item').on('mouseleave', function() {
        $(this).removeClass('active');
    });
    // tooltip初始化
    // $('[data-toggle="tooltip"]').tooltip('show'); 全显示
    $('[data-toggle="tooltip"]').tooltip();
    // 内容页最后一个样式问题处理
    $('.c-footer .navbar.fr .item:last').on('mouseenter', function() {
        $(document).find('.c-footer .navbar.fr .tooltip:last').css('left', '125px');
    });

    // 加载完成效果
    // setTimeout(function() {
        
    // }, 1000);
});

let localDomain = 'http://192.168.0.58/';
let localRemoteDomain = 'http://';
let remoteDomain = 'http://weixin.shinycg.com/sites/';

var Config = {
    baseDomain: remoteDomain,
    
    // PC
    pcSkinBgImg: 'scene/public/index.php/index/screen/webBg', // 背景图片
    pcGetSignWall: 'scene/public/index.php/index/screen/signWall', // 签到
    pcScreen: 'scene/public/index.php/index/screen/getContent', // 消息上墙
    pcGetGift: 'scene/public/index.php/index/Lottery/gift', // 抽奖奖品
    pcMoveGift: 'scene/public/index.php/index/Lottery/getUser', // 滚动头像
    pcResultGift: 'scene/public/index.php/index/Lottery/getResult', // 抽奖结果

    pcGetVote: 'scene/public/index.php/index/screen/getResult', // 投票结果
    pcInfo: 'scene/public/index.php/index/screen/pcInfo', // 配置信息
    // Mobil
    moSkinBgImg: 'scene/public/index.php/index/screen/wepBg'
}

/**
 * 控制台 
 */
// 控制台函数
function fnLog(obj) {
    console.log(obj);
}


// 换肤
changeSkin();
function changeSkin() {
    $.ajax({
        type: 'POST',
        url: `${Config.baseDomain}${Config.pcSkinBgImg}`,
        success: function(resData) {
            if (resData.code === 1) {
                // console.log(resData);

                bgImg = `${Config.baseDomain}scene${resData.webbg}`;
                $('.wrapper.full-bg').css('background', `url('${bgImg}') center top no-repeat`);
                $('.blur-css3 .full-bg').css('background', `url('${bgImg}') no-repeat top center fixed`);
            }
        },
        error: function(error) {
            fnLog(error);
        }
    })
}

// 二维码显示
changeCode();
function changeCode() {
    $.ajax({
        type: 'POST',
        url: `${Config.baseDomain}${Config.pcInfo}`,
        success: function(resData) {
            if (resData.code === 1) {
                // console.log(resData.signcode);

                let signCode = `${Config.baseDomain}scene${resData.signcode}`;
                let wallCode = `${Config.baseDomain}scene${resData.wallcode}`;
                let useSignCode = signCode;
                // console.log(signCode);
                $('.alert-wrapper.sign > div').css('background-image', 'url('+ signCode +')');
                $('.alert-wrapper.vote > div').css('background-image', 'url('+ signCode +')');
                $('.alert-wrapper.message > div').css('background-image', 'url('+ wallCode +')');
                $('.qrcode-img > img').attr('src', wallCode);
            }
        },
        error: function(error) {
            fnLog(error);
        }
    })
}



/**
 * 全屏 
 */
// 判断各种浏览器，找到正确的方法
function launchFullscreen(element) {
    if(element.requestFullscreen) {
     element.requestFullscreen();
    } else if(element.mozRequestFullScreen) {
     element.mozRequestFullScreen();
    } else if(element.webkitRequestFullscreen) {
     console.log('webkit方式全屏');   
     element.webkitRequestFullscreen();
    } else if(element.msRequestFullscreen) {
     element.msRequestFullscreen();
    }
    console.log(element.requestFullscreen, element.mozRequestFullScreen, element.webkitRequestFullscreen, element.msRequestFullscreen);
    console.log(document.exitFullscreen, document.mozCancelFullScreen, document.webkitExitFullscreen);
}
// 判断浏览器种类
function exitFullscreen() {
    if(document.exitFullscreen) {
     document.exitFullscreen();
    } else if(document.mozCancelFullScreen) {
     document.mozCancelFullScreen();
    } else if(document.webkitExitFullscreen) {
     document.webkitExitFullscreen();
    }
}

function fullScreen() {
    console.log('全屏方法');
    var el = document.documentElement,
        rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullScreen,
        wscript;
 
    if(typeof rfs != "undefined" && rfs) {
        rfs.call(el);
        return;
    }
 
    if(typeof window.ActiveXObject != "undefined") {
        wscript = new ActiveXObject("WScript.Shell");
        if(wscript) {
            wscript.SendKeys("{F11}");
        }
    }
}
 
function exitFullScreen() {
    var el = document,
        cfs = el.cancelFullScreen || el.webkitCancelFullScreen || el.mozCancelFullScreen || el.exitFullScreen,
        wscript;
 
    if (typeof cfs != "undefined" && cfs) {
      cfs.call(el);
      return;
    }
 
    if (typeof window.ActiveXObject != "undefined") {
        wscript = new ActiveXObject("WScript.Shell");
        if (wscript != null) {
            wscript.SendKeys("{F11}");
        }
  }
}

let fullScreenSymbol = false;
let fullScreenLocalStorage;
let fullScreenLocalStorageStr = 'STORAGE_FULLSCREEN_KEY';

$('.fullScreenBar').on('click', function() {
    if (!fullScreenSymbol) { // 全屏
        launchFullscreen(document.documentElement);
        Cookie.setLocal({'isFullScreen': true});
        console.log('点击', 1);
    } else { // 退出全屏
        exitFullscreen();
        Cookie.setLocal({'isFullScreen': false});
        console.log('点击', 2);
    }
    fullScreenSymbol = !fullScreenSymbol;
});

// $(function() {
//     $(window).on('load', function() {
//         if ( Cookie.getLocal(fullScreenLocalStorageStr) ) fullScreenLocalStorage = Cookie.getLocal(fullScreenLocalStorageStr).isFullScreen;
//         if ( fullScreenLocalStorage ) { // 已经全屏
//             $('.fullScreenBar').trigger('click');
//             // launchFullscreen(document.documentElement);
//             // // fullScreenSymbol = !fullScreenSymbol;
//             // console.log('是否全屏', fullScreenLocalStorage, $(document));
//             // fullScreen();
//             // fullScreenSymbol = true;
//         }
//         // console.log('全屏', Cookie.getLocal('STORAGE_FULLSCREEN_KEY').isFullScreen );
//     })
// });

// 投票隐藏
$('.c-footer .navbar.fl .item').eq(3).hide();



