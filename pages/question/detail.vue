<template>
	<view>
		<view class="list">
			<view class="item" 
			>
			<!-- :style="{background:index===0?'#EFF9FF':index%2===0&&index!==0?'#EFF9FF':index%3===0&&index!==0?'#FFEFF4':''}" -->
				<view class="item-top">
					<view class="item-top-left">
						<image :src="item.user_photo?item.user_photo:'../../static/mine/headimg.jpg'" mode=""></image>
						<view class="item-top-left-name">
							<text class="name">{{item.alias}}</text>
							<text class="time">{{item.add_time}}</text>
						</view>
					</view>
					<view class="item-top-right">
						<!-- <view class="follow" v-if="item.is_follow==0" @click="guanzhu(item)"><text>关注</text></view>
						<view class="no-follow" v-if="item.is_follow==1" @click="quguan(item)"><text>已关注</text></view> -->
						<image @click="Delete(item)" v-if="item.is_delete==1" src="../../static/idea/delete.png" mode="widthFix"></image>
					</view>
				</view>
				<view class="item-context">
					<view class="item-context-title"><text>{{item.problem_name}}</text></view>
					<view class="item-context-label"><text>{{item.problem_desc}}</text></view>
				</view>
			</view>
		</view>
		<view class="comment">
			<view class="comment-title">
				<text>评论（{{item.comment.length}}）</text>
			</view>
			<view class="comment-item" v-if="item.comment.length!==0">
				<view class="item" v-for="(val,ind) in item.comment" :key="ind" >
					<view class="item-flex" @longpress="longpress(val)">
						<view class="icon">
							<image :src="val.user_photo?val.user_photo:'../../static/mine/headimg.jpg'" mode=""></image>
						</view>
						<view class="context">
							<view class="name">{{val.alias}}</view>
							<view class="text">{{val.content}}</view>
							<view class="bottom">
								<view class="time">
									<text>{{val.create_time}}</text>
								</view>
								<view class="right">
									<view class="zan">
										<image v-if="val.is_delete=='1'"  @click="shan(val)" src="../../static/idea/delete.png" mode="widthFix"></image>
										
									</view>
									<view class="zan"  @click="setZan(val,'2')">
										<image v-if="val.is_click=='1'" src="../../static/s_zan_n.png" mode="widthFix"></image>
										<image v-if="val.is_click=='2'"  src="../../static/s_zan_y.png" mode="widthFix"></image>
										<text>{{val.like_count}}</text>
									</view>
									<!-- <view class="msg" @click="pinglun(item)">
										<image src="../../static/index/pinglun.png" mode="widthFix"></image>
										<text>{{item.children.length}}</text>
									</view> -->
								</view>
							</view>
						</view>
					</view>
					<view class="huifu" v-if="val.children.length!==0">
						<view class="huifu-item" v-for="(v,i) in val.children" :key="i">
							<view class="huifu-item-uer" style="margin-bottom: 15rpx;">
								<image :src="v.user_photo?v.user_photo:'../../static/mine/headimg.jpg'" mode=""></image>
								<text>{{v.alias}}</text>
								
							</view>
							<view class="huifu-item-con" style="margin-left: 5rpx;margin-bottom: 15rpx;">
								<text>{{v.content}}</text>
							</view>
							<view class="huifu-item-time">
								<text class="time">{{v.create_time}}</text>
								
								<view class="zan">
									<image v-if="v.is_delete=='1'" style="margin-right: 24rpx;"  @click="shan(v)" src="../../static/idea/delete.png" mode="widthFix"></image>
									<image style="width: 40rpx;" @click="setZan(v,'2')" v-if="v.is_click=='1'" src="../../static/s_zan_n.png" mode="widthFix"></image>
									<image style="width: 40rpx;" @click="setZan(v,'2')" v-if="v.is_click=='2'"  src="../../static/s_zan_y.png" mode="widthFix"></image>
									
									<text>{{v.like_count}}</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="fixed">
			<view class="fixed-con">
				<view class="inp">
					<input type="text" confirm-type="send" @confirm="fabu" v-model="content" placeholder-style="color:#262626;font-size:24rpx;text-indent:15rpx;"  placeholder="写评论..." />
				</view>
				<!-- <view class="fabu" @click="fabu"><text>发布</text></view> -->
				<view class="img">
					<image v-if="item.is_collect==1" @click="collect" style="width: 40rpx;" class="collection" src="../../static/no_flower.png" mode="widthFix"></image>
					<image v-if="item.is_collect==2" @click="collect" style="width: 40rpx;" class="collection" src="../../static/is_flower.png" mode="widthFix"></image>
					<image  v-if="item.is_click==1" @click="setZan(item,'1')"  style="width: 45rpx;" class="share" src="../../static/s_zan_n.png" mode="widthFix"></image>
					<image v-if="item.is_click==2"  @click="setZan(item,'1')"  style="width: 45rpx;" class="share" src="../../static/s_zan_y.png" mode="widthFix"></image>
					<!-- <image v-if="obj.is_click=='2'" @click="setZan(obj,'1')"  style="width: 45rpx;" class="share" src="../../static/index/zan.png" mode="widthFix"></image>
					<image v-if="obj.is_click=='1'" @click="setZan(obj,'1')"  style="width: 45rpx;" class="share" src="../../static/idea/red_zan.png" mode="widthFix"></image> -->
				</view>
			</view>
		</view>
		<!-- <view class="comment">
			<view class="comment-title">
				<text>评论（{{obj.commentNum}}）</text>
			</view>
			<view class="comment-item">
				<view class="item" v-for="(item,index) in obj.commentList" :key="index">
					<view class="icon">
						<image :src="item.icon" mode="widthFix"></image>
					</view>
					<view class="context">
						<view class="name">{{item.name}}</view>
						<view class="text">{{item.text}}</view>
						<view class="bottom">
							<view class="time">
								<text>{{item.time}}</text>
							</view>
							<view class="right">
								<view class="zan">
									<image src="../../static/logo.png" mode="widthFix"></image>
									<text>{{item.zan}}</text>
								</view>
								<view class="msg">
									<image src="../../static/logo.png" mode="widthFix"></image>
									<text>{{item.msg}}</text>
								</view>
							</view>
						</view>
					</view>
					
				</view>
			</view>
		</view> -->
		
		<uni-popup ref="popup" type="bottom">
			<view class="form">
				<view class="title"><text>回复{{name}}</text></view>
				<view class="inp">
					<input type="text" v-model="text" placeholder="请输入内容"/>
					<text @click="huifu">确定</text>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	export default {
		components:{
			uniPopup
		},
		data() {
			return {
				item:{
					comment:[]
				},
				obj:{
					comment:[]
				},
				name:'',
				text:'',
				wsid:'',
				userInfo:{},
				content:''
			};
		},
		onLoad(e) {
			this.getDetail(e.wsid);
			this.wsid = e.wsid;
			console.log(e)
			this.userInfo = uni.getStorageSync('userInfo');
		},
		onNavigationBarButtonTap() {
			let obj = {wsid:this.item.wsid,alias:this.item.alias};
			uni.navigateTo({
				url:`./reply?obj=${JSON.stringify(obj)}`
			})
			console.log(this.item)
		},
		methods:{
			async getDetail(wsid){
				uni.showLoading();
				let obj = {wsid};
				let data = await this.$request('/api/v1/getWholesale',obj,'GET');
				uni.hideLoading();
				if(data.data.status==='success'){
					this.item = data.data.data;
				}
				console.log(data);
			},
			async Delete(item){
				uni.showModal({
					title:'提示',
					content:'您确定要删除此问题吗?',
					success:async(status)=> {
						if(status.confirm){
							let data = await this.$request('/api/v1/delete_byproblem',{wsid:item.wsid});
							this.$toast(data.data.message);
							if(data.data.status==='success'){
								setTimeout(()=>{
									uni.navigateBack({
										delta:1
									})
								},500)
							}
							console.log(item)
						}
					}
				})
				
			},
			async fabu(){
				let obj = {
					wsid:this.item.wsid,
					content:this.content
				}
				let data = await this.$request('/api/v1/release_byproblem_comment',obj)
				console.log(data);
				this.$toast(data.data.message);
				if(data.data.status==='success'){
					this.content = '';
					this.getDetail(this.wsid)
					// this.$refs.popup.close();
				}
			},
			async huifu(){
				let obj = {
					wsid:this.wsid,
					comment_id:this.obj.comment_id,
					content:this.text
				}
				let data = await this.$request('/api/v1/release_byproblem_comment',obj)
				this.$toast(data.data.message);
				if(data.data.status==='success'){
					this.text = '';
					this.getDetail(this.wsid);
					this.$refs.popup.close();
				}
				console.log(this.item)
			},
			async longpress(item){
				this.obj= item;
				this.$refs.popup.open();
			},
			async collect(){
				let obj = {
					wsid:this.item.wsid
				}
				let data = await this.$request('/api/v1/collect_byproblem_operate',obj)
				this.$toast(data.data.message);
				if(data.data.status==='success'){
					this.getDetail(this.wsid);
				}
				console.log(this.item)
			},
			async setZan(obj,type){
				console.log(obj)
				console.log(type)
				let res = {type}
				if(type==='1'){
					res.wsid=obj.wsid;
				}
				if(type==='2'){
					res.comment_id=obj.comment_id;
				}
				let data = await this.$request('/api/v1/click_byproblem_operate',res);
				console.log(data);
				this.$toast(data.data.message);
				if(data.data.status==='success'){
					this.getDetail(this.wsid);
				}
			},
			async shan(item){
				// ,login_user_id:item.user_id
				let obj = {comment_id:item.comment_id};
				let data = await this.$request('/api/v1/delete_byproblem_comment',obj);
				this.$toast(data.data.message);
				if(data.data.status==='success'){
					this.getDetail(this.wsid);
				}
				console.log(item);
			},
		}
	}
