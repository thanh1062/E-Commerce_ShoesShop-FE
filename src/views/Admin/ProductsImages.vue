<template>
    <div>
        <div class="flex font-bold text-4xl justify-center mb-4">HÌNH ẢNH SẢN PHẨM</div>
        <div class=" mb-4">
            <div class="flex justify-between ml-2 mr-2">
                <div class="w-full ml-2 mr-2">
                    <label for="description">Chi tiết sản phẩm</label>
                    <Dropdown v-model="selectedProductVariation" :options="productVariationWithLabel" optionLabel="label"
                        placeholder="Chọn Sản phẩm" class="w-full md:w-14rem">
                        <template #value="slotProps">
                            <div v-if="slotProps.value" class="flex align-items-center">
                                <div>{{ slotProps.value.color.value }}</div>
                                <div class="mx-1"> - </div>
                                <div>{{
                                    slotProps.value.product.name }}</div>
                            </div>
                            <span v-else>
                                {{ slotProps.placeholder }}
                            </span>
                        </template>
                    </Dropdown>
                </div>
            </div>
            <div class="mr-4 ml-4 mt-4">
                <label for="description">Trạng thái</label>
                <div class="card flex justify-content-center">
                    <div class="flex flex-wrap gap-3">
                        <div class="flex align-items-center">
                            <RadioButton v-model="ingredient" inputId="ingredient1" name="PrimaryImg" value="true" />
                            <label for="ingredient1" class="ml-2">Hình chính</label>
                        </div>
                        <div class="flex align-items-center">
                            <RadioButton v-model="ingredient" inputId="ingredient2" name="PrimaryImg" value="false" />
                            <label for="ingredient2" class="ml-2">Hình phụ</label>
                        </div>
                    </div>
                </div>
            </div>

            <div class="flex ">
                <div class="mr-4 ml-4 mt-4 w-full">
                    <label for="SKU-Code">Đường dẩn hình</label>
                    <InputText v-model="currentImageURL" class="w-full" placeholder="" />
                </div>
            </div>
            <div class="flex justify-center">
                <div class="flex ml-4 mr-4 mt-4 justify-center w-full">
                    <Image v-if="currentImageURL" :src="currentImageURL" alt="Image" width="300" preview />
                    <Image v-else
                        src="https://www.lifewire.com/thmb/TRGYpWa4KzxUt1Fkgr3FqjOd6VQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/cloud-upload-a30f385a928e44e199a62210d578375a.jpg"
                        alt="Image" width="500" preview />
                </div>
            </div>
            <div class=" flex ml-4 mr-4">
                <div class="mt-4">
                    <Button @click="handleSave" type="submit" label="Lưu"
                        class="w-full text-sm text-center text-white bg-indigo-600 rounded-md focus:outline-none hover:bg-indigo-500" />
                </div>
                <div class="ml-2 mt-4">
                    <Button @click="handleUpdate" type="submit" label="Sửa"
                        class="w-full text-sm text-center text-white bg-indigo-600 rounded-md focus:outline-none hover:bg-indigo-500" />
                </div>
                <div class="ml-2 mt-4">
                    <Button @click="handleRefresh" type="submit" label="Làm mới"
                        class="w-full text-sm text-center text-white bg-indigo-600 rounded-md focus:outline-none hover:bg-indigo-500" />
                </div>
            </div>
        </div>
        <div class="border-b border-gray-400"></div>
        <div class=" mb-4 mt-4">
            <div class="product-list__table">
                <div class="flex justify-center mb-4">
                    <h2 class="text-3xl font-semibold">DANH SÁCH HÌNH ẢNH SẢN PHẨM</h2>
                </div>
                <div class="flex justify-end mb-4">
                    <InputText v-model="searchText" placeholder="Tìm theo tên sản phẩm" @input="searchData"
                        class="search-down"></InputText>
                </div>
                <DataTable :value="filtered" :paginator="true" :rows="10" :rowsPerPageOptions="[5, 10, 15]">
                    <Column field="productImageld" header="ID hình sản phẩm"></Column>
                    <Column header="Hình">
                        <template #body="Props">
                            <img :src="Props.data.imageUrl" style="width: 100px; height: 100px;" alt="image">
                        </template>
                    </Column>
                    <Column field="isPrimary" header="Hình Chính"></Column>
                    <Column field="productVariation.productVariationId" header="ID chi tiết sản phẩm">
                        <template #body="rowData">
                            {{ getProductVariationName(rowData.data.productVariation.productVariationId) }}
                        </template>
                    </Column>

                    <!-- Add more columns as needed -->
                    <Column header="Chỉnh sửa">
                        <template #body="rowData">
                            <div class="product-list__actions">
                                <Button @click="editData(rowData)" icon="pi pi-pencil"
                                    class=" p-button-sm p-button-success"></Button>
                                <Button @click="showDeleteDialog(rowData.data)" icon="pi pi-trash"
                                    class="p-button-sm p-button-danger"></Button>
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
    </div>
