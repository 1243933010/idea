<template>
	<view>
		<view class="navbar">
			<uni-nav-bar left-icon="back" title="校园协会" @clickLeft="clickLeft" @clickRight="clickRight">
				<!-- <view style="font-weight: 500;">校园协会</view> -->
				<!-- <view slot="left"></view> -->
				
				<view slot="right" class="right">
					<pick-regions :defaultRegion="defaultRegionCode" @getRegion="handleGetRegion">
					<view class="aa">
						<text>{{address}}</text>
						<image src="../../../static/me/address.png" mode="widthFix"></image>
					</view>
					</pick-regions>
				</view>
				 
			</uni-nav-bar>
		</view>
		<view style="width: 100%;height: 88px;"></view>
		<view class="list">
			<view class="item" v-for="(item,index) in list" :key="index">
				<view class="item-top-top">
					<view class="item-top">
						<view class="item-top-icon">
							<image :src="item.society_photo?item.society_photo:'../../../static/mine/headimg.jpg'" mode=""></image>
						</view>
						<view class="item-top-name">
							<text>{{item.society_name}}</text>
							
						</view>
					</view>
					<view class="sos" @click="sos(item)"><text>SOS</text></view>
				</view>
				<view class="item-con">
					<text>简介：{{item.society_desc}}</text>
				</view>
				<view class="item-bottom">
					<text>负责人：{{item.society_cadre}}</text>
					<text>联系电话：{{item.society_phone}}</text>
					<text>地址：{{item.regin_address}}{{item.society_address}}</text>
				</view>
			</view>
		</view>
		
		
		<uni-popup ref="popup" type="center" :maskClick="false">
			<view class="form">
				<view class="form-title">
					<text>你确定你正在遇到校园暴力，申请校园防暴协会的帮助吗？</text>
				</view>
				<view class="form-btn">
					<view class="cancel" @click="cancelBtn"><text>取消</text></view>
					<view class="yes" @click="yesOk"><text>确定</text></view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import pickRegions from '@/components/pick-regions/pick-regions.vue'
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	export default {
		components: {
			uniNavBar,
			pickRegions,
			uniPopup
		},
		data() {
			return {
				list: [],
				address:'深圳',
				defaultRegion:['广东省','广州市'],
				defaultRegionCode:'440113',
				item:{}
			};
		},
		mounted() {
			this.getAddress();
			this.getMsg();
		},
		methods:{
			async getMsg(){
				let data = await this.$request('/api/v1/get_by_society',{qcode:this.address});
				if(data.data.status==='success'){
					this.list = data.data.data;
				}
				console.log(data)
			},
			getAddress(){
			uni.getLocation({
			    type: 'wgs84',
				geocode:true,
			    success:  (res)=> {
					// #ifdef APP-PLUS
					this.address = res.address.city;
					console.log(res)
					// #endif
			    }
			});
			},
			clickLeft(){
				uni.navigateBack({
					delta:1
				})
			},
			clickRight(){
				
			},
			handleGetRegion(region){
				console.log(region)
				this.address = region[1].name;
				this.getMsg();
			 },
			 sos(item){
				 this.item = item;
				 this.$refs.popup.open();
			 },
			 cancelBtn(){
				 this.$refs.popup.close();
			 },
			 async yesOk(){
				 let data = await this.$request('/api/v1/sos_by_society',{society_id:this.item.society_id});
				 this.$toast(data.data.message);
				  this.$refs.popup.close();
			 }
		}
	}
</script>

<style lang="scss" scoped>
	.form{
		width: 600rpx;
		background: white;
		border-radius: 20rpx;
		
		.form-title{
			width: 100%;
			box-sizing: border-box;
			padding: 68rpx 58rpx 0 58rpx;
			color: #FF4D4D;
			font-size: 36rpx;
			padding-bottom: 44rpx;
			border-bottom: 1px solid #F7F7F7;
		}
		.form-btn{
			display: flex;
			justify-content: space-around;
			align-items: center;
			padding: 26rpx 0;
			font-size: 40rpx;
			.cancel{
				color: #999999;
			}
			.yes{
				color: #2DA1EA;
			}
		}
	}
	.navbar{
		position: fixed;
		width: 100%;
		top: 0;
		background: white;
		z-index: 100;
		padding-top: 64rpx;
	}
	page{
		background: #F2F2F2;
	}
	.right {
		max-width: 200rpx;
		// background: red;
		display: flex;
		flex-direction: row;
		align-items: center;
		color: #000000;
		font-size: 30rpx;
		// text-overflow: ellipsis;
		// display: -webkit-box;
		// -webkit-box-orient: vertical;
		// -webkit-line-clamp: 1;

		image {
			width: 28rpx;
			height: 30rpx;
			margin-left: 5rpx;
		}
		.aa{
			display: flex;
			flex-direction: row;
			align-items: center;
			text{
				width: 100rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 1;
				line-height: 40rpx;
			}
			image {
				width: 28rpx;
				height: 30rpx;
				margin-left: 5rpx;
			}
		}
	}
	.list{
		width: 100%;
		.item{
			width: 100%;
			background: white;
			box-sizing: border-box;
			padding: 15rpx 28rpx;
			box-shadow: 0px 2px 12px 1px rgba(191, 191, 191, 0.42);
			margin-bottom: 27rpx;
			margin-top: 20rpx;
			.item-top-top{
				display: flex;
				justify-content: space-between;
				align-items: center;
			}
			.sos{
				margin-bottom: 15rpx;
				background: #FF5F5F;
				color: white;
				width: 60rpx;
				height: 60rpx;
				border-radius: 50%;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 26rpx;
			}
			.item-top{
				display: flex;
				flex-direction: row;
				align-items: center;
				margin-bottom: 20rpx;
				.item-top-icon{
					margin-right: 12rpx;
					image{
						width: 58rpx;
						height: 58rpx;
						border-radius: 50%;
					}
				}
				.item-top-name{
					color: #202020;
					font-size: 30rpx;
					// font-weight: bold;
				}
			}
			.item-con{
				color: #202020;
				font-size: 30rpx;
				// font-weight: bold;
				margin-bottom: 47rpx;
			}
			.item-bottom{
				display: flex;
				flex-direction: column;
				text{
					margin-bottom: 10rpx;
					color: #202020;
					font-size: 26rpx;
				}
			}
		}
	}
</style>
