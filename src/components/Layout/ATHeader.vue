<template>
  <nav>
    <div class="flex items-center justify-between px-6 flex-wrap">
      <div class="flex items-center">
        <Image :src="Logo" alt="Image" width="180" />
        <div class="p-inputgroup">
          <AutoComplete v-model="searchQuery" :suggestions="filteredProducts" @complete="onSearchComplete"
            placeholder="Search for shoes, clothes, etc." field="name">
            <template #option="{ option }" class="w-full">
              <div>
                <SearchProduct :product="option" />
              </div>
            </template>
          </AutoComplete>
        </div>
      </div>
      <div class="pb-4 ms-6 md:pb-0">
        <Button v-if="getCart.itemTotalQuantity === undefined || getCart.itemTotalQuantity <= 0"
          icon="pi pi-shopping-cart " class="cart-btn" :label="$t('my-cart')" raised @click="showCart" />
        <Button v-else icon="pi pi-shopping-cart " class="cart-btn" :label="`Giỏ hàng ${getCart.itemTotalQuantity}`"
          raised @click="showCart" />
      </div>

    </div>
    <div class="nav-menu">
      <MegaMenu :model="items">
        <template #end>
          <Button v-if="!isLogin" :label="$t('sign-in/register')" class="sign-in-register-btn" text
            @click="dialogSignInVisible = true" />
          <button v-if="isLogin" :label="$t('my-account')" class="sign-in-register-btn" text
            @click="toggleSection('myAccount')">
            <div class="flex justify-center mb-3 mt-3">
              <span v-if="showMyAccountSection">
                <span class="font-bold">{{ $t('my-account') }}</span>
                <i class="pi pi-chevron-down ml-2"></i>
              </span>
              <span v-else>
                <span class="font-bold">{{ $t('my-account') }}</span>
                <i class="pi pi-chevron-up ml-2"></i>
              </span>
            </div>
            <div :class="['my-account-section', { 'hidden': !showMyAccountSection }]"
              class="absolute bg-white rounded border shadow-xl z-50 w-40 right-0 ">
              <div class="mb-2 flex justify-start">
                <Button :label="$t('view-order')" class="sign-in-register-btn w-full" text @click="goToViewOrders" />
              </div>
              <div class="mb-2 flex justify-start">
                <Button :label="$t('my-account')" class="sign-in-register-btn w-full" text @click="goToMyAccount" />
              </div>
              <div v-if="isAdmin" class="mb-2 flex justify-start">
                <Button label="Quản lý sản phẩm" class="sign-in-register-btn w-full" text @click="goToViewAdmin" />
              </div>
              <div class="mb-2 flex justify-start">
                <Button label="Favorite" class="sign-in-register-btn w-full" text @click="goToFavorite" />
              </div>
              <div class="mb-2 flex justify-start">
                <Button :label="$t('logout')" class="sign-in-register-btn w-full" text @click="logout" />
              </div>
            </div>
          </button>
        </template>
      </MegaMenu>
    </div>
  </nav>
  <Sidebar v-model:visible="getIsShowSidebarCart" position="right">
    <template #header>
      <div class="text-2xl">{{ $t('my-cart') }}</div>
    </template>
    <div class="flex flex-col justify-between h-full">
      <div class="mx-4">
        <CartItem :cart="getCart" :cartItems="getCartItems" />
      </div>
      <div class="bg-gray-100 w-full">
        <div class="text-end mr-4 pt-2" style="font-size: 1.5rem;">{{ $t('subtotal') }}: ${{ priceInVND }}
        </div>
        <div class="flex justify-between m-4">
          <Button type="submit" :label="$t('my-cart')" @click="goToCart"
            class="text-sm text-center text-white btn-color-light rounded focus:outline-none" />
          <div v-if="getCart.itemTotalQuantity! > 0">
            <Button type="submit" :label="$t('Proceed-to-checkout')" @click="goToCheckout"
              class="text-sm text-center text-white btn-color-medium rounded focus:outline-none" />
          </div>
        </div>
      </div>
    </div>
  </Sidebar>

  <CoreDialog :visible="dialogSignInVisible" header="Sign In" widthSize='500px' position="center"
    @close-dialog="dialogSignInVisible = false">
    <div class="sign-in-btns">
      <Button label="Đăng nhập với tài khoản Atsport" class="btn" size="small" outlined @click="goToLogin" />
      <p class="text-center">or</p>
      <Button label="Tạo tài khoản Atsport" class="btn" size="small" outlined @click="goToRegister" />
    </div>
  </CoreDialog>
</template>


<script setup lang="ts">
import Image from 'primevue/image';
import Button from 'primevue/button';
import AutoComplete from 'primevue/autocomplete';
import MegaMenu from 'primevue/megamenu';
import Logo from "@/assets/images/logo.png";
import CoreDialog from '@/components/Core/CoreDialog.vue';
import Sidebar from 'primevue/sidebar';
import CartItem from "@/components/CartItems/CartItem.vue";
import { useRouter } from 'vue-router';
import { useBrandStore, useCategoryStore, useCartStore } from "@/store";
import { onMounted, ref, watch, computed } from 'vue';
import jwt_decode from "jwt-decode";
import { useLanguageStore } from '@/store/language';
import { translate } from '@/i18n';
import { useProductStore } from '@/store';
import { useRoute } from "vue-router";
import { ProductVariationType } from '@/types/productVariation';
import SearchProduct from '@/components/Product/SearchProduct.vue';

