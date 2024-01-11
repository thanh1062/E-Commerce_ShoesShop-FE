<template>
  <div class="flex mb-4">
    <InputText v-model="searchName" placeholder="Search by name" @input="searchData" class="w-2/3" />
    <Dropdown v-model="selectedColor" :options="colors" placeholder="Select a Colors" class="w-1/3 ml-2 mr-2" />
    <Dropdown v-model="selectedSize" :options="sizes" placeholder="Select a Sizes" class="w-1/3" />
  </div>
  <DataTable :value="filteredReportByProductQuantitys" :paginator="true" :rows="10" :rowsPerPageOptions="[5, 10, 15]">
    <Column field="name" header="Tên sản phẩm"></Column>
    <Column field="quantity" header="Số lượng"></Column>
    <Column field="color" header="Màu"></Column>
    <Column field="size" header="Kích cở"></Column>
  </DataTable>
</template>
  
<script setup lang="ts">
import DataTable from 'primevue/datatable';
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';
import Column from 'primevue/column';
import { ref, computed, onMounted } from 'vue';
import { reportProductQuantityType } from '@/types/reportProductQuantity';
import useReportByProductQuantiy from '@/store/ReportByProductQuantity';

const ReportByProductQuantityStore = useReportByProductQuantiy();
const ReportByProductQuantitys = ref<reportProductQuantityType[]>([]);
const searchName = ref<string>('');
const selectedColor = ref<string | null>(null);
const selectedSize = ref<string | null>(null);

/*--Report: best selling by brands--*/
onMounted(async () => {
  /*--Load Report By Brand--*/
  try {
    await ReportByProductQuantityStore.fetchReportProductQuantity();
    ReportByProductQuantitys.value = ReportByProductQuantityStore.getByProductQuantitys.value;
  } catch (error) {
    console.log('Error fetching ReportByBrands', error);
  }
});

const colors = computed(() => {
  const uniqueColors = Array.from(new Set(ReportByProductQuantitys.value.map((item) => item.color)));
  return uniqueColors.map((color) => color);
});

const sizes = computed(() => {
  const uniqueSizes = Array.from(new Set(ReportByProductQuantitys.value.map((item) => item.size)));
  return uniqueSizes.map((size) => size);
});

const uniqueReportByProductQuantitys = computed(() => {
  const uniqueItems = new Map();
  for (const item of ReportByProductQuantitys.value) {
    const key = item.name + item.color + item.size;
    if (!uniqueItems.has(key)) {
      uniqueItems.set(key, item);
    }
  }
  return Array.from(uniqueItems.values());
});

const filteredReportByProductQuantitys = computed(() => {
  // Lọc dữ liệu dựa trên giá trị tìm kiếm và các Dropdown được chọn
  return uniqueReportByProductQuantitys.value.filter((item) => {
    const nameMatch = !searchName.value || item.name?.toLowerCase().includes(searchName.value.toLowerCase());
    const colorMatch = !selectedColor.value || item.color === selectedColor.value;
    const sizeMatch = !selectedSize.value || item.size === selectedSize.value;
    return nameMatch && colorMatch && sizeMatch;
  });
});

const searchData = () => {
  // Khi nhập tìm kiếm, bảng sẽ tự động cập nhật với dữ liệu phù hợp
};

</script>
  
<style scoped>
.admin-report__title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.admin-report__filters {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.admin-report__filters label {
  margin-right: 10px;
}

.admin-report__summary {
  display: flex;
  margin-bottom: 20px;
}

.admin-report__summary-item {
  flex: 1;
  text-align: center;
}

.admin-report__summary-label {
  font-weight: bold;
}

.admin-report__summary-value {
  font-size: 18px;
  font-weight: bold;
  margin-top: 5px;
}

.admin-report__table {
  margin-bottom: 20px;
}

.admin-report__empty {
  text-align: center;
  font-style: italic;
  color: #999;
}

.admin-report__buttons {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.chart-top {
  width: 34rem;
  height: 17rem;
}

.search-down {
  width: 100rem;
}
</style>
  