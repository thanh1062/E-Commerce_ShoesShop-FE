<template>
  <div class="order-list ">
    <h1 class="order-list__title flex justify-center mt-4">DANH SÁCH ĐƠN HÀNG</h1>
    <DataTable :value="filteredOrders" :paginator="true" :rows="10" :rows-per-page-options="[5, 10, 25]"
      :sort-mode="'multiple'">
      <Column field="createdAt" header="Ngày đặt hàng" sortable="custom" :sort-function="customSort">
        <template #body="rowData">
          {{ moment(rowData.data.createdAt, 'YYYY-MM-DD HH:mm:ss.SSSSSS').format('DD-MM-YYYY') }}
        </template>
      </Column>
      <Column field="ordersStatus" header="Trạng thái" :body="statusBodyTemplate" sortable="custom"
        :sort-function="customSort">
        <template #body="rowData">
          <span :class="getStatusBadgeClass(rowData.data.ordersStatus)">
            {{ rowData.data.ordersStatus }}
          </span>
        </template>
      </Column>
      <Column field="orderTotalPrice" header="Tổng số tiền" sortable="custom" :sort-function="customSort">
        <template #body="rowData">
          {{ priceInVND(rowData.data.orderTotalPrice) }} VND
        </template>
      </Column>
      <Column header="Xem đơn hàng" :body="viewOrderTemplate">
        <template #body="rowData">
          <div class="category-list__actions">
            <Button icon="pi pi-pencil" class="p-button-sm p-button-success"
              @click="openOrderDialog(rowData.data)"></Button>
          </div>
        </template>
      </Column>
      
    </DataTable>

    <Dialog v-model="dialogVisible" :visible="dialogVisible" class="order-list__dialog">
      <div class="centered-text">
        <h1>{{ dialogHeader }}</h1>
      </div>
      <div class="p-fluid">
        <div class="p-field">
          <label for="customerName">Tên khách hàng</label>
          <InputText id="customerName" v-model="formattedName" :disabled="isEditing"></InputText>
        </div>
        <div class="p-field">
          <label for="customerAddress">Địa chỉ khách hàng</label>
          <InputText id="customerAddress" v-model="currentOrder.address.address" :disabled="isEditing"></InputText>
        </div>
        <div class="p-field">
          <label for="customerPhone">Số điện thoại</label>
          <InputText id="customerPhone" v-model="currentOrder.user.phoneNumber" :disabled="isEditing"></InputText>
        </div>
        <div class="p-field">
          <label for="orderDate">Ngày đặt hàng</label>
          <Calendar id="orderDate" v-model="formattedDate" :disabled="isEditing"></Calendar>
        </div>
        <div class="p-field">
          <label for="products">Danh sách sản phẩm</label>
          <DataTable :value="currentOrder?.orderLines">
            <Column field="productVariationSize.productVariation.product.name" header="Tên sản phẩm"></Column>
            <Column field="imageUrl" header="Hình">
              <template #body="Props">
                <img :src="Props.data.imageUrl" style="width: 100px; height: 100px;" alt="image">
              </template>
            </Column>
            <Column field="price" header="Giá">
              <template #body="rowData">
                <div class="vnd">{{ priceInVND(rowData.data.price) }} VND</div>
              </template>
            </Column>
            <Column field="quantity" header="Số lượng"></Column>
          </DataTable>
        </div>
      </div>

      <template #footer>
        <div class="order-list__dialog-buttons">
          <!-- <Button class="p-button p-button-success" label="Lưu" @click="saveOrder"></Button> -->
          <Button class="p-button p-button-secondary" label="Hủy" @click="cancelEdit"></Button>
        </div>
      </template>
    </Dialog>
  </div>
</template>
  
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Calendar from 'primevue/calendar';
import Dropdown from 'primevue/dropdown';
import useOrderStore from '@/store/OrderStore';
import { OrderType } from '@/types/order';
import moment from 'moment';
import jwt_decode from "jwt-decode";


const orders = ref<OrderType[]>([]);
const orderStore = useOrderStore();
const dialogHeader = ref('');
const token = localStorage.getItem('token');
const uservalue = jwt_decode(token!);
const userId = uservalue.user.userId;
const filterKeyword = ref('');
const filterStatus = ref('');
const dialogVisible = ref(false);
const currentOrder = ref<OrderType | null>(null);
const isEditing = ref(true);


