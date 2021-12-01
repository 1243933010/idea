<template>
	<view>
		<view class="form">
			<view class="textarea">
				<textarea v-model="text" placeholder="请输入你的意见:" maxlength="200"/>
			</view>
			<view class="btn" @click="feedback">
				<text>提交反馈</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				text:''
			};
		},
		methods:{
			async feedback(){
				let data = await this.$request('/api/v1/feedback',{msg_content:this.text});
				this.$toast(data.data.message);
			}
		}
	}
</script>

<style lang="scss" >
	page{
		background: #F2F2F2;
	}
	.form{
		width: 100%;
		padding-top: 22rpx;
		.textarea{
			width: 100%;
			height: 564rpx;
			background: white;
			margin-bottom: 256rpx;
			textarea{
				width: 100%;
				height: 100%;
				text-indent: 20rpx;
				color: #999999;
				font-size: 26rpx;
				padding: 10rpx 0;
			}
		}
		.btn{
			width: 316rpx;
			height: 64rpx;
			margin: 0 auto;
			background: linear-gradient(90deg, #4DB2F1, #2CA0EA);
			box-shadow: 0px 0px 60rpx 0px rgba(160, 160, 160, 0.5);
			border-radius: 32rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			color: white;
			font-size: 30rpx;
			font-weight: bold;
		}
	}
</style>
