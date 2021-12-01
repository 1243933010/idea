<template>
	<view >


		<scroll-view scroll-y="true" :style="{height:Height+'px'}" :scroll-top="scrollTop" scroll-with-animation="true" style="padding: 30rpx 0;">
			<view class="msg_con" @click="hideManager">
				<view class="item" v-for="(item,index) in msgList" :key="index">
					<!-- v-if="item.from==firendId" -->
					<view class="msg_con_firend" v-if="item.from==firendId">
						<view class="icon">
							<image :src="firendImg?firendImg:'../../../static/mine/headimg.jpg'" mode=""></image>

							<!-- <view class="name"><text>{{item.to}}</text></view> -->
						</view>
						<view class="msg">
							<view class="text" v-if="!item.message.startsWith('expression/')">
								{{item.message}}
							</view>
							<view class="img" v-if="item.message.startsWith('expression/')">
								<image :src="`../../../static/${item.message}.gif`" mode=""></image>
							</view>

						</view>
						<!-- </view> -->
					</view>
					<!-- v-if="item.from==user_id" -->
					<view class="msg_con_me" v-if="item.from==user_id">
						<view class="icon">
							<image :src="userInfo.user_photo?userInfo.user_photo:'../../../static/mine/headimg.jpg'" mode=""></image>
							<!-- <view class="name"><text>{{userInfo.alias}}</text></view> -->
						</view>
						<view class="msg">
							<view class="text" v-if="!item.message.startsWith('expression/')">
								{{item.message}}
							</view>
							<view class="img" v-if="item.message.startsWith('expression/')">
								<image :src="`../../../static/${item.message}.gif`" mode=""></image>
							</view>
						
						</view>
					</view>

				</view>
			</view>


		</scroll-view>


		<view class="bottom_fixed">
			<view class="send">
				<image class="img" @click="setManager" src="../../../static/img_icon.png" mode="widthFix"></image>
				<view class="inp"><input type="text" placeholder="请输入内容..." @focus="change" v-model="inp" /> </view>
				<image class="add" @click="send" src="../../../static/send.png" mode="widthFix"></image>

			</view>
			
			<view v-show="expressionFlog">
							<scroll-view scroll-y="true" style="height: 400rpx;">
								<view class="expression" v-show="expressionFlog">
									<view class="item" v-for="(item,index) in expressionList" :key="index" @click="chooseExpression(item)">
										<image :src="item.url" mode="widthFix"></image>
									</view>
								</view>
							</scroll-view>
						</view>
		</view>


		<popup ref="popup" type="bottom">
			<view class="pox">
				<!-- <view @click="addVideo" style="border-bottom: 1px solid rgba(0,0,0,0.5);">选择视频</view> -->
				<view @click="addImg">选择图片</view>
				
			</view>
		</popup>



	</view>
</template>

