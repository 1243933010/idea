<template>
	<view class="settleln-attest-con">
		<!-- <image class="bg" src="../../../../../static/question/renzheng_bk.png" mode="widthFix"></image> -->
		<view class="navtab">
			<view class=""><image @click="back" src="../../../../../static/question/w_left_arrow.png" mode="widthFix"></image></view>
			<view class="a" v-if="index==='0'"><text>合作服务</text></view>
			<view class="a" v-if="index==='1'"><text>合作需求</text></view>
			<view class=""></view>
		</view>
		<view class="basic-info white-con">
			<view class="tit" v-if="index==='0'">服务内容</view>
			<view class="tit" v-if="index==='1'">需求内容</view>
			<view class="inp-con user-name">
				<text>姓名:</text>
				<input type="text" v-model="name" placeholder="请输入您的姓名"/>
			</view>
			<view class="inp-con user-card">
				<text>身份证:</text>
				<input type="text" v-model="sfz" placeholder="请输入您的身份证" />
			</view>
			<view class="inp-con user-card">
				<text>联系方式:</text>
				<input type="text" v-model="tel" placeholder="请输入您的电话"/>
			</view>
			<view class="inp-con user-desc">
				<text>
					<text v-if="index==='0'">服务内容</text>
					  <text v-if="index==='1'">需求内容</text>
					<text style="color: #B3B3B3;font-size: 24rpx;margin-left: 10rpx;">(字数200以内)</text>
				</text>
				<textarea v-model="text" placeholder="请输入您的说明" style="padding: 20rpx;font-size: 24rpx;"/>
			</view>
			<view class="img">
				<view class="img-title">
					<text>添加图片/视频</text>
				</view>
				<view class="img-con">
					<image v-for="(item,index) in imgList" :src="item.url_all" mode="widthFix"></image>
					 <picker @change="bindPickerChange" :value="num" :range="array">
					     <image src="../../../../../static/question/pic-frame.png" mode="widthFix"></image>
					</picker>
					
				</view>
			</view>
			<view class="bottom">
				<text>#{{cat_name}}</text>
			</view>
		</view>
		
		
		<!-- <view class="Text"><text>收到需求后一周之内会联系您，请耐心等候！</text></view> -->
		<view class="btn-con" @click="submit">
			<span>提交申请</span>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name:'',
				sfz:'',
				tel:'',
				text:'',
				index:0,
				cat_id:'',
				imgList:[],
				array: ['图片'],
				num:0
			}
		},
		onLoad(e) {
			console.log(e)
			this.index = e.index;
			this.cat_id = e.cat_id;
			this.cat_name = e.cat_name;
		
		},
		methods: {
			back(){
				uni.navigateBack({
					delta:1
				})
			},
			async submit(){
				if(!this.name){
					this.$toast('名字不能为空');
					return false;
				}
				if(!this.sfz){
					this.$toast('身份证不能为空');
					return false;
				}
				if(this.tel.length!==11){
					this.$toast('号码格式错误');
					return false;
				}
				let type;
				if(this.index==='0'){
					type='1';
				}else{
					type='2';
				}
				let obj = {
					name:this.name,
					i_card:this.sfz,
					phone:this.tel,
					desc:this.text,
					cat_id:this.cat_id,
					url_data:JSON.stringify(this.imgList),
					type
				}
				console.log(JSON.stringify(obj))
				let data = await this.$request('/api/v1/add_service_by_demand',obj);
				console.log(data);
				
				this.$toast(data.data.message);
				if(data.data.status==='success'){
					setTimeout(()=>{
						uni.navigateBack({
							delta:2
						})
					},500)
				}
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
			async chooseVideo(){
				  uni.chooseVideo({
				                count: 1,
				                sourceType: ['camera', 'album'],
				                success:  async(res)=> {
									console.log(res.tempFilePath)
				                    let data = await this.Upload(res.tempFilePaths);
				                    console.log(data);
				                    let str = JSON.parse(data.data);
				                    if(str.status==='success'){
				                    	this.imgList.push({type:2,url:str.data.url_all});
				                    }
				                    this.$toast(str.message);
				                }
				 });
			},
			bindPickerChange(e){
				console.log(e.detail.value)
				if(e.detail.value){
					this.$toast('暂时不支持视频上传');
					return false;
					this.chooseVideo();
					return
				}
				
				this.chooseImg();
			},
			chooseImg(){
				// if(this.imgNum===3){
				// 	this.$toast('只能上传最多3张图片');
				// 	return
				// }
				uni.chooseImage({
					count:1,
					success:async(res)=>{
						console.log(res)
						let data = await this.Upload(res.tempFilePaths[0]);
						console.log(data);
						let str = JSON.parse(data.data);
						if(str.status==='success'){
							this.imgList.push({type:1,url:str.data.url,url_all:str.data.url_all});
						}
						this.$toast(str.message);
						// if(res.tempFiles.length+this.imgNum>3){
						// 	this.$toast('超出最大数量，请重新选择');
						// 	return false;
						// }
						
					}
				})
			},
		}
	}
</script>

<style lang="scss" > 
.bottom{
		width: 100%;
		background: #F1F1F1;
		box-sizing: border-box;
		padding: 18rpx 32rpx;
		color: #0EA5FF;
		font-size: 30rpx;
	}
.img{
		width: 100%;
		margin: 0 auto; 
		.img-title{
			color: #333333;
			font-size: 32rpx;
			margin-bottom: 61rpx;
			
		}
		.img-con{
			margin-bottom: 73rpx;
			display: flex;
			// justify-content: center;
			flex-wrap: wrap;
			align-items: center;
			image{
				width: 180rpx;
				height: 180rpx;
				margin-right: 20rpx;
				margin-bottom: 20rpx;
			}
		}
	}
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
	// padding-bottom: 62rpx;
	.bg {
		// position: absolute;
		// left: 0;
		// top: -276rpx;
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
	.white-con {
		margin: 0 26rpx 38rpx;
		padding: 25rpx 30rpx;
		box-shadow: 0px 0px 60px 0px rgba(44, 161, 234, 0.5);
		background-color: #fff;
	}
	.basic-info {
		margin-top: 215rpx;
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
				margin-left: 20rpx;
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
			.prove-item {
				width: calc(33.33% - 12.5px);
				margin: 0 13rpx;
				image {
					width: 100%;
					height: 100%;
				}
			}
		}
	}
	.identify {
		.identify-img {
			margin-top: 44rpx;
			text-align: center;
			image {
				width: 30%;
			}
		}
	}
	.btn-con {
		margin-top: 57rpx;
		text-align: center;
		padding-bottom: 100rpx;
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
.Text{
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	color: #2DA0EA;
	font-size: 24rpx;
}
</style>
