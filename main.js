import Vue from 'vue'
import App from './App'
import {$request,$toast,$seeDetail} from './util/fn.js'
Vue.config.productionTip = false
import store from './store'

Vue.prototype.$store = store
App.mpType = 'app'
Vue.prototype.$request = $request;
Vue.prototype.$toast = $toast;
Vue.prototype.$seeDetail = $seeDetail;
const app = new Vue({
	store,
    ...App
})
app.$mount()
