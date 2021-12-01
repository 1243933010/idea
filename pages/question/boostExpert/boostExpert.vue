<template>
	<view>
		<view class="list">
			<view class="item" v-for="(item,index) in list" :key="index">
				<view class="item-icon">
					<image :src="item.expert_photo" mode="" @click="see(item)"></image>
				</view>
				<view class="item-name">
					<text class="name">{{item.expert_name}}</text>
					<text class="address">{{item.expert_school}}{{item.expert_tags}}/{{item.expert_position}}</text>
				</view>
				<view class="item-text">
					<text style="color: #000000;font-size: 28rpx;margin-right: 10rpx;">简介: </text>
					<text class="one">{{item.expert_desc}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: []
			};
		},
		onNavigationBarButtonTap(){
			uni.navigateTo({
				url:'./settleIn/settleIn'
			})
		},
		mounted() {
			this.getUserList();
		},
		methods:{
			async getUserList(){
				let data = await this.$request('/api/v1/get_by_expert',{});
				if(data.data.status==='success'){
					this.list = data.data.data;
				}
				console.log(data);
			},
			see(item){
				uni.navigateTo({
					url:`../../index/userPage/userPage?user_id=${item.user_id}`
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.one{
		font-size: 28rpx !important;
		letter-spacing: 1rpx;
	}
	.list {
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		flex-wrap: wrap;

		.item {
			width: calc(50% - 20rpx);
			height: 400rpx;
			background: #EFF9FF;
			margin: 33rpx 10rpx;
			box-sizing: border-box;
			padding: 21rpx 27rpx;
			border-radius: 5rpx;
			box-shadow: 0px 1px 13px 0px rgba(4, 0, 0, 0.15);
			.item-icon {
				width: 100%;
				display: flex;
				justify-content: center;
				align-items: center;

				image {
					width: 64rpx;
					height: 64rpx;
					border-radius: 50%;
					margin-bottom: 14rpx;
				}
			}

			.item-name {
				width: 100%;
				display: flex;
				flex-direction: column;
				align-items: center;

				.name {
					font-size: 30rpx;
					font-weight: bold;
					margin-bottom: 15rpx;
				}

				.address {
					color: #999999;
					font-size: 24rpx;
					margin-bottom: 20rpx;
				}
			}

			.item-text {
				font-size: 18rpx;
				color: #808080;
				overflow: hidden;
				-webkit-line-clamp: 4;
				-webkit-box-orient: vertical;
				display: -webkit-box;
			}
		}
	}
</style>
