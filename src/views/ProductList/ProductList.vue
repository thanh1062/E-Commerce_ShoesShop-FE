<template>
    <div class="flex">
        <div class="flex flex-col h-full mt-4">
            <aside class="  flex-grow rounded-lg md:w-80 lg:w-80">
                <div class="mb-4" v-if="checkBrand">
                    <button class="text-xl font-bold ml-0 block" @click="toggleSection('category')">
                        <span v-if="showCategorySection">
                            <i class="pi pi-chevron-down"></i>
                        </span>
                        <span v-else>
                            <i class="pi pi-chevron-up"></i>
                        </span>
                        Phân loại
                    </button>
                </div>
                <div v-show="!showCategorySection" v-if="checkBrand">
                    <div class="flex flex-col">
                        <div v-for="category of categoryObject" :key="category.key"
                            class="flex align-items-center mb-3 ml-5">
                            <Checkbox v-model="selectedCategorys" :inputId="category.key" name="category"
                                :value="category.value" @update:modelValue="filterProduct" />
                            <label :for="category.key" class="ml-1">{{ category.name }}</label>
                        </div>
                    </div>
                </div>
                <div class="mb-4" v-if="!checkBrand">
                    <button class="text-xl font-bold ml-0 block" @click="toggleSection('brand')">
                        <span v-if="showBrandSection">
                            <i class="pi pi-chevron-down"></i>
                        </span>
                        <span v-else>
                            <i class="pi pi-chevron-up"></i>
                        </span>
                        Thương hiệu
                    </button>
                </div>
                <div v-show="!showBrandSection" v-if="!checkBrand">
                    <div class="flex flex-col">
                        <div v-for="brand of brandObject" :key="brand.key" class="flex align-items-center mb-3 ml-5">
                            <Checkbox v-model="selectedBrands" :inputId="brand.key" name="brand" :value="brand.value"
                                @update:modelValue="filterProduct" />
                            <label :for="brand.key" class="ml-1">{{ brand.value }}</label>
                        </div>
                    </div>
                </div>

                <div class="mb-4">
                    <button class="text-xl font-bold ml-0 block" @click="toggleSection('price')">
                        <span v-if="showPriceSection">
                            <i class="pi pi-chevron-down"></i>
                        </span>
                        <span v-else>
                            <i class="pi pi-chevron-up"></i>
                        </span>
                        Khoảng giá
                    </button>
                </div>
                <div v-show="!showPriceSection">
                    <div class="flex flex-col">
                        <div v-for="price of priceObject" :key="price.key" class="flex align-items-center mb-3 ml-5">
                            <Checkbox v-model="selectedPrices" :inputId="price.key" name="price" :value="price.value"
                                @update:modelValue="filterProduct" />
                            <label :for="price.key" class="ml-1">{{ price.name }}</label>
                        </div>
                        <!-- Thêm các checkbox khoảng giá khác nếu cần -->
                    </div>
                </div>

                <div class="mb-4">
                    <button class="text-xl font-bold ml-0 block" @click="toggleSection('size')">
                        <span v-if="showSizeSection">
                            <i class="pi pi-chevron-down"></i>
                        </span>
                        <span v-else>
                            <i class="pi pi-chevron-up"></i>
                        </span>
                        Kích cỡ
                    </button>
                </div>
                <div class="mb-2" v-show="!showSizeSection">
                    <div class="flex flex-row flex-wrap gap-2 mt-1">
                        <div v-for="size of sizeObject" :key="size.key" class="sizes">
                            <Checkbox v-model="selectedSizes" :inputId="size.key" name="size" :value="size.value"
                                @update:modelValue="filterProduct" />
                            <label :for="size.key">{{ size.value }}</label>
                        </div>
                        <!-- Thêm các checkbox khoảng giá khác nếu cần -->
                    </div>
                </div>
            </aside>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 justify-center p-4">
            <Product v-for="product in productAll" :product="product" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { useProductStore } from '@/store';
import { onMounted, watch, ref } from 'vue'
import Product from '@/components/Product/Product.vue'
import { useRoute } from "vue-router";
import Checkbox from 'primevue/checkbox';


const route = useRoute();
const { fetchAllProducts, getProducts } = useProductStore();


watch(
    () => route.query,
    toParams => {
        if (toParams.brand || toParams.category) {
            fetchAllProducts(toParams.brand, toParams.category).then(() => {
                check();
                if (selectedPrices.value && selectedSizes.value && selectedBrands.value) {
                    productAll.value = getProducts.value;
                }
            });;
        }
    }
);

onMounted(() => {
    fetchAllProducts(route.query.brand, route.query.category).then(() => {
        check();
        if (selectedPrices.value && selectedSizes.value && selectedBrands.value) {
            productAll.value = getProducts.value;
        }
    });
});


const showBrandSection = ref(true);
const showCategorySection = ref(true);
const showPriceSection = ref(true);
const showSizeSection = ref(true);

