<template>
	<view>
		<view class="nav-top" :style="{'padding-top':statusBarHeight+'px'}">
			<!-- height:statusBarHeight+50+'px', -->
			<view class="box">
				<view style="width: 33%;"><image @click="back" style="width: 50rpx;" src="../../../static/left-arrow.png" mode="widthFix"></image></view>
				<view style="width: 33%;" class="title">
					<text @click="set(0)" :class="ind===0?'active':''">服务</text>
					<text @click="set(1)"  :class="ind===1?'active':''">需求</text>
				</view>
				<view class="icon" style="width: 33%;">
					<!-- <image src="../../static/question/huida.png" @click="goUrl('./askQuestions')" mode="widthFix"></image> -->
					<!-- <image @click="goUrl(`../../question/boostExpert/settleIn/cooperation/cooperation?index=${ind}`)"  src="../../../static/index/add.png" mode="widthFix"></image> -->
					<image @click="goUrl(`./classification?index=${ind}`)"  src="../../../static/index/add.png" mode="widthFix"></image>
					<!-- <image @click="goUrl('./boostExpert/boostExpert')" src="../../static/question/zhuanjia.png" mode="widthFix"></image> -->
					
				</view>
			</view>
			
		</view>
		<view :style="{height:statusBarHeight+50+'px'}" style="width: 100%;"></view>
		<view class="list">
			<view class="item" 
			v-for="(item,index) in list" 
			:key="index"
			
			 @click="goTo(item)">
				<view class="item-top">
					<view class="item-top-left">
						<!-- <image @click.stop="seeUser(item)" :src="item.user_photo?item.user_photo:'../../static/mine/headimg.jpg'" mode=""></image> -->
						<view class="item-top-left-name">
							<text class="name">姓名:{{item.name}}</text>
							<text class="time">联系电话:{{item.phone}}</text>
						</view>
					</view>
				</view>
				<view class="item-context">
					<!-- <view class="item-context-title"><text>{{item.desc}}</text></view> -->
					<view class="item-context-label" v-show="ind===0"><text>提供服务:{{item.desc}}</text></view>
					<view class="item-context-label"  v-show="ind===1"><text>所需需求:{{item.desc}}</text></view>
					<image v-if="item.goods_thumb" :src="item.goods_thumb" mode=""></image>
					<!-- <view class="goto" ><text>去往回答>></text></view> -->
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				ind:0,
				list:[]
			};
		},
		onShow() {
			this.ind = 0;
			this.list = [];
			this.getList(1);
		},
		computed: {
			statusBarHeight() {
				return this.$store.state.statusBarHeight
			},
		},
		methods:{
			back(){
				uni.navigateBack({
					delta:1
				})
			},
			set(num){
				// uni.navigateTo({
				// 	url:'../../question/boostExpert/settleIn/cooperation/cooperation'
				// })
				this.ind = num;
				this.list = [];
				this.getList(num+1)
			},
			goUrl(url){
				uni.navigateTo({
					url
				})
			},
			seeUser(item){
				uni.navigateTo({
					url:'./detail/detail'
				})
			},
			goTo(item){
				// console.log(item)
				item.index = this.ind;
				console.log(item)
				uni.navigateTo({
					url:`./detail/detail?item=${JSON.stringify(item)}`
				})
			},
			async getList(type){
				uni.showLoading();
				let data = await this.$request('/api/v1/service_by_demand_list',{type});
				uni.hideLoading();
				if(data.data.status==='success'){
					if(data.data.data.length>0){
						this.list = data.data.data;
					}
				}
				console.log(data)
			},
		}
	}
</script>

<style lang="scss" scoped>
	.active{
		color: #0EA5FF;
	}
	.nav-top{
		width: 100%;
		// display: flex;
		// justify-content: space-between;
		// align-items: center;
		// box-sizing: border-box;
		// padding:0rpx 24rpx;
		// height: 50rpx;
		position: fixed;
		z-index: 100;
		background: white;
		.box{
			width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			box-sizing: border-box;
			padding:10rpx 24rpx;
			// margin-bottom: 28rpx;
			border-bottom: 1px solid #efefef;
			// height: 50rpx;
			// position: fixed;
			// z-index: 100;
			// background: white;
		}
		view{
			// width: 33%;
			// height: 80rpx;
			// display: flex;
			// justify-content: center;
			// align-items: center;
		}
		.title{
			display: flex;
			justify-content: space-between;
			align-items: center;
			color: #2F2F2F;
			font-size: 32rpx;
			font-weight: bold;
		}
		.icon{
			display: flex;
			flex-direction: row-reverse;
			align-items: center;
			
			image{
				width: 48rpx;
				height: 48rpx;
				border-radius: 50%;
				margin-left: 24rpx;
				// margin-right: 24rpx;
			}
		}
	}
	
	
	.list{
		width: calc(100% - 56rpx);
		margin: 0 auto;
		.item{
			margin-bottom: 32rpx;
			box-sizing: border-box;
			padding: 39rpx 34rpx;
			box-shadow: 0px 1px 13px 0px rgba(4, 0, 0, 0.15);
			border-radius: 10rpx;
			.item-top{
				width: 100%;
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 32rpx;
				.item-top-left{
					display: flex;
					flex-direction: row;
					align-items: center;
					image{
						width: 80rpx;
						height: 80rpx;
						border-radius: 50%;
						margin-right: 20rpx;
					}
					.item-top-left-name{
						display: flex;
						flex-direction: column;
						.name{
							color: #333333;
							font-size: 32rpx;
							margin-bottom: 8rpx;
						}
						.time{
							color: #333333;
							font-size: 32rpx;
						}
					}
				}
				.item-top-right{
					.follow{
						border-radius: 8rpx;
						background: #EBEBEB;
						width: 100rpx;
						height: 44rpx;
						font-size: 20rpx;
						color: #07A2FF;
						display: flex;
						justify-content: center;
						align-items: center;
					}
					.no-follow{
						border-radius: 8rpx;
						background: #0EA5FF;
						width: 100rpx;
						height: 44rpx;
						color: white;
						font-size: 20rpx;
						display: flex;
						justify-content: center;
						align-items: center;
					}
				}
			}
			.item-context{
				display: flex;
				justify-content: space-between;
				align-items: flex-start;
				.item-context-title{
					color: #333333;
					font-size: 32rpx;
					font-weight: bold;
					margin-bottom: 19rpx;
				}
				.item-context-label{
					width: 520rpx;
					color: #333333;
					font-size: 32rpx;
					// font-weight: bold;
					line-height: 40rpx;
				}
				image{
					width: 226rpx;
					height: 125rpx;
				}
				.goto{
					text-align: right;
					color: #3AB4FD;
					font-size: 24rpx;
				}
			}
		}
	}
</style>
