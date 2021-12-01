<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			uni.getSystemInfo({
				success: (res) => {
					if(res.statusBarHeight){
						this.$store.commit('setStatusBarHeight',res.statusBarHeight);
					}
				}
			})
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		globalData:{
			searchText:''
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
