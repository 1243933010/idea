<template>
	<view>
		<view class="bk">
			<view class="logo">
				<image @click="checkImg" :src="userInfo.user_photo?userInfo.user_photo:'../../static/mine/headimg.jpg'" mode=""></image>
			</view>
		</view>

		<view class="form">
			<view class="inp">
				<view class="inp-text"><text>昵称</text></view>
				<view class="inp-con"><input type="text" v-model="userInfo.alias" /></view>
			</view>
			<view class="inp">
				<view class="inp-text"><text>性别</text></view>
				<view class="inp-switch">
					<view class="" :class="[userInfo.sex===0?'active':'']" @click="choose(0)"><text>男</text></view>
					<view class="" :class="[userInfo.sex===1?'active':'']" @click="choose(1)"><text>女</text></view>
				</view>
			</view>
			<view class="inp">
				<view class="inp-text"><text>年龄</text></view>
				<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
					<view class="inp-con"><input disabled type="text" v-model="userInfo.birthday" /></view>
				</picker>


			</view>
			<view class="inp">
				<view class="inp-text"><text>个人简介</text></view>
				<view class="inp-con"><input type="text" v-model="userInfo.remark" /></view>
			</view>
			<view class="inp">
				<view class="inp-text"><text>身份认证</text></view>
				<!-- <view class="inp-con"><input type="text" v-model="userInfo.remark" /></view> -->
				<text class="inp-con" v-if="userInfo.users_identity.check_status==0" @click="renzheng">去认证</text>
				<text class="inp-con" v-if="userInfo.users_identity.check_status!==0">{{userInfo.users_identity.check_status_text}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import LbPicker from '@/components/lb-picker'
	export default {
		components: {
			LbPicker
		},
		data() {
			 const currentDate = this.getDate({
			            format: true
			        })
			return {
				userInfo: {
					users_identity: {
						check_status: null
					}
				},
				ind: null,
				img: '',
				url: '',
				date: currentDate,
			}
		},
		  computed: {
		        startDate() {
		            return this.getDate('start');
		        },
		        endDate() {
		            return this.getDate('end');
		        }
		    },
		async onNavigationBarButtonTap() {
			this.userInfo.sex = this.ind;
			let obj = JSON.parse(JSON.stringify(this.userInfo));
			console.log(obj)
			obj.user_photo = this.img
			if (!this.img) {
				delete obj.user_photo;
			}
			let data = await this.$request('/api/v1/updateUsers', obj);
			console.log(data);
			if (data.data.status === 'success') {
				this.$toast(data.data.message);
				this.getUserInfo();
			}
		},
		mounted() {
			this.userInfo = uni.getStorageSync('userInfo');
			console.log(this.userInfo)
			this.ind = this.userInfo.sex;
			// this.img = this.userInfo.user_photo;
			console.log(this.userInfo)
		},
		methods: {
			async getUserInfo() {
				let obj = {
					token: uni.getStorageSync('token')
				}
				let data = await this.$request('/api/v1/getUsersInfo', obj, 'GET');
				console.log(data)
				if (data.data.status === 'success') {
					uni.setStorageSync('userInfo', data.data.data);
					this.obj = data.data.data;
				}
			},
			choose(index) {
				this.ind = index;
				this.userInfo.sex = index;
				console.log(index)
			},

			async checkImg() {
				uni.chooseImage({
					count: 1,
					success: async (res) => {
						console.log(res)
						let data = await this.Upload(res.tempFilePaths[0]);
						console.log(data);
						let str = JSON.parse(data.data);
						if (str.status === 'success') {
							this.img = str.data.url;
							this.userInfo.user_photo = str.data.url_all;
						}
						this.$toast(str.message);
						// if(res.tempFiles.length+this.imgNum>3){
						// 	this.$toast('超出最大数量，请重新选择');
						// 	return false;
						// }

					}
				})
			},
			async Upload(url) {
				return new Promise((resolve, reject) => {
					uni.uploadFile({
						url: 'http://tp_api_xiangfa.demo.insist8.com/api/v1/Ossupload',
						filePath: url,
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
			renzheng() {
				uni.navigateTo({
					url: './Authentication/Authentication'
				})
			},
			  bindDateChange: function(e) {
				  console.log(e.target.value)
			            this.userInfo.birthday = e.target.value
			   },
			        getDate(type) {
			            const date = new Date();
			            let year = date.getFullYear();
			            let month = date.getMonth() + 1;
			            let day = date.getDate();
			
			            if (type === 'start') {
			                year = year - 60;
			            } else if (type === 'end') {
			                year = year + 2;
			            }
			            month = month > 9 ? month : '0' + month;;
			            day = day > 9 ? day : '0' + day;
			            return `${year}-${month}-${day}`;
			        }
		}
	}
</script>

<style scoped lang="scss">
	.active {
		background: #4EBEFF !important;
		color: white !important;
	}

	.bk {
		background: #14A7FF;
		width: 100%;
		height: 300rpx;

		.logo {
			width: 100%;
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;

			image {
				width: 111rpx;
				height: 111rpx;
				border-radius: 50%;
			}
		}
	}

	.form {
		width: calc(100% - 56rpx);
		margin: 0 auto;

		.inp {
			width: 100%;
			border-bottom: 1px solid #EBEBEB;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 38rpx 0;

			.inp-text {
				font-size: 30rpx;
				color: #252525;
			}

			.inp-con {
				color: #999999;
				font-size: 30rpx;
				// display: flex;
				// flex-direction: row;
				// // align-self: flex-end;
				// align-items: flex-end;
				text-align: right;
			}

			.inp-switch {
				display: flex;
				flex-direction: row;
				align-items: center;
				border: 2px solid #4EBEFF;
				border-radius: 8rpx;

				view {
					width: 64rpx;
					height: 40rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					font-size: 24rpx;
					color: #4EBEFF;
				}
			}
		}
	}
</style>
