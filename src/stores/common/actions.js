'use strict'

import * as types from './types'
import $http from '@/common/js/http'

export default {
    // 获取图形验证码
    [types.A_GET_IMGCODE] ({ state, commit }, param) {
        return $http({
            method: 'post',
            url: '/validateCode/genLoginValidateCode',
            data: param,
            // mask: true,
            toast: false
        }).then((res) => {
            return res.data
        })
    },
    // 获取短信验证码
    [types.A_GET_SMSCODE] ({ state, commit }, param) {
        return $http({
            method: 'post',
            url: '/validateCode/genPhoneValidateCode',
            data: param,
            // mask: true,
            toast: false
        }).then((res) => {
            return res.data
        })
    },
    // 获取邮箱验证码
    [types.A_GET_EMAILCODE] ({ state, commit }, param) {
        return $http({
            method: 'post',
            url: '/validateCode/genMailValidateCode',
            data: param,
            toast: false
        }).then((res) => {
            return res.data
        })
    },

    // 获取角色列表
    [types.A_GET_ROLELIST] ({ state, commit }, param) {
        if (state.roleList) return
        $http({
            method: 'post',
            url: '/user/roleList',
            data: param,
            toast: false
        }).then((res) => {
            commit(types.M_SET_ROLELIST, res.data)
        })
    },
    // 获取行业类型列表
    [types.A_GET_INDUSTRY_CATEGORY_LIST] ({ state, commit }, param) {
        if (state.industryCategoryList) return
        $http({
            method: 'post',
            url: '/customer/industryCategoryList',
            data: param,
            toast: false
        }).then((res) => {
            commit(types.M_SET_INDUSTRY_CATEGORY_LIST, res.data)
        })
    },

    // 查询有效保理商列表
    [types.A_GET_AVAIL_FACTOR_LIST] ({ state, commit }, param) {
        $http({
            method: 'post',
            url: '/credit/queryFactorList',
            data: param,
            toast: false
        }).then((res) => {
            commit(types.M_SET_AVAIL_FACTOR_LIST, res.data)
        })
    },

    // 公共文件文件列表接口(有模板)
    [types.A_GET_COMMON_FILE_LIST] ({ state, commit }, param) {
        $http({
            url: '/fileList/getFileListByBusinessId',
            method: 'post',
            data: param,
            mask: true
        }).then(res => {
            commit(types.M_SET_COMMON_FILE_LIST, res.data)
        })
    },
    // 公共文件文件列表接口(无模板)
    [types.A_GET_COMMON_NOTEMP_FILE_LIST] ({ state, commit }, param) {
        $http({
            url: '/fileList/getFileList',
            method: 'post',
            data: param,
            mask: true
        }).then(res => {
            commit(types.M_SET_COMMON_NOTEMP_FILE_LIST, res.data)
        })
    },
    // 上传（有模板）
    [types.A_UPLOAD_COMMON_FILE] ({ state, commit }, param) {
        param.data = Object.assign({
            doNotConvert: false
        }, param.data || {})
        return $http({
            url: '/fileList/uploadFile',
            method: 'post',
            data: param.data,
            file: param.file,
            mask: true
        }).then(res => {
            return res.data
        })
    },
    // 上传（无模板）
    [types.A_UPLOAD_COMMON_NOTEMP_FILE] ({ state, commit }, param) {
        param.data = Object.assign({
            doNotConvert: false
        }, param.data || {})
        return $http({
            url: '/fileList/uploadCommonFile',
            method: 'post',
            data: param.data,
            file: param.file,
            mask: true
        }).then(res => {
            return res.data
        })
    },
    // 删除
    [types.A_DEL_COMMON_FILE] ({ state, commit }, param) {
        return $http({
            url: '/fileList/deleteFile',
            method: 'post',
            data: param,
            mask: true
        }).then(res => {
            return res.data
        })
    },
    // 获取用户注册状态
    [types.A_GET_REGISTER_STATUS] ({ state, commit }, param) {
        return $http({
            url: '/sign/queryRegisterStatus',
            method: 'post',
            data: param,
            mask: true
        }).then(res => {
            return res.data
        })
    }

}
