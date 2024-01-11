import { ref, type Ref } from "vue";
import { defineStore } from "pinia";
import { computed } from "vue";
import { ProductVariationType } from "@/types/productVariation";
import { Product } from "@/types/product";
import Product from "@/models/Product";

const useProductStore = defineStore("product", () => {
  // State
  const productList: Ref<ProductVariationType[]> = ref([]);
  const product: Ref<ProductVariationType> = ref({});
  const products: Ref<ProductVariationType[]> = ref([]);

  // Getters
  const getProducts = computed(() => productList);
  const getProduct = computed(() => product);
  const getAllProducts = computed(() => products);

  // Actions
  const fetchAllProducts = async (brand?: number, category?: number) => {
    const { data } = await new Product().list({ brand, category });
    productList.value = data.filter((product, index, productList) => {
      return productList.map(product => product.product?.productId).indexOf(product.product?.productId) === index;
    })
  };

  const fetchOneProduct = async (id: number) => {
    const { data } = await new Product().detail(id);
    product.value = data!;
    await fetchProducts();
  };

  const fetchProducts = async (productId: number) => {
    const { data } = await new Product().list({ productId: productId });
    products.value = data;
  }

  return { getProduct, getProducts, getAllProducts, fetchAllProducts, fetchOneProduct, fetchProducts };
});

export default useProductStore;
