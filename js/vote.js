$(function() {
    function initSwiper() {
        new Swiper('.swiper-container', {
            // 如果需要前进后退按钮
            nextButton: '.vote-arrow.next',
            prevButton: '.vote-arrow.prev'
        });
    }
    // initSwiper();

    // 页面初始化
    let forMatData = [];
    function ajaxInit() {
        $.ajax({
            type: 'POST',
            url: `${Config.baseDomain}${Config.pcGetVote}`,
            success: function(resData) {
                // console.log(resData)
                if (resData.code == 0) {
                    alert('暂未投票')
                } else if (resData.code == 1) {
                    console.log(resData)
                    let forMatDataItem = {
                        voteid: resData.vote.id,
                        count: resData.vote.count,
                        title: resData.vote.title,
                        option: resData.option
                    };
                    forMatData.push(forMatDataItem);
                    // console.log(forMatData);
                    renderDom2(forMatData);
                    $('.loading-wrap').addClass('view-hide')
                    .siblings('.wrapper').removeClass('view-hide');
                }
            },
            error: function(error) {
                fnLog(error);
            }
        });
    }
    ajaxInit();

    function renderDom1(arr) {
        console.log(arr);
        if (arr.length > 0) {
            let lis = '';
            // arr.forEach((item, index) => {
            //     lis += `
            //         <li class="item swiper-slide">
            //         <!-- 签到、投票header -->
            //         <div class="header1 clearfix">
            //             <div class="title fl">
            //                 <div class="left">${item.title}</div>
            //                 <div class="right">
            //                         共
            //                         <span class="num">${item.count}</span>
            //                         人参与
            //                 </div>
            //             </div>
            //         </div>
            //         <div class="con-bd">
            //             <div class="vote-scrollbar-move">
            //                 <div class="vote-column">
            //                     <div class="vote-column-con">
            //                         <div class="vote-column-count">票</div>
            //                         <div class="vote-column-bar" style="height: 387.75px;"></div>
            //                     </div>
            //                     <div class="vote-column-title">有鸡</div>
            //                 </div>
            //             </div>
            //         </div>
            //     </li>
            //     `
            // })
            for (i = 0; i<arr.length;i++) {
                lis += `
                <li class="item swiper-slide">
                <!-- 签到、投票header -->
                <div class="header1 clearfix">
                    <div class="title fl">
                        <div class="left">${arr[i].title}</div>
                        <div class="right">
                                共
                                <span class="num">${arr[i].count}</span>
                                人参与
                        </div>
                    </div>
                </div>
                <div class="con-bd">
                    <div class="vote-scrollbar-move">
                `
                for (j = 0; i< arr[0].option.length; j++) {
                    if (j == (arr[0].option.length -1)) { // 最后一个
                        lis += `
                                    <div class="vote-column">
                                    <div class="vote-column-con">
                                        <div class="vote-column-count">${arr[0]}票</div>
                                        <div class="vote-column-bar" style="height: 387.75px;"></div>
                                    </div>
                                    <div class="vote-column-title">${arr[0]}</div>
                                </div>
                            </div>
                        </div>
                    </li>
                        `
                    } else {
                        lis += `
                        <div class="vote-column">
                            <div class="vote-column-con">
                                <div class="vote-column-count">${arr[0]}票</div>
                                <div class="vote-column-bar" style="height: 387.75px;"></div>
                            </div>
                            <div class="vote-column-title">${arr[0]}</div>
                        </div>
                        `
                    }
                }
            }

            $('.vote-con > .list').html(lis);
        }
    }
    function renderDom2(arr) {
        let optioins = arr[0].option
        let outerWrap = `
                <li class="item swiper-slide">
                    <div class="header1 clearfix">
                        <div class="title fl">
                            <div class="left">${arr[0].title}</div>
                            <div class="right">
                                    共
                                    <span class="num">${arr[0].count}</span>
                                    人参与
                            </div>
                        </div>
                    </div>
                    <div class="con-bd">
                        <div class="vote-scrollbar-move">
                        </div>
                    </div>
                </li>
                `
        $('.vote-con > .list').html(outerWrap);

        let items = ``;
        optioins.forEach((item, index) => {
            if (item.total == 0) {
                items += `
                <div class="vote-column">
                    <div class="vote-column-con">
                        <div class="vote-column-count">${item.total}票 0%</div>
                        <div style="height:90%;position:absolute;bottom:0;width:100%;">
                        <div class="vote-column-bar" style="height: 0%"></div>
                        </div>
                    </div>
                    <div class="vote-column-title">${item.option}</div>
                </div>
                `
            } else {
                let formatNum = (item.total / arr [0].count).toFixed(2);
                items += `
                <div class="vote-column">
                    <div class="vote-column-con">
                        <div class="vote-column-count">${item.total}票 ${ formatNum * 100}%</div>
                        <div style="height:90%;position:absolute;bottom:0;width:100%;">
                        <div class="vote-column-bar" style="height: ${(item.total / arr[0].count)*100}%"></div>
                        </div>
                    </div>
                    <div class="vote-column-title">${item.option}</div>
                </div>
                `
            }
        })
        $('.vote-con > .list').find('.vote-scrollbar-move').html(items);

        initSwiper();
    }
});