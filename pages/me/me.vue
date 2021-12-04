<template>
	<view>
		<view class="info">
			<view class="top">
				<view class="left">
					<view class="heaimg">
						<image :src="obj.user_photo?obj.user_photo:'../../static/mine/headimg.jpg'" mode=""></image>
					</view>
					<view class="right-info">
						<view class="user-name">
							<text class="user-name-name">{{obj.alias}}</text>
							<text v-if="obj.users_identity.identity_position" class="user-name-posi">{{obj.users_identity.identity_position}}</text>
						</view>
						<text class="sign" :style="{'display':obj.remark.length>10?'-webkit-box':'inline'}">
							<text class="sign-tag">个性签名：</text>
							<text class="sign-con" v-if="obj.remark" >{{obj.remark}}</text>
							<text class="sign-con" v-if="!obj.remark" >今天天气好</text>
						</text>
					</view>
				</view>
				<view class="right">
					<image @click="goTo('./editUser')" src="../../static/me/edit.png" mode="widthFix"></image>
				</view>

			</view>
			
			<view class="jianjie" v-if="obj.users_identity.identity_desc">
				<text>身份简介:</text>
				<text>{{obj.users_identity.identity_desc}}</text>
			</view>
			<view class="bottom">
				<view class="item" @click="goTo('')">
					<view class="num">{{obj.user_money}}</view>
					<text>钱包</text>
				</view>
				<view class="item"  @click="goTo('./myPost/myPost')">
					<view class="num">{{obj.total_article}}</view>
					<text>我的帖子</text>
				</view>
				<view class="item" @click="goTo('./attention')">
					<view class="num">{{obj.total_follow}}</view>
					<text>关注</text>
				</view>
				<view class="item"  @click="goTo('./fens')">
					<view class="num">{{obj.total_fans}}</view>
					<text>粉丝</text>
				</view>
			</view>
		</view>

		<view class="set-tab">
			<view class="con">
				<view class="item" v-for="(item,index) in setTab" :key="index" @click="goTo(item.url)">
					<image :src="item.icon" mode="widthFix"></image>
					<text>{{item.name}}</text>
				</view>
			</view>
		</view>

		<view class="setting">
			<view class="setting-con">
				<view class="item" v-for="(item,index) in setting" :key="index" @click="go(item)">
					<view class="item-left">
						<image :src="item.icon" mode="widthFix"></image>
						<text>{{item.name}}</text>
					</view>
					<view class="item-right">
						<image src="../../static/me/right-arrow.png" mode="widthFix"></image>
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
				setTab: [{
					name: '我的足迹',
					icon:'../../static/me/zuji.png',
					url:"./footprint/footprint"
				}, {
					name: '消息',
					icon:'../../static/me/zhengji.png',
					// url:'./levy/levy'
					url:'../idea/notificationCenter/notificationCenter'
				}, {
					name: '校园防爆协会',
					icon:'../../static/me/xiaoyuan.png',
					url:'./association/association'
				}, {
					name: '收藏记录',
					icon:'../../static/me/jilu.png',
					url:'./favorites/favorites'
				}],
				setting: [
					// {
					// 	name: '关于我们',
					// 	url:'./aboutUs',
					// 	icon:'../../static/me/aboutUs.png'
					// },
					{
						name: '分享客户端',
						url:'share',
						icon:'../../static/me/share.png'
					},
					{
						name: '常见问题',
						url:'./commonProblem',
						icon:'../../static/me/wenti.png'
					},
					{
						name: '设置',
						url:'setting',
						icon:'../../static/me/shezhi.png'
					},
					{
						name: '意见反馈',
						url:'./feedback',
						icon:'../../static/me/fankui.png'
					},
					{
						name: '退出登录',
						icon:'../../static/me/tuichu.png',
						url:'logut'
					},
				],
				obj:{remark:[],users_identity:{identity_desc:'',identity_position:''}}
			}
		},
		mounted() {
			this.obj = uni.getStorageSync('userInfo');
		},
		onShow(){

				let userInfo = uni.getStorageSync('userInfo');
				if(!userInfo){
					uni.reLaunch({
						url:'../login/login'
					})
				}
			this.getUserInfo();
		},
		methods: {
			async getUserInfo(){

				let obj = {
					token:uni.getStorageSync('token')
				}
				let data = await this.$request('/api/v1/getUsersInfo',obj,'GET');
				console.log(data)
				if(data.data.status==='success'){
					uni.setStorageSync('userInfo',data.data.data);
					this.obj = data.data.data;
				}
			},
			goTo(url){
				if(!url){
					this.$toast('暂未开放')
					return false
				}
				uni.navigateTo({
					url
				})
			},
			go(item){
				if(!item.url){
					this.$toast('暂未开放')
					return false
				}
				if(item.url==='share'){
					console.log('---')
					uni.downloadFile({
							url: encodeURI('https://qingxiaochen.oss-cn-guangzhou.aliyuncs.com/apk/20211204161513.png'),
							success: (res) =>{
								console.log(res)
								if (res.statusCode === 200){
									uni.saveImageToPhotosAlbum({
										filePath: res.tempFilePath,
										success: function() {
											uni.showToast({
												title: "保存成功",
												icon: "none"
											});
										},
										fail: function(err) {
											console.log(err)
											uni.showToast({
												title: "保存失败，请稍后重试",
												icon: "none"
											});
										}
									});
								}
							},
							fail:(err)=>{
								console.log(err)
							}
						})
					return false
				}
				if(item.url==='logut'){
					uni.removeStorageSync('userInfo');
					this.$toast('已退出');
					setTimeout(()=>{
						uni.reLaunch({
							url:'../login/login'
						})
					},500)
					return
				}
				uni.navigateTo({
					url:item.url
				})
			},
			
		}
	}
