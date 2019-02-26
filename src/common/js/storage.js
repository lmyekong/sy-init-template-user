'use strict'

import storage from 'store'
import expirePlugin from 'store/plugins/expire'

storage.addPlugin(expirePlugin)

const TOKEN = 'TOKEN' // 登录token
const USER = 'USER' // 登录用户基本信息
const LAST_LOGIN_USER_NAME = 'LAST_LOGIN_USER_NAME' // 登录用户基本信息
// const LOGIN_ERROR_COUNT = 'LOGIN_ERROR_COUNT' // 缓存登录错误次数和最后时间
const REG_COMPANY_DATA = 'REG_COMPANY_DATA' // 注册信息

export default {
    // 登录token
    set token (val) {
        if (!val) {
            storage.remove(TOKEN)
        } else {
            storage.set(TOKEN, val)
        }
    },
    get token () {
        return storage.get(TOKEN)
    },

    // 用户登录信息
    set user (val) {
        if (!val) {
            storage.remove(USER)
        } else {
            storage.set(USER, val)
        }
    },
    get user () {
        return storage.get(USER)
    },
    // 上次登录用户名
    set lastLoginName (val) {
        if (!val) {
            storage.remove(LAST_LOGIN_USER_NAME)
        } else {
            storage.set(LAST_LOGIN_USER_NAME, val)
        }
    },
    get lastLoginName () {
        return storage.get(LAST_LOGIN_USER_NAME)
    },

    // // 登录次数信息
    // set loginErrorCount (val) {
    //     if (!val) {
    //         storage.remove(LOGIN_ERROR_COUNT)
    //     } else {
    //         if (val >= 5) {
    //             storage.set(LOGIN_ERROR_COUNT, val, new Date().getTime() + 1000 * 60 * 20)
    //         } else {
    //             storage.set(LOGIN_ERROR_COUNT, val)
    //         }
    //     }
    // },
    // get loginErrorCount () {
    //     return storage.get(LOGIN_ERROR_COUNT)
    // },

    // 注册信息 缓存24小时
    set regData (val) {
        if (!val) {
            storage.remove(REG_COMPANY_DATA)
        } else {
            storage.set(REG_COMPANY_DATA, val, new Date().getTime() + 1000 * 60 * 60 * 24)
        }
    },
    get regData () {
        return storage.get(REG_COMPANY_DATA)
    }

}
