import Vue from 'vue'
import App from './App.vue'
//引入Vue-router
import VueRouter from "vue-router";
//引入路由器
import router from "@/router";

Vue.config.productionTip = false
//应用路由器
Vue.use(VueRouter)

new Vue({
  render: h => h(App),
  router, //配置路由器
}).$mount('#app')