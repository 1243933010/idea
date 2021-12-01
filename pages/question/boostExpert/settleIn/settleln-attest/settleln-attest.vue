<template>
	<view class="settleln-attest-con">
		<view class="navtab">
			<view class=""><image @click="back" src="../../../../../static/question/w_left_arrow.png" mode="widthFix"></image></view>
			<view class="a"><text>专家认证</text></view>
			<view class=""></view>
		</view>
		
		<view class="basic-info white-con">
			<view class="tit">基本信息</view>
			<view class="icon">
				<image @click="chooseIcon" :src="icon" mode="widthFix"></image>
				<image src="../../../../../static/question/cam.png" mode="widthFix" class="cam"></image>
			</view>
			<view class="inp-con user-name">
				<text>姓名:</text>
				<input type="text" v-model="name"  placeholder="请输入您的姓名"/>
			</view>
			<view class="inp-con user-card">
				<text>学校:</text>
				<input type="text" v-model="school" placeholder="请输入您的学校" />
			</view>
			<view class="inp-con user-card">
				<text>职位:</text>
				<input type="text" v-model="zhiye"  placeholder="请输入您的职位"/>
			</view>
			<view class="inp-con user-desc">
				<text>
					申请说明
					<span>(字数200以内)</span>
				</text>
				<textarea style="font-size: 24rpx;" placeholder="请输入您的说明" v-model="text" maxlength="200" />
			</view>
		</view>
		<view class="prove white-con">
			<view class="tit">
				上传身份证
				<text style="color: #999999;font-size: 24rpx;">（正反面）</text>
			</view>
			<view class="prove-list">
				<view class="prove-item">
					<image @click="chooseSFZY" :src="sfzY" mode=""></image>
				</view>
				<view class="prove-item">
					<image  @click="chooseSFZZ" :src="sfzZ" mode=""></image>
				</view>
			</view>
		</view>
		<view class="prove white-con">
			<view class="tit">资质证明</view>
			<view class="prove-list">
				<view class="prove-item" style="width: 100%;">
					<image @click="chooseZi" style="width: 638rpx;height: 200rpx;" :src="zi" mode=""></image>
				</view>
				
			</view>
		</view>
		<view class="identify white-con">
			<view class="tit">基本信息</view>
			<view class="identify-img">
				<image @click="chooseUserImg" :src="userImg" mode=""></image>
			</view>
		</view>
		<view class="btn-con" @click="btnOn">
			<span>提交申请</span>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	export default {
		components: {
			uniNavBar
		},
		data() {
			return {
				name:'',
				school:'',
				zhiye:'',
				text:'',
				sfzY:'../../../../../static/question/sfz.png',
				sfzYUrl:'',
				sfzZ:'../../../../../static/question/sfz.png',
				sfzZurl:'',
				zi:'../../../../../static/question/juxing.png',
				ziUrl:'',
				userImg:'../../../../../static/question/identify.png',
				userImgUrl:'',
				icon:'../../../../../static/mine/headimg.jpg',
				iconUrl:""
			}
		},
		computed: {
			statusBarHeight() {
				return this.$store.state.statusBarHeight
			}
		},
		methods: {
			back(){
				uni.navigateBack({
					delta:1
				})
			},
			 uploadImg(type){
				return new Promise((resolve,reject)=>{
					let sourceType;
					if(type==='1'){
						 sourceType = ['camera']
					}else{
						sourceType = ['album','camera']
					}
					uni.chooseImage({
						count:1,
						sourceType,
						success:async(res)=>{
							console.log(res)
							let data = await this.Upload(res.tempFilePaths[0]);
							console.log(data);
							let str = JSON.parse(data.data);
							if(str.status==='success'){
								resolve(str);
								// this.imgList.push({type:1,url:str.data.url,url_all:str.data.url_all});
							}
							
							
						}
					})
				})
			},
			async chooseSFZY(){
				let data = await this.uploadImg('2');
				if(data.status==='success'){
					this.sfzY = data.data.url_all;
					this.sfzYUrl = data.data.url;
				}
				console.log(data);
			},
			async chooseSFZZ(){
				let data = await this.uploadImg('2');
				if(data.status==='success'){
					this.sfzZ = data.data.url_all;
					this.sfzZurl = data.data.url;
				}
				console.log(data);
			},
			async chooseZi(){
				let data = await this.uploadImg('2');
				if(data.status==='success'){
					this.zi = data.data.url_all;
					this.ziUrl = data.data.url;
				}
				console.log(data);
			},
			async chooseUserImg(){
				let data = await this.uploadImg('1');
				if(data.status==='success'){
					this.userImg = data.data.url_all;
					this.userImgUrl = data.data.url;
				}
				console.log(data);
			},
			async Upload(url){
				return new Promise((resolve,reject)=>{
					uni.uploadFile({
					           url: 'http://tp_api_xiangfa.demo.insist8.com/api/v1/Ossupload', 
					           filePath: url,
					           name: 'file',
					           formData: {},
					           success: (uploadFileRes) => {
								   // console.log(uploadFileRes);
								   resolve(uploadFileRes);
					               
					           },
							   fail:(error)=>{
								   reject(error);
							   }
					       });
				})
			},
			async chooseIcon(){
				let data = await this.uploadImg('2');
				if(data.status==='success'){
					this.icon = data.data.url_all;
					this.iconUrl = data.data.url;
				}
				console.log(data);
			},
			async btnOn(){
				let obj = {
					expert_name:this.name,
					expert_school:this.school,
					expert_position:this.zhiye,
					expert_desc:this.text,
					positive_card:this.sfzZurl,
					negative_card:this.sfzYUrl,
					expert_photo:this.userImgUrl,
					identity_pic:this.ziUrl,
					expert_photo:this.iconUrl
				}
				let data = await this.$request('/api/v1/expert_cert',obj);
				if(data.data.status==='success'){
					setTimeout(()=>{
						uni.navigateBack({
							delta:2
						})
					},500)
				}
				this.$toast(data.data.message);
			}
		}
	}
