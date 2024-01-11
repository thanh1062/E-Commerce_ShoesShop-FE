<template>
  <div class="flex h-screen bg-gray-200">
    <AdminSidebar />

    <div class="flex-1 flex flex-col overflow-hidden">
      <AdminHeader />

      <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
        <div class="container mx-auto px-6 py-8">
          <router-view />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import AdminSidebar from '@/components/Layout/AdminSidebar.vue';
import AdminHeader from '@/components/Layout/AdminHeader.vue';
</script>
