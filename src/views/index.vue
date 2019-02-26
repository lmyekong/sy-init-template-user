<template>
	<div class="index cf txtc">
		盛业集团前端初始化工程
	</div>
</template>

<script>
import { mapState } from 'vuex'
import moment from 'moment'

export default {
    name: 'index',
    data () {
        return {
            loadingTodoList: true,
            loadingNoticeList: true,
            now: moment().format('YYYY/MM/DD HH:mm:ss')
        }
    },
    watch: {},
    created () {

    },
    components: {},
    computed: mapState({

    }),
    methods: {

    }
}
</script>

<style lang="stylus" scoped>
</style>
