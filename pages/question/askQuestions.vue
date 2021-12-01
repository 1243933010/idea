<template>
	<view>
		<view class="form">
			<view class="title">
				<input type="text" v-model="obj.problem_name" placeholder="请输入提问标题" />
			</view>
			<view class="con">
				<textarea v-model="obj.problem_desc" placeholder="问题详情:" />
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				obj:{
					problem_name:'',
					problem_desc:''
				},
				cat_id:''
			};
		},
		onLoad(e) {
			this.cat_id = e.cat_id;
		},
		async onNavigationBarButtonTap() {
			if(this.obj.problem_name===''||this.obj.problem_desc===''){
				this.$toast('内容或标题不能为空');
				return false;
			}
			this.obj.cat_id = this.cat_id;
			let data = await this.$request('/api/v1/add_Wholesale',this.obj);
			console.log(data);
			if(data.data.status==='success'){
				setTimeout(()=>{
					uni.navigateBack({
						delta:2
					})
				},500)
			}
			this.$toast(data.data.message);
		},
		methods:{
			
		}
	}
</script>

<style lang="scss" scoped>
	.form{
		width: 100%;
		border-top: 1px solid #D9D9D9;
		.title{
			width: 90%;
			margin: 0 auto;
			border-bottom: 1px solid #D9D9D9;
			input{
				color: #999999;
				font-size: 30rpx;
				padding: 15rpx 0;
			}
		}
		.con{
			box-sizing: border-box;
			width: 90%;
			margin: 20rpx auto;
			textarea{
				color: #999999;
				font-size: 26rpx;
			}
		}
	}
</style>
