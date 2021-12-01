import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);//vue的插件机制

//Vuex.Store 构造器选项
const store = new Vuex.Store({
    state:{//存放状态
	    statusBarHeight:44,
        userInfo:{}
    },
	mutations:{
		setUserInfo(state,data){
			// console.log(state,data)
			state.userInfo = data;
		},
		setStatusBarHeight(state,data){
			state.statusBarHeight = data;
		}
	}
})
export default store