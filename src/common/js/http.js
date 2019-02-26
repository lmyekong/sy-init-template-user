'use strict'

import axios from 'axios'
// import jsCookie from 'js-cookie';
import CryptoJS from 'crypto-js'
// import qs from 'querystring';

import $message from 'element-ui/lib/message'
import $loading from 'element-ui/lib/loading'
import storage from './storage'
import api from '@/config/api'

const PACKAGE = require('../../../package')

// 数据加密
function base64 (param) {
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
};

// 申请一个新的http实例
const instance = axios.create({
    baseURL: api,
    // headers: {
    //   'X-Requested-With': 'XMLHttpRequest',
    //   'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    // },
    method: 'post',
    timeout: 60000, // 设置超时时间为60秒
    validateStatus (status) {
        return (status >= 200 && status < 300) || status === 304
    },
    toastDuration: 3000,
    errBack: false // 接口错误是否自动回退上一个页面
    // transformRequest: [function (data) { // 解决传递数组变成对象的问题
    //   Object.keys(data).forEach((key) => {
    //     if (data[key] instanceof Array) {
    //       data[key] = data[key].join(',') // 这里必须使用内置JSON对象转换
    //     }
    //   })
    //   data = qs.stringify(data) // 这里必须使用qs库进行转换
    //   return data;
    // }],
    // transformResponse(data) {
    //   return JSON.parse(data);
    // }
})

let loading
let nonce = Date.now()
const
    rts = /([?&])_=[^&]*/,
    rquery = (/\?/)

// 添加请求拦截器
instance.interceptors.request.use(options => {
    let url = options.url
    if (url.indexOf('/') !== 0) {
        url = '/' + url
    }
    options.url = '/erp' + url

    // 遮罩，默认不显示菊花
    if (options.mask) {
        // 这里写菊花转
        loading = $loading.service({
            lock: false,
            text: 'Loading...',
            spinner: 'icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
        })
        delete options.mask
    }

    // const contentType = headers['Content-Type'];
    // if (options.type === 'array') {
    //   options.data = qs.stringify(options.data, { indices: false });
    //   delete options.type;
    // }

    // 是否要设置token
    // if (options.token !== false) {
    //   // headers['x-auth-token'] = '69df6954-30d0-4393-8fb6-a47658e1282d';
    //   headers['x-auth-token'] = jsCookie.get('x-auth-token') || '';
    //   delete options.token;
    // }

    // 防止页面缓存
    if (!options.method || (options.method.toLocaleLowerCase() === 'get' && !options.cache)) {
        url = rts.test(url) ? url.replace(rts, '$1_=' + nonce++) : url + (rquery.test(url) ? '&' : '?') + '_=' + nonce++
        delete options.cache
    }

    // test
    console.log('ajax:' + options.url, JSON.parse(JSON.stringify(options.data || {})))
    options.data = base64(options.data)

    // 简化类型设置
    const headers = options.headers = options.headers || {}
    if (options.type === 'json') {
        headers['Content-Type'] = 'application/json; charset=UTF-8'
        delete options.type
    }
    if (options.file) {
        headers['Content-Type'] = 'multipart/form-data'
        headers['Accept'] = '*/*'
        // 上传文件
        let formData = new FormData()
        for (const key in options.data) {
            formData.append(key, options.data[key])
        }
        for (const key in options.file) {
            if (options.file.hasOwnProperty(key)) {
                formData.append(key, options.file[key])
            }
        }

        options.data = formData

        delete options.file
    }

    return options
}, (error) => {
    // 错误了要把菊花停下来
    if (loading) loading.close()
    return Promise.reject(error)
})

// 响应拦截器
instance.interceptors.response.use((res) => {
    // 成功了要把菊花停下来
    if (loading) loading.close()
    const data = res.data
    // 获取错误状态码
    switch (parseInt(data.code, 10)) {
        case 201:
        case 100004:

            if (!data.data && res.config.toast !== false) $message.error(data.message)
            if (res.config.errBack) {
                setTimeout(() => { window.history.back() }, 1000)
            }
            console.error(new Error(data.message))
            return Promise.reject(data)
        case 100007:
            // 清空登录信息
            storage.user = null

            $message.error('你未登录或登录失效，请重新登录')
            let thisUrl = window.location.href
            if (location.pathname !== '/login') {
                setTimeout(() => { location.href = '/login?backto=' + encodeURIComponent(thisUrl) }, 200)
            }
            return Promise.reject(new Error(data.message))
        case 100403:
            $message.error('您无权限访问该页面')
            // setTimeout(() => { location.href = '/'; }, 200);
            return Promise.reject(new Error(data.message))
        default:
            return data
    }
}, (error) => {
    // 错误了要把菊花停下来
    if (loading) loading.close()
    const response = error.response
    if (response) {
        let
            data = response.data,
            status = response.status

        console.error(error.config.url, JSON.stringify(data))
        let errMessage = data.message || '未知异常'
        switch (status) {
            case 500:
                // let code = +data.code;
                errMessage = '服务器开小差了，请稍候再试'
                break
            default:
                errMessage = '接口请求失败！'
                break
        }
        // 全局错误提示
        if (error.config.toast !== false) {
            console.error(errMessage)
            $message.error(errMessage)
        }
    } else {
        // 默认放一个空对象避免其他地方报错
        error.response = {}
        console.error(error.config.url, '请求接口超过一分钟无响应')
    }
    return Promise.reject(error)
})

export default instance
