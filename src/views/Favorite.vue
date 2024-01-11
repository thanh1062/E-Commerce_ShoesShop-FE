<template>
    <div class="favorite">
        <h1>Your Wishlist</h1>
    
      
            
        </div>
          
        
      </div>
</template>

<script setup lang="ts">

import { CartType } from '@/types/cart';

import { CartItemType } from '@/types/cartItem';

export interface CartItemProps {
    cart?: CartType;
    cartItems: CartItemType[];
}

const props = defineProps<CartItemProps>();



</script>