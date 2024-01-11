import Layout from '@/layout/CustomerLayout.vue';

export const cart = {
  path: "/cart",
  component: Layout,
  children: [
    {
      path: "",
      name: "Cart",
      component: () => import("@/views/Cart/Cart.vue"),
    },
  ],
};
