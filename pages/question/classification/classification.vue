<template>
	<view :style="{'padding-top':statusBarHeight+'px'}">
		<view class="title">
			<text>请选择您要发布类别</text>
		</view>
		<view class="list">
			<view class="item" v-for="(item,index) in list" :key="index" @click="goTo(item)">
				<view class="item-left"><image :src="item.cat_img?item.cat_img:'../../../static/index/leibie.png'" mode="widthFix"></image></view>
				<view class="item-right">
					<text class="name">{{item.cat_name}}</text>
					<text class="label">{{item.label}}</text>
				</view>
			</view>
		</view>
		<view class="close"><image @click="close" src="../../../static/index/close.png" mode="widthFix"></image></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[]
			}
		},
		mounted() {
			this.getList();
		},
		computed: {
			statusBarHeight() {
				return this.$store.state.statusBarHeight
			}
		},
		methods: {
			async getList(){
				let data = await this.$request('/api/v1/CategoryList',{},'GET');
				if(data.data.status==='success'){
					this.list = data.data.data;
				}
				console.log(data)
			},
			goTo(item){
				console.log(item)
				// return
				uni.navigateTo({
					url:`../askQuestions?cat_id=${item.cat_id}`
				})
			},
			close(){
				uni.navigateBack({
					delta:1
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.title{
		width: 100%;
		padding: 80rpx 0;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #6C6C6C;
		font-size: 36rpx;
	}
	.list{
		width: calc(100% - 52rpx);
		margin: 0 auto;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		.item{
			width: calc(50% - 30rpx);
			display: flex;
			flex-direction: row;
			align-items: center;
			box-sizing: border-box;
			padding: 10rpx 20rpx;
			background: #FFFFFF;
			box-shadow: 0px 1px 13px 0px rgba(4, 0, 0, 0.15);
			margin-right: 30rpx;
			margin-bottom: 43rpx;
			.item-left{
				image{
					width: 70rpx;
					height: 70rpx;
					margin-right: 35rpx;
				}
			}
			.item-right{
				display: flex;
				flex-direction: column;
				.name{
					color: #232323;
					font-size: 28rpx;
				}
				.label{
					color: #999999;
					font-size: 20rpx;
				}
			}
		}
	}
	.close{
		width: 100%;
		padding-top: 150rpx;
		display: flex;
		justify-content: center;
		image{
			width: 64rpx;
			border-radius: 50%;
		}
	}
</style>
