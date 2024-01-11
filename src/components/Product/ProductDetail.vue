<template>
    <div class="flex justify-center gap-2">
        <div class="w-full lg:w-7/12 ml-2 mr-2 mb-4">
            <Image :src="primaryImage?.imageUrl" alt="Image" preview />
            <div class="flex gap-1">
                <div v-for="image in orderImages">
                    <Image :src="image?.imageUrl" alt="Image" preview />
                </div>
            </div>
        </div>
        <div class="lg:w-5/12 mr-4 mb-4 sticky top-0">
            <div>
                <label class="text-2xl">{{ selectedProduct.product?.brand?.name }}</label>
            </div>
            <div class="mt-2">
                <label class="text-xl">{{ selectedProduct.product?.name }}</label>
            </div>
            <div class="mt-2">
                <label class="text-4xl">{{ priceInVND }} VND</label>
            </div>
            <div class="mt-4">
                <label class="text-l font-semibold">Màu: <span class="inline font-normal">{{ selectedProduct.color?.value
                }}</span> </label>
                <div class="flex flex-wrap gap-2 items-center mt-1">
                    <div v-for="product in getAllProducts" :key="product.productVariationId" class="color-product"
                        :class="{ 'selected-color': selectedProduct.color?.colorId === product.color?.colorId }"
                        @click="onSelectProduct(product)">
                        <Image :src="product.productImages?.find(image => image.isPrimary === true)?.imageUrl" alt="Image"
                            width="80" />
                    </div>
                </div>
            </div>
            <div class="mt-4">
                <div
                    v-if="sizeShoesMenWomen">
                    <label class="text-l font-semibold">Kích cỡ người lớn:</label>
                    <div class="flex flex-row flex-wrap gap-2 mt-1">
                        <div v-for="size in adultShoesSizes" :key="size.sizeId" class="size">
                            <RadioButton v-model="selectedSize" :inputId="size.sizeId?.toString()" :value="size"
                                :disabled="size.isOutOfStock" />
                            <label :for="size.sizeId?.toString()">{{ size.value }}</label>
                        </div>
                    </div>
                </div>
                <div v-else-if="sizeShoesKids">
                    <label class="text-l font-semibold">Kích cỡ trẻ em:</label>
                    <div class="flex flex-row flex-wrap gap-2 mt-1">
                        <div v-for="size in kidShoesSizes" :key="size.sizeId" class="size">
                            <RadioButton v-model="selectedSize" :inputId="size.sizeId?.toString()" :value="size"
                                :disabled="size.isOutOfStock" />
                            <label :for="size.sizeId?.toString()">{{ size.value }}</label>
                        </div>
                    </div>
                </div>
                <div v-else-if="sizeClothing">
                    <label class="text-l font-semibold">Kích cỡ quần áo:</label>
                    <div class="flex flex-row flex-wrap gap-2 mt-1">
                        <div v-for="size in clothingSizes" :key="size.sizeId" class="size">
                            <RadioButton v-model="selectedSize" :inputId="size.sizeId?.toString()" :value="size"
                                :disabled="size.isOutOfStock" />
                            <label :for="size.sizeId?.toString()">{{ size.value }}</label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mt-3">
                <Button label="Add to cart" class="btn w-full" size="small" @click="addCart" />
            </div>

            <div class="mt-4">
                <div class="font-semibold text-2xl">ĐÁNH GIÁ CỦA BẠN</div>
                <div class="border-b border-gray-400 mb-4"></div>
                <div class="flex justify-center">
                    <Rating v-model="ratingSubmitValue" class="mb-2" />
                </div>
                <div class="w-full mt-2">
                    <Textarea v-model="commentsValue" rows="5" class="w-full" />
                </div>
                <div class="mt-2">
                    <Button label="GỬI ĐÁNH GIÁ CỦA BẠN" class="btn w-full" size="small" @click="handleSaveReview" />
                </div>
            </div>
        </div>
    </div>

    <!-- Product like Detail Brand -->

    <!-- Review Product -->
    <div class="font-semibold text-2xl">ĐÁNH GIÁ SẢN PHẨM</div>
    <div class="border-b border-gray-400 mb-4"></div>
    <div class="flex mb-4" v-for="(review, index) in displayedReviews" :key="review.reviewId">
        <div class="w-1/12">
            <div class=" bg-slate-300 rounded-3xl h-10 ">
                <div class="flex justify-center pt-2 ">
                    <i class="pi pi-user" style="font-size: 2rem"></i>
                </div>
            </div>
        </div>
        <div class="w-2/3 pl-4">
            <div class="font-semibold mb-2">{{ review?.user.emailAddress }}</div>
            <div class=" mb-2">Sản phẩm: {{ selectedProduct?.product?.name }}</div>
            <Rating v-model="review.rateStar" class="mb-2" :cancel="false" readonly />
            <div class="mb-2">Thương hiệu:
                {{ selectedProduct.product?.brand?.name }}</div>
            <div mb-2>Đã đánh giá: {{ review.content }}</div>
        </div>
    </div>
    <div class="flex justify-center">
        <div v-if="displayedReviews.length < filteredReviews.length" class="flex justify-center mr-4">
            <button @click="loadMoreReviews" class="text-blue-500 hover:text-blue-700 text-lg font-semibold">Xem
                thêm
                <i class="pi pi-chevron-down"></i>
            </button>
        </div>
        <div v-if="displayedReviews.length > reviewsPerLoad" class="flex justify-center">
            <button @click="collapseReviews" class="text-blue-500 hover:text-blue-700 text-lg font-semibold">Thu
                lại
                <i class="pi pi-chevron-up"></i>
            </button>
        </div>
    </div>

    <!-- Product -->
    <div class="mt-4 mb-4">
        <div class="font-semibold text-2xl">SẢN PHẨM CÓ THỂ BẠN QUAN TÂM</div>
        <div class="border-b border-gray-400"></div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 justify-center">
        <Product v-for="(product, index) in randomsProducts" :key="product.id" :product="product" class="" />
    </div>

    <div class="  justify-center text-center animate-bounce">
        <Button v-if="showLoadMoreRandomsButton" text @click="loadMoreRandomsProducts"
            class="w-full sign-in-register-btn justify-center">Show
            more</Button>
    </div>
