import Layout from "@/layout/CustomerLayout.vue";

export const checkout = {
  path: "/checkout",
  component: Layout,
  children: [
    {
      path: "address",
      name: "AddressInformation",
      component: () => import("@/views/Checkout/AddressInformation.vue"),
      meta: {
        requiresGuest: true,
      },
    },
    {
      path: "payment",
      name: "PaymentInformation",
      component: () => import("@/views/Checkout/PaymentInformation.vue"),
      meta: {
        requiresGuest: true,
      },
    },
  ],
};
