import Vue from "vue";
import VueRouter from "vue-router";
import ProductsList from "../views/Products/ProductsList.vue";
import ProductRegister from "../views//Products/ProductRegister.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "ProductsList",
    component: ProductsList,
  },
  {
    path: "/productRegister",
    name: "ProductRegister",
    component: ProductRegister,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
