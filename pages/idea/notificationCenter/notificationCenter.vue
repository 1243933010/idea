<template>
	<view>
		<view class="tab">
			<view class="item" v-for="(item,index) in tab" :key="index" @click="chooseTab(index)">
				<text>{{item.name}}</text>
				<view class="radio" v-if="item.status==='1'"></view>
			</view>
			<view :style="{'left':ind===0?'0%':ind===1?'33%':'66%'}" class="active"></view>
		</view>

		<view class="context">
			<view class="xitong" v-show="ind===0">
				<scroll-view scroll-y="true" :style="{height:Height+'px'}">
					<view class="item" v-for="(item,index) in xitongList" :key="index">
						<view class="item-title">
							<text>{{item.title}}</text>
						</view>
						<view class="item-label">
							<text>{{item.description}}</text>
						</view>
						<view class="item-time">
							<text>{{item.add_time}}</text>
							<!-- <image src="../../../static/idea/delete.png" mode="widthFix"></image> -->
						</view>
					</view>
				</scroll-view>
			</view>
			<view class="pinglun" v-show="ind===1">
				<scroll-view scroll-y="true" :style="{height:Height+'px'}">
					<view class="item" v-for="(item,index) in pinglunList" :key="index">
						<view class="item-left">
							<view class="item-left-top">
								<view class="item-left-top-icon">
									<image :src="item.user_photo" mode="widthFix"></image>
								</view>
								<view class="item-left-top-name">
									<text class="name">{{item.alias}}</text>
									<text class="time">{{item.create_time}}</text>
								</view>
							</view>
							<view class="item-left-bottom">
								{{item.goods_name}}
								<text class="item-left-bottom-text"></text>
							</view>
						</view>
						<view class="item-right">
							<image :src="item.goods_thumb" mode="widthFix"></image>
						</view>
					</view>
				</scroll-view>
			</view>
			<view class="zan" v-show="ind===2">
				<scroll-view scroll-y="true" :style="{height:Height+'px'}">
					<view class="item" v-for="(item,index) in zanList" :key="index">
						<view class="item-left">
							<view class="item-left-top">
								<view class="item-left-top-icon">
									<image :src="item.user_photo" mode="widthFix"></image>
								</view>
								<view class="item-left-top-name">
									<text class="name">{{item.alias}} 评论了你</text>
									<text class="time">{{item.create_time}}</text>
									<!-- <image src="../../../static/idea/delete.png" mode="widthFix"></image> -->
								</view>
							</view>
							<!-- <view class="item-left-bottom">
								{{item.text}}
								<text class="item-left-bottom-text"></text>
							</view> -->
						</view>
						<view class="item-right">
							<image :src="item.goods_thumb" mode="widthFix"></image>
						</view>
					</view>
				</scroll-view>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tab: [{
					name: '系统',
					type: "1"
				}, {
					name: '评论',
					type: "2"
				}, {
					name: '点赞',
					type: "2"
				}],
				ind: 0,
				Height: 0,
				xitongList: [
					{
					title: 'AI是第四次工业革命的核心驱动力量',
					label: '1月2日晚，中央广播电视总台财经频道《对话》栏目新年第一期节目播出，以《智能经济：“云”知道答案》为主题，百度CTO王海峰在谈及AI对各行各业的影响时表示1月2日晚...',
					time: "2020-12-12"
				}, {
					title: 'AI是第四次工业革命的核心驱动力量',
					label: '1月2日晚，中央广播电视总台财经频道《对话》栏目新年第一期节目播出，以《智能经济：“云”知道答案》为主题，百度CTO王海峰在谈及AI对各行各业的影响时表示1月2日晚...',
					time: "2020-12-12"
				}, {
					title: 'AI是第四次工业革命的核心驱动力量',
					label: '1月2日晚，中央广播电视总台财经频道《对话》栏目新年第一期节目播出，以《智能经济：“云”知道答案》为主题，百度CTO王海峰在谈及AI对各行各业的影响时表示1月2日晚...',
					time: "2020-12-12"
				}, ],
				pinglunList: [{
						img: '',
						icon: '',
						name: 'name',
						time: '15分钟前',
						text: "1月2日晚，中央广播电视总台财经频道《对话》栏目新年第一期节目播出"
					},
					{
						img: '',
						icon: '',
						name: 'name',
						time: '15分钟前',
						text: "1月2日晚，中央广播电视总台财经频道《对话》栏目新年第一期节目播出"
					},
					{
						img: '',
						icon: '',
						name: 'name',
						time: '15分钟前',
						text: "1月2日晚，中央广播电视总台财经频道《对话》栏目新年第一期节目播出"
					},
					{
						img: '',
						icon: '',
						name: 'name',
						time: '15分钟前',
						text: "1月2日晚，中央广播电视总台财经频道《对话》栏目新年第一期节目播出"
					}
				],
				zanList:[
					{
						img: '',
						icon: '',
						name: 'name',
						time: '15分钟前'
					},
					{
						img: '',
						icon: '',
						name: 'name',
						time: '15分钟前'
					},
					{
						img: '',
						icon: '',
						name: 'name',
						time: '15分钟前'
					},
					{
						img: '',
						icon: '',
						name: 'name',
						time: '15分钟前'
					}
				],
				type:'1',
				allObj:{}
			};
		},
		created() {
			let res = uni.getSystemInfoSync();
			this.Height = res.windowHeight - 50;
			console.log(res)
		},
		mounted() {
			this.getList();
		},
		methods: {
			async getList(){
				let obj = {type:this.type};
				let data = await this.$request('/api/v1/get_notice_center',obj);
				if(data.data.status==='success'){
					// this.allObj = data.data.data;
					this.pinglunList = data.data.data.comment_notice;
					this.zanList = data.data.data.fabulous_notice;
					this.xitongList = data.data.data.system_notice;
				}
				console.log(data)
			},
			chooseTab(index) {
				this.ind = index;
				// if(index===0){
				// 	this.list = this.allObj.comment_notice;
				// }else if(index===1){
				// 	this.list = this.allObj.fabulous_notice;
				// }else{
				// 	this.list = this.allObj.system_notice;
				// }
			}
		}

	}
