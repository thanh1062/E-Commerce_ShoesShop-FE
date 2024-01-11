<template>
    <div>
        <div class="flex font-bold text-4xl justify-center mb-4">SẢN PHẨM</div>
        <div class=" mb-4">
            <div class="flex justify-between ml-2 mr-4">
                <div class="w-1/2 ml-2 mr-2">
                    <Dropdown v-model="selectedBrand" :options="brands" optionLabel="name" placeholder="Chọn thương hiệu"
                        class="w-full md:w-14rem" />
                </div>
                <div class="w-1/2 ml-2">
                    <Dropdown v-model="selectedCategory" :options="categoriesWithLabel" optionLabel="label"
                        placeholder="Chọn loại sản phẩm" class="w-full md:w-14rem">
                        <template #value="slotProps">
                            <div v-if="slotProps.value" class="flex align-items-center">
                                <div>{{ slotProps.value.name }}</div>
                                <div class="mx-1"> - </div>
                                <div>{{
                                    slotProps.value.parentCategory.name }}</div>
                            </div>
                            <span v-else>
                                {{ slotProps.placeholder }}
                            </span>
                        </template>
                    </Dropdown>
                </div>
            </div>
            <div class="mr-4 ml-4 mt-4">
                <label for="SKU-Code">SKU Code</label>
                <InputText v-model="currentProduct.sku" class="w-full" placeholder="93AB3S" />
            </div>
            <div class="flex">
                <div class="mr-4 ml-4 mt-4 w-1/2">
                    <label for="ProductName">Tên sản phẩm</label>
                    <InputText v-model="currentProduct.name" class="w-full" placeholder="Product Name" />
                </div>
                <div class="mr-4 ml-4 mt-4 w-1/2">
                    <label for="ProductPrice">Giá sản phẩm</label>
                    <InputNumber v-model="currentProduct.price" class="w-full" inputId="currency-us" placeholder="$00.00"
                        mode="currency" currency="USD" locale="en-US" />
                </div>
            </div>
            <div class="mr-4 ml-4 mt-4">
                <label for="description">Mô tả</label>
                <Textarea v-model="currentProduct.description" class="w-full" rows="5" cols="30" />
            </div>
            <div class="flex ml-4 mr-4">
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
                <div class="flex justify-center">
                    <h2 class="text-3xl font-semibold mb-4">DANH SÁCH SẢN PHẨM</h2>
                </div>
                <div class="flex justify-end mb-4">
                    <InputText v-model="searchText" placeholder="Tìm theo tên sản phẩm" @input="searchData"
                        class="search-down"></InputText>
                </div>
                <DataTable :value="filtered" :paginator="true" :rows="10" :rowsPerPageOptions="[5, 10, 15]">
                    <Column field="productId" header="ID sản phẩm"></Column>
                    <Column field="brand.brandId" header="ID Thương hiệu">
                        <template #body="rowData">
                            <div>
                                {{ rowData.data.brand.name }}
                            </div>
                        </template>
                    </Column>
                    <Column field="category.categoryId" header="ID Loại">
                        <template #body="rowData">
                            <div>
                                {{ rowData.data.category.name }}
                            </div>
                        </template>
                    </Column>
                    <Column class="" field="description" header="Mô tả">
                        <template #body="rowData">
                            <div class="description-cell">
                                {{ rowData.data.description.length > 150 ? rowData.data.description.slice(0, 150) +
                                    '...' :
                                    rowData.data.description }}
                            </div>
                        </template>
                    </Column>

                    <Column field="name" header="Tên sản phẩm"></Column>
                    <!-- ngày tháng năm chưa format -->
                    <Column field="price" header="Giá">
                        <template #body="rowData">
                            <div class="vnd">{{ priceInVND(rowData.data.price) }} VND</div>
                        </template>
                    </Column>

                    <Column field="sku" header="SKU Code"></Column>
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
<style></style>
<script setup lang="ts">
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Textarea from 'primevue/textarea';
import InputNumber from 'primevue/inputnumber';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';
import Dialog from 'primevue/dialog';
import { ProductType, CreationParams, UpdateAdminParams } from '@/types/product';
import { BrandType } from '@/types/brand';
import { CategoryType } from '@/types/category';
import useBrandStore from '@/store/BrandStore';
import useCategoryStore from '@/store/CategoryStore';
import useProductAdminStore from '@/store/ProductAdminStore';
import { ref, onMounted, computed } from 'vue';

const dialogVisible = ref(false);
const deleteDialogVisible = ref(false);
const brandStore = useBrandStore();
const brands = ref<BrandType[]>([]);
const selectedBrand = ref(null);

const categoryStore = useCategoryStore();
const categories = ref<CategoryType[]>([]);
const selectedCategory = ref(null);

const productStore = useProductAdminStore();
const products = ref<ProductType[]>([]);
const currentProduct = ref<ProductType>({});
const selectedProduct = ref<ProductType | null>(null);

const searchKey = ref(0);
const searchText = ref('');
const searchData = () => {
    searchKey.value += 1;
};

const filtered = computed(() => {
    const filtereds = products.value;
    const searchValue = searchText.value.trim().toLowerCase();

    if (searchValue !== '') {
        return filtereds.filter((product: ProductType) =>
            product.name?.toLowerCase().includes(searchValue)
        );
    }

    return filtereds;
});

