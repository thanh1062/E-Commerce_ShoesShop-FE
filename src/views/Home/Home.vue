<template>
  <Carousel :value="spham" :numVisible="1" :numScroll="1" circular :autoplayInterval="4000" class="ml-4 mr-4 mt-4">
    <template #item="slotProps">
      <div class="border-1 surface-border border-round  ">
        <div class="Relative">
          <div class=" justify-content-center relative" id="carouselhome">
            <img :src="slotProps.data" :alt="slotProps.data" class="shadow-2" />
            <button @click="goToProduct"
              class="absolute bottom-10 left-12 bg-gray-800 -translate-y-1/2 text-white rounded-md transition duration-300 ease-in-out transform hover:scale-105 hover:bg-gray-900 hover:text-gray-100"
              label="Secondary" severity="secondary" style="padding: 20px; font-size: 1.3rem;">Shop now</button>
          </div>
        </div>
      </div>
    </template>
  </Carousel>

  <!-- Hot Product -->
  <div class="ml-4 mt-4 mb-4 mr-4 ">
    <div class="font-semibold text-2xl">SẢN PHẨM HOT</div>
    <div class="border-b border-gray-400"></div>
  </div>

  <div
    class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 justify-center ml-4 mr-4 ">
    <Product v-for="(product, index) in randomsProducts" :key="product.id" :product="product" class="" />
  </div>

  <div class="  justify-center text-center animate-bounce">
    <Button v-if="showLoadMoreRandomsButton" text @click="loadMoreRandomsProducts"
      class="w-full sign-in-register-btn justify-center">Show
      more</Button>
  </div>

  <!-- New Product -->
  <div class="ml-4 mt-4 mb-4 mr-4">
    <div class="font-semibold text-2xl">SẢN PHẨM MỚI</div>
    <div class="border-b border-gray-400"></div>
  </div>

  <div
    class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 justify-center ml-4 mr-4">
    <Product v-for="(product, index) in visibleNewProducts" :key="product.id" :product="product" />
  </div>

  <div class="  justify-center text-center animate-bounce">
    <Button v-if="showLoadMoreNewProductButton" text @click="loadMoreNewProducts"
      class="w-full sign-in-register-btn justify-center">Show
      more</Button>
  </div>

  <!-- Daily Product -->
  <div class="ml-4 mt-4 mb-4 mr-4">
    <div class="font-semibold text-2xl">SẢN PHẨM TRONG NGÀY</div>
    <div class="border-b border-gray-400"></div>
  </div>
  <div class="flex mb-4">
    <div class="w-1/2">
      <Carousel :value="spham2" :numVisible="1" :numScroll="1" circular :autoplayInterval="3000" class="ml-2 mr-2 mt-4">
        <template #item="slotProps">
          <div class="border-1 surface-border border-round">
            <div class="Relative">
              <div class="justify-content-center relative" id="carouselhome">
                <img :src="slotProps.data" :alt="slotProps.data" class="shadow-2" />
                <button @click="goToProduct"
                  class="absolute bottom-10 left-12 bg-gray-800 -translate-y-1/2 text-white rounded-md transition duration-300 ease-in-out transform hover:scale-105 hover:bg-gray-900 hover:text-gray-100"
                  label="Secondary" severity="secondary" style="padding: 20px; font-size: 1.3rem;">
                  Shop now
                </button>
              </div>
            </div>
          </div>
        </template>
      </Carousel>
    </div>
    <div class="w-1/2">
      <Carousel :value="spham1" :numVisible="1" :numScroll="1" circular :autoplayInterval="3500" class="ml-2 mr-2 mt-4"
        ref="carousel">
        <template #item="slotProps">
          <div class="border-1 surface-border border-round">
            <div class="Relative">
              <div class="justify-content-center relative" id="carouselhome">
                <img :src="slotProps.data" :alt="slotProps.data" class="shadow-2" />
                <button @click="goToProduct"
                  class="absolute bottom-10 left-12 bg-gray-800 -translate-y-1/2 text-white rounded-md transition duration-300 ease-in-out transform hover:scale-105 hover:bg-gray-900 hover:text-gray-100"
                  label="Secondary" severity="secondary" style="padding: 20px; font-size: 1.3rem;">
                  Shop now
                </button>
              </div>
            </div>
          </div>
        </template>
      </Carousel>
    </div>
  </div>

  <div
    class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 justify-center ml-4 mr-4">
    <Product v-for="(product, index) in randomProducts" :key="product.id" :product="product" />
  </div>

  <div class="  justify-center text-center animate-bounce">
    <Button v-if="showLoadMoreRandomButton" text @click="loadMoreRandomProducts"
      class="w-full sign-in-register-btn justify-center">Show
      more</Button>
  </div>
</template>

