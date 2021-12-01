<template>
	<view>
		<view class="title">
			<view class="inp">
				<input type="text" v-model="goods_name" placeholder="请输入标题" />
			</view>
		</view>
		<view class="texa">
			<textarea v-model="goods_desc" placeholder="正文：" />
		</view>
		<view class="hr"></view>

		<view class="img">
			<view class="img-title">
				<text>添加图片/视频</text>
			</view>
			<view class="img-con">
				<htz-image-upload  
				:max="3" 
				mediaType='all' 
				v-model="ceshiData" 
				:uploadSuccess="zidingyiSuccess" 
				action="http://api.xiangfaguanwang.com/api/v1/Ossupload"
				:compress="true"
				:quality="60"
				@uploadFail="uploadFail"
				@getTypeFile="getTypeFile"></htz-image-upload>
			<!-- 	<image v-for="(item,index) in imgList" :src="item.url_all" mode="widthFix"></image>
				<picker @change="bindPickerChange" :value="index" :range="array">
					<image src="../../../static/question/pic-frame.png" mode="widthFix"></image>
				</picker> -->

			</view>
		</view>
		<view class="bottom">
			<text>#{{cat_name}}</text>
		</view>
		<view class="other">
			<text class="left">@谁可以看</text>
			<text class="right" @click="chooseIs_alone_sale">
				<text v-if="is_alone_sale===1">公开</text>
				<text v-if="is_alone_sale===2">私有</text>
			</text>
		</view>
		
		
	</view>
</template>

<script>
	import htzImageUpload from '@/components/htz-image-upload/htz-image-upload.vue'
	export default {
		components: {
		            htzImageUpload,
		        },
		data() {
			return {
				cat_id: '',
				cat_name: '',
				array: ['图片', '视频'],
				index: 0,
				imgNum: 0,
				videoNum: 0,
				goods_name: '',
				goods_desc: '',
				is_alone_sale: 1,
				imgList: [],
				ceshiData: [],
				uploadType:1
			};
		},
		onLoad(e) {
			console.log(e.cat_id);
			this.cat_id = e.cat_id;
			this.cat_name = e.cat_name;
		},
		async onNavigationBarButtonTap() {
			let obj = {
				cat_id: this.cat_id,
				goods_name: this.goods_name,
				goods_desc: this.goods_desc,
				url_data: JSON.stringify(this.imgList),
				is_alone_sale: this.is_alone_sale.toString()
			}
			let data = await this.$request('/api/v1/add_Article', obj);
			console.log(data);
			if (data.data.status === 'success') {
				this.goods_name = '';
				this.goods_desc = '';
				this.ceshiData = [];
				this.imgList = [];
			}
			this.$toast(data.data.message);
		},
		methods: {
			getTypeFile(num){
				this.uploadType = num;
				console.log(num,'-----')
			},
			zidingyiSuccess(e){
				let data = JSON.parse(e.data);
				this.imgList.push({type:this.uploadType,url:data.data.url_all})
				this.ceshiData.push(data.data.url_all)
				console.log(e,this.ceshiData,this.imgList,'***')
				uni.hideLoading()
			},
			uploadFail(err){
				// console.log(err,'-------------------')
				uni.hideLoading();
				uni.showToast({
					icon:'none',
					title:err.errMsg
				})
			},
			bindPickerChange(e) {
				// console.log(e.detail.value)
				if (e.detail.value) {
					// this.$toast('暂时不支持视频上传');
					// return false;
					this.chooseVideo();
					return
				}

				this.chooseImg();
			},
			chooseImg() {
				// if(this.imgNum===3){
				// 	this.$toast('只能上传最多3张图片');
				// 	return
				// }
				uni.chooseImage({
					count: 1,
					success: async (res) => {
						// console.log(res)
						let data = await this.Upload(res.tempFilePaths[0]);
						// console.log(data);
						let str = JSON.parse(data.data);
						if (str.status === 'success') {
							this.imgList.push({
								type: 1,
								url: str.data.url,
								url_all: str.data.url_all
							});
						}
						this.$toast(str.message);
						// if(res.tempFiles.length+this.imgNum>3){
						// 	this.$toast('超出最大数量，请重新选择');
						// 	return false;
						// }

					}
				})
			},
			async chooseVideo() {
				uni.chooseVideo({
					count: 1,
					sourceType: ['camera', 'album'],
					success: async (res) => {
						// console.log(res, '---')
				  let data = await this.Upload(res.tempFilePaths, 'video');
						// console.log(data);
						let str = JSON.parse(data.data);
						if (str.status === 'success') {
							this.imgList.push({
								type: 2,
								url: str.data.url_all
							});
						}
						this.$toast(str.message);
					}
				});
			},
			async Upload(url, type) {
				return new Promise((resolve, reject) => {
					uni.uploadFile({
						url: 'http://api.xiangfaguanwang.com/api/v1/Ossupload',
						filePath: url,
						method: "POST",
						fileType:type?'video':'image',
						// header: {
						// 	"Content-Type": "multipart/form-data"
						// },
						file:url,
						name: 'file',
						formData: {},
						success: (uploadFileRes) => {
							// console.log(uploadFileRes);
							resolve(uploadFileRes);

						},
						fail: (error) => {
							reject(error);
						}
					});
				})
			},
			async add_Article() {
				let obj = {
					cat_id: this.cat_id,
					goods_name: this.goods_name,
					goods_desc: this.goods_desc,
					url_data: this.imgList,
					is_alone_sale: this.is_alone_sale
				}
				let data = await this.$request('/api/v1/add_Article', obj);
				console.log(data,data.data.status);
				if (data.data.status === 'success') {
					console.log('*****')
					this.goods_name = '';
					this.goods_desc = '';
					this.imgList = [];
					this.ceshiData = []
				}
				this.$toast(data.data.message);
			},
			chooseIs_alone_sale() {
				console.log('1111')
				this.is_alone_sale === 1 ? this.is_alone_sale = 2 : this.is_alone_sale = 1;
			},
		}
	}
