<template>
	<view>
		<view class="navtab">
			<view class="back" ><image @click="back" src="../../static/question/w_left_arrow.png" mode="widthFix"></image></view>
			<view class="a"><text>注册账号</text></view>
			<view class=""></view>
		</view>
		<view class="form">
			<view class="inp">
				<view class="label">
					<text>用户名</text>
				</view>
				<input type="text" v-model="obj.alias" placeholder="请输入用户名" />
			</view>
			<view class="inp">
				<view class="label">
					<text>账户</text>
				</view>
				<input type="text" v-model="obj.user_name" placeholder="请设置账户" />
			</view>
			<view class="inp">
				<view class="label">
					<text>设置密码</text>
				</view>
				<input type="text" v-model="obj.password" placeholder="请输入密码" />
			</view>
			<view class="inp">
				<view class="label">
					<text>确认密码</text>
				</view>
				<input type="text" v-model="obj.confirm" placeholder="请输入确认密码" />
			</view>
			<view class="inp">
				<view class="label">
					<text>邮箱</text>
				</view>
				<input type="text" v-model="obj.email" placeholder="请输入邮箱" />
			</view>
			<view class="yz">
				<view class="label">
					<text>邮箱验证码</text>
				</view>
				<view class="send">
					<input type="text" v-model="obj.email_code" placeholder="请输入验证码" />
					<view class="" @click="send"><text>{{emailText}}</text></view>
				</view>
			</view>
			<view class="btn" @click="registered">
				<text>确认注册</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				obj:{
					alias:'',
					user_name:'',
					password:'',
					confirm:'',
					email:'',
					email_code:''
				},
				time:6,
				emailText:"发送验证码",
				timeFnc:null,
				timeFlog:true
			};
		},
		onUnload() {
			clearInterval(this.timeFnc)
			this.timeFnc = null;
		},
		methods:{
			back(){
				uni.navigateBack({
					delta:1
				})
			},
			async registered(){
				if(this.obj.password!==this.obj.confirm){
					this.$toast('两次密码不一致');
					return false;
				}
				let data = await this.$request('/api/v1/Register',this.obj);
				if(data.data.status==='success'){
					this.$toast('已注册成功,可以返回登录');
					setTimeout(()=>{
						uni.navigateBack({
							delta:1
						})
					},500)
					return false;
				}
				this.$toast(data.data.message);
				console.log(data);
			},
			async send(){
				let reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
				if(!reg.test(this.obj.email)){
					this.$toast('请输入正确的邮箱格式');
					return false
				}
				
				if(this.timeFlog){
					this.timeFlog = false;
					this.timeFnc = setInterval(()=>{
						if(this.time>1){
							this.time--;
							this.emailText = this.time;
						}else{
							this.timeFlog = true;
							this.emailText = '发送验证码';
							this.time = 6;
							clearInterval(this.timeFnc)
							this.timeFnc = null;
						}
					},1000);
					let obj = {
						email:this.obj.email
					}
					let data = await this.$request('/api/v1/sendSMTEmail',obj,'GET');
					this.$toast(data.data.message);
					console.log(data);
				}
				
			},
			
		}
	}
</script>

<style lang="scss" >
	page{
		width: 100%;
		height: 100%;
		background: #73CAFF;
		background-size: 100% 100%;
		
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
	.form{
		width: calc(100% - 54rpx);
		margin: 20rpx auto;
		background: white;
		border-radius: 10rpx;
		box-sizing: border-box;
		padding: 45rpx 65rpx;
		.inp{
			width: 100%;
			border-bottom: 1px solid #EBEBEB;
			margin-bottom: 20rpx;
			padding: 15rpx 0;
			.label{
				text-align: left;
				color: #333333;
				font-size: 24rpx;
				margin-bottom: 24rpx;
			}
			input{
				font-size: 25rpx;
				color: #333333;
			}
		}
		.yz{
			display: flex;
			flex-direction: column;
			.label{
				text-align: left;
				color: #333333;
				font-size: 24rpx;
				margin-bottom: 24rpx;
			}
			.send{
				display: flex;
				justify-content: space-between;
				align-items: center;
				border-bottom: 1px solid #EBEBEB;
				margin-bottom: 67rpx;
				padding: 15rpx 0;
				input{
					font-size: 25rpx;
					color: #333333;
				}
				view{
					width: 159rpx;
					height: 48rpx;
					background: linear-gradient(0deg, #19A8FF, #46B9FF);
					border-radius: 8rpx;
					font-size: 24rpx;
					color: white;
					display: flex;
					justify-content: center;
					align-items: center;
				}
			}
		}
		.btn{
			width: 100%;
			height: 88rpx;
			background: linear-gradient(0deg, #19A8FF, #46B9FF);
			border-radius: 44rpx;
			font-size: 28rpx;
			color: white;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
</style>
