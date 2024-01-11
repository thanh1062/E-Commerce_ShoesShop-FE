<template>
  <div class="border shadow rounded p-4">
    <div class="title flex justify-center mb-4 text-3xl font-bold "> XÁC NHẬN ĐƠN HÀNG </div>
    <h1 class="title flex justify-center mb-4"> CẢM ƠN BẠN ĐÃ MUA HÀNG </h1>
    <div class="flex mb-4">
      <div class="w-1/2 justify-end text-right">
        <p><strong>Ngày thanh toán:</strong> </p>
        <p><strong>Phương thức thanh toán:</strong></p>
        <p><strong>Tổng tiền:</strong> </p>
        <p><strong>Tiền ship:</strong> </p>
      </div>
      <div class="w-1/2 text-left ml-4">
        <p>{{ formattedDate }} </p>
        <p>{{ getOrder.price }} Paypal </p>
        <p>{{ priceInVND(getOrder.orderTotalPrice) }} VND </p>
        <p> 0.0 </p>
      </div>
    </div>
    <div  class="flex justify-center mb-4">
      <Button class="cart-btn btn-color-medium" @click="goToOrder">View Order History</Button>
    </div>
    
  </div>
</template>

<script setup lang="ts">
import useCartStore from '@/store/Cart';
import useOrderStore from '@/store/OrderStore';
import { computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import moment from 'moment';
import Button from 'primevue/button';

const { fetchOrderbyCartId, getOrder } = useOrderStore();
const { deleteCart, deleteCartItem, clearCart } = useCartStore();
const router = useRouter();

const formattedDate = computed(() => {
  if (getOrder.value && getOrder.value.createdAt) {
    const datetime = moment(getOrder.value.createdAt, 'YYYY-MM-DD HH:mm:ss.SSSSSS');
    return datetime.format('YYYY-MM-DD HH:mm:ss');
  }
  return null;
});

const priceInVND = computed(() => {
  const exchangeRate = 24000; // Tỷ giá: 1 USD = 24000 VND
  return (usdPrice) => {
    const vndPrice = usdPrice * exchangeRate;
    return vndPrice.toLocaleString('en-US'); // Định dạng số với dấu phẩy
  };
});

function goToOrder() {
  router.push('/myaccount/view-order');
}

onMounted(() => {
  const cartIdFromLocalStorage = localStorage.getItem("cartId");
  fetchOrderbyCartId(cartIdFromLocalStorage).then(() => {
    clearCart();
    localStorage.removeItem("cartId");
  });
});
</script>

<style scoped>
.order-confirmation {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  border: 2px solid #333;
  /* Viền xung quanh */
  background-color: #f5f5f5;
  /* Màu xám nền */
}

.title {
  color: #1e88e5;
  /* Màu đậm cho tiêu đề */
}

.section-title {
  margin-top: 20px;
  color: #4caf50;
  /* Màu đậm cho tiêu đề phần */
}

.order-details {
  margin-bottom: 20px;

}

.order-items {
  list-style: none;
  padding: 0;
}

.item-details {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.item-details img {
  width: 100px;
  height: 100px;
  margin-right: 10px;
}

.item-info {
  text-align: left;
}
</style>
