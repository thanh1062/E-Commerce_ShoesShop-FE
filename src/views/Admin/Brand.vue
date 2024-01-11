<template>
  <div class="brand-list">
    <h1 class="flex font-bold text-4xl justify-center mb-4">DANH SÁCH THƯƠNG HIỆU</h1>

    <div class="brand-list__add-button">
      <Button class="p-button-primary" label="Thêm thương hiệu" @click="showAddDialog"></Button>
    </div>

    <div class="brand-list__table">
      <DataTable :value="getBrands" :paginator="true" :rows="10" :rows-per-page-options="[5, 10, 25]" :key="tableKey">
        <Column field="brandId" header="ID"></Column>
        <Column field="name" header="Tên"></Column>
        <Column header="Thao tác">
          <template #body="rowData">
            <div class="brand-list__actions">
              <Button icon="pi pi-pencil" class="p-button-sm p-button-success"
                @click="showEditDialog(rowData.data)"></Button>
              <Button icon="pi pi-trash" class="p-button-sm p-button-danger"
                @click="showDeleteDialog(rowData.data)"></Button>
            </div>
          </template>
        </Column>
      </DataTable>
    </div>

    <Dialog v-model="dialogVisible" :visible="dialogVisible" :header="dialogHeader" class="brand-list__dialog">
      <div class="p-fluid">
        <div class="p-field">
          <label for="brandName">Tên</label>
          <InputText id="brandName" v-model="currentBrand.name"></InputText>
        </div>
      </div>

      <template #footer>
        <div class="brand-list__dialog-buttons">
          <Button class="p-button-success" label="Lưu" @click="saveBrand"></Button>
          <Button class="p-button-danger" label="Hủy" @click="cancelEdit"></Button>
        </div>
      </template>
    </Dialog>

    <Dialog v-model="deleteDialogVisible" :visible="deleteDialogVisible" header="Xác nhận xóa" :closable="false"
      class="brand-list__dialog">
      <p>Bạn có chắc chắn muốn xóa thương hiệu này?</p>

      <template #footer>
        <div class="brand-list__dialog-buttons">
          <Button class="p-button-danger" label="Xóa" @click="delBrand"></Button>
          <Button class="p-button-secondary" label="Hủy" @click="cancelDelete"></Button>
        </div>
      </template>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import useBrandStore from '@/store/BrandStore';
import { BrandType, CreationParams, UpdateParams } from '@/types/brand';

const {
  getBrands,
  fetchBrands,
  addBrand,
  updateBrand,
  deleteBrand
} = useBrandStore();
const currentBrand = ref<BrandType>({});
const dialogVisible = ref(false);
const deleteDialogVisible = ref(false);
const isEditing = ref(false);
const tableKey = ref(0); // Key to force DataTable re-render

onMounted(async () => {
  try {
    await fetchBrands();
  } catch (error) {
    console.error('Error fetching reviews:', error);
    // Xử lý lỗi
  }
});


const showAddDialog = (brand: BrandType) => {
  currentBrand.value = { ...brand };
  isEditing.value = false;
  dialogVisible.value = true;
};

const showEditDialog = (brand: BrandType) => {
  currentBrand.value = { ...brand };
  isEditing.value = true;
  dialogVisible.value = true;
};

const cancelEdit = () => {
  currentBrand.value = {};
  dialogVisible.value = false;
};

const saveBrand = async () => {
  if (isEditing.value) {
    // Thực hiện cập nhật thương hiệu
    try {
      // console.log(currentBrand.value);
      await updateBrand(currentBrand.value.brandId!, currentBrand.value as UpdateParams);
      await fetchBrands();
      // tableKey.value += 1; // Force DataTable re-render
    } catch (error) {
      console.error('Error updating brand:', error);
      // Xử lý lỗi
    }
  } else {
    // Thực hiện thêm thương hiệu mới
    try {
      await addBrand(currentBrand.value as CreationParams);
      await fetchBrands();
      tableKey.value += 1; // Force DataTable re-render
    } catch (error) {
      console.error('Error adding brand:', error);
      // Xử lý lỗi
    }
  }
  currentBrand.value = {};
  dialogVisible.value = false;
};

const showDeleteDialog = (brand: BrandType) => {
  currentBrand.value = { ...brand };
  deleteDialogVisible.value = true;
};

const cancelDelete = () => {
  currentBrand.value = {};
  deleteDialogVisible.value = false;
};

const delBrand = async () => {
  try {
    await deleteBrand(currentBrand.value.brandId!);
    await fetchBrands();
    tableKey.value += 1; // Force DataTable re-render
  } catch (error) {
    console.error('Error deleting brand:', error);
    // Xử lý lỗi
  }

  currentBrand.value = {};
  deleteDialogVisible.value = false;
};
</script>

<style scoped>
.p-mr-2 {
  margin-right: 0.5rem;
}

.brand-list {
  padding: 20px;
}

.brand-list__title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.brand-list__table {
  margin-bottom: 20px;
}

.brand-list__actions {
  display: flex;
  gap: 10px;
}

.brand-list__add-button {
  text-align: right;
  margin-bottom: 20px;
}

.brand-list__dialog {
  width: 400px;
}

.brand-list__dialog-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style>
