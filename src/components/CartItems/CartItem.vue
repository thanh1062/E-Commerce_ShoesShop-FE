<template>
    <div class="flex flex-col items-center justify-center" v-if="cartItems.length! <= 0">
        <Image :src="EmptyCartLogo" alt="Image" width="400" />
        <p>Không có sản phảm nào trong giỏ hàng</p>
    </div>
    <div v-else class="w-full h-5/6 mt-2">
        <Item v-for="item in cartItems" :key="item.cartItemId" :item="item"/>
    </div>
</template>

<script setup lang="ts">
import Image from 'primevue/image';
import { CartType } from '@/types/cart';
import EmptyCartLogo from "@/assets/images/empty_cart.png";
import { CartItemType } from '@/types/cartItem';
import Item from "@/components/CartItems/Item.vue";

export interface CartItemProps {
    cart?: CartType;
    cartItems: CartItemType[];
}

const props = defineProps<CartItemProps>();

</script>
