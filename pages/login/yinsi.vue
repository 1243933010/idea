<template>
	<view>
		<web-view src="http://api.xiangfaguanwang.com/api/v1/privacy_index"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				msg:''
			};
		},
		async mounted() {
			// let res = await this.$request('/api/v1/privacy_index',{},'GET');
			// this.msg = res.data;
			// console.log(res)
		}
	}
</script>

<style lang="scss">

</style>
