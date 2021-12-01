<template>
	<view>
		<view class="gongpu">
			<view class="left">
				<text class="h1">3.9</text>
				<text>工铺评分</text>
			</view>
			<view class="right">
				<view class="status">
					<text class="status_one">评价口碑</text>
					<text class="status_two">一般</text>
				</view>
				<view class="text">
					<text>测试测试测试测试测试测试测试测试测试测试测试测试测试测试</text>
				</view>
			</view>
		</view>
		
		<view class="fen">
			<view class="item">
				<text>技能评分</text>
				<text class="h1">3.0</text>
			</view>
			<view class="item">
				<text>态度评分</text>
				<text class="h1">3.0</text>
			</view>
			<view class="item">
				<text>上门平均时间</text>
				<text class="h1">3.0</text>
			</view>
		</view>
		
		<view class="label">
			<view class="item">
				<text>穿戴工服(7)</text>
			</view>
			<view class="item">
				<text>技能赞(7)</text>
			</view>
			<view class="item">
				<text>态度差(7)</text>
			</view>
		</view>
		
		<view class="tongji">
			<view class="top">
				<text>中差评统计</text>
			</view>
			<view class="title">
				<text>测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试</text>
			</view>
			<view class="con">
				<view class="item">
					<view class="left">
						<text>技能中差评</text>
						 <view class="progress">
						 	<progress  percent="80" activeColor="#37DAED" active stroke-width="8" />
						 </view>
					</view>
					<view class="right">
						<text>2条</text>
					</view>
				</view>
				<view class="item">
					<view class="left">
						<text>态度中差评</text>
						 <view class="progress">
						 	<progress border-radius="40" percent="80" activeColor="#EB72FF" active stroke-width="8" />
						 </view>
					</view>
					<view class="right">
						<text>2条</text>
					</view>
				</view>
				<view class="item">
					<view class="left">
						<text>效率中差评</text>
						 <view class="progress">
						 	<progress percent="80" activeColor="#FFBD71" active stroke-width="8" />
						 </view>
					</view>
					<view class="right">
						<text>2条</text>
					</view>
				</view>
			</view>
		</view>
		
		<view class="good tongji">
			<view class="top">
				<text>中差评统计</text>
				<text style="font-size: 26rpx;color: #808080;">(历史统计结果)</text>
			</view>
			<view class="content">
				<view class="item">
					<image class="icon" src="../static/logo.png" mode="widthFix"></image>
					<view class="text">
						<text class="num">No.1</text>
						<text class="name">老王水电</text>
						<view class="">
							<text>好评度100%</text>
							<text>5赞</text>
							<text>月出工次数22</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="good tongji">
			<view class="top">
				<text>技能差评榜</text>
				<text style="font-size: 26rpx;color: #808080;">(历史统计结果)</text>
			</view>
			<view class="content">
				<view class="item">
					<image class="icon" src="../static/logo.png" mode="widthFix"></image>
					<view class="text">
						<text class="num">No.1</text>
						<text class="name">老王水电</text>
						<view class="">
							<text>好评度100%</text>
							<text>5赞</text>
							<text>月出工次数22</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" >
	page{
		background: #FFFFFF;
	}
	.gongpu{
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: 20rpx 0;
		border-bottom: 1px solid #C0C0C0;
		.left{
			font-size: 26rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			width: 30%;
			.h1{
				font-size: 50rpx;
			}
		}
		.right{
			display: flex;
			flex-direction: column;
			.status{
				display: flex;
				flex-direction: row;
				align-items: center;
				margin-bottom: 15rpx;
				.status_one{
					background: #EFEFF4;
					box-sizing: border-box;
					padding: 5rpx 10rpx;
					font-size: 26rpx;
					border-radius: 10rpx;
					color: #808080;
					margin-right: 15rpx;
				}
				.status_two{
					color: red;
				}
			}
			.text{
				font-size: 26rpx;
				color: #808080;
			}
		}
	}
	.fen{
		width: 100%;
		display: flex;
		box-sizing: border-box;
		padding: 20rpx 50rpx;
		justify-content: space-between;
		align-items: center;
		.item{
			display: flex;
			flex-direction: column;
			align-items: center;
			text{
				font-size: 26rpx;
				color: #808080;
			}
			.h1{
				color: #000000;
				font-size: 50rpx;
			}
		}
	}
	.label{
		width: 100%;
		background: #FBFBFB;
		box-sizing: border-box;
		padding: 15rpx 20rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		border-bottom: 10rpx solid #E0E0E0;
		.item{
			border: 1px solid #808080;
			border-radius: 20rpx;
			margin-right: 20rpx;
			font-size: 26rpx;
			color: #808080;
			box-sizing: border-box;
			padding: 5rpx 10rpx;
		}
	}
	.tongji{
		width: 100%;
		box-sizing: border-box;
		padding: 30rpx 20rpx;
		border-bottom: 15rpx solid #E0E0E0;
		.top{
			border-left: 10rpx solid #00C6B1;
			box-sizing: border-box;
			padding: 0 10rpx;
			margin-bottom: 40rpx;
		}
		.title{
			font-size: 26rpx;
			color: #808080;
			margin-bottom: 15rpx;
		}
		.con{
			.item{
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 15rpx;
				.left{
					width: 80%;
					display: flex;
					flex-direction: row;
					align-items: center;
					font-size: 26rpx;
					color: #808080;
					text{
						margin-right: 15rpx;
					}
					.progress{
						width: 70%;
						border-radius: 10rpx;
					}
				}
				.right{
					font-size: 26rpx;
					color: #808080;
				}
			}
		}
	}

	
	.good{
		.content{
			width: 100%;
			box-sizing: border-box;
			padding: 0 15rpx;
			.item{
				display: flex;
				flex-direction: row;
				align-items: center;
				.icon{
					width: 180rpx;
					margin-right: 15rpx;
				}
				.text{
					display: flex;
					flex-direction: column;
					text{
						font-size: 26rpx;
						color: #C0C0C0;
					}
					.num{
						background: red;
						color: white;
						display: inline;
						width: 100rpx;
						text-align: center;
						border-radius: 5rpx;
						margin-bottom: 15rpx;
					}
					.name{
						color: #333333;
						margin-bottom: 15rpx;
					}
				}
			}
		}
	}
</style>