</template>

<script setup lang="ts">
import Image from 'primevue/image';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import RadioButton from 'primevue/radiobutton';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';
import Dialog from 'primevue/dialog';

import { ref, onMounted, computed, watch } from 'vue';
import useProductImageAdminStore from '@/store/ProductImageAdminStore';
import useProductVariationAdminStore from '@/store/ProductVariationAdminStore';
import { ProductImagesType, CreationProductImageParams, UpdateParams } from '@/types/productImages';
import { ProductVariationType } from '@/types/productVariation';

//---------------------------------------
const ingredient = ref('false');
//---------------------------------------

const dialogVisible = ref(false);
const deleteDialogVisible = ref(false);

const productImageStore = useProductImageAdminStore();
const productImages = ref<ProductImagesType[]>([]);
const selectedProductImage = ref<ProductImagesType | null>(null);
const currentProductImage = ref<ProductImagesType>({});

/*--Fill productVariation into selectbox--*/
const productVariationStore = useProductVariationAdminStore();
const productVariations = ref<ProductVariationType[]>([]);
const selectedProductVariation = ref<ProductVariationType | null>(null);
const productVariationWithLabel = computed(() =>
    productVariationStore.getproductVariations.value.filter(productVariation => productVariation.productVariationId !== null).map((productVariation) => ({
        ...productVariation,
        label: `${productVariation.color?.value} - ${productVariation.product?.name}`
    }))
);
const currentImageURL = ref('');

const searchKey = ref(0);
const searchText = ref('');
const searchData = () => {
    searchKey.value += 1;
};

const filtered = computed(() => {
    const filtereds = productImages.value;
    const searchValue = searchText.value.trim().toLowerCase();

    if (searchValue !== '') {
        return filtereds.filter((product: ProductImagesType) =>
            product.productVariation?.product?.name?.toLowerCase().includes(searchValue)
        );
    }

    return filtereds;
});
watch(currentImageURL, (newValue) => {

});

// Method để tìm tên tương ứng với productVariationId
function getProductVariationName(productVariationId: ProductVariationType) {
    const matchedProductVariation = productVariationWithLabel.value.find(
        productVariation => productVariation.productVariationId === productVariationId
    );
    return matchedProductVariation ? matchedProductVariation.label : 'null';
}

onMounted(async () => {
    /*--Load ProductImage into table--*/
    try {
        await productImageStore.fetchAllProductImagesAdmin();
        productImages.value = productImageStore.getproductImages.value;
    } catch (error) {
        console.log("Error fetching productImage", error);
    }

    /*--Load ProductVariation into select box--*/
    try {
        await productVariationStore.fetchAllProductVariationsAdmin();
        productVariations.value = productVariationStore.getproductVariations.value;
        console.log("productVariations", productVariations.value);
    } catch (error) {
        console.log('Error fetching productVariations', error);
    }

});

