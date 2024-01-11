<template>
  <div class="account-management">
    <div class="flex justify-center text-3xl font-bold mb-4">DANH SÁCH BÌNH LUẬN</div>

    <div class="account-management__user-accounts">
      <DataTable :value="reviews" :paginator="true" :rows="10" :rowsPerPageOptions="[5, 10, 15]">
        <Column field="reviewId" header="Id"></Column>
        <Column field="user.emailAddress" header="Email"></Column>
        <Column field="productVariationId" header="Sản phẩm">
          <template #body="rowData">
            <div>{{ getProductVariationName(rowData.data.productVariationId) }}</div>
          </template>
        </Column>
        <Column field="content" header="Nội dung"></Column>

        <Column field="rateStar" header="đánh giá sao"></Column>
        <!-- Add more columns as needed -->

        <Column header="Công cụ">
          <template #body="rowData">
            <div class="product-list__actions">
              <Button @click="showDeleteDialog(rowData.data)" icon="pi pi-trash"
                class="p-button-rounded p-button-danger"></Button>
            </div>
          </template>
        </Column>
      </DataTable>
    </div>
    <Dialog v-model="deleteDialogVisible" :visible="deleteDialogVisible" :closable="false">
      <div class="flex justify-center text-2xl font-bold mt-4 mb-2 ">Xác nhận xóa</div>
      <div class="text-2xl">Bạn có chắc chắn muốn xóa sản phẩm này?</div>

      <template #footer>
        <div class="product-list__dialog-buttons">
          <Button class="p-button-danger" label="Xóa" @click="handleDelete"></Button>
          <Button class="p-button-secondary" label="Hủy" @click="cancelDelete"></Button>
        </div>
      </template>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import useReviewStore from '@/store/ReviewStore';
import { ReviewType } from '@/types/review';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Dialog from 'primevue/dialog';
import { ProductVariationType } from '@/types/productVariation';
import useProductVariationAdminStore from '@/store/ProductVariationAdminStore';
const dialogVisible = ref(false);
const deleteDialogVisible = ref(false);
const reviewStore = useReviewStore();
const reviews = ref<ReviewType[]>([]);
const currentReview = ref<ReviewType>({});

const productVariationStore = useProductVariationAdminStore();
const productVariations = ref<ProductVariationType[]>([]);
const selectedProductVariation = ref<ProductVariationType | null>(null);

/*--Cancel layout modal delete confirm--*/
const cancelDelete = () => {
  currentReview.value = {};
  deleteDialogVisible.value = false;
};

/*--Show modal confirm--*/
const showDeleteDialog = (review: ReviewType) => {
  currentReview.value = { ...review };
  deleteDialogVisible.value = true;
};

/*--Delete review in admin page--*/
const handleDelete = async () => {
  try {
    await reviewStore.deleteReview(currentReview.value.reviewId);
    await reviewStore.fetchReviews();
    reviews.value = reviewStore.getAllReviews.value;
  } catch (error) {
    console.error('Error deleting product:', error);
  }
  currentReview.value = {};
  deleteDialogVisible.value = false;
}

// Tính toán productVariationWithLabel
const productVariationsWithLabel = computed(() =>
  productVariations.value
    .filter(productVariation => productVariation.productVariationId !== null)
    .map((productVariation) => ({
      ...productVariation,
      label: `${productVariation.product?.name}`
    }))
);
// Method để tìm tên tương ứng với productVariationId
function getProductVariationName(productVariationId) {
  const matchedProductVariation = productVariationsWithLabel.value.find(
    productVariation => productVariation.productVariationId === productVariationId
  );
  return matchedProductVariation ? matchedProductVariation.product?.name || 'null' : 'null';
}


onMounted(async () => {
  try {
    await reviewStore.fetchReviews();
    reviews.value = reviewStore.getReviews.value;
  } catch (error) {
    console.error('Error fetching reviews:', error);
    // Handle error
  }
  try {
    await productVariationStore.fetchAllProductVariationsAdmin();
    productVariations.value = productVariationStore.getproductVariations.value;
  } catch (error) {
    console.log('Error fetching productVariations', error);
  }
});
</script>

<style scoped></style>
