/**
 * Created by zero.zhu
 * 类型验证
 */
'use strict'

const REGEXP = {
    CELLPHONE: /^0?(13[0-9]|15[0-9]|17[0-9]|18[0-9]|14[0-9]|0?85[23])[0-9]{8}$/,
    // PHONE: /^([0-9]{3,4}(\-\|)?)?[0-9]{7,8}$/,
    PHONE: /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/,
    MOBILE: /^[1][0-9]\d{9}$|^([5|6|7|8|9])\d{7}$|^[0][9]\d{8}$|^[6]([8|6])\d{5}$/, // 支持大陆，香港，台湾，澳门
    // MOBILE: /^[1][0-9]\d{9}$|^([0-9])\d{5,9}$/, // 支持大陆(11位)，其它数字5-10位
    // MOBILE: /^[1][0-9]\d{9}$|^\d{5,11}$/, // 支持大陆(11位)，非大陆（数字5-11位）
    EMAIL: /^\w+((-\w+)|(.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/,
    NUMBER: /^[0-9](\d+)?(\.\d{1,3})?$/,
    // PASSWORD: /^(?=.*[a-z0-9A-Z])(?=.*\d)(?=.*~!@#$%^&*()_+`\-={}\[\]:";'<>?,.\/).{6,16}$/,
    PASSWORD: /^(?=.*[a-zA-Z~!@#$%^&*()_+`\-={}[\]:";'<>?,./])(?=.*\d).{6,16}$/, // 字符+数字[特殊字符]
    INTEGER: /^\d+$/,
    AMOUNT: /^(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d{2})?$/, // 金额，支持千分位，小数点后两位
    URL: /^([a-zA-Z]+:\/\/)?([a-zA-Z0-9\-.]+)([-\w ./?%&=:]*)$/,
    // IDCARD: /^\d{6}(\d{4})(\d{2})(\d{2})\d{3}[0-9x]$/i, // 18位
    IDCARD: /(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$)|(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)/i, // 支持18位和15位
    ID_NUMBER: /^[0-9]\d*$/,
    CHINESE_NAME: /^[\u4e00-\u9fa5a-z/]{1,30}$/i,
    ENGLISH_NAME: /^[a-z][a-z ]+(\s*\/\s*[a-z ]+)?$/i,
    // USER_NAME: /^([a-zA-Z]+[a-z0-9A-Z])|(^[0-9]+[a-zA-Z]+[a-zA-Z0-9])+$/,
    USER_NAME: /^[a-z0-9A-Z.]+$/,
    STOCKNO: /^[a-z0-9A-Z]+$/,
    DATE: /^\d{4}(-|\/|.)\d{1,2}\1\d{1,2}$/ // 支持2018-01-01 和2018-1-01
}

function validate (text, regexp, isTrim) {
    if (isTrim) {
        text = text === null || typeof text === 'undefined' ? '' : (text + '').trim()
    }
    return regexp.test(text)
}

export default {
    REGEXP: REGEXP,

    isIdcard (text, isTrim) { return validate(text, this.REGEXP.IDCARD, isTrim) },
    isCellphone (text, isTrim) { return validate(text, this.REGEXP.CELLPHONE, isTrim) },
    isPhone (text, isTrim) { return validate(text, this.REGEXP.PHONE, isTrim) },
    isMobile (text, isTrim) { return validate(text, this.REGEXP.MOBILE, isTrim) },
    isEmail (text, isTrim) { return validate(text, this.REGEXP.EMAIL, isTrim) },
    isNumber (text, isTrim) { return validate(text, this.REGEXP.NUMBER, isTrim) },
    isPassword (text, isTrim) { return validate(text, this.REGEXP.PASSWORD, isTrim) },
    isInteger (text, isTrim) { return validate(text, this.REGEXP.INTEGER, isTrim) },
    isEmpty (text) { return (text === null || typeof text === 'undefined') ? true : !(text + '').trim() },
    isUrl (text, isTrim) { return validate(text, this.REGEXP.URL, isTrim) },
    isStockNo (text, isTrim) { return validate(text, this.REGEXP.STOCKNO, isTrim) },
    isChineseName (text, isTrim) { return validate(text, REGEXP.CHINESE_NAME, isTrim) },
    isEnglishName (text, isTrim) { return validate(text, REGEXP.ENGLISH_NAME, isTrim) }
}
