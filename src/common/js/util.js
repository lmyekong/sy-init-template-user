/**
 * Created by zero.zhu
 * util.js 工具类方法
 */

'use strict'

import moment from 'moment'
import CryptoJS from 'crypto-js'

import storage from './storage'
const PACKAGE = require('../../../package')

const util = {
    isIOS () {
        return !!window.navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
    },
    isWeiXin () {
        let ua = window.navigator.userAgent.toLowerCase()
        if (ua.match(/MicroMessenger/i) === 'micromessenger') {
            return true
        } else {
            return false
        }
    },
    // 浏览器类型
    browserType () {
        let userAgent = navigator.userAgent
        if (userAgent.indexOf('MicroMessenger') > -1) { // 微信内置浏览器
            return 'MicroMessenger'
        } else if (userAgent.indexOf('QQ') > -1) { // QQ内置浏览器
            return 'QQ'
        } else if (userAgent.indexOf('Chrome') > -1) {
            return 'Chrome'
        } else if (userAgent.indexOf('Opera') > -1) {
            return 'Opera'
        } else if (userAgent.indexOf('Firefox') > -1) {
            return 'Firefox'
        } else if (userAgent.indexOf('Safari') > -1) {
            return 'Safari'
        } else if (userAgent.indexOf('MSIE') > -1) {
            return 'IE'
        } else if (userAgent.indexOf('Trident') > -1) {
            return 'Edge'
        } else {
            return '未定义:' + userAgent
        }
    },

    // 数据加密
    base64 (param) {
        // if (param) {
        //   Object.keys(param).forEach((key) => {
        //     if (param[key] instanceof Array) {
        //       param[key] = param[key].join(',') // 数组自动转换
        //     }
        //   })
        // }

        const
            str = '1234567890123456',
            timestamp = new Date().getTime() + '',
            sendData = CryptoJS.enc.Utf8.parse(JSON.stringify(param || {})),
            key = CryptoJS.enc.Utf8.parse(str),
            iv = CryptoJS.enc.Utf8.parse(str),
            encrypted = CryptoJS.AES.encrypt(sendData, key, {
                iv: iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            }),
            bizContent = CryptoJS.enc.Base64.stringify(encrypted.ciphertext),
            signStr = `${str}appType000002bizContent${bizContent}timestamp${timestamp}version${PACKAGE.version}${str}`,
            loginInfo = storage.user || {}

        let data = {
            appType: '000002',
            bizContent: bizContent,
            sign: CryptoJS.SHA1(signStr).toString(),
            timestamp: timestamp,
            token: loginInfo.token || '',
            version: PACKAGE.version
        }

        return data
    },
    addEvent (element, eType, handle, bol) {
        if (element.addEventListener) { // 如果支持addEventListener
            element.addEventListener(eType, handle, bol)
        } else if (element.attachEvent) { // 如果支持attachEvent
            element.attachEvent('on' + eType, handle)
        } else { // 否则使用兼容的onclick绑定
            element['on' + eType] = handle
        }
    },
    removeEvent (element, eType, handle, bol) {
        if (element.addEventListener) {
            element.removeEventListener(eType, handle, bol)
        } else if (element.attachEvent) {
            element.detachEvent('on' + eType, handle)
        } else {
            element['on' + eType] = null
        }
    },
    loadScript (url, callback) {
        let script = document.createElement('script')
        script.type = 'text/javascript'
        if (script.readyState) { // IE
            script.onreadystatechange = function () {
                if (script.readyState === 'loaded' || script.readyState === 'complete') {
                    script.onreadystatechange = null
                    callback()
                }
            }
        } else { // Others: Firefox, Safari, Chrome, and Opera
            script.onload = function () {
                callback()
            }
        }
        script.src = url
        document.body.appendChild(script)
    },
    arrUq (array) {
        if (!array || !array.length) return []
        return Array.from(new Set(array))
    },
    params (objs = {}) {
        let result = []
        for (let key in objs) {
            if (objs.hasOwnProperty(key)) {
                let str = (objs[key] !== undefined) ? objs[key] : ''
                result.push(key + '=' + encodeURIComponent(str))
            }
        }
        return result.join('&')
    },
    // params: qs.stringify,
    urlToObject (url) {
        url = url || location.search
        let urlObject = {}
        if (/\?/.test(url)) {
            let urlString = url.substring(url.indexOf('?') + 1)
            let urlArray = urlString.split('&')
            for (let i = 0, len = urlArray.length; i < len; i++) {
                let urlItem = urlArray[i]
                let item = urlItem.split('=')
                urlObject[item[0]] = decodeURIComponent(item[1])
            }
        }
        return urlObject
    },
    numberPrefix (val, num) {
        num = num || 2
        return (new Array(num).join('0') + val).slice(-num)
    },
    // 隐藏敏感信息，比如证件号，手机号，
    substrNumber (val, fix = '*', s = 3, e = 3) {
        if (!val) return ''
        try {
            e = val.length < 6 ? 1 : e
            let len = val.length - (s + e)
            len = len < 1 ? 1 : len
            let str = new Array(len + 1).join(fix)
            return val.substr(0, s) + str + val.substr(s + len)
        } catch (e) {
            return val
        }
    },
    formatDate (val, format = 'YYYY-MM-DD') {
        if (!val) return ''
        return moment(val).format(format)
    },
    replaceAll (val, oldStr, newStr) {
        if (!val) return ''
        return val.split(oldStr).join(newStr)
    },
    getWeek (date) {
        if (!date) return ''
        const
            format = 'YYYY-MM-DD',
            today = moment(moment().format(format)),
            d = moment(date),
            weeks = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
            labels = ['今天', '明天', '后天'],
            diffDay = d.diff(today, 'days')

        if (diffDay >= 0 && diffDay < 3) {
            return labels[diffDay]
        } else {
            return weeks[d.day()]
        }
    },
    // 获取dom绝对位置
    getOffset (elem) {
        if (!elem) {
            return
        }

        if (!elem.getClientRects().length) {
            return { top: 0, left: 0 }
        }

        const rect = elem.getBoundingClientRect()

        const doc = elem.ownerDocument
        const docElem = doc.documentElement
        const win = doc.defaultView
        return {
            top: rect.top + win.pageYOffset - docElem.clientTop,
            left: rect.left + win.pageXOffset - docElem.clientLeft
        }
    },
    hasClass (el, cls) {
        if (!el || !cls) return false
        if (cls.indexOf(' ') !== -1) throw new Error('className should not contain space.')
        if (el.classList) {
            return el.classList.contains(cls)
        } else {
            return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1
        }
    },
    addClass (el, cls) {
        if (!el) return
        let curClass = el.className
        let classes = (cls || '').split(' ')

        for (let i = 0, j = classes.length; i < j; i++) {
            let clsName = classes[i]
            if (!clsName) continue

            if (el.classList) {
                el.classList.add(clsName)
            } else {
                if (!util.hasClass(el, clsName)) {
                    curClass += ' ' + clsName
                }
            }
        }
        if (!el.classList) {
            el.className = curClass
        }
    },
    removeClass (el, cls) {
        if (!el || !cls) return
        let classes = cls.split(' ')
        let curClass = ' ' + el.className + ' '

        for (let i = 0, j = classes.length; i < j; i++) {
            let clsName = classes[i]
            if (!clsName) continue

            if (el.classList) {
                el.classList.remove(clsName)
            } else {
                if (util.hasClass(el, clsName)) {
                    curClass = curClass.replace(' ' + clsName + ' ', ' ')
                }
            }
        }
        if (!el.classList) {
            el.className = curClass.trim()
        }
    },

    // 默认格式化带千分位，t可选
    numFormat (num, t) {
        if (parseFloat(num) === 0) return 0
        if (!num) return ''
        // num = Number(num).toFixed(2) // toFixed会4舍5入
        num = Math.floor(num * 100) / 100
        return t === false ? num : num.toString().replace(/\d+/, function (n) {
            return n.replace(/(\d)(?=(\d{3})+$)/g, function ($1) {
                return $1 + ','
            })
        })
    },
    checkFile (opt) {
        // 文件类型和大小检测
        const file = Object.assign({
            size: '',
            name: '',
            maxsize: 2 * 1024 * 1024,
            suffix: ['jpg', 'jpeg', 'png', 'gif', 'bmp']
        }, opt)

        let fileSuffix = file.name.slice(file.name.lastIndexOf('.') + 1)
        if (fileSuffix) fileSuffix = fileSuffix.toLowerCase()
        if (!file.size) return true // 低版本ie拿不到size，直接跳过验证
        return file.maxsize > file.size && fileSuffix && file.suffix.includes(fileSuffix)
    },
    // 小数转换为百分数
    present (val) {
        if (val) {
            val = parseFloat(val)
            return (Math.round(val * 10000) / 100).toFixed(2)
        } else {
            return (parseFloat(val) === 0) ? 0 : ''
        }
    },
    // 判断是否为三位或三位以上小数
    isDecimal (val) {
        val = String(val)
        const splitArr = val.split('.')
        if (splitArr[1] && splitArr[1].length >= 3) {
            return splitArr[0] + '.' + splitArr[1].substring(0, 2)
        }
        return val
    },
    /**
   * 获取字符长度
   *
   * @param {any} str 字符
   * @param {boolean} [t=true] 是否中文显示为2个字符，默认为true
   * @returns
   */
    getLen (str, t = true) {
        if (str == null) return 0;
        (typeof str !== 'string') && (str += '')
        return (t) ? str.replace(/[^\\x00-\xff]/g, '00').length : str.length
    },
    /**
   * 字符串超长截取
   *
   * @param {any} str 字符，必须
   * @param {any} max 最长限制，必须
   * @param {string} [suffix='...'] 后缀，可选
   * @returns 字符+后缀
   */
    interception (str, max, suffix = '...') {
        if (str == null) return '';
        (typeof str !== 'string') && (str += '')
        let len = str.match(/[^\\x00-\xff]/g)
        len = str.length - (len && len.length > 0 ? len.length * 2 : 0)
        return util.getLen(str) > max ? str.slice(0, len) : str
    },
    /**
     * 数字金额大写转换(可以处理整数,小数,负数)
     *
     * @param {*} n
     * @returns 大写汉字
     */
    smalltoBIG (n, min = 10000) {
        n && (n = util.replaceAll(n, ',', ''))
        if (!n || n < min || n < 0) return ''
        if (n > 999999999999) return '金额大于千亿'
        var fraction = ['角', '分']
        var digit = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']
        var unit = [ ['元', '万', '亿'], ['', '十', '百', '千'] ]
        var head = n < 0 ? '欠' : ''

        n = Math.abs(n)
        // console.log(n)
        var s = ''

        for (var i = 0; i < fraction.length; i++) {
            s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '')
        }
        s = s || '整'
        n = Math.floor(n)

        for (let i = 0; i < unit[0].length && n > 0; i++) {
            var p = ''
            for (var j = 0; j < unit[1].length && n > 0; j++) {
                p = digit[n % 10] + unit[1][j] + p
                n = Math.floor(n / 10)
            }
            s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s
        }
        return head + s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整')
    }
}

export default util
