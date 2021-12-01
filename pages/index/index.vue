<template>
	<view class="" >
		<view class="search" style="width: 100%;height: 200rpx;background: white;position: fixed;top: 0;" :style="{'padding-top':statusBarHeight+'px'}">
			<view class="left">
				
				        <view class="address">
							<!-- <pick-regions :defaultRegion="defaultRegionCode" @getRegion="handleGetRegion"> -->
				        	<view @click="choosePopup" class="text">{{address}}</view>
							 <!-- </pick-regions> -->
				        	<!-- <image  src="../../static/index/s_sanjiao.png" mode="widthFix"></image> -->
				        	<!-- <icons type="success"></icons> -->
				        </view>   
				 
				<view class="input">
					<image src="../../static/index/search.png" mode="widthFix"></image>
					<view class="inp-left">
						<input type="text" v-model="keyword" @confirm="search" confirm-type="search" placeholder="搜索您感兴趣的话题" />
					</view>
					<view class="inp-right">
						<!-- <image src="../../static/index/sao.png" mode="widthFix"></image> -->
					</view>
				</view>
			</view>
			<view class="btn">
				<image @click="sao" src="../../static/index/sao.png" mode="widthFix"></image>
			</view>
		</view>
		<view class="" style="width: 100%;height: 200rpx;">
			
		</view>
		<view class="swiper-con">
			<swiper class="swiper" indicator-active-color="white" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval"
			 :duration="duration" :circular="true">
				<swiper-item v-for="(item,index) in shuffling" :key="index" @click="chooseShuffling(item)">
					<view class="swiper-item uni-bg-red">
						<image :src="item.ad_code" mode="widthFix"></image>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<view class="announcement">
			<view class="announcement-con">
				<view class="announcement-left">
					<image src="../../static/index/laba.png" mode="widthFix"></image>
				</view>
				<view class="announcement-hr"></view>
				<view class="announcement-swiper">
					<!-- :autoplay="true"  -->
					<swiper class="swiper" 
					:autoplay="true" 
					:interval="2000" 
					:duration="500"
					:circular="true"
					:vertical="true"
					:disable-touch="true"
					>
						<swiper-item v-for="(item,index) in notice" :key="index">
							<view class="swiper-item uni-bg-red announcement-swiper-style"><text>{{item.title}}</text></view>
						</swiper-item>
					</swiper>
				</view>
			</view>
		</view>
		<view class="post">
			<view class="post-title">
				<!-- <image src="" mode=""></image> -->
				<text>精选热帖</text>
			</view>
			<!-- <scroll-view scroll-y="true" > -->
				<view class="post-item">
					<view  v-if="list.length===0" style="font-size: 20rpx;">
						<text>暂无更多帖子</text>
					</view>
					<view class="item" v-for="(item,index) in list" :key="index" @click="seeDetail(item)">
						<view class="item-user">
							<view class="item-user-left">
								<image @click.stop="seeUser(item)" :src="item.user_photo?item.user_photo:'../../static/mine/headimg.jpg'" mode=""></image>
								<view class="item-user-left-user">
									<text class="item-user-left-user-name">{{item.alias}}</text>
									<text class="item-user-left-user-time">{{item.add_time}}</text>
								</view>
							</view>
							<view class="item-user-right">
								<view class="follow" v-if="item.is_follow==0" @click.stop="guanzhu(item)">关注</view>
								<view class="no-follow"  v-if="item.is_follow==1"  @click.stop="quguan(item)">已关注</view>
							</view>
						</view>
						<view class="item-con">
							<view class="item-con-label">
								<text>{{item.goods_name}}</text>
							</view>
							<view class="item-con-con">
								<text v-if="item.goods_desc&&item.goods_desc.substr(0,1)!=='<'">{{item.goods_desc}}</text>
								<!-- <text>{{item.goods_desc[0]}}</text> -->
								<view class="" v-if="item.goods_desc&&item.goods_desc.substr(0,1)=='<'">
									<rich-text  :nodes="item.goods_desc"></rich-text>
								</view>
								
								<image v-if="item.original_img" :src="item.original_img" mode=""></image>
							</view>
						</view>
						<view class="item-bottom">
							<view class="zan">
								<image v-if="item.is_click=='1'" src="../../static/s_zan_y.png" mode="widthFix"></image>
								<image v-if="item.is_click=='2'" src="../../static/s_zan_n.png" mode="widthFix"></image>
								<text>{{item.click_count}}</text>
							</view>
							<view class="msg">
								<image style="width: 35rpx;" src="../../static/index/pinglun.png" mode="widthFix"></image>
								<text>{{item.comments_number}}</text>
							</view>
							<view class="zan">
								<!-- <image v-if="item.is_follow=='0'" @click.stop="guanzhu(item)" src="../../static/n_guanzhu.png" mode="widthFix"></image>
								<image v-if="item.is_follow=='1'" @click.stop="quguan(item)" src="../../static/y_guanzhu.png" mode="widthFix"></image> -->
								<!-- <text v-if="item.is_follow=='1'">已关注</text> -->
							</view>
						</view>
					</view>
				</view>
			<!-- </scroll-view> -->
		</view>
		
		
		
		<view class="fixed" v-show="flog" @click.stop="hideFlog">
			<view class="fixed-popup">
				<view class="fixed-popup-bk">
					<view class="sanjao">
						
					</view>
					<view @click="goTo('../question/boostExpert/boostExpert')" style="margin-bottom: 35rpx;">
						<image src="../../static/index/zhuanjia.png" mode="widthFix"></image>
						<text>助推专家</text>
					</view>
					<view style="margin: 0;" @click="goTo('./cooperation/cooperation')">
						<image src="../../static/index/hezuo.png" mode="widthFix"></image>
						<text>合作</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	 // import pickRegions from '@/components/pick-regions/pick-regions.vue'
	export default {
		// components:{pickRegions},
		data() {
			return {
				title: 'Hello',
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				list:[],
				notice:[],
				shuffling:[],
				pageNo:1,
				pageFlog:true,
				address:'实现想法',
				defaultRegion:['广东省','广州市'],
				 defaultRegionCode:'440113',
				 flog:false,
				 keyword:''
			}
		},
		 computed:{
		            regionName(){
		                // 转为字符串
		                return this.region.map(item=>item.name).join(' ')
		            }
		        },
		mounted() {
			this.getImgList();
			this.getAddress();
		},
		onReachBottom() {
			this.getPost();
		},
		onShow() {
			let userInfo = uni.getStorageSync('userInfo');
			if(!userInfo){
				uni.reLaunch({
					url:'../login/login'
				})
			}
			this.pageNo = 1;
		    getApp().globalData.searchText = '';
			this.getPost();
			
		},
		computed: {
			statusBarHeight() {
				// uni.navigateTo({
				// 	url:'../question/boostExpert/boostExpert'
				// })
				return this.$store.state.statusBarHeight
			}
		},
		watch:{
			keyword(){
				if(!this.keyword){
					this.pageNo = 1;
					this.getPost();
				}
			}
		},
		methods: {
			search(e){
				getApp().globalData.searchText = e.detail.value;
				uni.switchTab({
					url:'../idea/idea'
				})
			},
			handleGetRegion(region){
				console.log(region)
				this.address = region[1].name;
			   },
			getAddress(){
				console.log('11')
			uni.getLocation({
			    type: 'gcj02',
				geocode:true,
			    success:  (res)=> {
					// #ifdef APP-PLUS
					console.log(res)
					// #endif
					// this.getMsg()
			    }
			});
			},
			async getPost(text){
				let obj = {
					page:this.pageNo,
					size:10
				};
				
				if(text){
					obj.keyword = text;
				}else{
					obj.type='3';	
				}
				let userInfo = uni.getStorageSync('userInfo');
				if(this.pageFlog){
					this.pageFlog = false;
					let data = await this.$request('/api/v1/ArticleList',obj,'GET');
					this.pageFlog = true;
					if(data.data.status === 'success'){
						if(data.data.data.data.length){
							this.pageNo===1?this.list = data.data.data.data:this.list.push(...data.data.data.data);
						}
						this.pageNo++;
					}
					console.log(data)
				}
			},
			async getImgList(){
				let data = await this.$request('/api/v1/Home',{},'GET');
				if(data.data.status==='success'){
					this.notice = data.data.data.notice;
					this.shuffling = data.data.data.shuffling;
				}
				console.log(data)
			},
			
			seeUser(item){
				console.log(item)
				let userInfo = uni.getStorageSync('userInfo');
				if(item.user_id===userInfo.user_id){
					uni.navigateTo({
						url:'../me/myPost/myPost'
					})
					return false;
				}
				console.log(item)
				uni.navigateTo({
					url:`./userPage/userPage?user_id=${item.user_id}`
				})
			},
			chooseShuffling(item){
				console.log(item);
			},
			async guanzhu(item){
				let obj = {
					fans_id:item.user_id
				}
				let data = await this.$request('/api/v1/add_Agent',obj);
				this.$toast(data.data.message);
				if(data.data.status==='success'){
					this.pageNo = 1;
					this.getPost();
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
					this.pageNo = 1;
					this.getPost();
				}
				console.log(item)
			},
			seeDetail(item){
				let historyList = uni.getStorageSync('historyList');

				if(typeof(historyList)==='string'&&!historyList){
					uni.setStorageSync('historyList',[]);
					let arr = uni.getStorageSync('historyList');
					arr.push({type:'1',con:item})
					uni.setStorageSync('historyList',arr)
				}else{
					historyList.push({type:'1',con:item})
					uni.setStorageSync('historyList',historyList)
				}
				console.log(item);
				uni.navigateTo({
					url:`../idea/ideaDetail?goods_id=${item.goods_id}`
				})
			},
			sao(){
				uni.scanCode({
					onlyFromCamera:true,
					success: (res) => {
						this.$toast(res.result);
					}
				})
			},
			choosePopup(){
				this.flog = true;
			},
			hideFlog(){
				this.flog = false;
			},
			goTo(url){
				uni.navigateTo({
					url
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.fixed{
		position: fixed;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: 50;
		.fixed-popup{
			position: relative;
			width: 100%;
			height: 100%;
			background: rgba(0,0,0,0.3);
			.fixed-popup-bk{
				width: 250rpx;
				display: flex;
				flex-direction: column;
				background: white;
				position: absolute;
				top: 180rpx;
				left: 40rpx;
				box-sizing: border-box;
				padding: 31rpx 17rpx;
				border-radius: 8rpx;
				view{
					display: flex;
					flex-direction: row;
					align-items: center;
					color: #292929;
					font-size: 30rpx;
					margin-bottom: 18rpx;
					image{
						width: 38rpx;
						height: 38rpx;
						margin-right: 19rpx;
					}
				}
				.sanjao{
					position: absolute;
					top: -15rpx;
					width: 40rpx;
					height: 40rpx;
					background: white;
					transform: rotate(45deg);
					border-radius: 10rpx;
				}
			}
		}
	}
	.announcement-swiper-style{
		width: 100%;
		// height: 40rpx;
		overflow: hidden;
		// margin-top: 20rpx;
		text{
			// height: 30rpx;
			// line-height: 30rpx;
			color: #666666;
			font-size: 20rpx;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 1;
		}
	}
	.search {
		width: 100%;
		box-sizing: border-box;
		padding: 0 15rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 44rpx;
		z-index: 10;
		.left {
			width: 90%;
			background: #F7F7F7;
			border-radius: 10rpx;
			box-sizing: border-box;
			padding: 10rpx 20rpx;
			display: flex;
			flex-direction: row;
			// justify-content: space-between;
			align-items: center;

			.address {
				// width: 20%;
				display: flex;
				flex-direction: row;
				align-items: center;
				font-size: 26rpx;
				border-right: 1px solid #404040;
				margin-right: 20rpx;
				// padding-right: 15rpx;
				.text{
					margin-right: 15rpx;
					font-size: 30rpx;
					font-weight: 600;
					// display: block;
					// width: 70rpx;
					// overflow: hidden;
					// display: flex;
					// flex-wrap: nowrap;
					// display: -webkit-box;
					// text-overflow: ellipsis;
					// overflow: hidden;
					// -webkit-box-orient: vertical;
					// -webkit-line-clamp: 1;
				}
				image{
					width: 34rpx;
					margin-right: 15rpx;
				}
			}

			.input {
				// width: 75%;
				display: flex;
				justify-content: space-between;
				align-items: center;
				box-sizing: border-box;
				// padding: 0 20rpx;
				// padding-left: 50rpx;
				image{
					width: 36rpx;
				}
				.inp-left {
					display: flex;
					flex-direction: row;
					align-items: center;
				}

				.inp-right {
					image {
						width: 35rpx;
					}
				}
			}
		}

		.btn {
			width: 44rpx;

			image {
				width: 40rpx;
				border-radius: 50%;
			}
		}
	}

	.swiper-con {
		margin-bottom: 29rpx;
		.swiper-item {
			image {
				width: 100%;
			}
		}
	}
	.announcement{
		width: 100%;
		box-sizing: border-box;
		padding: 0 25rpx;
		margin-bottom: 40rpx;
		.announcement-con{
			background: #FFFFFF;
			box-shadow: 0px 1px 13px 0px rgba(0, 0, 0, 0.11);
			border-radius: 8px;
			display: flex;
			justify-content: space-between;
			align-items: center;
			box-sizing: border-box;
			padding: 15rpx 10rpx;
			.announcement-left{
				width: 100rpx;
				margin-right: 40rpx;
				image{
					width: 100rpx;
				}
			}
			.announcement-hr{
				border-right: 1px solid #CCCCCC;
				height: 80rpx;
				width: 1px;
				margin-right: 40rpx;
			}
			.announcement-swiper{
				width: 555rpx;
				height: 40rpx;
				.swiper{
					height: 40rpx;
					.swiper-item{
						display: flex;
						flex-direction: row;
						align-items: center;
						
					}
				}
				
			}
		}
	}
	.post{
		width: 100%;
		.post-title{
			color: #202020;
			font-size: 36rpx;
			margin-bottom: 51rpx;
			padding-left: 27rpx;
		}
		.post-item{
			width: 100%;
			.item{
				border-bottom: 4px solid #F5F5F5;
				margin-bottom: 15rpx;
				box-sizing: border-box;
				padding: 0 27rpx;
				.item-user{
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-bottom: 33rpx;
					.item-user-left{
						display: flex;
						flex-direction: row;
						align-items: center;
						image{
							width: 80rpx;
							height: 80rpx;
							border-radius: 50%;
							margin-right:20rpx ;
						}
						.item-user-left-user{
							display: flex;
							flex-direction: column;
							.item-user-left-user-name{
								color: #202020;
								font-size: 30rpx;
							}
							.item-user-left-user-time{
								color: #808080;
								font-size: 20rpx;
							}
						}
					}
					.item-user-right{
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
			    .item-con{
					display: flex;
					flex-direction: column;
					margin-bottom: 37rpx;
					.item-con-label{
						color: #141414;
						font-size: 32rpx;
						margin-bottom: 18rpx;
						font-weight: 600;
					}
					.item-con-con{
						color: #1F1F1F;
						font-size: 26rpx;
						font-weight: 500;
						display: flex;
						flex-direction: row;
						align-items: flex-start;
						text{
							width:510rpx;
							overflow: hidden;
							-webkit-line-clamp: 3; 
							-webkit-box-orient: vertical;
							display: -webkit-box;
						}
						image{
							width: 226rpx;
							height: 125rpx;
							// width: 440rpx;
							border-radius: 15rpx;
							margin-left: 35rpx;
						}
					}
				}
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
							width: 40rpx;
							margin-right: 16rpx;
						}
					}
				}
			}
		}
	}
</style>
