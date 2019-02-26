'use strict'

const getters = {

    /***
   * 获取api地址
   * @param state
   */
    api: state => {
        return state.API_PATH
    },
    roleList: state => {
        return state.roleList
    },
    industryCategoryList: state => {
        return state.industryCategoryList
    }

}

export default getters
