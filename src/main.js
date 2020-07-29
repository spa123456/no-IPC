import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import elementUi from 'element-ui'
import "element-ui/lib/theme-chalk/index.css"
import ajax from './utils/ajaxMotheds'
import moment from 'moment'
moment.locale('zh-cn');//需要汉化

Vue.config.productionTip = false;
Vue.prototype.ajaxPost = ajax.ajaxPost
Vue.prototype.ajaxAll = ajax.ajaxAll
Vue.prototype.moment = moment
Vue.use(elementUi,{
  // size:'mini'
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