</script>

<style lang="less">
	.navtab{
		width: 100%;
		padding-top: 44px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		view{
			width: 33.3%;
			image{
				width: 48rpx;
				margin-left: 13rpx;
			}
			
		}
		.a{
			display: flex;
			justify-content: center;
			align-items: center;
			color: white;
			font-size: 34rpx;
			font-weight: 500;
		}
	}
	page{
		width: 100%;
		background: url(../../../../../static/question/hezuo_bk.png) no-repeat;
		background-size: 100% 100%;
	}
.settleln-attest-con {
	padding-top: 1px;
	.bg {
		width: 100%;
		height: calc(100% + 276rpx);
		z-index: -1;
	}
	.tit {
		color: #2DA0EA;
		font-size: 36rpx;
		font-weight: bold;
		text-align: center;
		margin-bottom: 30rpx;
	}
	.icon{
		width: 150rpx;
		margin: 0 auto;
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
		image{
			width: 120rpx;
			height: 120rpx;
			border-radius: 50%;
		}
		.cam{
			position: absolute;
			right: 10rpx;
			bottom: 0;
			width: 40rpx;
			height: 40rpx;
		}
	}
	.white-con {
		margin: 0 26rpx 38rpx;
		padding: 25rpx 30rpx;
		box-shadow: 0px 0px 60px 0px rgba(44, 161, 234, 0.5);
		background-color: #fff;
	}
	.basic-info {
		margin-top: 115rpx;
		.inp-con {
			padding: 24rpx 0;
			border-bottom: 1px solid #DBDBDB;
			position: relative;
			text {
				display: inline-block;
				vertical-align: middle;
				font-size: 30rpx;
			}
			input {
				margin-left: 30rpx;
				display: inline-block;
				vertical-align: middle;
				font-size: 24rpx;
				
			}
			
		}
	}
	.prove {
		.prove-list {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			align-items: center;
			.prove-item {
				width: 45%;
				margin: 0 13rpx;
				image {
					width: 300rpx;
					height: 200rpx;
				}
			}
		}
	}
	.identify {
		.identify-img {
			margin-top: 44rpx;
			text-align: center;
			image {
				width: 212rpx;
				height: 212rpx;
			}
		}
	}
	.btn-con {
		margin-top: 57rpx;
		margin-bottom: 157rpx;
		text-align: center;
		span {
			display: inline-block;
			padding: 17rpx 97rpx;
			background: linear-gradient(90deg, #4DB2F1, #2CA0EA);
			box-shadow: 0 0 60rpx 0x rgba(44, 161, 234, 0.5);
			border-radius: 50rpx;
			font-size: 30rpx;
			color: #fff;
		}
	}
}
</style>
