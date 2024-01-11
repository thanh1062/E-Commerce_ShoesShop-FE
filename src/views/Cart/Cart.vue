<template>
    <div class="flex flex-col lg:flex-row gap-6">
        <div class="w-full lg:w-8/12">
            <div class="bg-gray-100 flex justify-between text-black font-semibold p-2">
                <div>{{ $t('item') }}</div>
                <div>{{ $t('price') }} / {{ $t('quantity') }}</div>
            </div>
            <CartItem :cart="getCart" :cartItems="getCartItems" />
        </div>
        <div class="lg:w-4/12 flex flex-col justify-between">
            <div class="mb-4 bg-gray-100">
                <div class="px-4 py-2 justify-items-center">
                    <div class="flex justify-between">
                        <div class="font-light text-lg">{{ $t('cart-summary') }}</div>
                    </div>
                    <div class="border-b border-gray-300 my-2"></div>
                    <div class="flex justify-between">
                        <div class="font-light text-lg">{{ $t('subtotal') }}</div>
                        <div class="font-semibold">${{ (getCart.itemSubtotalPrice! * 24000).toLocaleString('en-US') }}</div>
                    </div>
                </div>
            </div>
            <div v-if="getCart.itemTotalQuantity! > 0">
                <button @click="goToCheckout" class="btn-color-medium text-white font-semibold py-2 rounded w-full"
                    type="submit">
                    {{ $t('Proceed-to-checkout') }}
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Button from 'primevue/button';
import { useRouter } from 'vue-router';
import CartItem from '@/components/CartItems/CartItem.vue'
import { translate } from '@/i18n';
import { useCartStore } from '@/store';
import { onMounted } from 'vue';

const router = useRouter();
const $t = translate;
const { getCart, getCartItems, fetchCart, hideSidebarCart } = useCartStore();

function goToCheckout() {
    router.push('/checkout/address');
}

onMounted(() => {
    fetchCart();
    hideSidebarCart();
});
</script>


