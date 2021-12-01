<template>
	<view>
		<view class="list">
			<view class="item" v-for="(item,index) in list" :key="index">
				<view class="item-left">
					<image :src="item.user_photo?item.user_photo:'../../static/logo.png'" mode=""></image>
					<text>{{item.alias}}</text>
				</view>
				<view class="item-right">
					<!-- <view ><text>取消关注</text></view> -->
					<!-- <view v-if="item.status==='0'" class=""><text>未关注</text></view> -->
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[],
				pageNo:1,
				pageFlog:true,
				user_id:''
			}
		},
		onLoad(e) {
			this.user_id = e.user_id;
			this.pageNo = 1;
			this.getList();
		},

		onReachBottom() {
			this.getList();
		},
		methods: {
			async getList(){
			if(this.pageFlog){
				this.pageFlog = false;
				let userInfo = uni.getStorageSync('userInfo');
				this.pageFlog = true;
				let obj = {
					user_id:this.user_id,
					page:this.pageNo,
					size:30
				}
				let data = await this.$request('/api/v1/AgentList',obj,'GET');
				if(data.data.status==='success'){
					if(data.data.data.data.length){
						this.pageNo===1?this.list = data.data.data.data:this.list.push(...data.data.data.data);
					}
					this.pageNo++;
				}
				console.log(data)
			}
			},
		}
	}
</script>

<style scoped lang="scss">
	.list{
		width: calc(100% - 54rpx);
		margin: 0 auto;
		.item{
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-bottom: 1px solid #F2F2F2;
			margin-bottom: 40rpx;
			.item-left{
				display: flex;
				flex-direction: row;
				align-items: center;
				font-size: 30rpx;
				color: #202020;
				image{
					width: 80rpx;
					height: 80rpx;
					border-radius: 50%;
					margin-right: 23rpx;
				}
			}
			.item-right{
				view{
					width: 150rpx;
					height: 60rpx;
					background: #0EA5FF;
					border-radius: 8rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					color: white;
					font-size: 20rpx;
				}
			}
			// background: red;
		}
	}
</style>
