import Vue from "vue";
import VueRouter from "vue-router";
//import store from "@/store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Orders",
    component: () => import("@/views/Orders.vue")
  },
  {
    path: "/:id",
    name: "Detail",
    component: () => import("@/views/Detail.vue")
  }
];



const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

// router.beforeEach((to, from, next) => {
//   if (store.state.orders === null) {    
//     store.dispatch("getOrders");
//     next();
//   }else{
//     next();
//   }
// })

export default router;