</template>

<script setup lang="ts">
import Rating from 'primevue/rating';
import Textarea from 'primevue/textarea';
import 'primeicons/primeicons.css';
import Image from 'primevue/image';
import RadioButton from 'primevue/radiobutton';
import Button from 'primevue/button';
import Product from '@/components/Product/ProductForHome.vue'
import { useRoute } from "vue-router";
import { ProductVariationType } from "@/types/productVariation";
import { useProductStore, useSizeStore, useCartStore } from "@/store";
import { ref, onMounted, computed, Ref } from "vue";
import { ProductVariationSizeType } from '@/types/productVariationSize';
import useReviewStore from '@/store/ReviewStore';
import { ReviewType, CreationParams as ReviewCreationParams } from '@/types/review';
import jwt_decode from "jwt-decode";

const ratingSubmitValue = ref('');
const commentsValue = ref('');
const route = useRoute();
const { productId } = route.params;
const { getProduct, getAllProducts, fetchOneProduct, getProducts, fetchProducts, fetchAllProducts } = useProductStore();
const { fetchReviews, getAllReviews } = useReviewStore();
const { fetchSizes, getSizes } = useSizeStore();
const { addUpdateToCart } = useCartStore();
const reviewStore = useReviewStore();
let displayedReviews = ref([]);
const reviewsPerLoad = 2;

let selectedProduct: Ref<ProductVariationType> = ref({});
let selectedSize: Ref<ProductVariationSizeType> = ref({});
let filteredReviews = ref([]);

const currentReview = ref<ReviewType>({});


// computed
const kidShoesSizes = computed(() => {
    let category = selectedProduct.value.product?.category?.parentCategory;
    let sizes = getSizes.value.filter(size => {
        let categoryName = category?.name;
        return size.code === "Shoes" && size.category?.name === categoryName;
    });
    return sizes.map(size => {
        let productSizes = selectedProduct.value.productVariationSizes;
        let productSize = productSizes?.find(sizeProduct => size.sizeId === sizeProduct.size?.sizeId && sizeProduct.quantity! > 0);
        if (productSize !== undefined) {
            return {
                ...size, isOutOfStock: false, productSize: productSize,
            }
        } else {
            return {
                ...size, isOutOfStock: true,
            }
        }
    });
});
const adultShoesSizes = computed(() => {
    let category = selectedProduct.value.product?.category?.parentCategory;
    let sizes = getSizes.value.filter(size => {
        let categoryName = category?.name;
        return size.code === "Shoes" && size.category?.name === categoryName;
    });
    return sizes.map(size => {
        let productSizes = selectedProduct.value.productVariationSizes;
        let productSize = productSizes?.find(sizeProduct => size.sizeId === sizeProduct.size?.sizeId && sizeProduct.quantity! > 0);
        if (productSize !== undefined) {
            return {
                ...size, isOutOfStock: false, productSize: productSize,
            }
        } else {
            return {
                ...size, isOutOfStock: true,
            }
        }
    });
});
const clothingSizes = computed(() => {
    let category = selectedProduct.value.product?.category?.parentCategory;
    let sizes = getSizes.value.filter(size => {
        let categoryName = category?.name;
        return size.code === "Clothing" && size.category?.name === categoryName;
    });
    return sizes.map(size => {
        let productSizes = selectedProduct.value.productVariationSizes;
        let productSize = productSizes?.find(sizeProduct => size.sizeId === sizeProduct.size?.sizeId && sizeProduct.quantity! > 0);
        if (productSizes?.find(sizeProduct => size.sizeId === sizeProduct.size?.sizeId && sizeProduct.quantity! > 0)) {
            return {
                ...size, isOutOfStock: false, productSize: productSize,
            }
        } else {
            return {
                ...size, isOutOfStock: true,
            }
        }
    });
});

