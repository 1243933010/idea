<template>
	<view>
		<view class="view">
			<textarea v-model="textarea" placeholder="请输入你的回答:" />
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				obj:{},
				textarea:''
			};
		},
		onLoad(e) {
			console.log(e)
			this.obj = JSON.parse(e.obj);
			uni.setNavigationBarTitle({
				title:`回答@${this.obj.alias}`
			})
		},
		async onNavigationBarButtonTap() {
			if( !this.textarea){
				this.$toast('内容不能为空');
			}
			let obj = {
				wsid:this.obj.wsid,
				answer_content:this.textarea
			}
			let data = await this.$request('/api/v1/answer_Wholesale',obj)
			this.$toast(data.data.message);
			if(data.data.status==='success'){
				setTimeout(()=>{
					uni.navigateBack({
						delta:1
					})
				},500)
			}
		},
		methods:{
			
		}
	}
</script>

<style lang="scss" scoped>
	.view{
		width: calc(750rpx - 25rpx);
		border-top: 1px solid #fefefe;
		margin: 0 auto;
		textarea{
			width: 100%;
			color: #999999;
			font-size: 26rpx;
			padding: 25rpx 0;
		}
	}
</style>
