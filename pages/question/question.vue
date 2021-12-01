<template>
	<view >
		<!-- :style="{'padding-top':statusBarHeight+'px'}" -->
		<!-- :style="{top:statusBarHeight+25+'px'}" -->
		<view class="nav-top" :style="{'padding-top':statusBarHeight+'px'}">
			<!-- height:statusBarHeight+50+'px', -->
			<view class="box">
				<view style="width: 33%;"></view>
				<view style="width: 33%;" class="title"><text>待解决问题</text></view>
				<view class="icon" style="width: 33%;">
					<!-- <image src="../../static/question/huida.png" @click="goUrl('./askQuestions')" mode="widthFix"></image> -->
					<image @click="goUrl('./classification/classification')"  src="../../static/index/add.png" mode="widthFix"></image>
					<!-- <image @click="goUrl('./boostExpert/boostExpert')" src="../../static/question/zhuanjia.png" mode="widthFix"></image> -->
					
				</view>
			</view>
			<view class="classificationList">
			<scroll-view  :scroll-x="true" style="white-space: nowrap;">
				<view class="item" :class="9999===classificationListIndex?'classification-active':''"  @click="chooseType(9999)">
					<text>全部</text>
				</view>
					<view class="item" :class="index===classificationListIndex?'classification-active':''" v-for="(item,index) in classificationList" :key="index" @click="chooseType(item,index)">
						<text>{{item.cat_name}}</text>
					</view>
			</scroll-view>
			</view>
		</view>
		<view :style="{height:statusBarHeight+80+'px'}" style="width: 100%;"></view>
		<view class="list">
			<view class="item" 
			v-for="(item,index) in list" 
			:key="index"
			 @click="goTo(item)">
				<view class="item-top">
					<view class="item-top-left">
						<image @click.stop="seeUser(item)" :src="item.user_photo?item.user_photo:'../../static/mine/headimg.jpg'" mode=""></image>
						<view class="item-top-left-name">
							<text class="name">{{item.alias}}</text>
							<text class="time">{{item.add_time}}</text>
						</view>
					</view>
					<view class="item-top-right">
						<view class="follow" v-if="item.is_follow===0&&userInfo.user_id!==item.user_id" @click.stop="guanzhu(item)"><text>关注</text></view>
						<view class="no-follow" v-if="item.is_follow===1&&userInfo.user_id!==item.user_id" @click.stop="quguan(item)"><text>已关注</text></view>
					</view>
				</view>
				<view class="item-context">
					<view class="item-context-title"><text>{{item.problem_name}}</text></view>
					<view class="item-context-label"><text>{{item.problem_desc}}</text></view>
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
				list:[
				],
				pageNo:1,
				pageFlog:true,
				userInfo:{},
				classificationList:['人文科学','人文科学','人文科学','人文科学'],
				classificationListIndex:9999
			}
		},
		computed: {
			statusBarHeight() {
				return this.$store.state.statusBarHeight
			},
		},
		onShow(){
				let userInfo = uni.getStorageSync('userInfo');
				if(!userInfo){
					uni.reLaunch({
						url:'../login/login'
					})
				}

			this.pageNo = 1;
			this.list = [];
			this.classificationListIndex = 9999;
			this.getList('');
		},
		mounted() {
			this.getTypeList();
			this.userInfo = uni.getStorageSync('userInfo');
		},
		methods: {

			goTo(item){
				console.log(item)
				let historyList = uni.getStorageSync('historyList');
				
				if(typeof(historyList)==='string'&&!historyList){
					uni.setStorageSync('historyList',[]);
					let arr = uni.getStorageSync('historyList');
					arr.push({type:'2',con:item})
					uni.setStorageSync('historyList',arr)
				}else{
					historyList.push({type:'2',con:item})
					uni.setStorageSync('historyList',historyList)
				}
				
				uni.navigateTo({
					url:`./detail?wsid=${item.wsid}`
				})
			},
			async getList(id){
				let obj = {
					cat_id:id,
					page:this.pageNo,
					size:10
				}
				if(this.pageFlog){
					this.pageFlog = false;
					let data = await this.$request('/api/v1/WholesaleList',obj,'GET');
					this.pageFlog = true;
					if(data.data.status==='success'){
						if(data.data.data.data.length>0){
							this.list.push(...data.data.data.data);
						}
						this.pageNo++;
					}
					console.log(data)
				}
			},
			goUrl(url){
				uni.navigateTo({
					url
				})
			},
			async guanzhu(item){
				let obj = {
					fans_id:item.user_id
				}
				let data = await this.$request('/api/v1/add_Agent',obj);
				this.$toast(data.data.message);
				if(data.data.status==='success'){
					this.pageNo = 1;
					this.getList();
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
					this.getList();
				}
				console.log(item)
			},
			seeUser(item){
				let userInfo = uni.getStorageSync('userInfo');
				if(item.user_id===userInfo.user_id){
					uni.navigateTo({
						url:'../me/myPost/myPost'
					})
					return false;
				}
				console.log(item)
				uni.navigateTo({
					url:`../index/userPage/userPage?user_id=${item.user_id}`
				})
			},
			async getTypeList(id){
				
				let data = await this.$request('/api/v1/CategoryList',{},'GET');
				if(data.data.status==='success'){
					this.classificationList = data.data.data;
					this.getList(data.data.data[0].cat_id)
				}
				console.log(data)
			},
			async chooseType(item,index){
				this.pageNo = 1;
				this.list = [];
				if(item===9999){
					this.getList('');
					this.classificationListIndex = 9999;
				}else{
					this.classificationListIndex = index;
				}
				
				this.getList(item.cat_id);
				console.log(item)
			}
		}
	}
</script>

<style scoped lang="scss">
	.classification-active{
		color: #0EA5FF !important;
	}
	.classificationList{
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
		.item{
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
			padding:0rpx 24rpx;
			margin-bottom: 28rpx;
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
			justify-content: center;
			align-items: center;
			color: #2F2F2F;
			font-size: 34rpx;
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
			padding: 38rpx 34rpx;
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
							color: #202020;
							font-size: 30rpx;
							margin-bottom: 8rpx;
						}
						.time{
							color: #808080;
							font-size: 20rpx;
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
				.item-context-title{
					color: #141414;
					font-size: 32rpx;
					font-weight: bold;
					margin-bottom: 19rpx;
				}
				.item-context-label{
					color: #1F1F1F;
					font-size: 26rpx;
					// font-weight: bold;
					line-height: 40rpx;
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
