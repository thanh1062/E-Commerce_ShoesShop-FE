import Layout from '@/layout/CustomerLayout.vue';

export const favorite = {
    path: '/favorite',
    component: Layout,
    children: [
        {
            path: 'favorite',
            name: "favorite",
            component: () => import("@/views/Favorite.vue"),
        }
       
    ]
}