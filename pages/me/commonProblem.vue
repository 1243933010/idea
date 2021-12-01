<template>
	<view>
		<view class="">
			<view class="list">
				<view class="item" v-for="(item,index) in list" :key="index">
					<view class="item-title">
						<text>{{item.cat_name}}</text>
					</view>
					<view class="item-list" v-for="(v,i) in item.article" :key="i" @click="goTo(v)">
						<text>{{v.title}}</text>
						<image src="../../static/white_right_arrow.png" mode="widthFix"></image>
					</view>
					<!-- <image src="../../static/me/right-arrow.png" mode="widthFix"></image> -->
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[]
			};
		},
		mounted() {
			this.getList();
		},
		methods:{
			async getList(){
				let data = await this.$request('/api/v1/shop_help',{});
				if(data.data.status==='success'){
					this.list = data.data.data;
				}
				console.log(data)
			},
			goTo(item){
				uni.navigateTo({
					url:`./commonProblemDetail?article_id=${item.article_id}`
				})
				console.log(item)
			}
		}
	}
</script>

<style lang="scss" >
page{
	background: #45B7FE;
}
.list{
	width: 100%;
	box-sizing: border-box;
	padding: 0 25rpx;
	margin-bottom: 15rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-direction: column;
	.item{
		width: 100%;
		.item-title{
			margin-bottom: 40rpx;
			color: white;
			font-weight: 600;
		}
		.item-list{
			margin-bottom: 20rpx;
			width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			box-sizing: border-box;
			padding: 0 40rpx;
			font-size: 30rpx;
			color: white;
			image{
				width: 40rpx;
			}
		}
	}
}
</style>