</script>

<style lang="scss" scoped>
	.title {
		width: 100%;
		border-top: 1px solid #D9D9D9;
		margin-bottom: 35rpx;

		.inp {
			width: calc(750rpx - 50rpx);
			margin: 0 auto;
			border-bottom: 1px solid #D9D9D9;

			input {
				color: #999999;
				font-size: 30rpx;
				padding: 22rpx 0;
			}
		}
	}

	.texa {
		width: calc(750rpx - 50rpx);
		height: 531rpx;
		margin: 20rpx auto;

		// background: red;
		textarea {
			width: 100%;
			height: 100%;
			color: #999999;
			font-size: 26rpx;
		}
	}

	.hr {
		width: 100%;
		height: 27rpx;
		background: #F1F1F1;
		margin-bottom: 35rpx;
	}

	.img {
		width: calc(750rpx - 50rpx);
		margin: 0 auto;

		.img-title {
			color: #333333;
			font-size: 32rpx;
			margin-bottom: 61rpx;

		}

		.img-con {
			margin-bottom: 73rpx;
			display: flex;
			// justify-content: center;
			flex-wrap: wrap;
			align-items: center;

			image {
				width: 180rpx;
				height: 180rpx;
				margin-right: 20rpx;
				margin-bottom: 20rpx;
			}
		}
	}

	.bottom {
		width: 100%;
		background: #F1F1F1;
		padding: 18rpx 32rpx;
		color: #0EA5FF;
		font-size: 30rpx;
	}

	.other {
		width: 100%;
		box-sizing: border-box;
		padding: 32rpx 29rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;

		.left {
			color: #4D4D4D;
			font-size: 32rpx;
		}

		.right {
			color: #808080;
			font-size: 22rpx;
			border-radius: 15rpx;
			background: #D9D9D9;
			box-sizing: border-box;
			padding: 2rpx 20rpx;
		}
	}
</style>
