import Vue from 'vue'
import App from './App'

import store from './store'

import pluginUnit from './common/plugInUnit.js'
import API from './common/api.js'
import rgbaster from './common/rgbaster.min.js'

Vue.use(pluginUnit)
Vue.use(API)

Vue.config.productionTip = false

Vue.prototype.$rgbaster = rgbaster
Vue.prototype.$store = store
Vue.prototype.$backgroundAudioData = {
	playing: false,
	playTime: 0,
	formatedPlayTime: '00:00:00'
}
Vue.prototype.$adpid = "1111111111"

App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
app.$mount()
