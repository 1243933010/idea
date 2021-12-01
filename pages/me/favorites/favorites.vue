<template>
	<view>
		<view class="con">
			<view class="today">

				<view class="all" v-for="(item,index) in historyList" :key="index" @click="goTo(item)">
					<view class="list" v-if="item.goods_id">
						<view class="item">
							<view class="item-top">
								<view class="item-top-left">
									<!-- 								<image src="../../../static/mine/headimg.jpg" mode=""></image> -->
									<image :src="item.users_goods.user_photo?item.users_goods.user_photo:'../../../static/mine/headimg.jpg'" mode=""></image>
									<view class="item-top-left-name">
										<text class="name">{{item.users_goods.alias}}</text>
										<text class="time">{{item.users_goods.add_time}}</text>
									</view>
								</view>

							</view>
							<!-- <view class="item-context-all"> -->
								<view class="item-context">
									<view class="item-context-title"><text>{{item.users_goods.title}}</text></view>
									<view class="item-context-all">
										
									
									<!-- <view class="item-context-label"><text>{{item.users_goods.desc}}</text></view> -->
									<text class="item-context-label" v-if="item.users_goods.desc&&item.users_goods.desc.substr(0,1)!=='<'">{{item.users_goods.desc}}</text>
										
										<!-- <text>{{item.users_wholesale.desc}}</text> -->
										<view class="item-context-label" v-if="item.users_goods.desc&&item.users_goods.desc.substr(0,1)=='<'">
										<rich-text  :nodes="item.users_goods.desc"></rich-text>
									</view>
									<image :src="item.users_goods.cover_image" mode=""></image>
								</view>
								</view>
								<view class="item-bottom">
									<view class="zan">
										<image style="width: 36rpx;" src="../../../static/s_zan_n.png" mode="widthFix"></image>
										<text>{{item.users_goods.click_count}}</text>
									</view>
									<view class="msg">
										<image style="width: 30rpx;" src="../../../static/index/pinglun.png" mode="widthFix"></image>
										<text>{{item.users_goods.comments_number}}</text>
									</view>
									
								</view>
							<!-- </view> -->
						</view>
					</view>

					<view class="context" v-if="item.wsid">
						<view class="item">
							<view class="item-user">
								<view class="item-user-left">

									<image :src="item.users_wholesale.user_photo?item.users_wholesale.user_photo:'../../../static/mine/headimg.jpg'"
									 mode=""></image>
									<view class="item-user-left-user">
										<text class="item-user-left-user-name">{{item.users_wholesale.alias}}</text>
										<text class="item-user-left-user-time">{{item.users_wholesale.add_time}}</text>
									</view>
								</view>
								<!-- <view class="item-user-right">
									<view class="follow" v-if="item.status=='0'">关注</view>
									<view class="no-follow"  v-if="item.status=='1'">已关注</view>
								</view> -->
							</view>
							<view class="item-con">
								<view class="item-con-label">
									<text>{{item.users_wholesale.title}}</text>
								</view>
								<view class="item-con-con">
									<text v-if="item.users_wholesale.desc&&item.users_wholesale.desc.substr(0,1)!=='<'">{{item.users_wholesale.desc}}</text>
									
									<!-- <text>{{item.users_wholesale.desc}}</text> -->
									<view class="" v-if="item.users_wholesale.desc&&item.users_wholesale.desc.substr(0,1)=='<'">
									<rich-text  :nodes="item.users_wholesale.desc"></rich-text>
								</view>
								<image v-if="item.users_wholesale.cover_image" :src="item.users_wholesale.original_img" mode=""></image>
							</view>
						</view>
						<view class="item-bottom">
							<view class="zan">
								<image style="width: 36rpx;" src="../../../static/s_zan_n.png" mode="widthFix"></image>
								<text>{{item.users_wholesale.click_count}}</text>
							</view>
							<view class="msg">
								<image style="width: 30rpx;" src="../../../static/index/pinglun.png" mode="widthFix"></image>
								<text>{{item.users_wholesale.comments_number}}</text>
							</view>
							
						</view>
						<!-- <view class="item-bottom">
								<view class="zan">
									<image src="../../../static/logo.png" mode="widthFix"></image>
									<text>530</text>
								</view>
								<view class="msg">
									<image src="../../../static/logo.png" mode="widthFix"></image>
									<text>530</text>
								</view>
							</view> -->
					</view>
				</view>
			</view>


		</view>
	</view>


	<!-- 	<view class="fied-bk" @click="hidePopup" v-show="flog">
			<view class="clear">
				<view class="text" @click.stop="clearMsg"><text>清除所有浏览足迹</text></view>
			</view>
		</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				flog: false,
				historyList: []
			};
		},
		mounted() {
			// let historyList = uni.getStorageSync('historyList');
			// console.log(historyList)
			// if(historyList){
			// 	this.historyList = historyList;
			// }
			this.getList();
		},
		// onNavigationBarButtonTap() {
		// 	this.flog = true;
		// },
		methods: {
			async getList() {
				uni.showLoading();
				let userInfo = uni.getStorageSync('userInfo');
				let obj = {
					user_id: userInfo.user_id
				};
				let data = await this.$request('/api/v1/users_collectList', obj);
				uni.hideLoading();
				if (data.data.status === 'success') {
					this.historyList = data.data.data;
				}
				console.log(data)
			},
			clearMsg() {
				uni.removeStorageSync('historyList');
				this.historyList = [];
				this.flog = false;
				this.$toast('清理成功');

			},
			hidePopup() {
				this.flog = false;
			},
			goTo(item){
				console.log(item)
				if(item.goods_id){
					uni.navigateTo({
						url:`../../idea/ideaDetail?goods_id=${item.goods_id}`
					})
				}else{
					uni.navigateTo({
						url:`../../question/detail?wsid=${item.wsid}`
					})
				}
			}
		},
	}