const toggleSection = (section: string) => {
    if (section === 'brand') {
        showBrandSection.value = !showBrandSection.value;
    } else if (section === 'price') {
        showPriceSection.value = !showPriceSection.value;
    } else if (section === 'size') {
        showSizeSection.value = !showSizeSection.value;
    } else if (section === 'category') {
        showCategorySection.value = !showCategorySection.value;
    }
};

const brandObject = ref([
    { key: "1", value: 'Puma' },
    { key: "2", value: 'Addidas' },
    { key: "3", value: 'Nike' },
    { key: "4", value: 'New Balance' }
]);

const sizeObject = ref([
    { key: "20", value: '3' },
    { key: "21", value: '3.5' },
    { key: "22", value: '4' },
    { key: "23", value: '4.5' },
    { key: "24", value: '5' },
    { key: "25", value: '5.5' },
    { key: "26", value: '6' },
    { key: "27", value: '6.5' },
    { key: "1", value: '7' },
    { key: "2", value: '7.5' },
    { key: "3", value: '8' },
    { key: "3", value: '8.5' },
    { key: "5", value: '9' },
    { key: "6", value: '9.5' },
    { key: "7", value: '10' },
    { key: "8", value: '10.5' },
    { key: "9", value: '11' },
    { key: "10", value: '11.5' },
    { key: "11", value: '12' },
    { key: "12", value: '12.5' },
    { key: "13", value: '13' },
    { key: "14", value: 'XS' },
    { key: "15", value: 'S' },
    { key: "16", value: 'M' },
    { key: "17", value: 'L' },
    { key: "18", value: 'XL' },
    { key: "19", value: 'XXL' }
]);

const priceObject = ref([
    { name: "0 VNĐ - 2.400.000 VNĐ", key: "1", value: [0, 100] },
    { name: "2.400.000 VNĐ - 4.800.000 VNĐ", key: "2", value: [100, 200] },
    { name: "4.800.000 VNĐ - 9.600.000 VNĐ", key: "3", value: [200, 300] },
    { name: "9.600.000 VNĐ - 19.200.000 VNĐ", key: "4", value: [300, 400] }
]);

const categoryObject = ref([
    { key: "1", value: 'Men', name: 'Nam' },
    { key: "2", value: 'Women', name: 'Nữ' },
    { key: "3", value: 'Kid', name: 'Trẻ em' }
]);

const selectedSizes = ref<String[][]>([]);
const selectedPrices = ref<number[][]>([]);
const selectedBrands = ref<string[][]>([]);
const selectedCategorys = ref<string[][]>([]);
let productAll = ref([]);