</script>

<style scoped lang="scss">
	.tab {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid #E5E5E5;
		box-sizing: border-box;
		height: 100rpx;
		position: relative;

		.item {
			width: 33%;
			text-align: center;
			color: #999999;
			font-size: 32rpx;
			position: relative;

			.radio {
				position: absolute;
				top: 0;
				right: 35%;
				width: 10rpx;
				height: 10rpx;
				border-radius: 50%;
				background: #0EA5FF;
			}
		}

		.active {
			position: absolute;
			bottom: 0;
			left: 0;
			width: 33%;
			height: 1px;
			background: #0EA5FF;
		}
	}

	.xitong {
		width: calc(100% - 28rpx);
		margin: 0 auto;

		// padding-top: 36rpx;
		.item {
			border-bottom: 1px solid #F2F2F2;
			padding: 33rpx 0;

			.item-title {
				color: #141414;
				font-size: 32rpx;
				font-weight: bold;
				margin-bottom: 26rpx;
			}

			.item-label {
				color: #1F1F1F;
				font-size: 26rpx;
				overflow: hidden;
				-webkit-line-clamp: 3;
				-webkit-box-orient: vertical;
				display: -webkit-box;
				line-height: 48rpx;
				font-weight: 500;
			}

			.item-time {
				// text-align: right;
				display: flex;
				flex-direction: row-reverse;
				align-items: center;
				color: #999999;
				font-size: 24rpx;

				text {
					margin-left: 19rpx;
				}

				image {
					width: 25rpx;
				}
			}
		}
	}

	.pinglun {
		width: calc(100% - 28rpx);
		margin: 0 auto;

		.item {
			border-bottom: 1px solid #F2F2F2;
			padding: 33rpx 0;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.item-left {
				display: flex;
				flex-direction: column;

				.item-left-top {
					display: flex;
					flex-direction: row;
					align-items: center;

					.item-left-top-icon {
						margin-right: 20rpx;

						image {
							width: 80rpx;
							border-radius: 50%;
						}
					}

					.item-left-top-name {
						display: flex;
						flex-direction: column;

						.name {
							color: #202020;
							font-size: 30rpx;
						}

						.time {
							color: #808080;
							font-size: 20rpx;
						}
					}
				}

				.item-left-bottom {
					color: #1F1F1F;
					font-size: 26rpx;
					line-height: 48rpx;

					// display: flex;
					// flex-direction: row;
					text {
						display: inline-block;
						width: 30rpx;
						height: 30rpx;
						margin-left: 10rpx;
						// background: url(../../../static/idea/delete.png) no-repeat;
						background-size: 100% 100%;
					}
				}
			}

			.item-right {
				image {
					width: 160rpx;
				}
			}
		}
	}
	.zan{
		width: calc(100% - 28rpx);
		margin: 0 auto;
		
		.item {
			border-bottom: 1px solid #F2F2F2;
			padding: 33rpx 0;
			display: flex;
			justify-content: space-between;
			align-items: center;
		
			.item-left {
				display: flex;
				flex-direction: column;
		
				.item-left-top {
					display: flex;
					flex-direction: row;
					// align-items: center;
		
					.item-left-top-icon {
						margin-right: 20rpx;
		
						image {
							width: 80rpx;
							border-radius: 50%;
						}
					}
		
					.item-left-top-name {
						display: flex;
						flex-direction: column;
		
						.name {
							color: #202020;
							font-size: 30rpx;
						}
		
						.time {
							color: #808080;
							font-size: 20rpx;
							margin-bottom: 15rpx;
						}
						image{
							width: 40rpx;
						}
					}
				}
		
				.item-left-bottom {
					color: #1F1F1F;
					font-size: 26rpx;
					line-height: 48rpx;
		
					// display: flex;
					// flex-direction: row;
					text {
						display: inline-block;
						width: 30rpx;
						height: 30rpx;
						margin-left: 10rpx;
						background: url(../../../static/logo.png) no-repeat;
						background-size: 100% 100%;
					}
				}
			}
		
			.item-right {
				image {
					width: 120rpx;
				}
			}
		}
	}
</style>
