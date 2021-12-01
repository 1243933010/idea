<template>
	<view>
		<rich-text :nodes="node"></rich-text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				node:''
			};
		},
		onLoad(e) {
			this.getDetail(e.article_id)
		},
		methods:{
			async getDetail(article_id){
				let data = await this.$request('/api/v1/shop_help_detail',{article_id});
				if(data.data.status==='success'){
					this.node = data.data.data.content;
				}
			}
		}
	}
</script>

<style lang="scss">

</style>
