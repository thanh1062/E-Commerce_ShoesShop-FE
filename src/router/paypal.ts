import Layout from '@/layout/CustomerLayout.vue';

export const paypal = {
  path: "/payment/paypal",
  component: Layout,
  children: [
    {
      path: "cancel",
      name: "Payment",
      component: () => import("@/views/Paypal/Cancel.vue"),
    },
    {
      path: "success",
      name: "Payment",
      component: () => import("@/views/Paypal/Success.vue"),
    }
  ],
};