</script>

<style lang="scss" scoped>
	.huifu{
		width: 90%;
		// background: red;
		// text-align: right;
		margin-left: 10%;
		.huifu-item{
			width: 100%;
			// border-bottom: 1px solid #F2F2F2;
			margin-bottom: 20rpx;
			padding-bottom: 20rpx;
			.huifu-item-uer{
				font-size: 28rpx;
				display: flex;
				flex-direction: row;
				align-items: center;
				color: #666666;
				font-size: 24rpx;
				image{
					width: 60rpx;
					height:60rpx;
					border-radius: 50%;
					margin-right: 15rpx;
				}
			}
			.huifu-item-con{
				display: flex;
				flex-direction: row;
				margin-left: 90rpx;
				font-size: 26rpx;
				color: #1F1F1F;
			}
			.huifu-item-time{
				width: 90%;
				// margin: 0 auto;
				display: flex;
				justify-content: space-between;
				align-items: center;
				.time{
					color: #666666;
					font-size: 20rpx;
				}
				.zan{
					display: flex;
					flex-direction: row;
					align-items: center;
					color: #202020;
					font-size: 23rpx;
					image{
						width: 36rpx;
						margin-right: 5rpx;
					}
				}
			}
		}
	}
.list{
		width: calc(100% - 56rpx);
		margin: 0 auto;
		.item{
			margin-bottom: 32rpx;
			padding: 15rpx 0rpx  29rpx 0;
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
					image{
						width: 45rpx;
					}
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
					font-weight: bold;
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
	.comment{
		width: 100%;
		padding-bottom: 40rpx;
		overflow: hidden;
		.comment-title{
			font-size: 24rpx;
			color: #262626;
			background: #F2F2F2;
			padding: 10rpx 0 10rpx 27rpx;
			margin-bottom: 41rpx;
		}
		.comment-item{
			width: 100%;
			display: flex;
			flex-direction: column;
			
			.item{
				width: 100%;
				display: flex;
				flex-direction: column;
				padding: 20rpx 30rpx;
				margin-bottom:25rpx ;
				border-bottom: 1px solid #F2F2F2;
				
				.item-flex{
					display: flex;
					justify-content: space-between;
					// align-items: center;
					box-sizing: border-box;
					// border-bottom: 1px solid #F2F2F2;
					.icon{
						width: 10%;
						margin-right: 10rpx;
						image{
							width: 60rpx;
							height: 60rpx;
							border-radius: 50%;
						}
					}
					.context{
						width: 90%;
						
						padding-bottom: 37rpx;
						
						.name{
							color: #666666;
							font-size: 24rpx;
							margin-bottom: 28rpx;
						}
						.text{
							color: #1F1F1F;
							font-size: 26rpx;
							font-weight: 500;
							line-height: 48rpx;
							margin-bottom: 25rpx;
						}
						.bottom{
							display: flex;
							justify-content: space-between;
							align-items: center;
							.time{
								width: 40%;
								color: #666666;
								font-size: 20rpx;
							}
							.right{
								width: 35%;
								display: flex;
								flex-direction: row;
								justify-content: center;
								align-items: center;
								.zan,.msg{
									display: flex;
									flex-direction: row;
									align-items: center;
									color: #202020;
									font-size: 23rpx;
									margin-right: 21rpx;
									image{
										width: 36rpx;
										margin-right: 6rpx;
									}
								}
							}
						}
					}
				}
			}
		}
	}
	.fixed{
		position: fixed;
		width: 100%;
		bottom: 0rpx;
		.fixed-con{
			width: 100%;
			box-sizing: border-box;
			padding: 28rpx 28rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			background: white;
			z-index: 100;
			.inp{
				width: 80%;
				background: #F5F5F5;
				border-radius: 24rpx;
				padding: 10rpx 0;
				display: flex;
				justify-content: space-between;
				align-items: center;
				input{
					font-size: 30rpx;
					text-indent: 15rpx;
				}
				view{
					font-size: 28rpx;
					color: #333333;
				}
			}
			.img{
				width: 20%;
				display: flex;
				justify-content: space-around;
				align-items: center;
				image{
					width: 50rpx;
				}
			}
		}
		
	}
	.popup{
		position: fixed;
		top: 0;
		width: 100%;
		height: 100%;
		background: rgba(0,0,0,0.5);
		.bk{
			position: relative;
			width: 100%;
			height: 100%;
			.fang{
				width: 40rpx;
				height: 40rpx;
				background: white;
				transform: rotate(45deg);
				position: absolute;
				/* #ifdef APP-PLUS */
				top: 0rpx;
				/* #endif */
				/* #ifdef H5 */
				top: 100rpx;
				/* #endif */
				right: 36rpx;
				border-radius: 10rpx;
			}
			// background: red;
			.bk-con{
				position: absolute;
				/* #ifdef APP-PLUS */
				top: 20rpx;
				/* #endif */
				/* #ifdef H5 */
				top: 120rpx;
				/* #endif */
				right: 26rpx;
				width: 223rpx;
				height: 235rpx;
				background: white;
				border-radius: 8rpx;
				view{
					width: 100%;
					height: 33%;
					display: flex;
					justify-content: center;
					flex-direction: row;
					align-items: center;
					text{
						margin-left: 36rpx;
					}
					image{
						width: 44rpx;
					}
				}
			}
		}
	}
	.form{
		width: calc(750rpx - 25rpx);
		margin: 0 auto;
		background: white;
		border-radius: 20rpx;
		box-sizing: border-box;
		padding: 30rpx 20rpx;
		.title{
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 32rpx;
		}
		.inp{
			width: 100%;
			display: flex;
			flex-direction: column;
			// justify-content: space-between;
			align-items: center;
			padding: 20rpx 0;
			
			input{
				font-size: 28rpx;
				text-indent: 15rpx;
				border: 1px solid #333333;
				box-sizing: border-box;
				height: 75rpx;
				border-radius: 10rpx;
				width: 90%;
				margin-bottom: 25rpx;
				// background: red;
			}
			text{
					border-radius: 8rpx;
					background: #EBEBEB;
					width:200rpx;
					height: 74rpx;
					font-size: 26rpx;
					color: #07A2FF;
					display: flex;
					justify-content: center;
					align-items: center;
				
				
			}
		}
	}
</style>