/*--Refresh form & select box--*/
const handleRefresh = async () => {
    ingredient.value = 'false';
    selectedProductVariation.value = null;
    currentProductImage.value = {};
    currentImageURL.value = '';

}
const handleUpdate = async () => {
    try {
        const selectedProductVariationValue = selectedProductVariation.value;
        // Kiểm tra xem giá trị đã được chọn hay chưa
        if (!selectedProductVariationValue) {
            throw new Error("ProductVariation must be selected.");
        }
        // Gán giá trị vào product.value
        currentProductImage.value.isPrimary = ingredient.value;
        currentProductImage.value.imageUrl = currentImageURL.value;
        currentProductImage.value.productVariation = selectedProductVariationValue;
        // chưa xong
        await productImageStore.updateProductImage(currentProductImage.value.productImageld, currentProductImage.value as UpdateParams);
        await productImageStore.fetchAllProductImagesAdmin();
        productImages.value = productImageStore.getproductImages.value;
    } catch (error) {
        console.error('Error updating productImage:', error);
    }
}
const handleSave = async () => {
    try {
        // Lấy giá trị từ productVariation select box
        const selectedProductVariationValue = selectedProductVariation.value;
        //const selectedCategoryValue = selectedCategory.value;

        // Kiểm tra xem giá trị đã được chọn hay chưa
        if (!selectedProductVariationValue) {
            throw new Error("ProductVariation must be selected.");
        }
        // Chọn isPrimary

        // Gán giá trị vào productImage.value
        currentProductImage.value.isPrimary = ingredient.value;
        currentProductImage.value.imageUrl = currentImageURL.value;
        currentProductImage.value.productVariation = selectedProductVariationValue;
        await productImageStore.addProductImage(currentProductImage.value as CreationProductImageParams);
        console.log("Kiem tra: ", currentProductImage.value)
        // Xử lý phản hồi từ API ở đây (ví dụ: hiển thị thông báo thành công, cập nhật dữ liệu, vv.)
        await productImageStore.fetchAllProductImagesAdmin();
        console.log('Product created successfully!');
    } catch (error) {
        // Xử lý lỗi khi gọi API (ví dụ: hiển thị thông báo lỗi, ghi log lỗi, vv.)
        console.error('Error creating product:', error);
    }

    ingredient.value = '';
    selectedProductVariation.value = null;
    currentProductImage.value = {};
    currentImageURL.value = '';
    dialogVisible.value = false;
};
const cancelDelete = () => {
    currentProductImage.value = {};
    deleteDialogVisible.value = false;
};

const showDeleteDialog = (productImage: ProductImagesType) => {
    currentProductImage.value = { ...productImage };
    deleteDialogVisible.value = true;
};
const handleDelete = async () => {
    try {
        await productImageStore.deleteProductImage(currentProductImage.value.productImageld);
        await productImageStore.fetchAllProductImagesAdmin();
        productImages.value = productImageStore.getproductImages.value;
    } catch (error) {
        console.error('Error deleting productImage:', error);
    }
    currentProductImage.value = {};
    deleteDialogVisible.value = false;
}

const editData = (rowData: { data: ProductImagesType }) => {
    selectedProductImage.value = { ...rowData.data };
    currentImageURL.value = selectedProductImage.value.imageUrl;

    // Find the selected brand based on brandId
    selectedProductVariation.value = productVariations.value.find(
        productVariation => productVariation.productVariationId === selectedProductImage.value?.productVariation?.productVariationId
    );
    if (selectedProductImage.value.isPrimary) {
        ingredient.value = 'true';
    } else {
        ingredient.value = 'false';
    }

    currentProductImage.value = { ...selectedProductImage.value };
};

</script>

<style>
.description-cell {
    max-width: 250px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.product-list__table {
    margin-bottom: 2rem;
}

.product-list__actions {
    display: flex;
    gap: 10px;
}

.product-list__dialog {
    width: 30rem;
}

.product-list__dialog-buttons {
    display: flex;
    justify-content: flex-end;
}

.search-down {
    width: 100rem;
}
</style>
