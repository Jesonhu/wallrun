/**
 *  api 接口 
 */
import config from './index'
const domain = config.BASE_URL // 主域名

const host = {
    domain: domain,
    indexUrl: `${domain}/scene/public/index.php/index/index/index`,

    // 签到页面
    signType: `${domain}/scene/public/index.php/index/sign/signType`,
    signIn: `${domain}/scene/public/index.php/index/sign/signIn`, // 直接签到
    signInExtra: `${domain}/scene/public/index.php/index/sign/signInExtra`, // 表单页面签到提交

    // 消息上墙手机内容发送
    wallsedCon: `${domain}/scene/public/index.php/index/wall/setContent`,

    // 投票墙
    getVote: `${domain}/scene/public/index.php/index/Vote/getVote`,
    resultVote: `${domain}/scene/public/index.php/index/Vote/submitVote`
}

export default host