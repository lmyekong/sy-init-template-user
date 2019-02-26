<template>
<div id="app">
    <app-header v-if="showHeader" :current="current"></app-header>
    <transition name="fade">
        <div class="main cf">
            <router-view></router-view>
        </div>
    </transition>
    <app-footer v-if="showFooter"></app-footer>
</div>
</template>

<script>
import appFooter from '@/components/footer'
import appHeader from '@/components/head'
// import storage from '@/common/js/storage'
export default {
    name: 'app',
    data () {
        return {
            current: '',
            showHeader: true,
            showFooter: true
        }
    },
    created () {
        // const vm = this
        // vm.checkLogin()
    },
    mounted () {
        // 加载阿里字体库
        this.loadIconfont()
    },
    updated () {
        // this.setMode()
    },
    watch: {
        // 如果路由有变化，会再次执行该方法
        // '$route': 'checkLogin'
    },
    methods: {
        getPathName () {
            // 不能放在data里，因为data只执行一次，这里要动态实时获取
            return location.pathname ? location.pathname.slice(1) : null
        },
        // checkLogin () {
        //     const vm = this

        //     if (storage.user && storage.user.userActive === 0) {
        //         vm.clearLogin()
        //         vm.$message.error('您的帐户还没有激活！')
        //     }
        //     if (!storage.user || storage.user.userActive === 0 || storage.user.accountType === 'SY') {
        //         vm.$router.replace({
        //             name: 'login',
        //             query: {
        //                 backto: location.href
        //             }
        //         })
        //     }
        // },
        loadIconfont () {
            const style = document.createElement('link')
            const head = document.querySelector('head')
            style.href = this.iconFontCssUrl
            style.rel = 'stylesheet'
            style.type = 'text/css'

            head.appendChild(style)
        }
    },
    components: { appHeader, appFooter }
}
</script>