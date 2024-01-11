import Layout from '@/layout/CustomerLayout.vue';
import Home from '@/views/Home/Home.vue';

export const home = {
  path: '/',
  component: Layout,
  children:[
    {
      path: '',
      name:"Home",
      component: Home,
    },
  ]
}