function filterProduct() {
    let a = [];

    if (!route.query.brand) {
        if (selectedSizes.value.length === 0 && selectedPrices.value.length === 0 && selectedBrands.value.length === 0) {
            productAll.value = getProducts.value;
        } else if (selectedSizes.value.length === 0 && selectedBrands.value.length === 0) {

            selectedPrices.value.forEach(i => {
                let productPrice = getProducts.value.filter(product => product.product?.price! >= i[0] && product.product?.price! <= i[1]);
                a.push(productPrice);
            });
            productAll.value = [].concat(...a);
        } else if (selectedPrices.value.length === 0 && selectedBrands.value.length === 0) {

            selectedSizes.value.forEach(i => {

                let productSize = getProducts.value.filter(product => product.productVariationSizes?.find(size => size.size?.value === i));
                a.push(productSize);

            });
            productAll.value = [].concat(...a);
        } else if (selectedSizes.value.length === 0 && selectedPrices.value.length === 0) {
            console.log(selectedBrands.value);

            selectedBrands.value.forEach(i => {
                let productBrand = getProducts.value.filter(product => product.product?.brand?.name === i);
                a.push(productBrand);
            });
            productAll.value = [].concat(...a);
        } else if (selectedPrices.value.length !== 0 && selectedSizes.value.length !== 0) {
            selectedPrices.value.forEach(i => {
                let productPrice = getProducts.value.filter(product => product.product?.price! >= i[0] && product.product?.price! <= i[1]);
                a = a.concat(productPrice);
            });

            let e = [];
            selectedSizes.value.forEach(i => {
                let productSize = a.filter(product => product.productVariationSizes?.find(size => size.size?.value === i));
                e = e.concat(productSize);
            });

            productAll.value = [...e];
        } else if (selectedPrices.value.length !== 0 && selectedBrands.value.length !== 0) {
            selectedPrices.value.forEach(i => {
                let b = getProducts.value.filter(product => product.product?.price! >= i[0] && product.product?.price! <= i[1]);
                a = a.concat(b);
            });



            let h = [];
            selectedBrands.value.forEach(i => {
                let g = a.filter(product => product.product?.brand?.name === i);

                h = h.concat(g);
            });

            productAll.value = [...h];
        } else if (selectedSizes.value.length !== 0 && selectedBrands.value.length !== 0) {


            let e = [];
            selectedSizes.value.forEach(i => {
                let d = getProducts.value.filter(product => product.productVariationSizes?.find(size => size.size?.value === i));
                e = e.concat(d);
            });

            let h = [];
            selectedBrands.value.forEach(i => {
                let g = e.filter(product => product.product?.brand?.name === i);

                h = h.concat(g);
            });

            productAll.value = [...h];
        } else if (selectedPrices.value.length !== 0 && selectedSizes.value.length !== 0 && selectedBrands.value.length !== 0) {
            selectedPrices.value.forEach(i => {
                let b = getProducts.value.filter(product => product.product?.price! >= i[0] && product.product?.price! <= i[1]);
                a = a.concat(b);
            });

            let e = [];
            selectedSizes.value.forEach(i => {
                let d = a.filter(product => product.productVariationSizes?.find(size => size.size?.value === i));
                e = e.concat(d);
            });

            let h = [];
            selectedBrands.value.forEach(i => {
                let g = e.filter(product => product.product?.brand?.name === i);

                h = h.concat(g);
            });

            productAll.value = [...h];
        }
    } else if (!route.query.category) {
        if (selectedSizes.value.length === 0 && selectedPrices.value.length === 0 && selectedCategorys.value.length === 0) {
            productAll.value = getProducts.value;
        } else if (selectedSizes.value.length === 0 && selectedCategorys.value.length === 0) {

            selectedPrices.value.forEach(i => {
                let productPrice = getProducts.value.filter(product => product.product?.price! >= i[0] && product.product?.price! <= i[1]);
                a.push(productPrice);
            });
            productAll.value = [].concat(...a);
        } else if (selectedPrices.value.length === 0 && selectedCategorys.value.length === 0) {

            selectedSizes.value.forEach(i => {

                let productSize = getProducts.value.filter(product => product.productVariationSizes?.find(size => size.size?.value === i));
                a.push(productSize);

            });
            productAll.value = [].concat(...a);
        } else if (selectedSizes.value.length === 0 && selectedPrices.value.length === 0) {
            console.log(selectedCategorys.value);

            selectedCategorys.value.forEach(i => {
                let productCategory = getProducts.value.filter(product => product.product?.category?.parentCategory?.name === i);
                a.push(productCategory);
            });
            productAll.value = [].concat(...a);
        } else if (selectedPrices.value.length !== 0 && selectedSizes.value.length !== 0) {
            selectedPrices.value.forEach(i => {
                let productPrice = getProducts.value.filter(product => product.product?.price! >= i[0] && product.product?.price! <= i[1]);
                a = a.concat(productPrice);
            });

            let e = [];
            selectedSizes.value.forEach(i => {
                let productSize = a.filter(product => product.productVariationSizes?.find(size => size.size?.value === i));
                e = e.concat(productSize);
            });

            productAll.value = [...e];
        } else if (selectedPrices.value.length !== 0 && selectedCategorys.value.length !== 0) {
            console.log(selectedCategorys.value)
            selectedPrices.value.forEach(i => {
                let b = getProducts.value.filter(product => product.product?.price! >= i[0] && product.product?.price! <= i[1]);
                a = a.concat(b);
            });



            let h = [];
            selectedCategorys.value.forEach(i => {
                let g = a.filter(product => product.product?.category?.parentCategory?.name === i);

                h = h.concat(g);
            });

            productAll.value = [...h];
        } else if (selectedSizes.value.length !== 0 && selectedCategorys.value.length !== 0) {


            let e = [];
            selectedSizes.value.forEach(i => {
                let d = getProducts.value.filter(product => product.productVariationSizes?.find(size => size.size?.value === i));
                e = e.concat(d);
            });

            let h = [];
            selectedCategorys.value.forEach(i => {
                let productBrand = e.filter(product => product.product?.category?.parentCategory?.name === i);
                h = h.concat(productBrand);
            });


            productAll.value = [...h];
        } else if (selectedPrices.value.length !== 0 && selectedSizes.value.length !== 0 && selectedCategorys.value.length !== 0) {
            selectedPrices.value.forEach(i => {
                let b = getProducts.value.filter(product => product.product?.price! >= i[0] && product.product?.price! <= i[1]);
                a = a.concat(b);
            });

            let e = [];
            selectedSizes.value.forEach(i => {
                let d = a.filter(product => product.productVariationSizes?.find(size => size.size?.value === i));
                e = e.concat(d);
            });

            let productCategory = [];
            selectedCategorys.value.forEach(i => {
                let g = e.filter(product => product.product?.category?.parentCategory?.name === i);

                productCategory = productCategory.concat(g);
            });

            productAll.value = [...productCategory];
        }
    };
}
const checkBrand = ref(false);
function check() {
    if (route.query.brand) {
        checkBrand.value = true;
    } else {
        checkBrand.value = false;
    };
}
</script>

