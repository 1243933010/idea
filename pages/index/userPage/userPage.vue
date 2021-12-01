<template>
	<view>
		<view class="info">
			<view class="top">
				<view class="left">
					<view class="heaimg">
						<image :src="obj.user_photo?obj.user_photo:'../../../static/mine/headimg.jpg'" mode=""></image>
					</view>
					<view class="right-info">
						<view class="user-name">
							<text>{{obj.alias}}</text>
							
							<!-- 							<image src="../../../static/index/nv.png" mode="widthFix"></image> -->
							<!-- <image src="nan" mode=""></image> -->
							<!-- <text class="label">#教授</text> -->
						</view>
						<text class="sign" :style="{'display':obj.remark.length>10?'-webkit-box':'inline'}">
							<text class="sign-tag">个性签名：</text>
							<text class="sign-con" v-if="obj.remark" >{{obj.remark}}</text>
							<text class="sign-con" v-if="!obj.remark" >今天天气好</text>
						</text>
					</view>
				</view>
				<view class="right">
					<text v-if="obj.is_follow===0" @click="guanzhu(obj)">关注</text>
					<text v-if="obj.is_follow===1" @click="quguan(obj)">取消关注</text>
					<text @click="chat">私信</text>
				</view>

			</view>
			<view class="bottom">
				<view class="item">
					<view class="num">{{obj.total_article}}</view>
					<text>我的帖子</text>
				</view>
				<view class="item" @click="goTo(`./hisAttention?user_id=${obj.user_id}`)">
					<view class="num">{{obj.total_follow}}</view>
					<text>关注</text>
				</view>
				<view class="item" @click="goTo(`./hisFens?user_id=${obj.user_id}`)">
					<view class="num">{{obj.total_fans}}</view>
					<text>粉丝</text>
				</view>
			</view>
		</view>



		<view class="post-item">
			<view class="item" v-for="(item,index) in list" :key="index" @click="seeItem(item)">
				<view class="item-user">
					<view class="item-user-left">
						<image :src="item.user_photo?item.user_photo:'../../../static/mine/headimg.jpg'" mode=""></image>
						<view class="item-user-left-user">
							<text class="item-user-left-user-name">{{item.alias}}</text>
							<text class="item-user-left-user-time">{{item.add_time}}</text>
						</view>
					</view>
					<!-- <view class="item-user-right">
						<view class="follow" v-if="item.status=='0'">关注</view>
						<view class="no-follow"  v-if="item.status=='1'">已关注</view>
					</view> -->
				</view>
				<view class="item-con">
					<view class="item-con-label">
						<text>{{item.goods_name}}</text>
					</view>
					<view class="item-con-con">
						<text>{{item.goods_desc}}</text>
						<image v-if="item.original_img" :src="item.original_img" mode=""></image>
					</view>
				</view>
				<view class="item-bottom">
					<!-- <view class="zan">
						<image src="../../../static/index/pinglun.png" mode="widthFix"></image>
						<text>530</text>
					</view> -->
					<view class="msg">
						<image v-if="item.is_click==1" src="../../../static/s_zan_y.png" mode="widthFix"></image>
						<image v-if="item.is_click==2" src="../../../static/s_zan_n.png" mode="widthFix"></image>
						<text>{{item.click_count}}</text>
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
				list: [{
						icon: '',
						name: '测试name',
						time: '15分钟前',
						status: '0',
						label: 'AI是第四次工业革命的核心驱动力量',
						con: '1月2日晚，中央广播电视总台财经频道《对话》栏目新年第一期节目播出，以《智能经济：“云”知道答案》为主题，百度CTO王海峰在谈及AI对各行各业的影响时表示：人工智',

					},
					{
						icon: '',
						name: '测试name',
						time: '15分钟前',
						status: '1',
						label: 'AI是第四次工业革命的核心驱动力量',
						con: '1月2日晚，中央广播电视总台财经频道《对话》栏目新年第一期节目播出，以《智能经济：“云”知道答案》为主题，百度CTO王海峰在谈及AI对各行各业的影响时表示：人工智',
						img: "../../../static/logo.png"
					},
				],
				userInfo: {},
				obj: {remark:[]},
				pageFlog:true,
				pageNo:1,
				user_id:''
			}
		},
		onReachBottom() {
			this.getPost();
		},
		onLoad(e) {
			console.log(e.user_id)
			this.user_id = e.user_id;
			this.userInfo = uni.getStorageSync('userInfo')
			this.getUserInfo(e.user_id);
		},
		methods: {
			chat(){
				uni.navigateTo({
					url:`./chat?name=${this.obj.alias}&user_id=${this.obj.user_id}`
				})
			},
			async getUserInfo(user_id) {
				let obj = {
					user_id
				};
				let data = await this.$request('/api/v1/getUsersInfo_others', obj, 'GET');
				if (data.data.status === 'success') {
					this.obj = data.data.data;
					this.getPost();
				}
				console.log(data);
			},
			goTo(url) {
				uni.navigateTo({
					url
				})
			},
			async getPost() {
				// let userInfo = uni.getStorageSync('userInfo');
				if (this.pageFlog) {
					this.pageFlog = false;
					let data = await this.$request('/api/v1/users_articleList', {
						user_id:this.obj.user_id,
						page: this.pageNo,
						size: 10
					}, 'GET');
					this.pageFlog = true;
					if (data.data.status === 'success') {
						if (data.data.data.data.length) {
							this.pageNo === 1 ? this.list = data.data.data.data : this.list.push(...data.data.data.data);
						}
						this.pageNo++;
					}
					console.log(data)
				}
			},
			seeItem(item){
				uni.navigateTo({
					url:`../../idea/ideaDetail?goods_id=${item.goods_id}`
				})
			},
			async guanzhu(item){
				let obj = {
					fans_id:item.user_id
				}
				let data = await this.$request('/api/v1/add_Agent',obj);
				this.$toast(data.data.message);
				if(data.data.status==='success'){
					// this.pageNo = 1;
					this.getUserInfo(this.user_id);
				}
				console.log(item)
			},
			async quguan(item){
				let obj = {
					fans_id:item.user_id
				}
				let data = await this.$request('/api/v1/delete_Agent',obj);
				this.$toast(data.data.message);
				if(data.data.status==='success'){
					// this.pageNo = 1;
					this.getUserInfo(this.user_id);
				}
				console.log(item)
			},
		}
	}
