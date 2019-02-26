'use strict'

// import storage from '@/common/js/storage';
import * as types from './types'

const mutations = {
    // 是否显示头或尾模块
    [types.M_SET_SHOMODE] (state, data) {
        // Object.assign(state.searchParams, params);
        // storage.fSearchParams = state.searchParams;
        // console.log(name)
        if (data.name === 'header') {
            state.showHeader = data.val
        } else {
            state.showFooter = data.val
        }
    },

    // 角色列表
    [types.M_SET_ROLELIST] (state, data) {
        let list = data || []
        let role = {}
        list.forEach(item => {
            role[item.groupId] = item.groupName
        })
        state.roleList = {
            list: data,
            text: role
        }
    },

    // 行业列表
    [types.M_SET_INDUSTRY_CATEGORY_LIST] (state, data) {
        let list = data || []
        state.industryCategoryList = list
    },

    // 查询有效保理商列表
    [types.M_SET_AVAIL_FACTOR_LIST] (state, data) {
        state.availFactorList = data.list
    },

    // 公共文件文件列表接口(有模板)
    [types.M_SET_COMMON_FILE_LIST] (state, data) {
        const fileList = {
            list: data.list || [],
            prefix: data.filePrefix
        }
        state.commonFileList = fileList
    },
    // 公共文件文件列表接口（无模板）
    [types.M_SET_COMMON_NOTEMP_FILE_LIST] (state, data) {
        const fileList = {
            list: data.list || [],
            prefix: data.filePrefix
        }
        state.commonNoTempFileList = fileList
    }

}

export default mutations
