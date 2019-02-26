'use strict'

// import moment from 'moment';
import util from './util'
import config from './config'
import storage from './storage'
import { mapState } from 'vuex'
import {
    M_SET_SHOMODE,
    A_GET_ROLELIST,
    A_GET_INDUSTRY_CATEGORY_LIST
} from '@stores/common/types'

const formatDate = util.formatDate
const numberPrefix = util.numberPrefix
const replaceAll = util.replaceAll
const numFormat = util.numFormat
export default {
    data () {
        return Object.assign(config, {
            loginInfo: storage.user || {}
        })
    },
    created () {

    },
    computed: {
        // industryCategoryList () { return this.$store.getters.industryCategoryList },
        roleList () { return this.$store.getters.roleList || {} },
        ...mapState({

        })
    },
    directives: {
        // 设置title
        title (el, binding) {
            const title = '盛业集团 - ERP系统'
            document.title = title + ' - ' + el.innerText
            // el.remove()
        }
    },
    methods: {

        formatDate,
        replaceAll,
        numFormat,
        // 输入时自动格式化金额
        autoNumFormat (v) {
            if (isNaN(v)) {
                return 0
            }
            v = v.replace(/,/g, '')
            return util.numFormat(v)
        },
        getParams () {
            const query = this.$route.query || {}
            query.page && (query.page = +query.page)
            query.size && (query.size = +query.size)
            for (const key in query) {
                (!query[key] || !query.hasOwnProperty(key)) && delete query[key]
            }
            return query
        },
        // 是否显示头部或尾部
        showMode ($store, name, val) {
            $store.commit(M_SET_SHOMODE, { name, val })
        },
        parseData (data) {
            return JSON.parse(JSON.stringify(data))
        },

        // 清空登录基本信息
        clearLogin () {
            // const userName = storage.user ? storage.user.userName : ''
            storage.user = null
            // storage.user = {
            //     userName
            // }
        },
        // 存储用户登录基本信息
        saveLogin (data) {
            if (!data) return
            storage.user = data
            storage.lastLoginName = data.userName
        },
        // 退出登录并跳转到登录页
        loginOut () {
            const vm = this
            vm.$http({
                method: 'post',
                url: '/user/logout',
                data: {},
                mask: false,
                errBack: false
            }).then(res => {
                this.clearLogin()
                this.$router.replace({
                    name: 'login'
                })
            })
        },

        // 获取跟进人
        getFollow (list) {
            const follow = []
            if (!list || !Array.isArray(list)) return
            list.forEach(item => {
                if (item.userName) { follow.push(item.userName) }
            })
            return follow.join('，')
        },
        // 获取联系人
        getContact (val, k) {
            let text = ''
            // isRegister必须要是1才会显示
            if (val && val.length > 0) {
                const some = val.some((item, i) => {
                    if (item[k] && item.isRegister === '1') {
                        text = item[k]
                        return true
                    }
                })
                if (some) return text
            }
        },
        checkMenu (code) {
            const
                vm = this,
                permissions = vm.loginInfo.permissions || [],
                codeList = code.split(',')

            return permissions.some(item => {
                return codeList.includes(item.code)
            })
        },
        // 获取角色列表
        getRoleList () {
            const vm = this
            vm.$store.dispatch(A_GET_ROLELIST)
        },
        // 获取行业列表
        getIndustryCategory () {
            const vm = this
            vm.$store.dispatch(A_GET_INDUSTRY_CATEGORY_LIST)
        },
        // 动态增加企查查的企业类型
        setEnterpriseType (val) {
            const vm = this
            let isSome = false

            if (!val) return

            for (const key in vm.ENTERPRISE_TYPE) {
                (val === vm.ENTERPRISE_TYPE[key]) && (isSome = true)
            }
            if (!isSome) {
                Object.assign(vm.ENTERPRISE_TYPE, {
                    '0': val
                })
            }
        },
        toRegStatus (registerStatus, query) {
            const vm = this

            // 10 待填写申请信息
            // 20 待上传文件
            // 30 待确认企业信息
            // 40 待生成签章申请书
            // 50 待填写快递信息
            // 99 完成用户注册流程
            // -1 保留状态（不使用）

            let routerOpt
            switch (+registerStatus) {
                case 10:
                    routerOpt = {
                        name: 'register-new-2'
                    }
                    break
                case 20:
                    routerOpt = {
                        name: 'register-new-3'
                    }
                    break
                case 30:
                    routerOpt = {
                        name: 'register-new-4'
                    }
                    break
                case 40:
                    routerOpt = {
                        name: 'register-new-5'
                    }
                    break
                case 50:
                    routerOpt = {
                        name: 'register-new-6'
                    }
                    break
                case 99:
                    routerOpt = {
                        name: 'login-tips',
                        query: {
                            status: registerStatus
                        }
                    }
                    break
                default:
                    break
            }
            if (routerOpt && vm.$route.name !== routerOpt.name) {
                if (+registerStatus !== 99 && query) {
                    routerOpt.query = query
                }
                vm.$router.push(routerOpt)
            }
        }
        // setTitle: function(title) {
        //   document.title = title;
        //   // UA control maybe
        //   var $iframe = $('<iframe src="/favicon.ico"></iframe>').hide().on('load', function() {
        //     setTimeout(function() {
        //       $iframe.off('load').remove();
        //     }, 0);
        //   }).appendTo($(document.body));
        // },
    },
    filters: {
        costFormat: function (val) {
            let m = val % 60,
                h = Math.floor(val / 60)
            let result = (h ? (numberPrefix(h, (h + '').length) + '小时') : '00小时') + (m ? (numberPrefix(m, (m + '').length) + '分') : '00分')
            return result
        },
        // 小数点截取，默认保留一位小数
        toFixed (val, n = 2) {
            if (!val) return 0
            return parseFloat(val).toFixed(n)
        },
        // 格式化日期显示
        formatDate,
        // 获取星期几
        getWeek: util.getWeek,
        // 字符串*号替换
        substrNumber: util.substrNumber,
        numFormat: util.numFormat,
        // 批量替换
        replaceAll,
        // 小数转换为百分数
        present: util.present,
        // 金额转大写
        smalltoBIG: util.smalltoBIG,
        status (value) {
            const obj = {
                '99': '正常',
                '-1': '冻结'
            }
            return obj[value]
        }

    }

}
