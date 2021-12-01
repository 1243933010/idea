<template>
	<view class="container">
		<view class="top">
			<view class="text">钱包余额</view>
			<view class="num">450.50</view>
			<view class="btn">提现到银行卡</view>
		</view>
		<view class="bottom">
			<view class="tit">充值方式</view>
			<view class="rech-met">
				<view class="rech-item" @click="choose(0)">
					<view class="left">
						<!-- <view class="logo"></view> -->
						<image src="../../../static/card.png" mode="widthFix"></image>
						<text class="text">银行卡支付</text>
					</view>
					<view class="right">
						<image v-show="ind===0" src="../../../static/check.png" mode="widthFix"></image>
						<image v-show="ind!==0" src="../../../static/no_check.png" mode="widthFix"></image>
					</view>
					
				</view>
				<view class="rech-item" @click="choose(1)">
					<view class="left">
						<!-- <view class="logo"></view> -->
						<image src="../../../static/weixin.png" mode="widthFix"></image>
						<text class="text">微信支付</text>
					</view>
					<view class="right">
						<image v-show="ind===1" src="../../../static/check.png" mode="widthFix"></image>
						<image v-show="ind!==1" src="../../../static/no_check.png" mode="widthFix"></image>
					</view>
				</view>
				<view class="rech-item" @click="choose(2)">
					<view class="left">
						<!-- <view class="logo"></view> -->
						<image src="../../../static/zhifubao.png" mode="widthFix"></image>
						<text class="text">支付宝支付</text>
					</view>
					<view class="right">
						<image v-show="ind===2" src="../../../static/check.png" mode="widthFix"></image>
						<image v-show="ind!==2" src="../../../static/no_check.png" mode="widthFix"></image>
					</view>
				</view>
			</view>
			<view class="tit">充值金额</view>
			<view class="amount-list">
				<view class="amount-item">
					<text class="tag">￥</text>
					<text class="num">20</text>
				</view>
				<view class="amount-item">
					<text class="tag">￥</text>
					<text class="num">30</text>
				</view>
				<view class="amount-item">
					<text class="tag">￥</text>
					<text class="num">50</text>
				</view>
				<view class="amount-item">
					<text class="tag">￥</text>
					<text class="num">80</text>
				</view>
				<view class="amount-item">
					<text class="tag">￥</text>
					<text class="num">100</text>
				</view>
				<view class="amount-item cust">
					<input type="text" placeholder="自定义金额" />
					<!-- <text>自定义金额</text> -->
				</view>
			</view>
		</view>
		<view class="btn-t">
			<view class="btn-con">
				<text>确认充值</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				ind:0
			};
		},
		onNavigationBarButtonTap(){
			uni.navigateTo({
				url:'./detail'
			})
		},
		methods:{
			choose(index){
				this.ind = index;
			}
		}
	}
</script>

<style lang="less">
.container {
	background-color: #F1F1F2;
	.top {
		margin: 30rpx 30rpx 50rpx;
		padding: 52rpx 0;
		// background-color: #45B3F5;
		background: url(../../../static/wallet_bk.png) no-repeat;
		background-size: 100% 100%;
		text-align: center;
		color: #fff;
		border-radius: 20rpx;
		.text {
			font-size: 32rpx;
			margin-bottom: 30rpx;
		}
		.num {
			margin-bottom: 22rpx;
			font-size: 52rpx;
		}
		.btn {
			font-size: 26rpx;
			padding: 12rpx 28rpx;
			background-color: #fff;
			color: #3CAEF1;
			display: inline-block;
			border-radius: 50px;
		}
	}
	.bottom {
		.tit {
			background-color: #fff;
			padding: 40rpx 25rpx;
		}
		.rech-met {
			padding: 43rpx 30rpx 60rpx;
			.rech-item {
				margin-bottom: 20rpx;
				padding: 32rpx 25rpx 30rpx 20rpx;
				background-color: #fff;
				display: flex;
				align-items: center;
				justify-content: space-between;
				border-radius: 20rpx;
				.left {
					display: flex;
					align-items: center;
					image{
						width: 50rpx;
						height: 50rpx;
					}
					.logo {
						width: 50rpx;
						height: 50rpx;
						background: url(../../../static/logo.png) no-repeat center center / 100%;
					}
					.text {
						margin-left: 20rpx;
						color: #333333;
						font-size: 32rpx;
					}
				}
				.right {
					width: 50rpx;
					height: 50rpx;
					border-radius: 50%;
					// background: url(../../../static/logo.png) no-repeat center center / 100%;
					image{
						width: 100%;
					}
				}
				&:last-child {
					margin-bottom: 0;
				}
			}
		}
		.amount-list {
			display: flex;
			flex-wrap: wrap;
			padding-top: 15rpx;
			.amount-item {
				margin: 15rpx 30rpx;
				padding: 40rpx 0;
				width: calc(33.33% - 60rpx);
				background-color: #fff;
				border-radius: 10rpx;
				text-align: center;
				color: #33ADF8;
				box-shadow: 0rpx 15rpx 20rpx 0rpx rgba(88, 85, 217, 0.1);
				.tag {
					font-size: 36rpx;
					margin-right: 2rpx;
				}
				.num {
					font-size: 52rpx;
				}
				&.cust {
					color: #999999;
					font-size: 24rpx;
					position: relative;
					display: flex;
					justify-content: center;
					align-items: center;
					text {
						position: absolute;
						top: 50%;
						left: 0;
						transform: translateY(-50%);
						width: 100%;
						text-align: center;
					}
				}
			}
		}
	}
}

.btn-t{
	width: 100%;
	padding-top: 110rpx;
	padding-bottom: 110rpx;
	.btn-con{
		width: 316rpx;
		margin: 0 auto;
		background: linear-gradient(90deg, #4DB2F1, #2CA0EA);
		box-shadow: 0px 0px 60rpx 0px rgba(160, 160, 160, 0.5);
		border-radius: 32rpx;
		color: white;
		font-size: 30rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 17rpx 0;
	}
}
</style>
