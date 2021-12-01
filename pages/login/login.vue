<template>
	<view>
		<view class="logo">
			<image src="../../static/login/xf.png" mode="widthFix"></image>
		</view>
		<view class="form">
			<view class="inp">
				<image src="../../static/login/user.png" mode="widthFix"></image>
				<input type="text" v-model="obj.account" placeholder="输入账号" />
			</view>
			<view class="inp">
				<image src="../../static/login/pwd.png" mode="widthFix"></image>
				<input type="text" v-model="obj.password" placeholder="输入密码" />
			</view>
			<view class="forget" @click="forget"><text>忘记密码？</text> </view>
			<view class="forget"><text>温馨提示：未注册的账号,登录时且代表您已同意<text @click="yinsi"
						style="color: rgb(45,178,255);">《隐私权政策》</text> </text> </view>
			<!-- <view class="yinsi" @click="yinsi"><text>隐私权政策</text></view> -->
			<view class="button" @click="login">
				<text>登录</text>
			</view>
			<view class="registered" @click="registered">
				<text>注册账号</text>
			</view>
	<!-- 		<view class="hr">
				<view class=""></view>
				<text>第三方登录</text>
				<view class=""></view>
			</view> -->
<!-- 			<view class="icon">
				<image src="../../static/login/qq.png" @click="qqLogin" mode="widthFix"></image>
				<image src="../../static/login/weixin.png" @click="weixinLogin" mode="widthFix"></image>
			</view> -->
		</view>
<!-- 		<uni-popup ref="popup" type="center" :maskClick="false">
			<view class="form">
				<view class="title"><text>服务协议与隐私政策</text></view>
				<view class="con">
					<text>
						1、我们将逐一说明我们收集的您的个人信息类型及其对应的用途，以便您了解我们针对某一特定功能所收集的具体个人信息的类别、使用理由及收集方式。
					</text>
					<text>
						2、当您使用一些功能时，我们会在获得您的同意后，收集您的一些信息，例如您在使用编辑收货地址时功能时我们会收集您的地理位置信息。拒绝提供这些信息仅会使您无法使用相关特定功能，但不影响您正常使用其他功能。
					</text>

					</text>
				</view>
				<view class="read">
					<text>请您阅读完整版的</text><text @click="goXieyi" style="color: rgb(45,178,255);">《服务协议》</text>与<text
						@click="yinsi" style="color: rgb(45,178,255);">《隐私政策》</text>
				</view>
				<view class="btn">
					<view style="color: rgb(45,178,255);" @click="agree">同意</view>
					<view @click="noAgree">不同意</view>
				</view>
			</view>
		</uni-popup> -->
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	export default {
		components: {
			uniPopup
		},
		data() {
			return {
				obj: {
					account: '',
					password: ''
				}
			};
		},
		mounted() {
			let bool = uni.getStorageSync('xieyi');
			if (!bool) {
				this.$refs.popup.open();
				uni.setStorageSync('xieyi', false);
			}

		},
		methods: {
			agree() {
				uni.setStorageSync('xieyi', true);
				this.$refs.popup.close();
			},
			noAgree() {
				uni.setStorageSync('xieyi', false);
				this.$refs.popup.close();
				uni.getSystemInfo({
						success: function(res) {
							// 判断为安卓的手机       
							if (res.platform == 'android') {
								// 安卓退出app   
								plus.runtime.quit();
							} else {
								// 判断为ios的手机，退出App 
								plus.ios.import("UIApplication").sharedApplication().performSelector("exit");
							}
							}
						})
						},
						async login() {
							if (!this.obj.account) {
								this.$toast('请输入账号');
								return false;
							}
							if (!this.obj.password) {
								this.$toast('请输入密码');
								return false;
							}
							let res = await this.$request('/api/v1/Login', this.obj);
							console.log(res);
							this.$toast(res.data.message);
							if (res.data.status === 'success') {
								// console.log(res,'1111111')
								// console.log(res.data.data)
								uni.setStorageSync('token', res.data.data.token);
								uni.setStorageSync('userInfo', res.data.data.user);
								setTimeout(() => {
									uni.reLaunch({
										url: '../index/index'
									})
								}, 500)
							}
						},
						registered() {
							uni.navigateTo({
								url: './registered'
							})
						},
						forget() {
							uni.navigateTo({
								url: './forget'
							})
						},
						qqLogin() {
							this.$toast('暂未开放');
						},
						weixinLogin() {
							this.$toast('暂未开放');
						},
						goXieyi() {
							uni.navigateTo({
								url: './xieyi'
							})
						},
						yinsi() {
							uni.navigateTo({
								url: './yinsi'
							})
						},
					}
				}
</script>

<style lang="scss">
	.form {
		background: white;
		box-sizing: border-box;
		padding: 20rpx;
		border-radius: 20rpx;
		font-size: 28rpx;

		.title {
			display: flex;
			justify-content: center;
			align-items: center;
			margin-bottom: 20rpx;
		}

		.con {
			display: flex;
			flex-direction: column;

			text {
				margin-bottom: 15rpx;
			}
		}

		.read {
			margin-bottom: 25rpx;
		}

		.btn {
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 35rpx;
			font-weight: 600;

			view {
				width: 50%;
				text-align: center;
			}
		}
	}

	page {
		width: 100%;
		height: 100%;
		background: url(../../static/login/login_bk.png) no-repeat;
		background-size: 100% 100%;

	}

	.logo {
		width: 100%;
		height: 500rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-bottom: 120rpx;

		image {
			width: 230rpx;
		}
	}

	.form {
		width: calc(100% - 152rpx);
		margin: 0 auto;

		.inp {
			width: 100%;
			display: flex;
			flex-direction: row;
			align-items: center;
			margin-bottom: 50rpx;
			border-bottom: 1px solid #999999;
			padding: 24rpx 0;

			image {
				width: 40rpx;
				margin-right: 18rpx;
			}

			input {
				font-size: 26rpx;
				color: #999999;
			}
		}

		.forget {
			width: 100%;
			font-size: 24rpx;
			margin-bottom: 15rpx;
			text-align: left;
			color: #999999;
		}

		.yinsi {
			width: 100%;
			font-size: 24rpx;
			margin-bottom: 65rpx;
			text-align: left;
			color: #999999;
		}

		.button {
			width: 100%;
			height: 88rpx;
			background: linear-gradient(0deg, #19A8FF, #46B9FF);
			border-radius: 44rpx;
			margin-bottom: 35rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			color: white;
			font-size: 28rpx;
		}

		.registered {
			color: #2BAFFF;
			font-size: 26rpx;
			margin-bottom: 49rpx;
			text-align: center;
		}

		.hr {
			display: flex;
			// flex-direction: row;
			align-items: center;
			justify-content: space-between;
			margin-bottom: 44rpx;

			view {
				width: 35%;
				height: 1px;
				background: #999999;
			}

			text {
				color: #7D7D7D;
				font-size: 24rpx;
			}
		}

		.icon {
			width: 50%;
			margin: 0 auto;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-bottom: 150rpx;

			image {
				width: 100rpx;
			}
		}
	}
</style>
