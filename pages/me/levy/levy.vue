<template>
	<view>
		<view class="list">
			<view class="item" v-for="(item,index) in list" :key="index">
				<view class="item-title">
					<text>{{item.cat_name}}</text>
				</view>
				<view class="item-con">
					<text>{{item.cat_desc}}</text>
				</view>
				<view class="item-btn">
					<view class="" @click="fatie(item)">
						<text>去发帖>></text>
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
				list:[
					{title:'征贴标题一',con:'征贴详情内容征贴详情内容征贴详情内容征贴详情内容征贴详情内容征贴详情内容征贴详情内容征贴详情内容征贴详情内容征贴详情内容征贴详情内容'},
					{title:'征贴标题一',con:'征贴详情内容征贴详情内容征贴详情内容征贴详情内容征贴详情内容征贴详情内容征贴详情内容征贴详情内容征贴详情内容征贴详情内容征贴详情内容'},
					{title:'征贴标题一',con:'征贴详情内容征贴详情内容征贴详情内容征贴详情内容征贴详情内容征贴详情内容征贴详情内容征贴详情内容征贴详情内容征贴详情内容征贴详情内容'},
					{title:'征贴标题一',con:'征贴详情内容征贴详情内容征贴详情内容征贴详情内容征贴详情内容征贴详情内容征贴详情内容征贴详情内容征贴详情内容征贴详情内容征贴详情内容'},
					{title:'征贴标题一',con:'征贴详情内容征贴详情内容征贴详情内容征贴详情内容征贴详情内容征贴详情内容征贴详情内容征贴详情内容征贴详情内容征贴详情内容征贴详情内容'}
				]
			};
		},
		mounted() {
			this.getList();
		},
		methods:{
			async getList(){
				let data = await this.$request('/api/v1/get_by_travel',{});
				if(data.data.status==='success'){
					this.list = data.data.data;
				}
				console.log(data)
			},
			fatie(item){
				uni.navigateTo({
					url:`../../index/classification/release?cat_id=${item.cat_id}`
				})
			}
		}
		
	}
</script>

<style lang="scss" >
	page{
		background: #F2F2F2;
	}
	.list{
		width: 100%;
		.item{
			background: white;
			margin-top: 18rpx;
			box-sizing: border-box;
			padding: 30rpx;
			.item-title{
				color: #2E2E2E;
				font-size: 30rpx;
				margin-bottom: 31rpx;
			}
			.item-con{
				color: #2E2E2E;
				font-size: 26rpx;
				margin-bottom: 5rpx;
			}
			.item-btn{
				width: 100%;
				display: flex;
				flex-direction: row-reverse;
				view{
					width: 167rpx;
					padding: 15rpx 0;
					background: #45B8FD;
					border-radius: 10rpx;
					color: white;
					font-size: 26rpx;
					display: flex;
					justify-content: center;
					align-items: center;
				}
			}
		}
	}
</style>
