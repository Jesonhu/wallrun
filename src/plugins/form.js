export const isPhone = (value) => /^1(3|4|5|7|8)\d{9}$/.test(value) // 手机号验证
export const isUserName = (value) => /^[\u4e00-\u9fa5 ]{2,20}$/.test(value) // 姓名验证