<script>
	import popup from '@/components/uni-popup/uni-popup.vue'
	export default {
		components: {
			popup
		},
		data() {
			return {
				topTabList: [],
				bottomTabList: [],
				ind: 0,
				Height: '',
				socketTask: null,
				inp: '',
				msgList: [],
				name: '',
				id: '',
				scrollTop: 1000000,
				managerShow: false, //录音相关数据
				token: '',
				videoUrl: '',
				videoFlog: false,
				join_type: 'room',
				roomId: null,
				inpFlog: false,
				expressionList: [{
						val: 'expression/9',
						url: '../../../static/expression/9.gif'
					},
					{
						val: 'expression/11',
						url: '../../../static/expression/11.gif'
					},
					{
						val: 'expression/12',
						url: '../../../static/expression/12.gif'
					},
					{
						val: 'expression/13',
						url: '../../../static/expression/13.gif'
					},
					{
						val: 'expression/14',
						url: '../../../static/expression/14.gif'
					},
					{
						val: 'expression/15',
						url: '../../../static/expression/15.gif'
					},
					{
						val: 'expression/16',
						url: '../../../static/expression/16.gif'
					},
					{
						val: 'expression/17',
						url: '../../../static/expression/17.gif'
					},
					{
						val: 'expression/18',
						url: '../../../static/expression/18.gif'
					},
					{
						val: 'expression/19',
						url: '../../../static/expression/19.gif'
					},
					{
						val: 'expression/20',
						url: '../../../static/expression/20.gif'
					},
					{
						val: 'expression/21',
						url: '../../../static/expression/21.gif'
					},
					{
						val: 'expression/22',
						url: '../../../static/expression/22.gif'
					},
					{
						val: 'expression/23',
						url: '../../../static/expression/23.gif'
					},
					{
						val: 'expression/24',
						url: '../../../static/expression/24.gif'
					},
					{
						val: 'expression/25',
						url: '../../../static/expression/25.gif'
					},
					{
						val: 'expression/26',
						url: '../../../static/expression/26.gif'
					},
					{
						val: 'expression/27',
						url: '../../../static/expression/27.gif'
					},
					{
						val: 'expression/28',
						url: '../../../static/expression/28.gif'
					},
					{
						val: 'expression/29',
						url: '../../../static/expression/29.gif'
					},
					{
						val: 'expression/30',
						url: '../../../static/expression/30.gif'
					},
					{
						val: 'expression/31',
						url: '../../../static/expression/31.gif'
					},
					{
						val: 'expression/32',
						url: '../../../static/expression/32.gif'
					},
					{
						val: 'expression/33',
						url: '../../../static/expression/33.gif'
					},
					{
						val: 'expression/34',
						url: '../../../static/expression/34.gif'
					},
					{
						val: 'expression/35',
						url: '../../../static/expression/35.gif'
					},
					{
						val: 'expression/36',
						url: '../../../static/expression/36.gif'
					},
					{
						val: 'expression/37',
						url: '../../../static/expression/37.gif'
					},
					{
						val: 'expression/38',
						url: '../../../static/expression/38.gif'
					},
					{
						val: 'expression/39',
						url: '../../../static/expression/39.gif'
					},
					{
						val: 'expression/46',
						url: '../../../static/expression/46.gif'
					},
					{
						val: 'expression/47',
						url: '../../../static/expression/47.gif'
					},
					{
						val: 'expression/48',
						url: '../../../static/expression/48.gif'
					},
					{
						val: 'expression/49',
						url: '../../../static/expression/49.gif'
					},
					{
						val: 'expression/50',
						url: '../../../static/expression/50.gif'
					},
					{
						val: 'expression/66',
						url: '../../../static/expression/66.gif'
					},
					{
						val: 'expression/67',
						url: '../../../static/expression/67.gif'
					},
					{
						val: 'expression/68',
						url: '../../../static/expression/68.gif'
					},
					{
						val: 'expression/69',
						url: '../../../static/expression/69.gif'
					},
					{
						val: 'expression/70',
						url: '../../../static/expression/70.gif'
					},
					{
						val: 'expression/71',
						url: '../../../static/expression/71.gif'
					},
					{
						val: 'expression/72',
						url: '../../../static/expression/72.gif'
					},
					{
						val: 'expression/73',
						url: '../../../static/expression/73.gif'
					},
					{
						val: 'expression/83',
						url: '../../../static/expression/83.gif'
					},
					{
						val: 'expression/84',
						url: '../../../static/expression/84.gif'
					},
					{
						val: 'expression/85',
						url: '../../../static/expression/85.gif'
					},
					{
						val: 'expression/86',
						url: '../../../static/expression/86.gif'
					},
					{
						val: 'expression/87',
						url: '../../../static/expression/87.gif'
					},
					{
						val: 'expression/88',
						url: '../../../static/expression/88.gif'
					},
					{
						val: 'expression/89',
						url: '../../../static/expression/89.gif'
					},
					{
						val: 'expression/90',
						url: '../../../static/expression/90.gif'
					},
					{
						val: 'expression/91',
						url: '../../../static/expression/91.gif'
					}
				],
				expressionFlog: false,
				fishFlog: null,
				videoImg: '',
				firendId: '',
				user_id: '',
				firendImg: '',
				userInfo: {}
			};
		},
		watch: {
			inp() {
				this.inpFlog = this.inp.length !== 0;
			}
		},
		async onLoad(e) {
			console.log(e)
			uni.setNavigationBarTitle({
				title: e.name
			})
			this.firendId = e.user_id;
			let data = uni.getStorageSync('userInfo');
			this.userInfo = data;
			this.user_id = data.user_id;

			let token = ''
			console.log(this.user_id, this.firendId, token)
			let firendObj = await this.$request('/api/v1/get_user_info', {
				user_id: this.firendId
			});
			console.log(firendObj)
			if (firendObj.data.message === 'ok') {
				this.firendImg = firendObj.data.data.user_photo;
			}
			let res = await this.$request('/api/v1/get_userinfo_token', {
				user_id: data.user_id
			})
			console.log(res)
			if (res.data.message !== 'ok') {

				this.$Toast(res.data.message);
				setTimeout(() => {
					uni.navigateBack({
						delta: 1
					})
				}, 500)
			}
			token = res.data.data.token;
			uni.getSystemInfo({
				success: (res) => {
					this.Height = res.windowHeight - 80; //50
				}
			});

			this.socketTask = uni.connectSocket({
				url: `ws://47.113.81.78:8080/ws?userid=${this.user_id}&token=${token}`,
				header: {
					'content-type': 'application/json'
				},
				success: (res) => {
					console.log(res)
					let login_data = {
						from: Number(this.user_id),
						to: Number(this.firendId),
						type: 'reqrecord'
					};
					let list_data = {
						from: Number(this.user_id),
						type: 'reqonlinelist'
					}
					setTimeout(() => {
						this.socketTask.send({
							data: JSON.stringify(login_data)
						});
						this.socketTask.send({
							data: JSON.stringify(list_data)
						});
						// this.socketTask.send({data:JSON.stringify({from:Number(this.user_id),type:"reqwait"})});
						// this.socketTask.send({data:JSON.stringify({"from":this.user_id,"to":this.firendId,"message":`您好我是${this.user_id}`,"type":"message","date":`${new Date().getTime()}`})});
						this.socketTask.onMessage((data) => {
							// console.log(data)
							this.onmessage(data);
						})
						uni.onSocketClose(function(res) {
							console.log('WebSocket 已关闭！');
						});
					}, 500)

					// setTimeout(()=>{
					//  this.socketTask.close({
					//  	code:1000,
					//  	reason:'test',
					//  	success:(res)=>{
					//  		console.log(res)
					//  	}
					//  })
					// },3000)
				},
				fail: (err) => {
					// console.log(err)
				}
			});
			this.scrollTop = new Date().getTime();
		},

		onUnload() {
			console.log('111')
			this.socketTask.close({
				code: 1000,
				reason: 'test',
				success: (res) => {
					console.log(res)
				}
			})
		},
		methods: {
			hideManager(){
				this.expressionFlog = false;
			},
			setManager() {
				this.expressionFlog = true;
			},
			seeimg(url) {
				uni.previewImage({
					urls: [url]
				})
			}, //聊天图片预览
			close() {
				this.videoFlog = false;
				this.$refs.videoPlay.close();
			}, //关闭弹窗

			change() {
				setTimeout(() => {
					this.scrollTop = new Date().getTime();
					this.$forceUpdate();
				}, 1000)
				console.log('111')
				this.managerShow = false;
				this.expressionFlog = false;
			},
			addImg() {
				this.$refs.popup.close();
				this.managerShow = false;
				let time = new Date().getTime();
				uni.chooseImage({
					count: 1,
					sizeType: ['compressed'],
					sourceType: ['album', 'camera'],
					success: async (res) => {
						console.log(res.tempFilePaths[0]);
						let data = await this.getRequestMsg(res.tempFilePaths[0]);
						let obj = {
							type: 'say',
							from_client_id: this.id,
							// from_client_name:'test',
							to_userid: "all",
							content_type: '3',
							content: data,
							time,
							token: this.token
						}
						let str = JSON.stringify(obj);
						this.socketTask.send({
							data: str,
							success: (res) => {
								console.log(res)
							}
						})
						console.log(data)
					}
				})
			}, //添加图片
			goTo(item) {
				this.managerShow = false;
				this.expressionFlog = false;
				if (item.title === '圈子') {
					uni.navigateTo({
						url: `friendList/firendCircle/firendCircle?id=${this.roomId}`
					})
					return
				}

				if (item.url) {
					uni.navigateTo({
						url: item.url
					})
				}
			},
			send() {
				if (!this.inp) {
					return false;
				}
				let time = new Date().getTime();

				let obj = {
					type: 'message',
					from: Number(this.user_id),
					to: Number(this.firendId),
					message: this.inp,
					date: time
				}
				this.msgList.push(obj);
				this.$forceUpdate();
				this.$nextTick(() => {
					this.scrollTop = new Date().getTime();
				})
				console.log(obj)
				let str = JSON.stringify(obj);
				console.log(str)
				this.socketTask.send({
					data: str,
					success: (res) => {
						this.inp = '';
					}
				})
			},
			chooseExpression(item){
				console.log(item)
				let time = new Date().getTime();
				
				let obj = {
					type: 'message',
					from: Number(this.user_id),
					to: Number(this.firendId),
					message: item.val,
					date: time
				}
				this.msgList.push(obj);
				this.$forceUpdate();
				this.$nextTick(() => {
					this.scrollTop = new Date().getTime();
				})
				console.log(obj)
				let str = JSON.stringify(obj);
				console.log(str)
				this.socketTask.send({
					data: str,
					success: (res) => {
						this.expressionFlog = false;
					}
				})
			},
			// 服务端发来消息时
			onmessage(e) {
				var data = JSON.parse(e.data);
				console.log(JSON.parse(e.data), '*********')
				if (data.data['type'] === 'message') {
					this.msgList.push(data.data);
				}
				if (data.type === "record") {
					let arr = data.data.reverse()
					this.msgList.push(...arr);
				}
				this.$forceUpdate();
				this.$nextTick(() => {
					this.scrollTop = new Date().getTime();
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: #F2F2F2;
	}

	.name {
		font-size: 26rpx;
	}

	.msg_con {
		width: calc(750rpx - 43rpx);
		margin: 0 auto;

		.item {
			width: 100%;
			margin-bottom: 45rpx;

			.msg_con_firend {
				display: flex;
				flex-direction: row;
				align-items: flex-start;

				.icon {
					image {
						width: 79rpx;
						height: 79rpx;
						border-radius: 50%;
					}

					margin-right: 30rpx;
				}

				.msg {
					background: #FFFFFF;
					box-sizing: border-box;
					padding: 15rpx 40rpx;
					border-radius: 30rpx;
					position: relative;

					.text {
						color: #333333;
						font-size: 29rpx;
					}
					.img{
						image{
							width: 50rpx;
							height: 50rpx;
						}
					}
					.posi {
						position: absolute;
						right: -20rpx;
						top: 20%;
						width: 30rpx;
						height: 30rpx;
						background: #7FCFFF;
						position: absolute;
						transform: rotate(45deg);
					}
				}
			}

			.msg_con_me {
				display: flex;
				flex-direction: row-reverse;
				align-items: flex-start;

				// background: linear-gradient(0deg, #19A8FF, #46B9FF)
				.icon {
					image {
						width: 79rpx;
						height: 79rpx;
						border-radius: 50%;
					}

					margin-left: 30rpx;
				}

				.msg {
					background: linear-gradient(to right, #31B2FF, #7FCFFF);
					box-sizing: border-box;
					padding: 15rpx 40rpx;
					border-radius: 30rpx;
					position: relative;

					.text {
						color: #FFFFFF;
						font-size: 29rpx;
					}
					.img{
						image{
							width: 50rpx;
							height: 50rpx;
						}
					}
					.posi {
						position: absolute;
						right: -20rpx;
						top: 20%;
						width: 30rpx;
						height: 30rpx;
						background: #7FCFFF;
						position: absolute;
						transform: rotate(45deg);
					}
				}
			}
		}
	}

	.expression_icon{
		image{
			width: 45rpx;
		}
	}
	.expression{
		width: 100%;
		background: #FFFFFF;
		display: flex;
		flex-direction: row;
		box-sizing: border-box;
		padding: 40rpx 40rpx;
		// justify-content: center;
		border-radius: 35rpx;
		flex-wrap: wrap;
		.item{
			width: 20%;
			margin-bottom: 15rpx;
			text-align: center;
			image{
				width: 50rpx;
				margin: 0 auto;
			}
		}
	}


	// .msg_con {
	// 	width: 100%;
	// 	box-sizing: border-box;
	// 	padding: 20rpx 20rpx 20rpx 20rpx;
	// 	// overflow-y: scroll;
	// 	.item {
	// 		display: flex;
	// 		// flex-direction: row;
	// 		flex-direction: column;
	// 		// align-items: center;
	// 		// height: 140rpx;
	// 		margin-bottom: 30rpx;
	// 		.icon{
	// 			display: flex;
	// 			flex-direction: row;
	// 			align-items: center;
	// 			// margin-bottom: 15rpx;
	// 		}
	// 		.msg{
	// 			display: flex;
	// 			flex-direction: row;
	// 			align-self: flex-start;
	// 			margin-left: 60rpx;
	// 			.text {
	// 				background: #FAFAFA;
	// 				border-radius: 8rpx;
	// 				margin-left: 25rpx;
	// 				display: flex;
	// 				flex-direction: row;
	// 				align-self: flex-start;
	// 				image{
	// 					width: 250rpx;
	// 				}
	// 			}
	// 		}
	// 		.rox{
	// 			display: flex;
	// 			flex-direction: row-reverse;
	// 			flex-direction: column;

	// 		}
	// 		.time{
	// 			text-align: center;
	// 			font-size: 27rpx;
	// 			color: #333333;
	// 		}

	// 	}
	// 	.reserve {
	// 		display: flex;
	// 		// flex-direction: row-reverse;
	// 		flex-direction: column;
	// 		// align-items: center;
	// 		.rox{
	// 			display: flex;
	// 			flex-direction: row-reverse;
	// 			flex-direction: column;
	// 			// align-items: center;
	// 		}

	// 		.msg {
	// 			display: flex;
	// 			flex-direction: row-reverse !important;
	// 			align-self: flex-end !important;
	// 			margin-right: 60rpx;
	// 			margin-left: 0;
	// 			.text {
	// 				// background: #FAFAFA;
	// 				background: #41C2FF;
	// 				color: white !important;
	// 				border-radius: 8rpx;
	// 				margin-right: 25rpx;
	// 			}
	// 		}
	// 		.icon {
	// 			display: flex;
	// 			flex-direction: row-reverse;
	// 			align-items: center;
	// 			.name{
	// 				font-size: 26rpx;
	// 			}
	// 			image {
	// 				width: 80rpx;
	// 				height: 80rpx;
	// 				margin-left: 15rpx;
	// 				// margin-bottom: 15rpx;
	// 			}
	// 		}
	// 	}
	// 	.reserve,
	// 	.item {
	// 		// display: flex;
	// 		// flex-direction: row;
	// 		// align-items: center;
	// 		.icon {
	// 			image {
	// 				width: 80rpx;
	// 				height: 80rpx;
	// 				border-radius: 50%;
	// 				margin-right: 15rpx;
	// 				// margin-bottom: 15rpx;
	// 			}
	// 		}
	// 		.msg {
	// 			height: 70% !important;
	// 			display: flex;
	// 			justify-content: space-between;
	// 			flex-direction: column;
	// 			// text-align: right;

	// 			.video_test{
	// 				width: 60rpx;
	// 				height: 60rpx;
	// 				border: 1px solid #FAFAFA;
	// 				background-size: 80% 80%;
	// 			}
	// 			.name {
	// 				font-size: 24rpx;
	// 				color: #666666;
	// 				text-indent: 10rpx;
	// 			}
	// 			.text {
	// 				// width: 70%;
	// 				font-size: 24rpx;
	// 				color: #333333;
	// 				box-sizing: border-box;
	// 				padding: 12rpx 15rpx;
	// 				display: flex;
	// 				flex-direction: row;
	// 			}
	// 		}
	// 	}
	// }
	.active1 {
		border-right: 2px solid white;
	}

	.bottom_fixed {
		width: 700rpx;
		position: fixed;
		bottom: 32rpx;
		left: 25rpx;

		// background: white;
		// z-index: 9999;
		.send {
			width: 100%;
			height: 80rpx;
			background: white;
			display: flex;
			justify-content: space-between;
			align-items: center;
			box-sizing: border-box;
			padding: 0 20rpx;
			box-shadow: 0px 9rpx 24rpx 0px rgba(223, 223, 223, 0.32);
			border-radius: 35rpx;
			// margin-bottom: 20rpx;
			.add {
				width: 58rpx;
				margin-right: 15rpx;
			}

			.inp {
				width: 70%;
				background: white;
				margin-right: 15rpx;
				padding: 10rpx 0;
				font-size: 27rpx;

				inp {
					padding: 10rpx 0;
					font-size: 27rpx;
				}
			}

			.img {
				width: 48rpx;
				// margin-right: 15rpx;
			}

			.send_icon {
				width: 70rpx;
				height: 70rpx;
			}
		}

		.bottom_tab {
			width: 100%;
			height: 100rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.item {
				box-sizing: border-box;
				background: #33BEFF;
				height: 100%;
				width: 25%;
				font-size: 30rpx;
				color: white;
				line-height: 110rpx;
				text-align: center;
			}
		}
	}
</style>
