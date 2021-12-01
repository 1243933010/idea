<template>
	<view>
		<view class="tab-top" :style="{'padding-top':statusBarHeight+15+'px'}">
			<view class="search">
				<image src="../../static/index/search.png" mode="widthFix"></image>
				<input type="text" @confirm="searchConfirm" v-model="search" placeholder="默认显示信息" confirm-type="search" />
			</view>

			<view class="icon">
				<image @click="add" src="../../static/index/add.png" mode="widthFix"></image>

			</view>
		</view>
		<view class="tab">
			<image src="../../static/idea/fenlei.png" mode="widthFix"></image>
			<view class="tab-item" v-for="(item,ind) in tabList" :key="ind" @click="chooseIndex(ind)" :class="[ind===index?'active':'']">
				<text>{{item}}</text>
			</view>
		</view>
		<view class="classificationList">
			<scroll-view :scroll-x="true" style="white-space: nowrap;">
				<view class="item" :class="index===classificationListIndex?'classification-active':''" v-for="(item,index) in classificationList"
				 :key="index" @click="chooseType(item,index)">
					<text>{{item.cat_name}}</text>
				</view>
			</scroll-view>
		</view>
		<view class="context">
			<swiper class="swiper" :indicator-dots="false" :duration="500" :style="{height:Height+'px'}" @change="changeSwiper" :current="index">
				<swiper-item>
					<scroll-view scroll-y="true" :style="{height:Height+'px'}" @scrolltolower="scrolltolower">
						<view class="item" v-for="(item,index) in list" :key="index" @click.stop="See(item)">
							<view class="item-user">
								<view class="item-user-left">
									<image @click.stop="seeUser(item)" :src="item.user_photo?item.user_photo:'../../static/mine/headimg.jpg'" mode=""></image>
									<view class="item-user-left-user">
										<text class="item-user-left-user-name">{{item.alias}}</text>
										<text class="item-user-left-user-time">{{item.add_time}}</text>
									</view>
								</view>
								<view class="item-user-right">
									<view class="follow" v-if="userInfo.user_id!==item.user_id&&item.is_follow==0" @click.stop="guanzhu(item)">关注</view>
									<view class="no-follow" v-if="userInfo.user_id!==item.user_id&&item.is_follow==1" @click.stop="quguan(item)">已关注</view>
								</view>
							</view>
							<view class="item-con">
								<view class="item-con-label">
									<text>{{item.goods_name}}</text>
								</view>
								<view class="item-con-con">
									<text v-if="item.goods_desc[0]!=='<'">{{item.goods_desc}}</text>
									<view v-if="item.goods_desc[0]==='<'">
										<rich-text :nodes="item.goods_desc"></rich-text>
									</view>
									<image v-if="item.original_img" :src="item.original_img" mode=""></image>
								</view>
							</view>
							<view class="item-bottom">
								<view class="zan">
									<image v-if="item.is_click=='1'" src="../../static/s_zan_n.png" mode="widthFix"></image>
									<image v-if="item.is_click=='2'" src="../../static/s_zan_y.png" mode="widthFix"></image>
									<text>{{item.click_count}}</text>
								</view>
								<view class="msg">
									<image style="width: 35rpx;" src="../../static/index/pinglun.png" mode="widthFix"></image>
									<text>{{item.comments_number}}</text>
								</view>
								<!-- <view class="zan">
			                            				<image v-if="item.is_follow=='0'" @click.stop="guanzhu(item)" src="../../static/no_flower.png" mode="widthFix"></image>
			                            				<image v-if="item.is_follow=='1'" @click.stop="quguan(item)" src="../../static/is_flower.png" mode="widthFix"></image>
			                            				<text v-if="item.is_follow=='1'">已关注</text>
			                            			</view> -->
							</view>
						</view>
					</scroll-view>
				</swiper-item>
				<swiper-item>
					<scroll-view scroll-y="true" :style="{height:Height+'px'}" @scrolltolower="scrolltolower">
						<view class="item" v-for="(item,index) in list" :key="index" @click.stop="See(item)">
							<view class="item-user">
								<view class="item-user-left">
									<image @click.stop="seeUser(item)" :src="item.user_photo?item.user_photo:'../../static/mine/headimg.jpg'" mode=""></image>
									<view class="item-user-left-user">
										<text class="item-user-left-user-name">{{item.alias}}</text>
										<text class="item-user-left-user-time">{{item.add_time}}</text>
									</view>
								</view>
								<view class="item-user-right">
									<view class="follow" v-if="userInfo.user_id!==item.user_id&&item.is_follow==0" @click.stop="guanzhu(item)">关注</view>
									<view class="no-follow" v-if="userInfo.user_id!==item.user_id&&item.is_follow==1" @click.stop="quguan(item)">已关注</view>
								</view>
							</view>
							<view class="item-con">
								<view class="item-con-label">
									<text>{{item.goods_name}}</text>
								</view>
								<view class="item-con-con">
									<text v-if="item.goods_desc[0]!=='<'">{{item.goods_desc}}</text>
									<view v-if="item.goods_desc[0]==='<'">
										<rich-text :nodes="item.goods_desc"></rich-text>
									</view>
									<image v-if="item.original_img" :src="item.original_img" mode=""></image>
								</view>
							</view>
							<view class="item-bottom">
								<view class="zan">
									<image v-if="item.is_click=='1'" src="../../static/s_zan_n.png" mode="widthFix"></image>
									<image v-if="item.is_click=='2'" src="../../static/s_zan_y.png" mode="widthFix"></image>
									<text>{{item.click_count}}</text>
								</view>
								<view class="msg">
									<image style="width: 35rpx;" src="../../static/index/pinglun.png" mode="widthFix"></image>
									<text>{{item.comments_number}}</text>
								</view>
								<!-- <view class="zan">
									    				<image v-if="item.is_follow=='0'" @click.stop="guanzhu(item)" src="../../static/no_flower.png" mode="widthFix"></image>
									    				<image v-if="item.is_follow=='1'" @click.stop="quguan(item)" src="../../static/is_flower.png" mode="widthFix"></image>
									    				<text v-if="item.is_follow=='1'">已关注</text>
									    			</view> -->
							</view>
						</view>
					</scroll-view>
				</swiper-item>
				<swiper-item>
					<scroll-view scroll-y="true" :style="{height:Height+'px'}" @scrolltolower="scrolltolower">
						<view class="item" v-for="(item,index) in list" :key="index" @click.stop="See(item)">
							<view class="item-user">
								<view class="item-user-left">
									<image @click.stop="seeUser(item)" :src="item.user_photo?item.user_photo:'../../static/mine/headimg.jpg'" mode=""></image>
									<view class="item-user-left-user">
										<text class="item-user-left-user-name">{{item.alias}}</text>
										<text class="item-user-left-user-time">{{item.add_time}}</text>
									</view>
								</view>
								<view class="item-user-right">
									<view class="follow" v-if="userInfo.user_id!==item.user_id&&item.is_follow==0" @click.stop="guanzhu(item)">关注</view>
									<view class="no-follow" v-if="userInfo.user_id!==item.user_id&&item.is_follow==1" @click.stop="quguan(item)">已关注</view>
								</view>
							</view>
							<view class="item-con">
								<view class="item-con-label">
									<text>{{item.goods_name}}</text>
								</view>
								<view class="item-con-con">
									<text v-if="item.goods_desc[0]!=='<'">{{item.goods_desc}}</text>
									<view v-if="item.goods_desc[0]==='<'">
										<rich-text :nodes="item.goods_desc"></rich-text>
									</view>
									<image v-if="item.original_img" :src="item.original_img" mode=""></image>
								</view>
							</view>
							<view class="item-bottom">
								<view class="zan">
									<image v-if="item.is_click=='1'" src="../../static/s_zan_n.png" mode="widthFix"></image>
									<image v-if="item.is_click=='2'" src="../../static/s_zan_y.png" mode="widthFix"></image>
									<text>{{item.click_count}}</text>
								</view>
								<view class="msg">
									<image style="width: 35rpx;" src="../../static/index/pinglun.png" mode="widthFix"></image>
									<text>{{item.comments_number}}</text>
								</view>
								<!-- <view class="zan">
									    				<image v-if="item.is_follow=='0'" @click.stop="guanzhu(item)" src="../../static/no_flower.png" mode="widthFix"></image>
									    				<image v-if="item.is_follow=='1'" @click.stop="quguan(item)" src="../../static/is_flower.png" mode="widthFix"></image>
									    				<text v-if="item.is_follow=='1'">已关注</text>
									    			</view> -->
							</view>
						</view>
					</scroll-view>
				</swiper-item>

			</swiper>


		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabList: ['推荐', '热门', '全部'],
				classificationList: ['人文科学', '人文科学', '人文科学', '人文科学', '人文科学', '人文科学', '人文科学', '人文科学'],
				index: 0,
				Height: '',
				list: [],
				pageNo: 1,
				pageFlog: true,
				search: '',
				userInfo: {},
				classificationListIndex: 0
			}
		},
		computed: {
			statusBarHeight() {
				return this.$store.state.statusBarHeight
			},
		},
		watch: {
			search() {
				if (!this.search) {
					uni.hideKeyboard();
					this.pageNo = 1;
					this.getPost();
				}
			}
		},
		onShow() {
			let userInfo = uni.getStorageSync('userInfo');
			if (!userInfo) {
				uni.reLaunch({
					url: '../login/login'
				})
			}
			this.pageNo = 1;
			if (getApp().globalData.searchText) {
				this.search = getApp().globalData.searchText;
			}
			this.getPost();



		},
		onHide() {
			getApp().globalData.searchText = '';
		},
		mounted() {
			uni.getSystemInfo({
				success: (res) => {
					console.log(res)
					console.log(res.statusBarHeight)
					this.Height = res.windowHeight - 60 - 50 - 18 - 12 - 15;
				}
			})

			this.userInfo = uni.getStorageSync('userInfo');
			this.getTypeList();
		},
		methods: {
			scrolltolower(e){
				console.log(e);
				// this.pageNo++;
				this.getPost();
			},
			changeSwiper(e){
				this.index = e.detail.current;
				this.pageFlog = true;
				this.list = [];
				this.pageNo = 1;
				this.getPost();
				console.log(e)
			},
			async getPost(a) {
				let userInfo = uni.getStorageSync('userInfo');

				if (this.pageFlog) {
					this.pageFlog = false;
					let type = this.index;
					if (this.index === 2) {
						type = '';
					} else {
						type = this.index + 1
					}
					let obj = {
						user_id: userInfo.user_id,
						page: this.pageNo,
						size: 10,
						keyword: this.search,
						type
					};
					console.log(a)
					if (a) {
						console.log(a)
						obj = Object.assign(obj, a);
					}
					uni.showLoading();
					let data = await this.$request('/api/v1/ArticleList', obj, 'GET');
					uni.hideLoading();
					// type:this.index+1
					this.pageFlog = true;
					if (data.data.status === 'success') {
						if (data.data.data.data.length) {
							this.list.push(...data.data.data.data);
							// this.pageNo === 1 ? this.list = data.data.data.data : this.list.push(...data.data.data.data);
						}
						this.pageNo++;
					}
					console.log(data)
				}
			},
			chooseIndex(index) {
				this.index = index;
				this.pageNo = 1;
				this.list = [];
				this.getPost();
			},
			See(item) {
				let historyList = uni.getStorageSync('historyList');

				if (typeof(historyList) === 'string' && !historyList) {
					uni.setStorageSync('historyList', []);
					let arr = uni.getStorageSync('historyList');
					arr.push({
						type: '1',
						con: item
					})
					uni.setStorageSync('historyList', arr)
				} else {
					historyList.push({
						type: '1',
						con: item
					})
					uni.setStorageSync('historyList', historyList)
				}
				console.log(item);
				uni.navigateTo({
					url: `./ideaDetail?goods_id=${item.goods_id}`
				})
			},
			noctife() {
				uni.navigateTo({
					url: './notificationCenter/notificationCenter'
				})
			},
			async guanzhu(item) {
				console.log(item)
				let obj = {
					fans_id: item.user_id
				}
				let data = await this.$request('/api/v1/add_Agent', obj);
				if (data.data.status === 'success') {

					this.pageNo = 1;
					this.getPost();
				}
				this.$toast(data.data.message);
				console.log(item)
			},
			async quguan(item) {
				let obj = {
					fans_id: item.user_id
				}
				let data = await this.$request('/api/v1/delete_Agent', obj);
				if (data.data.status === 'success') {
					this.$toast(data.data.message);
					this.pageNo = 1;
					this.getPost();
				}
				console.log(item)
			},
			seeUser(item) {
				let userInfo = uni.getStorageSync('userInfo');
				if (item.user_id === userInfo.user_id) {
					uni.navigateTo({
						url: '../me/myPost/myPost'
					})
					return false;
				}

				console.log(item)
				uni.navigateTo({
					url: `../index/userPage/userPage?user_id=${item.user_id}`
				})
			},
			async searchConfirm() {
				let userInfo = uni.getStorageSync('userInfo');
				this.pageNo = 1;
				if (this.pageFlog) {
					this.pageFlog = false;
					let type = this.index;
					if (this.index === 0) {
						type = '';
					}
					let data = await this.$request('/api/v1/ArticleList', {
						user_id: userInfo.user_id,
						page: this.pageNo,
						size: 10,
						keyword: this.search,
						type
					}, 'GET');
					// type:this.index+1
					this.pageFlog = true;
					if (data.data.status === 'success') {
						// if(data.data.data.data.length){
						this.pageNo === 1 ? this.list = data.data.data.data : this.list.push(...data.data.data.data);
						// }
						this.pageNo++;
					}
					console.log(data)
				}
			},
			add() {
				uni.navigateTo({
					url: '../index/classification/classification'
				})
			},
			async getTypeList() {
				let data = await this.$request('/api/v1/CategoryList', {}, 'GET');
				if (data.data.status === 'success') {
					this.classificationList = [];
					this.classificationList.push({
						cat_name: '全部'
					})
					this.classificationList.push(...data.data.data);
				}
				console.log(data)
			},
			async chooseType(item, index) {
				this.classificationListIndex = index;
				this.pageNo = 1;
				this.list = [];
				this.getPost({
					cat_id: item.cat_id
				});
				console.log(item)
			}
		}
	}
