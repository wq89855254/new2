import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// 全局引入自定义指令
import './directives';

// 引入leaflet样式
import "leaflet/dist/leaflet.css";

// leaflet > marker集群样式
import "./assets/js/leaflet-markercluster/MarkerCluster.css";
import "./assets/js/leaflet-markercluster/MarkerCluster.Default.css";

import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
Vue.use(Antd);


Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
  mounted: function() {
    var vm = this;
    window.addEventListener('keyup', function(event) {
      vm.$root.$emit('keyupEvent', event);
    });
  }
}).$mount("#app");
