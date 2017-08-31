export default {
    // Mobil
    "initGet": {"openid":"otnOEs5O0CEez3_d_yKXmIQVA4p0"}, // 获取用户openid
    "setContent": {"code":1,"msg":"消息发送成功"}, // 发送上墙消息
    "getVoteNo": {"code":0,"msg":"暂无投票"}, // 投票
    "getVoteHas": { // 已投过票
        "code": 2, 
        "vote": {
            "id": 2, 
            "title": "多选投票测试", 
            "type": 2
        }, 
        "option": [
            {
                "id": 25, 
                "option": "选项1", 
                "total": 0
            }, 
            {
                "id": 26, 
                "option": "选项2", 
                "total": 1
            }, 
            {
                "id": 27, 
                "option": "选项3", 
                "total": 1
            }, 
            {
                "id": 28, 
                "option": "选项4", 
                "total": 0
            }, 
            {
                "id": 29, 
                "option": "选项5", 
                "total": 0
            }, 
            {
                "id": 30, 
                "option": "选项6", 
                "total": 0
            }
        ]
    },
    "getVoteUn": { // 未投过票
        "code": 1, 
        "vote": {
            "id": 2, 
            "title": "多选投票测试", 
            "type": 2
        }, 
        "option": {
            "25": "选项1", 
            "26": "选项2", 
            "27": "选项3", 
            "28": "选项4", 
            "29": "选项5", 
            "30": "选项6"
        }
    },
    "submitVote": {"code":1,"msg":"投票成功！"},

    // PC
    "signWall": { // 签到墙
        "code": 1, 
        "count": 2, 
        "list": [
            {
                "nickname": "吾皇的迷妹", 
                "headimgurl": "http://wx.qlogo.cn/mmopen/97bicCOGcMuzQjTtqBRqhE6AkLQDM64H4O0XCeSxBxaYsvZL1EYTZiajSyEfQyiapolOMB5HDClriazzOPbSTU8TiaTZvt2Nb6sdl/0"
            }, 
            {
                "nickname": "啦啦啦啦啦", 
                "headimgurl": "http://wx.qlogo.cn/mmopen/6kA4xS3TFQEp3JYvcRrZmoJoqbfgLicXoSRmm4ZHNSAFUibvKlczVKlkI384icmCmrl8CztuJ3njAsb1QfBouq8zQzic6N9yyVEX/0"
            }
        ]
    },
    "getContent": { // 获取上墙消息
        "code": 1, 
        "count": 2, 
        "list": [
            {
                "nickname": "吾皇的迷妹", 
                "headimgurl": "http://wx.qlogo.cn/mmopen/97bicCOGcMuzQjTtqBRqhE6AkLQDM64H4O0XCeSxBxaYsvZL1EYTZiajSyEfQyiapolOMB5HDClriazzOPbSTU8TiaTZvt2Nb6sdl/0"
            }, 
            {
                "nickname": "啦啦啦啦啦", 
                "headimgurl": "http://wx.qlogo.cn/mmopen/6kA4xS3TFQEp3JYvcRrZmoJoqbfgLicXoSRmm4ZHNSAFUibvKlczVKlkI384icmCmrl8CztuJ3njAsb1QfBouq8zQzic6N9yyVEX/0"
            }
        ]
    },
    "gift": { // pc奖品信息获取
        "code": 1, 
        "gift": [
            {
                "id": 3, 
                "giftname": "kindle", 
                "picture": "/uploads/images/20170829/59a567a21104a.jpg"
            }, 
            {
                "id": 1, 
                "giftname": "小米手环", 
                "picture": "/uploads/images/20170829/59a5659d22dd1.jpg"
            }
        ]
    },
    "getUser": { // pc 抽奖滚动头像
        "code": 1, 
        "user": [
            {
                "accountid": 3, 
                "nickname": "吾皇的迷妹", 
                "headimgurl": "http://wx.qlogo.cn/mmopen/97bicCOGcMuzQjTtqBRqhE6AkLQDM64H4O0XCeSxBxaYsvZL1EYTZiajSyEfQyiapolOMB5HDClriazzOPbSTU8TiaTZvt2Nb6sdl/0"
            }, 
            {
                "accountid": 2, 
                "nickname": "啦啦啦啦啦", 
                "headimgurl": "http://wx.qlogo.cn/mmopen/6kA4xS3TFQEp3JYvcRrZmoJoqbfgLicXoSRmm4ZHNSAFUibvKlczVKlkI384icmCmrl8CztuJ3njAsb1QfBouq8zQzic6N9yyVEX/0"
            }
        ]
    },
    "getResult": { // pc 中奖信息获取
        "code": 1, 
        "win": [
            {
                "accountid": 6, 
                "nickname": "测试3", 
                "headimgurl": null
            }, 
            {
                "accountid": 12, 
                "nickname": "测试9", 
                "headimgurl": null
            }, 
            {
                "accountid": 11, 
                "nickname": "测试8", 
                "headimgurl": null
            }, 
            {
                "accountid": 4, 
                "nickname": "测试1", 
                "headimgurl": "http://wx.qlogo.cn/mmopen/6kA4xS3TFQEp3JYvcRrZmoJoqbfgLicXoSRmm4ZHNSAFUibvKlczVKlkI384icmCmrl8CztuJ3njAsb1QfBouq8zQzic6N9yyVEX/0"
            }, 
            {
                "accountid": 5, 
                "nickname": "测试2", 
                "headimgurl": null
            }
        ]
    },
    "getVoteResult": { // 获取投票情况
        "code": 1, 
        "vote": {
            "id": 2, 
            "title": "多选投票测试", 
            "type": 2, 
            "count": 1
        }, 
        "option": [
            {
                "id": 25, 
                "option": "选项1", 
                "total": 0
            }, 
            {
                "id": 26, 
                "option": "选项2", 
                "total": 1
            }, 
            {
                "id": 27, 
                "option": "选项3", 
                "total": 1
            }, 
            {
                "id": 28, 
                "option": "选项4", 
                "total": 0
            }, 
            {
                "id": 29, 
                "option": "选项5", 
                "total": 0
            }, 
            {
                "id": 30, 
                "option": "选项6", 
                "total": 0
            }
        ]
    }

}