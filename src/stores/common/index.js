'use strict'

import actions from './actions'
import mutations from './mutations'
import getters from './getters'
import api from '@/config/api'

export default {
    state: {
        API_PATH: api,
        showFooter: true,
        showHeader: true,

        // 图形验证码
        imgCode: {},

        // 角色列表
        roleList: null,
        // 行业列表
        industryCategoryList: null,

        // 信息列表
        messageList: {},
        messageInfo: {},

        // 有效保理商列表
        availFactorList: [],

        // 公共文件列表接口（有模板）
        commonFileList: {},
        // 公共文件列表接口(无模板)
        commonNoTempFileList: {}
    },
    mutations,
    actions,
    getters
}
