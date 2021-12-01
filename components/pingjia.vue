<template>
	<view>
		<view class="tab">
			<view class="item" 
			v-for="(item,index) in tabList" 
			:key="index" 
			:class="index===ind?'active':''"
			@click="setTab(index)">
				<text>{{item.title}}{{item.num}}</text>
			</view>
		</view>
		
		
		<view class="content">
			<view class="item">
				<view class="name">
					<text>名字</text>
					<text class="time">04-15</text>
				</view>
				<view class="xing">
					<view class="xing_left">
						<text class="pu">工铺</text>
					</view>
					<view class="xing_right">
						<text>技能5星</text>
						<text>态度5星</text>
					</view>
				</view>
				<view class="text">测试文字测试文字测试文字测试文字测试文字测试文字</view>
				<view class="zan">
					<image src="../static/index/zan_false.png" mode="widthFix"></image>
					<text>老王水电</text>
				</view>
				<view class="detail">
					<text class="title">订单详情：</text>
					<text class="txt">老王水电1人2天</text>
				</view>
				<view class="huifu">
					<text></text>
					<text class="btn">回复</text>
				</view>
			</view>
		</view>
		
		
	</view>
</template>

<script>
	export default {
		props:{
			id:{
				type:String,
				default:'1'
			}
		},
		data() {
			return {
				ind:0,
				tabList:[
					{title:'未回复差评',num:1},
					{title:'未回复',num:0},
					{title:'全部'}
				]
			};
		},
		methods:{
			setTab(index){
				this.ind = index;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.active{
		color: white !important;
		background: #06C1AE !important;
	}
	.tab{
		width: 80%;
		display: flex;
		justify-content: center;
		align-items: center;
		border: 1px solid #06C1AE;
		padding: 0rpx 0;
		margin:  20rpx auto;
		border-radius: 10rpx;
		.item{
			width: 35%;
			padding: 15rpx 0;
			// border-radius: 10rpx;
			font-size: 26rpx;
			color: #06C1AE;
			text-align: center;
		}
	}
	.content{
		width: 100%;
		box-sizing: border-box;
		padding: 0 10rpx;
		.item{
			width: 100%;
			.name{
				display: flex;
				flex-direction: row;
				align-items: center;
				font-weight: 600;
				margin-bottom: 15rpx;
				text{
					margin-right: 15rpx;
				}
				.time{
					font-weight: 400;
					color: #C0C0C0;
					font-size: 26rpx;
				}
			}
			.xing{
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 15rpx;
				.xing_left{
					display: flex;
					flex-direction: row;
					align-items: center;
					.pu{
						background: #F0EFF5;
						box-sizing: border-box;
						padding: 5rpx 15rpx;
						border-radius: 7rpx;
						margin-right: 15rpx;
					}
				}
				.xing_right{
					font-size: 26rpx;
					color: #8F8F94;
					text{
						margin: 0 10rpx;
					}
				}
			}
			.text{
				font-size: 26rpx;
				color: #808080;
				margin-bottom: 15rpx;
			}
			.zan{
				display: flex;
				flex-direction: row;
				align-items: center;
				font-size: 26rpx;
				color: #555555;
				margin-bottom: 20rpx;
				image{
					width: 40rpx;
					margin-right: 15rpx;
				}
			}
			.detail{
				background: #F7F7F7;
				border-radius: 10rpx;
				display: flex;
				flex-direction: column;
				box-sizing: border-box;
				padding: 25rpx 15rpx;
				margin-bottom: 30rpx;
				.title{
					font-size: 28rpx;
					color: #808080;
					margin-bottom: 15rpx;
				}
				.txt{
					font-size: 26rpx;
					color: #555555;
					text-indent: 15rpx;
				}
			}
			.huifu{
				display: flex;
				justify-content: space-between;
				align-items: center;
				.btn{
					border: 1px solid #06C1AE;
					border-radius: 10rpx;
					color: #06C1AE;
					font-size: 26rpx;
					box-sizing: border-box;
					padding: 5rpx 25rpx;
				}
			}
		}
	}
</style>
