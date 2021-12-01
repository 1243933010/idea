<template>
	<view>
		<view class="list">
			<view class="item" v-for="(item,index) in list" :key="index">
				<view class="item-left">
					<text class="item-left-name">{{item.name}}</text>
					<text class="item-left-time">{{item.time}}</text>
				</view>
				<view class="item-right">
					<text class="item-right-text">{{item.price}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[
					{name:'微信充值',time:'2020-01-13',price:"+50元"},
					{name:'微信充值',time:'2020-01-13',price:"+50元"},
					{name:'微信充值',time:'2020-01-13',price:"+50元"},
					{name:'微信充值',time:'2020-01-13',price:"+50元"},
					{name:'微信充值',time:'2020-01-13',price:"+50元"},
					{name:'微信充值',time:'2020-01-13',price:"+50元"},
					{name:'微信充值',time:'2020-01-13',price:"+50元"},
					{name:'微信充值',time:'2020-01-13',price:"+50元"},
				]
			};
		}
	}
</script>

<style lang="scss" scoped>
	.list{
		width: 100%;
		.item{
			width: 100%;
			box-sizing: border-box;
			padding: 27rpx 30rpx;
			border-bottom: 10rpx solid #F2F2F3;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.item-left{
				display: flex;
				flex-direction: column;
				.item-left-name{
					color: #333333;
					font-size: 32rpx;
					margin-bottom: 14rpx;
				}
				.item-left-time{
					color: #999999;
					font-size: 24rpx;
				}
			}
			.item-right{
				color: #000000;
				font-size: 40rpx;
				font-weight: 500;
			}
		}
	}
</style>
