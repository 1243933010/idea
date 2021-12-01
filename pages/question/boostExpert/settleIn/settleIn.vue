<template>
	<view class="settlen-con">
		<image class="settlen-bg" src="../../../../static/question/renzheng_bk.png" mode=""></image>
		<view class="back">
			<image @click="back" src="../../../../static/question/w_left_arrow.png" mode="widthFix"></image>
		</view>
		<view class="top">
			<view class="headimg">
				<image :src="userInfo.user_photo" mode=""></image>
			</view>
			<view class="expert-name">{{userInfo.alias}}</view>
		</view>
		<view class="bottom">
			<view class="top-tag">
				<image src="../../../../static/question/adorn.png" mode=""></image>
			</view>
			<view class="status">
				<image src="../../../../static/question/shield.png" mode="widthFix"></image>
				<text v-if="!flog">您尚未认证</text>
				<text v-if="flog">您已认证</text>
			</view>
			<view class="prompt">认证通过后即可入驻为专家</view>
			<text class="go-btn" v-if="!flog" @click="goBtn">前往认证</text>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				flog:false,
				userInfo:{}
			};
		},
		async mounted() {
			this.userInfo = uni.getStorageSync('userInfo');
			console.log(this.userInfo)
			let data = await this.$request('/api/v1/check_expert_cert',{})
			if(data.data.message==="您已成为专家"){
				this.flog = true;
			}
			console.log(data)
		},
		methods:{
			goBtn(){
				uni.navigateTo({
					url:'./settleln-attest/settleln-attest'
				})
			},
			back(){
				uni.navigateBack({
					delta:1
				})
			}
		},
		
	}
</script>

<style lang="less">
	.back{
		padding-top: 100rpx;
		padding-left: 20rpx;
		image{
			width: 55rpx;
		}
	}
	.settlen-con {
		.settlen-bg {
			width: 100%;
			height: 100%;
			position: absolute;
			bottom: 0;
			left: 0;
			right: 0;
			top: 0;
			z-index: -1;
		}

		.top {
			text-align: center;
			padding: 118rpx 0 145rpx;

			.headimg {
				height: 138rpx;
				width: 138rpx;
				display: inline-block;
				border-radius: 50%;
				overflow: hidden;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.expert-name {
				color: #fff;
				font-size: 34rpx;
				margin-top: 22rpx;
			}
		}

		.bottom {
			text-align: center;

			.top-tag {
				height: 36rpx;
				width: 55rpx;
				display: inline-block;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.status {
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: center;
				margin-top: 16rpx;
				image{
					width: 40rpx;
					margin-right: 10rpx;
				}
				text {
					color: #333;
					font-size: 30rpx;
					vertical-align: middle;
				}
			}

			.prompt {
				color: #A4A4A4;
				font-size: 24rpx;
				margin-top: 22rpx;
			}

			.go-btn {
				margin-top: 68rpx;
				padding: 18rpx 80rpx;
				display: inline-block;
				background: linear-gradient(90deg, #4DB2F1, #2CA0EA);
				box-shadow: 0px 0px 60px 0px rgba(44, 161, 234, 0.5);
				border-radius: 32px;
				color: #fff;
				font-size: 30rpx;
			}
		}
	}
</style>
