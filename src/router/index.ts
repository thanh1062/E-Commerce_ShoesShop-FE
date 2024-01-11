import {
  createRouter,
  createWebHistory,
  type Router,
  type RouteRecordRaw,
} from "vue-router";

// Routes
import { product } from "./product";
import { home } from "./home";
import { cart } from "./cart";
import { checkout } from "./checkout";
import { account } from "./account";
import { admin } from "./admin";
import { myaccount } from "./myaccount";
import { favorite } from "./favorite";
import { paypal } from "./paypal";

const routes: Array<RouteRecordRaw> = [home, product, account, cart, checkout, admin, myaccount, favorite, paypal];

const router: Router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0, left: 0 };
  },
});


export default router;
