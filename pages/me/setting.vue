<template>
	<view>
		<view class="list">
			<!-- <view class="view">
				<text>清除缓存</text>
				<text>10M</text>
			</view> -->
			<view class="view">
				<text>检查更新</text>
				<text>{{version}}</text>
			</view>
			<view class="view" @click="go">
				<text>隐私保护与说明</text>
				<image src="../../static/me/right-arrow.png" mode=""></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				version:'1.0.0'
			};
		},
		mounted() {
			// #ifdef APP-PLUS
			plus.runtime.getProperty(plus.runtime.appid, (widgetInfo) => {
							// console.log(plus.runtime.appid)
							this.version = widgetInfo.version;
							console.log(widgetInfo.version); //获取应用版本名称
				})
			// #endif
		},
		methods:{
			go(){
				uni.navigateTo({
					url:'./setset'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	page{
		background: #F2F2F2;
	}
	.list{
		width: 100%;
		padding-top: 17rpx;
		.view{
			width: 100%;
			background: white;
			margin-bottom: 17rpx;
			box-sizing: border-box;
			padding: 29rpx 28rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			color: #000000;
			font-size: 30rpx;
			image{
				width: 40rpx;
				height: 40rpx;
			}
		}
	}
</style>
