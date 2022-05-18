import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import "./styles/export.css";
import Toast from "vue-toastification";

Vue.config.productionTip = false;

Vue.use(Toast, {
  transition: "Vue-Toastification__bounce",
  maxToasts: 20,
  newestOnTop: true,
});

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
