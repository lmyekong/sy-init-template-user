/**
 * 配置api接口地址
 *
 *
 */

const NODE_ENV = process.env.VUE_APP_API || 'development'
const API_URL = {
    // development: '/api/', //开发环境做个代理，防止跨域限制，在下面代理配置里修改Ip
    // development: '//192.168.1.167:8040', // 邦禹
    // development: '//192.168.1.128:8040', // 金震
    // development: '//192.168.1.34:8040', // 7兵
    // development: '//192.168.1.126:8040', // 欧阳洁
    development: '//192.168.2.168:6188', // 开发测试环境
    // development: '//192.168.2.172:8040', // 测试环境（内部使用）
    testing: '//112.95.173.70:60009', // 正式测试环境(外网地址)
    // testing: '//192.168.2.172:8040', // 正式测试环境（内部使用）
    uat: '//10.10.1.23:8040', // 验收环境
    production: '//i.shengyecapital.com' // 生产环境
}

export default API_URL[NODE_ENV]