</script>

<style lang="less">
	.jianjie{
		width: 90%;
		margin: 26rpx auto;
		background: rgba(77,189,255,0.8);
		color: white;
		font-size: 24rpx;
		padding: 5rpx 10rpx;
		border-radius: 10rpx;
		box-sizing: border-box;
		// margin-bottom: 26rpx;
		text{
			margin-right: 15rpx;
		}
	}
	.info {
		padding: 136rpx 34rpx 103rpx;
		background-color: #24ADFF;

		.top {
			display: flex;
			justify-content: space-between;
			align-items: center;
			// margin-bottom: 20rpx;
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
						font-size: 34rpx;
						.user-name-name{
						 margin-right: 15rpx;	
						}
						.user-name-posi{
							background: #71CAFF;
							font-size: 26rpx;
							color: white;
							border-radius: 20rpx;
							box-sizing: border-box;
							padding: 3rpx 10rpx;
						}
					}

					.sign {
						margin-top: 17rpx;
						box-sizing: border-box;
						padding: 2rpx 15rpx;
						display: inline-block;
						font-size: 22rpx;
						border: 1px solid #E3E3E3;
						border-radius: 50rpx;
						overflow: hidden;
						word-break: break-all;
						text-overflow: ellipsis;
						
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 1;
						color: #E3E3E3;
					}
				}
			}

			.right {
				// padding: 8rpx 30rpx 8rpx 30rpx;
				display: inline-block;
				font-size: 20rpx;
				image {
					width: 44rpx;
					height: 44rpx;
				}
			}
		}

		.bottom {
			// margin-top: 50rpx;
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
			padding: 35rpx 50rpx;

			.item {
				display: flex;
				flex-direction: column;
				align-items: center;
				color: #333333;
				font-size: 26rpx;

				image {
					width: 50rpx;
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
			.item{
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 57rpx;
				.item-left{
					display: flex;
					flex-direction: row;
					align-items: center;
					font-size: 28rpx;
					color: #666666;
					image{
						width: 40rpx;
						margin-right: 28rpx;
					}
				}
				.item-right{
					image{
						width: 35rpx;
					}
				}
			}
		}
	}
</style>