</script>

<style lang="less">
	.info {
		padding: 0rpx 34rpx 33rpx;
		background-color: #24ADFF;
		margin-bottom: 20rpx;

		.top {
			display: flex;
			justify-content: space-between;
			align-items: center;

			.left {
				display: flex;
				align-items: center;
				width: calc(100% - 148rpx);

				.heaimg {
					width: 114rpx;
					height: 114rpx;
					border-radius: 50%;
					overflow: hidden;

					image {
						width: 100%;
						height: 100%;
					}
				}

				.right-info {
					width: calc(100% - 114rpx);
					padding-left: 23rpx;
					color: #fff;

					.user-name {
						display: block;
						font-size: 17rpx;
						display: flex;
						flex-direction: row;
						align-items: center;

						text {
							margin-right: 10rpx;
						}

						image {
							width: 28rpx;
							margin-right: 10rpx;
						}

						.label {
							background: rgba(255, 255, 255, 0.3);
							box-sizing: border-box;
							padding: 3rpx 10rpx;
							border-radius: 5rpx;
						}
					}

					.sign {
						margin-top: 17rpx;
						padding: 3rpx 5rpx;
						display: inline-block;
						font-size: 11rpx;
						border: 1px solid #fff;
						border-radius: 50rpx;
						overflow: hidden;
						word-break: break-all;
						text-overflow: ellipsis;

						-webkit-box-orient: vertical;
						-webkit-line-clamp: 1;

						.sign-tag {}

						.sign-con {}
					}
				}
			}

			.right {
				// padding: 8rpx 20rpx 8rpx 20rpx;
				display: inline-block;
				font-size: 20rpx;
				display: flex;
				flex-direction: column;
				align-items: center;
				text{
					padding: 8rpx 0rpx 8rpx 0rpx;
					width: 140rpx;
					text-align: center;
					background-color: #FFFFFF;
					border: 1px solid #fff;
					color: #07A2FF;
					border-radius: 8rpx;
					margin-bottom: 20rpx;
				}
				image {
					width: 30rpx;
				}
			}
		}

		.bottom {
			margin-top: 50rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.item {
				text-align: center;
				color: #fff;
				width: 33.33%;

				.num {
					font-size: 40rpx;
				}

				text {
					color: #E2F4FF;
					display: block;
					font-size: 24rpx;
				}
			}
		}
	}

	.set-tab {
		width: 100%;
		margin-top: -60rpx;
		margin-bottom: 75rpx;

		.con {
			width: calc(100% - 40rpx);
			margin: 0 auto;
			background: #FFFFFF;
			box-shadow: 0px 0px 24px 0px rgba(101, 176, 249, 0.41);
			border-radius: 20rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			box-sizing: border-box;
			padding: 35rpx 20rpx;

			.item {
				display: flex;
				flex-direction: column;
				align-items: center;
				color: #333333;
				font-size: 26rpx;

				image {
					width: 40rpx;
					margin-bottom: 24rpx;
				}
			}
		}
	}

	.setting {
		.setting-con {
			width: calc(100% - 106rpx);
			margin: 0 auto;
			display: flex;
			flex-direction: column;

			.item {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 57rpx;

				.item-left {
					display: flex;
					flex-direction: row;
					align-items: center;
					font-size: 28rpx;
					color: #666666;

					image {
						width: 40rpx;
						margin-right: 28rpx;
					}
				}

				.item-right {
					image {
						width: 35rpx;
					}
				}
			}
		}
	}

	.post-item {
		width: 100%;

		.item {
			border-bottom: 4px solid #F5F5F5;
			margin-bottom: 15rpx;
			box-sizing: border-box;
			padding: 0 27rpx;

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

					text {
						width: 510rpx;
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
						width: 30rpx;
						margin-right: 16rpx;
					}
				}
			}
		}
	}
</style>