const categoriesWithLabel = computed(() =>
    categoryStore.getCategories.value.filter(category => category.parentCategory?.categoryId !== null).map((category) => ({
        ...category,
        label: `${category.name} - ${category.parentCategory?.name}`
    }))
);

onMounted(async () => {
    /*--Load products into table--*/
    try {
        await productStore.fetchAllProductsAdmin();
        products.value = productStore.getProducts.value;
        console.log(products);
    } catch (error) {
        console.error('Error fetching products', error);
    }
    /*--Load brands into select box--*/
    try {
        await brandStore.fetchBrands();
        //brands.value = brandStore.getBrands.value.map(brands => brands.brandId + ' - ' + brands.name);
        brands.value = brandStore.getBrands.value;
    } catch (error) {
        console.error('Error fetching brands', error);
    }
    /*--Load categories into select box--*/
    try {
        await categoryStore.fetchCategories();
        //categories.value = categoryStore.getMainSubCategories.value.map(categories => categories.categoryId + ' - ' + categories.name + ' - ' + categories.parentCategory?.name);
        categories.value = categoryStore.getMainSubCategories.value;
    } catch (error) {
        console.error('Error fetching categories:', error);
    }

});

/*--Refresh form & select box--*/
const handleRefresh = async () => {
    selectedBrand.value = null;
    selectedCategory.value = null;
    currentProduct.value = {};
}

/*--Update product in admin page--*/
const handleUpdate = async () => {
    try {
        const selectedBrandValue = selectedBrand.value;
        const selectedCategoryValue = selectedCategory.value;
        // Kiểm tra xem giá trị đã được chọn hay chưa
        if (!selectedBrandValue || !selectedCategoryValue) {
            throw new Error("Brand and category must be selected.");
        }
        // Gán giá trị vào product.value
        currentProduct.value.brand = selectedBrandValue;
        currentProduct.value.category = selectedCategoryValue;
        await productStore.updateProduct(currentProduct.value.productId, currentProduct.value as UpdateAdminParams);
        await productStore.fetchAllProductsAdmin();
        products.value = productStore.getProducts.value;
    } catch (error) {
        console.error('Error updating product:', error);
    }
}
/*--Insert product in admin page--*/
const handleSave = async () => {
    try {
        // Lấy giá trị từ các select box
        const selectedBrandValue = selectedBrand.value;
        const selectedCategoryValue = selectedCategory.value;

        // Kiểm tra xem giá trị đã được chọn hay chưa
        if (!selectedBrandValue || !selectedCategoryValue) {
            throw new Error("Brand and category must be selected.");
        }

        // Gán giá trị vào product.value
        currentProduct.value.brand = selectedBrandValue;
        currentProduct.value.category = selectedCategoryValue;
        await productStore.addProduct(currentProduct.value as CreationParams);
        console.log(currentProduct.value)
        // Xử lý phản hồi từ API ở đây (ví dụ: hiển thị thông báo thành công, cập nhật dữ liệu, vv.)
        await productStore.fetchAllProductsAdmin();
        console.log('Product created successfully!');
    } catch (error) {
        // Xử lý lỗi khi gọi API (ví dụ: hiển thị thông báo lỗi, ghi log lỗi, vv.)
        console.error('Error creating product:', error);
    }

    currentProduct.value = {};
    selectedBrand.value = null;
    selectedCategory.value = null;
    dialogVisible.value = false;
};
/*--Cancel layout modal delete confirm--*/
const cancelDelete = () => {
    currentProduct.value = {};
    deleteDialogVisible.value = false;
};

/*--Show modal confirm--*/
const showDeleteDialog = (product: ProductType) => {
    currentProduct.value = { ...product };
    deleteDialogVisible.value = true;
};

/*--Delete product in admin page--*/
const handleDelete = async () => {
    try {
        await productStore.deleteProduct(currentProduct.value.productId);
        await productStore.fetchAllProductsAdmin();
        products.value = productStore.getProducts.value;
    } catch (error) {
        console.error('Error deleting product:', error);
    }
    currentProduct.value = {};
    deleteDialogVisible.value = false;
}

/*--Edit product by id fill up form in admin page--*/
const editData = (rowData: { data: ProductType }) => {
    selectedProduct.value = { ...rowData.data };
    currentProduct.value = selectedProduct.value;
    console.log(selectedProduct);
    console.log(categories);


    // Find the selected brand based on brandId
    console.log("Brand: ", brands.value);
    selectedBrand.value = brands.value.find(
        brand => brand.brandId === selectedProduct.value.brand.brandId
    );

    // Find the selected category based on categoryId
    selectedCategory.value = categoryStore.getCategories.value.find(
        category => category.categoryId === selectedProduct.value?.category?.categoryId
    );

    currentProduct.value = { ...selectedProduct.value };
};

const priceInVND = computed(() => {
    const exchangeRate = 24000; // Tỷ giá: 1 USD = 24000 VND

    return (usdPrice) => {
        const vndPrice = usdPrice * exchangeRate;
        return vndPrice.toLocaleString('en-US'); // Định dạng số với dấu phẩy
    };
});
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

.p-datatable tbody td .vnd {
    white-space: nowrap;
}

.search-down {
    width: 100rem;
}

.p-inputext {
    width: 100%;
}
</style>
