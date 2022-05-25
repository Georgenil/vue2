import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import "./styles/export.css";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import VueResource from "vue-resource";
import money from 'v-money';

Vue.config.productionTip = false;

Vue.use(money, {precision: 4})
Vue.use(VueResource);

const options = {
  transition: "Vue-Toastification__bounce",
  maxToasts: 20,
  newestOnTop: true,
  position: "top-right",
  timeout: 5000,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: true,
  hideProgressBar: false,
  icon: true,
};

Vue.use(Toast, options);

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
