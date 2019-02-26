'use strict'

const routes = []
// 首页
routes.push(
    {
        path: '*',
        name: 'page-404',
        meta: {
            title: '404未找到'
        },
        component: () => import('@views/common/404')
    },
    {
        path: '/',
        redirect: {
            name: 'index'
        }
    },
    {
        path: '/index',
        name: 'index',
        component: () => import('@views/index')
    }
)

export default routes
