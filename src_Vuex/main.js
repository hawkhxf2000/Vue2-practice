import Vue from 'vue'
import App from './App.vue'
import store from "@/store";  //此处不能使用首字母大写，必须小写，否则无法挂载，可能跟Vue配置项中默认小写有关

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store,
  beforeCreate() {
    console.log(this)
    Vue.prototype.$bus = this  //安装全局事件总线
  }
}).$mount('#app')