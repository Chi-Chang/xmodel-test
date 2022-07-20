import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from '@/plugins/vuetify' // path to vuetify export
import api from "@/API/Index.js"

Vue.prototype.$api = api;
Vue.config.productionTip = false

import threejs_functions from "@/mixins/three"
Vue.mixin(threejs_functions);
import system_functions from "@/mixins/system"
Vue.mixin(system_functions);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