onMounted(async () => {
  try {
    console.log(userId);
    await orderStore.fetchOrdersById(userId);
    orders.value = orderStore.getOrders.value;
    console.log(orders.value);
  } catch (error) {
    console.error('Error fetching orders:', error);
  }
});

const priceInVND = computed(() => {
  const exchangeRate = 24000; // Tỷ giá: 1 USD = 24000 VND
  return (usdPrice) => {
    const vndPrice = usdPrice * exchangeRate;
    return vndPrice.toLocaleString('en-US'); // Định dạng số với dấu phẩy
  };
});

const formattedDate = computed(() => {
  if (currentOrder.value && currentOrder.value.createdAt) {
    const datetime = moment(currentOrder.value.createdAt, 'YYYY-MM-DD HH:mm:ss.SSSSSS');
    return datetime.format('DD-MM-YYYY HH:mm:ss');
  }
  return null;
});

const formattedName = computed(() => {
  if (currentOrder.value && currentOrder.value.user && currentOrder.value.user.firstName && currentOrder.value.user.lastName) {
    return currentOrder.value.user.firstName + ' ' + currentOrder.value.user.lastName;
  }
  return null;
});

const openOrderDialog = (order: OrderType) => {
  currentOrder.value = { ...order };
  dialogHeader.value = `Thông tin đơn hàng`;
  dialogVisible.value = true;
};


const filteredOrders = computed(() => {
  let filtered = orders.value;
  if (filterKeyword.value) {
    const keyword = filterKeyword.value.toLowerCase();
    filtered = filtered.filter((order) => order.user?.userId.toLowerCase().includes(keyword));
  }
  if (filterStatus.value) {
    filtered = filtered.filter((order) => order.ordersStatus === filterStatus.value);
  }
  return filtered;
});

// Filter
function customSort(event: any) {
  const { field, order } = event.multiSortMeta[0];
  if (field) {
    const factor = order === 1 ? 1 : -1;
    filteredOrders.value.sort((order1, order2) => {
      const value1 = getFieldData(order1, field);
      const value2 = getFieldData(order2, field);
      return factor * value1.localeCompare(value2, undefined, { numeric: true });
    });
  }
}

// ----------------------------------------------------------------
function getFieldData(order: OrderType, field: string) {
  switch (field) {
    case 'orderId':
    case 'orderTotalPrice':
      return String(order[field]);
    case 'user.username':
    case 'ordersStatus':
      return order[field].toLowerCase();
    default:
      return '';
  }
}

function getStatusBadgeClass(status) {
  switch (status) {
    case 'Đang xử lý':
      return 'status-pending';
    case 'Đã xác nhận':
      return 'status-processing';
    case 'Đang giao':
      return 'status-delivery';  
    case 'Hoàn thành':
      return 'status-completed';
    default:
      return '';
  }
}

const cancelEdit = () => {
  currentOrder.value = {};
  dialogVisible.value = false;
};

</script>
  

<style scoped>

.status-pending {
  background-color: #ffc107;
  color: #000;
  padding: 4px 8px;
  border-radius: 4px;
}

.status-processing {
  background-color: #84b8f0;
  color: #fff;
  padding: 4px 8px;
  border-radius: 4px;
}

.status-delivery {
  background-color: #007bff;
  color: #fff;
  padding: 4px 8px;
  border-radius: 4px;
}

.status-completed {
  background-color: #28a745;
  color: #fff;
  padding: 4px 8px;
  border-radius: 4px;
}
.order-list {
  padding: 0;
  margin: 0 auto;
  border: 2px solid #f9f2f2;
  /* Viền xung quanh */
  /* Màu xám nền */
}

.order-list__title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.order-list__filters {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}

.order-list__dialog {
  max-width: 600px;
}

.order-list__dialog-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.status-badge {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  color: #fff;
  font-weight: bold;
}

.status-pending {
  background-color: #ffc107;
}

.status-processing {
  background-color: #007bff;
}

.status-completed {
  background-color: #28a745;
}

.order-list__dialog {
  /* Căn giữa dialog */
  display: flex;
  justify-content: center;
  align-items: center;
}

.dialog-header {
  /* Căn giữa nội dung của header */
  text-align: center;
}

.centered-text {
  /* Căn giữa và làm đậm phần hiển thị dialogHeader */
  text-align: center;
  font-weight: bold;
  color: black;
  font-size: 24px;
  /* Tăng kích thước của thẻ div */
}
</style>
  