const primaryImage = computed(() => selectedProduct.value.productImages?.find(productImage => productImage?.isPrimary));
const orderImages = computed(() => selectedProduct.value.productImages?.filter(productImage => !productImage?.isPrimary));

const sizeShoesMenWomen = computed(() => (selectedProduct.value.product?.category?.parentCategory?.name === 'Men' || selectedProduct.value.product?.category?.parentCategory?.name === 'Women') && selectedProduct.value.product?.category?.code !== 'Clothing');
const sizeShoesKids = computed(() => selectedProduct.value.product?.category?.parentCategory?.name === 'Kid' && selectedProduct.value.product?.category?.code !== 'Clothing');
const sizeClothing = computed(() => selectedProduct.value.product?.category?.code === 'Clothing');
const handleSaveReview = async () => {
    try {
        const token = localStorage.getItem("token");
        const useValue = jwt_decode(token!);
        const userId = useValue.user;
        const selectStar = ratingSubmitValue.value;
        const inputContent = commentsValue.value;
        const productVariation = selectedProduct;
        currentReview.value.rateStar = selectStar;
        currentReview.value.content = inputContent;
        currentReview.value.user = userId;
        currentReview.value.productVariationId = productVariation.value.productVariationId;
        console.log("object: ", currentReview.value);
        await reviewStore.addReview(currentReview.value as CreationParams);
        fetchData();
        console.log('Insert review success');
    } catch (error) {
        console.log('Insert review failed');
    }
    currentReview.value = {};
    ratingSubmitValue.value = '';
    commentsValue.value = '';
}

// functions
const addCart = () => {
    addUpdateToCart({
        productVariationSize: selectedSize.value.productSize,
        color: selectedProduct.value.color,
        cartId: "",
        quantity: 1,
        imageUrl: primaryImage.value?.imageUrl,
    });
}

const onSelectProduct = (product: ProductVariationType) => {
    selectedProduct.value = product;
}

const fetchData = () => {
    Promise.all([fetchReviews(), fetchSizes()]).then(async () => {
        if (getProducts.value.length === 0 || getProducts.value == undefined || getProducts.value == null) {
            await fetchAllProducts();
            selectedProduct.value = getProducts.value.find(p => p.productVariationId === +productId)!;
            await fetchProducts(selectedProduct.value.product?.productId!);
        } else {
            selectedProduct.value = getProducts.value.find(p => p.productVariationId === +productId)!;
            await fetchProducts(selectedProduct.value.product?.productId!);
        }
        filterReviews();
        loadInitialReviews();
        console.log(selectedProduct.value );
    });
}

const filterReviews = () => {
    // Lọc đánh giá dựa trên biến thể sản phẩm
    filteredReviews.value = getAllReviews.value.filter((review) => {
        return review.productVariationId === selectedProduct.value.productVariationId;
        // Kiểm tra review.reviewId với biến thể sản phẩm mong muốn
        // Ví dụ: return review.reviewId === selectedProduct.value.variationId;
        // Thay thế selectedProduct.value.variationId bằng thuộc tính biến thể sản phẩm bạn muốn so sánh.
    });
};

const loadInitialReviews = () => {
    displayedReviews.value = filteredReviews.value.slice(0, reviewsPerLoad);
};

const loadMoreReviews = () => {
    const currentLength = displayedReviews.value.length;
    const newReviews = filteredReviews.value.slice(currentLength, currentLength + reviewsPerLoad);
    displayedReviews.value = [...displayedReviews.value, ...newReviews];
};

const collapseReviews = () => {
    const currentLength = displayedReviews.value.length;
    const newLength = currentLength - 2;
    displayedReviews.value = displayedReviews.value.slice(0, newLength);
};

const priceInVND = computed(() => {
    const usdPrice = selectedProduct?.value?.product?.price;
    const exchangeRate = 24000; // Tỷ giá: 1 USD = 23000 VND

    if (usdPrice) {
        const vndPrice = usdPrice * exchangeRate;
        return vndPrice.toLocaleString('en-US'); // Định dạng số với dấu phẩy
    }

    return null;
});

const visibleRandomsProductsCount = ref(4);
const randomIndexess = computed(() => {
    const totalCounts = getProducts.value.length;
    const indexess = [];

    // Tạo mảng index sản phẩm
    for (let i = 0; i < totalCounts; i++) {
        indexess.push(i);
    }

    // Trộn mảng index để lấy các index ngẫu nhiên
    for (let i = totalCounts - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indexess[i], indexess[j]] = [indexess[j], indexess[i]];
    }

    return indexess;
});

const randomsProducts = computed(() => {
    return randomIndexess.value
        .slice(0, visibleRandomsProductsCount.value)
        .map(index => getProducts.value[index]);
});

const showLoadMoreRandomsButton = computed(() => {
    return visibleRandomsProductsCount.value < getProducts.value.length;
});

const loadMoreRandomsProducts = () => {
    visibleRandomsProductsCount.value += 4; // Thay đổi số lượng sản phẩm hiển thị thêm tùy theo mong muốn
};

onMounted(fetchData);
</script>