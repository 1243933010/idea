<template>
	<view>
		<view class="context">

			<view class="item" >
				<view class="item-user">
					<view class="item-user-left">
						<image :src="obj.user_photo?obj.user_photo:'../../static/mine/headimg.jpg'" mode=""></image>
						<view class="item-user-left-user">
							<text class="item-user-left-user-name">{{obj.alias}}</text>
							<text class="item-user-left-user-time">{{obj.add_time}}</text>
						</view>
					</view>
					<view class="item-user-right" >
						<view class="follow" v-if="obj.user_id!==userInfo.user_id&&obj.is_follow==0">关注</view>
						<view class="no-follow" v-if="obj.user_id!==userInfo.user_id&&obj.is_follow==1">取消关注</view>
					</view>
					<view class="delete" v-if="obj.is_delete=='1'">
						<image style="width: 40rpx;" @click="Delete" src="../../static/idea/delete.png" mode="widthFix"></image>
						
					</view>
				</view>
				<view class="item-con">
					<view class="item-con-label">
						<text>{{obj.goods_name}}</text>
					</view>
					<view class="item-con-con">
						<text v-if="obj.goods_desc&&obj.goods_desc[0]!=='<'">{{obj.goods_desc}}</text>
						<view v-if="obj.goods_desc&&obj.goods_desc[0]==='<'">
							<rich-text :nodes="obj.goods_desc"></rich-text>
						</view>
						<view class="item-con-con-img">
							<image v-for="(item,index) in obj.url_data" :key="index"  v-if="item.type===1" :src="item.url"  mode="" @click="$seeDetail(item.url)"></image>
						</view>
					</view>
				</view>
				<!-- <view class="item-bottom">
					<view class="zan">
						<image src="../../static/logo.png" mode="widthFix"></image>
						<text>530</text>
					</view>
					<view class="msg">
						<image src="../../static/logo.png" mode="widthFix"></image>
						<text>530</text>
					</view>
				</view> -->
			</view>
		</view>
		<view class="comment">
			<view class="comment-title">
				<text>评论（{{obj.comment.length||0}}）</text>
			</view>
			<view class="comment-item" v-if="obj.comment.length!==0">
				<view class="item" v-for="(item,index) in obj.comment" :key="index" >
					<view class="item-flex" @longpress="longpress(item)">
						<view class="icon">
							<image :src="item.user_photo?item.user_photo:'../../static/mine/headimg.jpg'" mode=""></image>
						</view>
						<view class="context">
							<view class="name">{{item.alias}}</view>
							<view class="text">{{item.content}}</view>
							<view class="bottom">
								<view class="time">
									<text>{{item.create_time}}</text>
								</view>
								<view class="right">
									<view class="zan">
										<image v-if="item.is_delete=='1'"  @click="shan(item)" src="../../static/idea/delete.png" mode="widthFix"></image>
										
									</view>
									<view class="zan"  @click="setZan(item,'2')">
										<image style="width: 45rpx;" v-if="item.is_click=='1'" src="../../static/s_zan_n.png" mode="widthFix"></image>
										<image style="width: 45rpx;" v-if="item.is_click=='2'"  src="../../static/s_zan_y.png" mode="widthFix"></image>
										<text>{{item.like_count}}</text>
									</view>
									<!-- <view class="msg" @click="pinglun(item)">
										<image src="../../static/index/pinglun.png" mode="widthFix"></image>
										<text>{{item.children.length}}</text>
									</view> -->
								</view>
							</view>
						</view>
					</view>
					<view class="huifu" v-if="item.children.length!==0">
						<view class="huifu-item" v-for="(v,i) in item.children" :key="i">
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
									<image @click="setZan(v,'2')" style="width: 45rpx;" v-if="v.is_click=='1'"  src="../../static/s_zan_n.png" mode="widthFix"></image>
									<image @click="setZan(v,'2')"  style="width: 45rpx;" v-if="v.is_click=='2'" src="../../static/s_zan_y.png" mode="widthFix"></image>
									
									
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
					<image style="width: 40rpx;" @click="collect" v-if="obj.is_collect=='1'"  src="../../static/no_flower.png" mode="widthFix"></image>
					<image style="width: 40rpx;"  @click="collect" v-if="obj.is_collect=='2'" src="../../static/is_flower.png" mode="widthFix"></image>
					<image  v-if="obj.is_click=='2'" @click="setZan(obj,'1')"  style="width: 50rpx;" class="share" src="../../static/s_zan_y.png" mode="widthFix"></image>
					<image  v-if="obj.is_click=='1'" @click="setZan(obj,'1')"  style="width: 50rpx;" class="share" src="../../static/s_zan_n.png" mode="widthFix"></image>
					<!-- <image v-if="obj.is_click=='2'" @click="setZan(obj,'1')"  style="width: 45rpx;" class="share" src="../../static/index/zan.png" mode="widthFix"></image>
					<image v-if="obj.is_click=='1'" @click="setZan(obj,'1')"  style="width: 45rpx;" class="share" src="../../static/idea/red_zan.png" mode="widthFix"></image> -->
				</view>
			</view>
		</view>
		
		<view class="popup" v-show="showFlog" @click="OnNavigationBarButtonTap">
			<view class="bk" >
				<view class="bk-con" @click.stop="">
					<view class="" @click.stop="share">
						<image src="../../static/idea/s_share.png" mode="widthFix"></image>
						<text>分享</text></view>
					<view class="" @click.stop="setShang">
						<image src="../../static/idea/dashang.png" mode="widthFix"></image>
						<text>打赏</text></view>
					<view class="" @click.stop="jubao">
						<image src="../../static/idea/jubao.png" mode="widthFix"></image>
						<text>举报</text></view>
				</view>
				<view class="fang"></view>
			</view>
		</view>
		
		<view class="shang" v-show="shangFlog" @click.stop="closeShang">
			<view class="shang-con">
				<view class="bk" @click.stop="">
					<view class="yellow">
						<view class="title">
							<text class="one">请输入打赏金额</text>
							<text class="two">(金额不低于1元)</text>
						</view>
						<view class="inp">
							<input type="number" placeholder="￥" placeholder-class="place"/>
						</view>
					</view>
					<view class="btn">
						<text>确认打赏</text>
					</view>
				</view>
			</view>
		</view>
	
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
				obj:{
					goods_desc:'',
					comment:[]
				},
				userType:'1',
				showFlog:false,
				shangFlog:false,
				userInfo:{},
				content:'',
				text:'',
				name:'',
				goods_id:''
			};
		},
		onNavigationBarButtonTap(){
			this.showFlog = !this.showFlog;
		},
		onLoad(e) {
			console.log(e)
			this.getMsg(e.goods_id);
			this.goods_id = e.goods_id;
			this.userInfo = uni.getStorageSync('userInfo');
		},
		methods:{
			
			
			OnNavigationBarButtonTap(){
				this.showFlog = !this.showFlog;
			},
			setShang(){
				this.$toast('暂未开放');
				return false;
				this.showFlog = false;
				this.shangFlog = true;
			},
			closeShang(){
				this.shangFlog = false;
			},
			async getMsg(goods_id){
				uni.showLoading();
				let obj = {goods_id};
				let data = await this.$request('/api/v1/getArticle',obj,'GET');
				uni.hideLoading();
				console.log(data);
				if(data.data.status==='success'){
					this.obj = data.data.data;
				}
			},
			async Delete(){
				uni.showModal({
					title:'提示',
					content:'您确定要删除改帖子吗?',
					success:async(status)=> {
						if(status.confirm){
							let obj = {
								goods_id:this.obj.goods_id
							}
							let data = await this.$request('/api/v1/delete_Article',obj)
							console.log(data);
							this.$toast(data.data.message);
							if(data.data.status==='success'){
								setTimeout(()=>{
									uni.navigateBack({
										delta:1
									})
								},500)
							}
						}
					}
				})
				
			},
			async share(){
				let obj = {
					goods_id:this.obj.goods_id
				}
				let data = await this.$request('/api/v1/share_detail',obj)
				console.log(data);
				this.$toast(data.data.message);
				if(data.data.status==='success'){
					this.$refs.popup.close();
					this.showFlog = false;
				}
			},
			async jubao(){
				let obj = {
					goods_id:this.obj.goods_id
				}
				let data = await this.$request('/api/v1/report_detail',obj)
				console.log(data);
				this.$toast(data.data.message);
				if(data.data.status==='success'){
					this.$refs.popup.close();
				}
			},
			async fabu(){
				let obj = {
					goods_id:this.obj.goods_id,
					content:this.content
				}
				let data = await this.$request('/api/v1/release_comment',obj)
				console.log(data);
				this.$toast(data.data.message);
				if(data.data.status==='success'){
					this.content = '';
					this.getMsg(this.goods_id)
					// this.$refs.popup.close();
				}
			},
			pinglun(item){
				this.item = item;
				console.log(item)
				this.name = item.alias;
				this.$refs.popup.open();
			},
			async setZan(obj,type){
				console.log(obj)
				console.log(type)
				let res = {type}
				if(type==='1'){
					res.goods_id=obj.goods_id;
					
				}
				if(type==='2'){
					res.comment_id=obj.comment_id;
				}
				let data = await this.$request('/api/v1/click_by_operate',res);
				console.log(data);
				this.$toast(data.data.message);
				if(data.data.status==='success'){
					if(type==='1'){
						if(this.obj.is_click=='1'){
							this.obj.is_click='2'
						}else{
							this.obj.is_click='1'
						}
						return false;
					}
					this.getMsg(this.goods_id);
				}
			},
			async shan(item){
				let obj = {comment_id:item.comment_id,login_user_id:item.user_id};
				let data = await this.$request('/api/v1/delete_comment',obj);
				this.$toast(data.data.message);
				if(data.data.status==='success'){
					this.getMsg(this.goods_id);
				}
				console.log(item);
			},
			async huifu(){
				console.log(this.item)
				let obj = {
					goods_id:this.goods_id,
					comment_id:this.item.comment_id,
					content:this.text
				}
				let data = await this.$request('/api/v1/release_comment',obj)
				this.$toast(data.data.message);
				if(data.data.status==='success'){
					this.text = '';
					this.getMsg(this.goods_id);
					this.$refs.popup.close();
				}
				console.log(this.item)
			},
			async longpress(item){
				this.item= item;
				this.$refs.popup.open();
			},
			async collect(){
				let obj = {
					goods_id:this.obj.goods_id
				}
				let data = await this.$request('/api/v1/collect_detail',obj)
				this.$toast(data.data.message);
				if(data.data.status==='success'){
					this.getMsg(this.goods_id);
				}
				console.log(this.item)
			}
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
	.delete{
		image{
			width: 50rpx;
		}
	}
	.fabu{
		// width: 10%;
		font-size: 28rpx;
		background: #2B9939;
		// color: white;
		border-radius: 15rpx;
		box-sizing: border-box;
		padding: 5rpx 15rpx;
		text{
			color: white;
		}
	}
	.context {
		width: 100%;

		.item {
			// border-bottom: 4px solid #F5F5F5;
			margin-bottom: 15rpx;
			box-sizing: border-box;
			padding: 0 27rpx;

			.item-user {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 33rpx;

				.item-user-left {
					display: flex;
					flex-direction: row;
					align-items: center;

					image {
						width: 80rpx;
						height: 80rpx;
						border-radius: 50%;
						margin-right: 20rpx;
					}

					.item-user-left-user {
						display: flex;
						flex-direction: column;

						.item-user-left-user-name {
							color: #202020;
							font-size: 30rpx;
						}

						.item-user-left-user-time {
							color: #808080;
							font-size: 20rpx;
						}
					}
				}

				.item-user-right {
					.follow {
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

					.no-follow {
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

			.item-con {
				display: flex;
				flex-direction: column;
				margin-bottom: 37rpx;

				.item-con-label {
					color: #141414;
					font-size: 32rpx;
					margin-bottom: 18rpx;
					font-weight: 600;
				}

				.item-con-con {
					color: #1F1F1F;
					font-size: 26rpx;
					font-weight: 500;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					// align-items: center;
					text {
						margin-bottom: 25rpx;
					}
					.item-con-con-img{
						// width: calc(750rpx - 25rpx);
						width: 100%;
						// margin: 0 auto;
						display: flex;
						flex-direction: row;
						flex-wrap: wrap;
						image {
							// width: calc(350rpx - 30rpx);
							width: 305rpx;
							height: 208rpx;
							border-radius: 15rpx;
							margin: 15rpx;
						}
					}
					
				}
			}

			.item-bottom {
				width: 100%;
				padding-left: 28rpx;
				margin-bottom: 23rpx;
				display: flex;
				flex-direction: row;
				align-items: center;

				.zan,
				.msg {
					display: flex;
					flex-direction: row;
					align-items: center;
					font-size: 23rpx;
					color: #949494;
					margin-right: 41rpx;

					image {
						width: 25rpx;
						margin-right: 16rpx;
					}
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
    .shang{
		position: fixed;
		top: 0;
		width: 100%;
		height: 100%;
		background: rgba(0,0,0,0.5);
		.shang-con{
			width: 100%;
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			.bk{
				width: 596rpx;
				height: 824rpx;
				background: url(../../static/idea/small_bk.png) no-repeat;
				background-size: 100% 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				flex-direction: column;
				.yellow{
					background: #FFC17F;
					border-radius: 48rpx;
					box-sizing: border-box;
					padding: 28rpx 32rpx;
					margin-bottom: 68rpx;
					margin-top: 150rpx;
					.title{
						display: flex;
						flex-direction: column;
						align-items: center;
						.one{
							color: white;
							font-size: 35.26rpx;
							margin-bottom: 15rpx;
						}
						.two{
							color: white;
							font-size: 18.64rpx;
							margin-bottom: 65rpx;
						}
					}
					.inp{
						width: 60%;
						margin: 0 auto;
						border-bottom: 5rpx solid white;
						input{
							color: white;
							// height: 80rpx;
							// font-size: 57rpx;
							text-align: center;
						}
						.place{
							color: white;
							font-size: 77rpx;
						}
					}
				}
				.btn{
					width: 400rpx;
					height: 88rpx;
					margin: 0 auto;
					background: #FF8F35;
					border-radius: 10rpx;
					color: #FFFFFF;
					font-size: 47rpx;
					display: flex;
					justify-content: center;
					align-items: center;
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