</script>

<style scoped lang="scss">
	.classification-active {
		color: #0EA5FF !important;
	}

	.classificationList {
		// display:inline-block;
		// width: 100%;
		// display: flex;
		// flex-direction: row;
		// align-items: center;
		// flex-wrap: wrap;
		// width: calc(750rpx - 48rpx);
		// box-sizing: border-box;
		margin: 13rpx auto;
		padding: 0rpx 48rpx 14rpx 24rpx;
		// padding: 0 48rpx;
		border-bottom: 1px solid #F5F5F5;

		.item {
			display: inline-block;
			background: #EBEBEB;
			color: #282828;
			font-size: 26rpx;
			border-radius: 10rpx;
			margin-right: 21rpx;
			box-sizing: border-box;
			padding: 4rpx 10rpx;
		}
	}

	.active {
		// font-size: 32rpx !important;
		color: #0EA5FF !important;
		font-weight: 600 !important;
	}

	.tab-top {
		width: 100%;
		height: 60rpx;
		box-sizing: border-box;
		padding-left: 25rpx;
		padding-right: 25rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 36rpx;

		.search {
			width: 690rpx;
			background: #E6E6E6;
			display: flex;
			flex-direction: row;
			align-items: center;
			box-sizing: border-box;
			padding: 10rpx 20rpx;
			border-radius: 10rpx;

			// margin-right: 15rpx;
			image {
				width: 40rpx;
				margin-right: 15rpx;
			}

			input {
				color: #666666;
				font-size: 26rpx;
			}
		}

		.icon {
			width: 60rpx;
			position: relative;
			display: flex;
			flex-direction: row-reverse;
			// justify-content: space-around;
			align-items: center;

			image {
				width: 40rpx;

			}

			view {
				position: absolute;
				top: -5rpx;
				right: 0;
				width: 15rpx;
				height: 15rpx;
				background: red;
				border-radius: 50%;
			}
		}
	}

	.tab {
		width: 100%;
		height: 50rpx;
		box-sizing: border-box;
		padding-left: 25rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-bottom: 24rpx;

		image {
			width: 46rpx;
			height: 46rpx;
			margin-right: 23rpx;
		}

		.tab-item {
			display: flex;
			flex-direction: row;
			align-items: center;
			margin-right: 27rpx;
			color: #282828;
			font-size: 30rpx;
		}
	}

	.context {
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
					font-weight: 600;
				}

				.item-con-con {
					color: #1F1F1F;
					font-size: 26rpx;
					font-weight: 500;
					display: flex;
					// align-items: top;
					flex-direction: row;
					align-items: flex-start;

					view {
						// width: 410rpx;
					}

					text {
						width: 510rpx;
						display: inline-block;
						// width: 50%;
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
						width: 40rpx;
						margin-right: 16rpx;
					}
				}
			}
		}
	}
</style>
