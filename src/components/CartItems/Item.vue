<template>
    <div class="flex flex-wrap">
        <div class="rounded-lg flex w-full gap-1">
            <Image :src="item.imageUrl" alt="Image" width="150" />
            <div class="w-3/4 ml-4">
                <div class="text-base font-normal">{{ item.productVariationSize?.productVariation?.product?.name }}</div>
                <div class="text-l font-medium">{{ item.productVariationSize?.productVariation?.product?.brand?.name
                }}</div>
                <div class="text-sm font-light">Màu: {{ item.color.value }}</div>
                <div class="text-sm font-light">Kích cỡ: {{ item.productVariationSize?.size?.value }}</div>
            </div>
            <div class="flex flex-col justify-between">
                <div class="text-l font-medium text-end">${{ priceInVND }}</div>
                <div class="flex justify-center mt-2">
                    <Dropdown v-model="item.quantity" :options="limitedQuantity"
                        @update:modelValue="updateQuantity" />
                </div>
                <div class="text-sm text-end cursor-pointer" @click="removeItemFromCart(item.cartItemId!)">Loại bỏ</div>
            </div>
        </div>
    </div>
    <div class="border-item"></div>
</template>

<script setup lang="ts">
import Image from 'primevue/image';
import { useCartStore } from "@/store";
import { CartItemType } from "@/types/cartItem";
import Dropdown from 'primevue/dropdown';
import { computed } from 'vue';

export interface ItemProps {
    item: CartItemType;
}

const props = defineProps<ItemProps>();
const limitedQuantity = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const { addUpdateToCart, removeItemFromCart } = useCartStore();

const updateQuantity = (newQuantity: number) => {
    addUpdateToCart({
        productVariationSize: props.item.productVariationSize,
        color: props.item.color,
        cartId: '',
        quantity: newQuantity,
        imageUrl: props.item.imageUrl
    })
}

const priceInVND = computed(() => {
    const usdPrice = props.item.price;
    const exchangeRate = 24000; // Tỷ giá: 1 USD = 23000 VND

    if (usdPrice) {
        const vndPrice = usdPrice * exchangeRate;
        return vndPrice.toLocaleString('en-US'); // Định dạng số với dấu phẩy
    }

    return null;
});
</script>