<script setup lang="ts">
import Carousel from "primevue/carousel";
import Button from "primevue/button";
import { useProductStore } from '@/store';
import { ref, onMounted, watch, computed } from 'vue'
import Product from '@/components/Product/ProductForHome.vue'
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const { fetchAllProducts, getProducts } = useProductStore();
const spham = ref<string[]>([
  "https://thumb.tildacdn.com/tild3235-3163-4439-a661-626434373431/-/format/webp/nike-slide4.jpg",
  "https://c.wallhere.com/photos/82/46/jumping_basketball_Adidas-172191.jpg!d",
  "https://static.nike.com/a/images/f_auto/dpr_1.6,cs_srgb/w_1089,c_limit/3d7f5d02-bf49-403a-a77f-04fc8680c54b/nike-just-do-it.jpg",
  // Add more image URLs here
]);
const spham1 = ref<string[]>([
  "https://motioncue.com/wp-content/uploads/2020/05/Best-Nike-Commercials.jpg",
  "https://images.lucepictor.com/wp-content/uploads/2020/05/running-shoes-advertising-photography.jpg",
  "https://i.ytimg.com/vi/FwR2iVYfDV4/maxresdefault.jpg",
  // Add more image URLs here
]);
const spham2 = ref<string[]>([
  "https://cf.shopee.ph/file/75e37dc7a5625cbddf5a101ace594d80",
  "https://pbs.twimg.com/media/COjFr_nWgAI9yu0.jpg",
  "https://i.ytimg.com/vi/nSuF6UKWu7Q/maxresdefault.jpg",
  // Add more image URLs here
]);

watch(
  () => route.query,
  toParams => {
    if (toParams.brand || toParams.category) {
      fetchAllProducts(toParams.brand, toParams.category);
    }
  }
);

//---------------------------------------------------------------------------------------------------
const visibleRandomProductsCount = ref(4);

// Lấy danh sách sản phẩm ngẫu nhiên dựa trên các index
const randomIndexes = computed(() => {
  const totalCount = getProducts.value.length;
  const indexes = [];

  // Tạo một mảng chứa các index sản phẩm
  for (let i = 0; i < totalCount; i++) {
    indexes.push(i);
  }

  // Trộn mảng index để lấy các index ngẫu nhiên
  for (let i = totalCount - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indexes[i], indexes[j]] = [indexes[j], indexes[i]];
  }

  return indexes;
});

// Lấy danh sách sản phẩm ngẫu nhiên dựa trên các index
const randomProducts = computed(() => {
  return randomIndexes.value
    .slice(0, visibleRandomProductsCount.value)
    .map(index => getProducts.value[index]);
});

// Kiểm tra xem còn sản phẩm để hiển thị hay không
const showLoadMoreRandomButton = computed(() => {
  return visibleRandomProductsCount.value < randomIndexes.value.length;
});

// Hàm tải thêm sản phẩm
const loadMoreRandomProducts = () => {
  visibleRandomProductsCount.value += 4; // Tăng giá trị biến đếm để hiển thị thêm 4 sản phẩm
};

// Daily Products ---------------------------------------------------------------------------------
const visibleRandomsProductsCount = ref(4);

// Lấy danh sách sản phẩm ngẫu nhiên dựa trên các index
const randomIndexess = computed(() => {
  const totalCounts = getProducts.value.length;
  const indexess = [];

  // Tạo một mảng chứa các index sản phẩm
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

// Lấy danh sách sản phẩm ngẫu nhiên dựa trên các index
const randomsProducts = computed(() => {
  return randomIndexess.value
    .slice(0, visibleRandomsProductsCount.value)
    .map(index => getProducts.value[index]);
});

// Kiểm tra xem còn sản phẩm để hiển thị hay không
const showLoadMoreRandomsButton = computed(() => {
  return visibleRandomsProductsCount.value < randomIndexess.value.length;
});

// Hàm tải thêm sản phẩm
const loadMoreRandomsProducts = () => {
  visibleRandomsProductsCount.value += 4; // Tăng giá trị biến đếm để hiển thị thêm 4 sản phẩm
};

// New Product----------------------------------------------------------------------------------------------
const visibleNewProductCount = ref(4);


// Sắp xếp mảng getProducts theo createdAt mới nhất
const sortedProducts = computed(() => {
  return getProducts.value
    .slice()
    .sort((a, b) => {
      const aCreatedAt = a.product?.createdAt instanceof Date ? a.product.createdAt : new Date();
      const bCreatedAt = b.product?.createdAt instanceof Date ? b.product.createdAt : new Date();
      return bCreatedAt.getTime() - aCreatedAt.getTime();
    });
});

// Lấy danh sách sản phẩm hiển thị dựa trên biến đếm
const visibleNewProducts = computed(() => {
  return sortedProducts.value.slice(0, visibleNewProductCount.value);
});

// Kiểm tra xem còn sản phẩm để hiển thị hay không
const showLoadMoreNewProductButton = computed(() => {
  return visibleNewProductCount.value < sortedProducts.value.length;
});

// Hàm tải thêm sản phẩm
const loadMoreNewProducts = () => {
  visibleNewProductCount.value += 4; // Tăng giá trị biến đếm để hiển thị thêm 4 sản phẩm
};

// function goToProduct() {
//   router.push('/products/Products');
// }

const goToProduct = () => {
  router.push({ name: "Products" });
}

onMounted(() => {
  fetchAllProducts(route.query.brand, route.query.category);
});
</script>
