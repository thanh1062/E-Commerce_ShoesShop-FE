<script setup lang="ts">
import ATHeader from '@/components/Layout/ATHeader.vue';
import ATFooter from '@/components/Layout/ATFooter.vue';
</script>

<template>
    <div>
        <header>
            <ATHeader />
        </header>
        <main class="content-page">
            <router-view />
        </main>
        <footer>
            <ATFooter />
        </footer>
    </div>
</template>
