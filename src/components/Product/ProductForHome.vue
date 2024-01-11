<template>
    <Card class="product">
        <template #header>
            <div @click="gotoProductDetail"
                class="  hover:scale-105 transition-transform ease-in-outtransition-transform duration-300 ease-in-out">
                <Image :src="primaryImage?.imageUrl" alt="Image" />
            </div>
        </template>
        <template #title>{{ product?.product?.brand?.name }}</template>
        <template #subtitle>
            <div @click="gotoProductDetail">
                {{ product?.product?.name }}
            </div>
        </template>
        <template #content>{{ priceInVND }} VND</template>
        <template #footer>

        </template>
    </Card>
</template>

<script setup lang="ts">
import Image from 'primevue/image';
import { computed } from 'vue';
import Card from 'primevue/card';
import { useRouter } from 'vue-router';
import { ProductVariationType } from '@/types/productVariation';

export interface ProductProps {
    product?: ProductVariationType;
}

const router = useRouter();
const props = defineProps<ProductProps>();

const primaryImage = computed(() => props.product?.productImages?.find(productImage => productImage.isPrimary));

const gotoProductDetail = () => {
    router.push({ name: "Product", params: { productId: props.product?.productVariationId } });
}

const priceInVND = computed(() => {
    const usdPrice = props.product?.product?.price;
    const exchangeRate = 24000; // Tỷ giá: 1 USD = 23000 VND

    if (usdPrice) {
        const vndPrice = usdPrice * exchangeRate;
        return vndPrice.toLocaleString('en-US'); // Định dạng số với dấu phẩy
    }

    return null;
});

</script>