</script>

<style lang="scss" scoped>
	.item-bottom{
		width: 100%;
		padding-left: 28rpx;
		margin-bottom: 23rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		.zan,.msg{
			display: flex;
			flex-direction: row;
			align-items: center;
			font-size: 23rpx;
			color: #949494;
			margin-right: 41rpx;
			image{
				width: 30rpx;
				margin-right: 16rpx;
			}
		}
	}
	.item-context-all{
		display: flex;
		justify-content: space-between;
		// align-items: center;
		margin-bottom: 36rpx;
		.item-context-label{
			width: 80%;
		}
		image{
			width: 225rpx;
			height: 125rpx;
			border-radius: 10rpx;
		}
	}
	page {
		// background: #F2F2F2;
	}

	.list {
		width: calc(100% - 56rpx);
		margin: 0 auto;

		.item {
			margin-bottom: 32rpx;
			padding: 0rpx 0rpx 0rpx 0;
			border-bottom: 4px solid #F5F5F5;
			.item-top {
				width: 100%;
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 32rpx;

				.item-top-left {
					display: flex;
					flex-direction: row;
					align-items: center;

					image {
						width: 80rpx;
						height: 80rpx;
						border-radius: 50%;
						margin-right: 20rpx;
					}

					.item-top-left-name {
						display: flex;
						flex-direction: column;

						.name {
							color: #202020;
							font-size: 30rpx;
							margin-bottom: 8rpx;
						}

						.time {
							color: #808080;
							font-size: 20rpx;
						}
					}
				}

				.item-top-right {
					view {
						width: 120rpx;
						height: 50rpx;
						background: #FFFFFF;
						border-radius: 8rpx;
						font-size: 20rpx;
						font-weight: bold;
						color: #07A2FF;
						display: flex;
						justify-content: center;
						align-items: center;
					}
				}
			}

			.item-context {
				.item-context-title {
					color: #141414;
					font-size: 32rpx;
					font-weight: bold;
					margin-bottom: 19rpx;
				}

				.item-context-label {
					color: #1F1F1F;
					font-size: 26rpx;
					font-weight: bold;
					line-height: 40rpx;
					overflow: hidden;
					-webkit-line-clamp: 3; 
					-webkit-box-orient: vertical;
					display: -webkit-box;
				}

				.goto {
					text-align: right;
					color: #3AB4FD;
					font-size: 24rpx;
				}
			}
		}
	}

	.con {
		.today {
			.title {
				color: #333333;
				font-size: 24rpx;
				padding: 14rpx 0 14rpx 27rpx;
			}
		}
	}

	.context {
		width: 100%;

		.item {
			border-bottom: 4px solid #F5F5F5;
			margin-bottom: 15rpx;
			box-sizing: border-box;
			padding: 20rpx 27rpx;
			background: white;

			.item-user {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 33rpx;

				.item-user-left {
					display: flex;
					flex-direction: row;
					align-items: center;

					image {
						width: 80rpx;
						height: 80rpx;
						border-radius: 50%;
						margin-right: 20rpx;
					}

					.item-user-left-user {
						display: flex;
						flex-direction: column;

						.item-user-left-user-name {
							color: #202020;
							font-size: 30rpx;
						}

						.item-user-left-user-time {
							color: #808080;
							font-size: 20rpx;
						}
					}
				}

				.item-user-right {
					.follow {
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

					.no-follow {
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

			.item-con {
				display: flex;
				flex-direction: column;
				margin-bottom: 37rpx;

				.item-con-label {
					color: #141414;
					font-size: 32rpx;
					margin-bottom: 18rpx;
				}

				.item-con-con {
					color: #1F1F1F;
					font-size: 26rpx;
					font-weight: 500;
					display: flex;
					flex-direction: row;
					align-items: flex-start;

					// view {
					// 	width: 400rpx;
					// }

					text {
						// width: 510rpx;
						overflow: hidden;
						-webkit-line-clamp: 3;
						-webkit-box-orient: vertical;
						display: -webkit-box;
					}

					image {
						width: 226rpx;
						height: 125rpx;
						border-radius: 15rpx;
						margin-left: 35rpx;
					}
				}
			}

			.item-bottom {
				width: 100%;
				padding-left: 28rpx;
				margin-bottom: 23rpx;
				display: flex;
				flex-direction: row;
				align-items: center;

				.zan,
				.msg {
					display: flex;
					flex-direction: row;
					align-items: center;
					font-size: 23rpx;
					color: #949494;
					margin-right: 41rpx;

					image {
						width: 25rpx;
						margin-right: 16rpx;
					}
				}
			}
		}
	}

	.fied-bk {
		position: fixed;
		top: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.2);

		.clear {
			width: 100%;
			height: 100%;
			position: relative;

			.text {
				position: absolute;
				right: 0;
				/* #ifdef H5 */
				top: 100rpx;
				/* #endif */
				/* #ifdef APP-PLUS */
				top: 10rpx;
				/* #endif */
				width: 290rpx;
				background: white;
				padding: 10rpx 0;
				color: #383838;
				font-size: 26rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				border-radius: 8rpx;
				z-index: 1;
			}

			.sanjiao {
				width: 40rpx;
				height: 40rpx;
				background: red;
				transform: rotate(45deg);
				position: absolute;
				right: 0;
				top: 80rpx;
			}
		}
	}
</style>
