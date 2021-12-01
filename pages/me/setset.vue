<template>
	<view>
		<view class="view">
			<view class="title">
				<text>手机/电话权限</text>
			</view>
			<view class="label">
				<text>正常识别手机设备，进行手机验证，保证账号安全</text>
			</view>
		</view>
		<view class="view">
			<view class="title">
				<text>存储权限</text>
			</view>
			<view class="label"><text>实现图片或视频的缓存和使用，以降低流量的消耗</text>
			</view>
		</view>
		<view class="view">
			<view class="title">
				<text>允许访问相册权限</text>
			</view>
			<view class="label"><text>选择图片发布为用户头像</text></view>
			<view class="label"><text>选择、发表图片说说</text>
			</view>
		</view>
		<view class="view">
			<view class="title">
				<text>允许访问相机权限</text>
			</view>
			<view class="label"><text>拍照发布为用户头像</text></view>
			<view class="label"><text>拍照、发表图片说说</text>
			</view>
		</view>
		<view class="view">
			<view class="title">
				<text>允许访问位置信息权限</text>
			</view>
			<view class="label"><text>部分功能需要根据地理位置推送信息</text></view>
			
		</view>
		<view class="bottom">
			<text @click="xieyi">服务协议</text>
			<text> | </text>
			<text @click="zhengce">隐私政策</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			xieyi(){
				uni.navigateTo({
					url:'../login/xieyi'
				})
			},
			zhengce(){
				uni.navigateTo({
					url:'../login/yinsi'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.view{
		width: 100%;
		box-sizing: border-box;
		padding: 20rpx 40rpx;
		margin-bottom: 20rpx;
		border-bottom: 1px solid #FEFEFE;
		.title{
			font-size: 30rpx;
			margin-bottom: 15rpx;
		}
		.label{
			font-size: 28rpx;
			color: #ACACAC;
		}
	}
	.bottom{
		font-size: 35rpx;
		color: #19B78C;
		// font-weight: 600;
		display: flex;
		justify-content: center;
		align-items: center;
		text{
			margin: 0 10rpx;
		}
	}
</style>
