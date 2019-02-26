<template>
    <footer class="footer">
        <p><a href="javascript:;">服务条款</a> | <a href="http://www.shengyecapital.com" target="_blank">关于我们</a> | <router-link :to="{name: 'contact'}">联系我们</router-link>
        </p>
        <p>© {{ yeah }}盛业信息科技服务（深圳）有限公司及其关联公司所有 粤ICP备17033957号-3</p>
    </footer>
</template>
<script>
export default {
    data () {
        return {
            yeah: new Date().getFullYear()
        }
    },
    components: {

    }
}
</script>


