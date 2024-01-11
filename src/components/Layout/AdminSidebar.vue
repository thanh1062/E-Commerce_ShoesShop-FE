<template>
  <div class="flex">
    <!-- Backdrop -->
    <div :class="isOpen ? 'block' : 'hidden'" @click="isOpen = false"
      class="fixed inset-0 z-20 transition-opacity bg-black opacity-50 lg:hidden"></div>
    <!-- End Backdrop -->

    <div :class="isOpen ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'"
      class="fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto transition duration-300 transform bg-gray-900 lg:translate-x-0 lg:static lg:inset-0">
      <div class="flex items-center justify-center mt-8">
        <div class="flex items-center">
          <Image :src="Logo" alt="Logo" width="150" />
          <span class="mx-2 text-2xl font-semibold text-white">ATDashboard</span>
        </div>
      </div>

      <nav class="mt-10">
        <button @click="toggleDropdown" class="flex items-center px-6 py-2 mt-4 duration-200 border-l-4 w-full"
          :class="[route.name === 'Dashboard' ? activeClass : inactiveClass]">
          <i class="pi pi-box" style="font-size: 2rem"></i>
          <span class="mx-4">Sản Phẩm</span>
          <i class="pi pi-chevron-down ml-auto"></i>
        </button>
        <div v-if="open" @click.away="closeDropdown"
          class="right-0 mt-2 py-2 bg-gray-900 rounded-md shadow-xl w-full transition-opacity ease-out duration-300"
          :class="{ 'opacity-100': open, 'opacity-0': !open }">
          <router-link class="block px-4 py-2 text-gray-500 "
            :class="[route.name === 'Products' ? activeClass : inactiveClass]" :to="{ name: 'ProductsAdmin' }">
            <span class="mx-4">Sản phẩm</span>
          </router-link>
          <router-link class="block px-4 py-2 text-gray-500 "
            :class="[route.name === 'ProductsVariation' ? activeClass : inactiveClass]"
            :to="{ name: 'ProductsVariation' }">
            <span class="mx-4">Màu sản phẩm</span>
          </router-link>
          <router-link class="block px-4 py-2 text-gray-500 pr-0"
            :class="[route.name === 'ProductsVariationSize' ? activeClass : inactiveClass]"
            :to="{ name: 'ProductsVariationSize' }">
            <span class="mx-4 ">Kích cở sản phẩm</span>
          </router-link>
          <router-link class="block px-4 py-2 text-gray-500 "
            :class="[route.name === 'ProductsImage' ? activeClass : inactiveClass]" :to="{ name: 'ProductsImage' }">
            <span class="mx-4">Hình sản phẩm</span>
          </router-link>
        </div>

        <router-link class="flex items-center px-6 py-2 mt-4 duration-200 border-l-4"
          :class="[route.name === 'CategoryAdmin' ? activeClass : inactiveClass]" to="/admin/categories">
          <i class="pi pi-sitemap" style="font-size: 2rem"></i>
          <span class="mx-4">Phân loại</span>
        </router-link>

        <router-link class="flex items-center px-6 py-2 mt-4 duration-200 border-l-4"
          :class="[route.name === 'BrandAdmin' ? activeClass : inactiveClass]" to="/admin/brands">
          <i class="pi pi-th-large" style="font-size: 2rem"></i>
          <span class="mx-4">Thương hiệu</span>
        </router-link>

        <router-link class="flex items-center px-6 py-2 mt-4 duration-200 border-l-4"
          :class="[route.name === 'Forms' ? activeClass : inactiveClass]" to="/admin/orders">
          <i class="pi pi-truck" style="font-size: 2rem"></i>
          <span class="mx-4">Đơn hàng</span>
        </router-link>

        <router-link class="flex items-center px-6 py-2 mt-4 duration-200 border-l-4"
          :class="[route.name === 'ReviewAdmin' ? activeClass : inactiveClass]" to="/admin/review">
          <i class="pi pi-chart-bar" style="font-size: 2rem"></i>
          <span class="mx-4">Đánh giá</span>
        </router-link>

        <button @click="toggleDropdownReport" class="flex items-center px-6 py-2 mt-4 duration-200 border-l-4 w-full"
          :class="[route.name === 'Dashboard' ? activeClass : inactiveClass]">
          <i class="pi pi-book" style="font-size: 2rem"></i>
          <span class="mx-4">Thống kế</span>
          <i class="pi pi-chevron-down ml-auto"></i>
        </button>
        <div v-if="openReport" @click.away="closeDropdownReport"
          class="right-0 mt-2 py-2 bg-gray-900 rounded-md shadow-xl w-full transition-opacity ease-out duration-300"
          :class="{ 'opacity-100': openReport, 'opacity-0': !openReport }">
          <router-link class="block px-4 py-2 text-gray-500 "
            :class="[route.name === 'Products' ? activeClass : inactiveClass]" :to="{ name: 'report-revenue' }">
            <span class="mx-4">Thống kê sản phẩm</span>
          </router-link>
          <router-link class="block px-4 py-2 text-gray-500 "
            :class="[route.name === 'ProductsVariation' ? activeClass : inactiveClass]"
            :to="{ name: 'best-selling-brand' }">
            <span class="mx-4">Nhãn hiệu bán chạy</span>
          </router-link>

        </div>

        <router-link v-if="isAdmin" class="flex items-center px-6 py-2 mt-4 duration-200 border-l-4"
          :class="[route.name === 'Blank' ? activeClass : inactiveClass]" to="/admin/accounts">
          <i class="pi pi-users" style="font-size: 2rem"></i>
          <span class="mx-4">Quản lý người dùng</span>
        </router-link>
      </nav>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useSidebar } from '@/hooks/useSidebar';
import { useRoute } from 'vue-router';
import Logo from "@/assets/images/logo.png";
import jwt_decode from "jwt-decode";

const route = useRoute();
const { isOpen } = useSidebar();
const open = ref(false);
const openReport = ref(false);
const activeClass = ref(
  'bg-gray-600 bg-opacity-25 text-gray-100 border-gray-100'
);
const inactiveClass = ref(
  'border-gray-900 text-gray-500 hover:bg-gray-600 hover:bg-opacity-25 hover:text-gray-100'
);

const toggleDropdown = () => {
  open.value = !open.value;
};
const toggleDropdownReport = () => {
  openReport.value = !openReport.value;
};

const closeDropdown = () => {
  open.value = false;
};
const closeDropdownReport = () => {
  openReport.value = false;
};

let isAdmin = ref(false);
const token = localStorage.getItem('token');


const valueToken = jwt_decode(token!);
const roles = valueToken.user.roles;
isAdmin.value = roles.some(role => role.authority === 'ADMIN');
</script>
