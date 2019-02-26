<template>
	<section class="content error-page">
		<h2 v-title>404 未找到页面</h2>
		<div class="text">
			<p class="h3">您访问的页面不存在，请返回主页！</p>
			<p><a href="/" class="btn yellow">返回主页</a></p>
		</div>

	</section>
</template>

<script>
export default {
    name: 'error-page',
    data () {
        return {

        }
    }
}
</script>

<style lang="stylus">
body {
	background: #f8f8f8;
}

.error-page {
	position: absolute;
	height: 100%;
	width: 100% !important;
	background: #f8f8f8 url('../../assets/img/404.jpg') no-repeat center center !important;

	h2 {
		display: none;
	}

	.text {
		position: absolute;
		top: 50%;
		width: 100%;
		margin-top: 110px;
		text-align: center;

		.h3 {
			// font-weight bold
			font-size: 18px;
			color: #666;
			padding-bottom: 20px;
		}
	}
}
</style>