const route = useRoute();
const router = useRouter();
const { fetchAllProducts, getProducts } = useProductStore();
const { getBrands, fetchBrands } = useBrandStore();
const { getCategories, fetchCategories } = useCategoryStore();
const { getCart, getCartItems, fetchCart, getIsShowSidebarCart, showSidebarCart } = useCartStore();
const searchQuery = ref('');
const filteredProducts = ref([]);
const items = ref([]);
let dialogCartVisible = ref(false);
let dialogSignInVisible = ref(false);

watch(
  () => route.query,
  toParams => {
    if (toParams.brand || toParams.category) {
      fetchAllProducts(toParams.brand, toParams.category);
    }
  }
);

watch(searchQuery, (newValue) => {
  filterProducts(newValue);
});

watch(getIsShowSidebarCart, async () => {
  await fetchCart();
});


function filterProducts(query: string) {
  filteredProducts.value = getProducts.value.filter((product: ProductVariationType) =>
    product?.product?.name?.toLowerCase().includes(query.toLowerCase())
  );
}

function onSearchComplete() {
  const searchQueryValue = searchQuery.value;

  // Xử lý khi người dùng hoàn thành tìm kiếm
  // Ví dụ: Chuyển hướng đến trang kết quả tìm kiếm
  //   route.push({ path: '/search-results', query: { q: searchQueryValue }});
}

onMounted(() => {
  fetchAllProducts(route.query.brand, route.query.category);
  filterProducts('');
});

enum MainCategories {
  Men = 1,
  Women = 2,
  Kids = 3
}

const showMyAccountSection = ref(false);

const toggleSection = () => {
  showMyAccountSection.value = !showMyAccountSection.value;
};

function brands() {
  return getBrands.value.map(brand => {
    return {
      label: brand.name,
      command: () => gotoProductList(brand.brandId, undefined)
    }
  });
}

const getAllBrands = () => {
  return [{
    label: "",
    items: brands(),
    class: "display-none",
  }]
};

const getSubCategories = (parentCategoryId: number, categoryCode: string) => {
  let data = getCategories.value.map(category => {
    const localParentCategoryId = category.parentCategory?.categoryId;
    const localCategoryCode = category.code;
    if (localParentCategoryId === parentCategoryId && localCategoryCode === categoryCode) {
      return {
        label: category.name,
        command: () => gotoProductList(undefined, category.categoryId),
      }
    }
  });
  return data.filter(category => category !== undefined);
}

const getCategoriesByParent = (parentCategoryId: number) => {
  let data = getCategories.value.map(category => {
    const localParentCategoryId = category.parentCategory?.categoryId;
    if (localParentCategoryId === parentCategoryId) {
      let code = category.code === "Shoes" ? "Giày" : "Áo"
      return {
        label: code,
        items: getSubCategories(parentCategoryId, category.code!),
      }
    }
  });

  return data.filter((value, index, categories) => categories.map(category => category?.label)?.indexOf(value?.label) === index && value !== undefined);
}

const setDataHeader = () => {
  items.value = [
    {
      label: "Nữ",
      items: [getCategoriesByParent(MainCategories.Women)],
      class: "z-index-100",
    },
    {
      label: "Nam",
      items: [getCategoriesByParent(MainCategories.Men)],
      class: "z-index-100",
    },
    {
      label: "Trẻ Em",
      items: [getCategoriesByParent(MainCategories.Kids)],
      class: "z-index-100",
    },
    {
      label: "Thương Hiệu",
      items: [getAllBrands()],
      class: "z-index-100",
    },
  ];
}

const goToLogin = () => {
  router.push('/account/login');
}

function goToCart() {
  dialogCartVisible.value = false;
  router.push('/cart');
}

const goToRegister = () => {
  router.push('/account/register')
}

const gotoProductList = (brand?: number, category?: number) => {
  router.push({
    name: "Products",
    query: { category: category, brand: brand },
  });
};

function goToCheckout() {
  dialogCartVisible.value = false;
  router.push('/checkout/address');
}

function goToMyAccount() {
  dialogCartVisible.value = false;
  router.push('/myaccount/myaccount');
}

function goToViewOrders() {
  dialogCartVisible.value = false;
  router.push('/myaccount/view-order');
}

function goToFavorite() {
  dialogCartVisible.value = false;
  router.push('/favorite');
}

const showCart = () => {
  showSidebarCart();
}

const languageStore = useLanguageStore();

const selectedLanguage = computed({
  get: () => languageStore.currentLanguage,
  set: (value) => {
    languageStore.setCurrentLanguage(value);
    // Thực hiện bất kỳ hành động nào khác khi ngôn ngữ thay đổi
  },
});
const $t = translate;

function goToViewAdmin() {
  dialogCartVisible.value = false;
  router.push('/admin');
}

const token = localStorage.getItem('token');

const isLogin = ref(false);
let isAdmin = ref(false);

function checkToken() {
  if (token === null) {
    isLogin.value = false;
  } else {
    isLogin.value = true;
    const valueToken = jwt_decode(token!);
    const roles = valueToken.user.roles;

    isAdmin.value = roles.some(role => role.authority === 'ADMIN' || role.authority === 'STAFF');

  }
}

const logout = () => {
  localStorage.removeItem("token");
  router.push('/').then(() => {
    window.location.reload();
  });

};
checkToken();

const priceInVND = computed(() => {
  const usdPrice = getCart.value.itemSubtotalPrice;
  const exchangeRate = 24000;

  if (usdPrice) {
    const vndPrice = usdPrice * exchangeRate;
    return vndPrice.toLocaleString('en-US');
  }

  return null;
});

const fetchData = () => {
  Promise.all([fetchBrands(), fetchCategories(), fetchCart()]).then(() => {
    setDataHeader();
  });
}

onMounted(fetchData);
</script>

