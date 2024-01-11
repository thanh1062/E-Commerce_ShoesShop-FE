import Product from "@/models/Product";
import type { ProductType, CreationParams, UpdateAdminParams } from "@/types/product";
import { ref, computed } from "vue";
import type { BrandType } from "@/types/brand";
import type { CategoryType } from "@/types/category";

const useProductAdminStore = () => {
  // State
  const products = ref<ProductType[]>([]);
  const product = ref<Partial<ProductType>>({});

  // Getters
  const getProducts = computed(() => products.value);
  const getProduct = computed(() => product.value);

  // Mutations
  const setProducts = (newProducts: ProductType[]) => {
    products.value = newProducts;
  };

  const setProduct = (newProduct: ProductType) => {
    product.value = newProduct;
  };

  // Actions
  const fetchAllProductsAdmin = async (brand?: number, category?: number) => {
    //const { data } = await new Product().productsAdmin({ brand, category });
    const { data } = await new Product().productsAdmin({
      brand: brand as BrandType,
      category: category as CategoryType,
    });
    setProducts(data);
  };

  const addProduct = async (product: CreationParams) => {
    const { data } = await new Product().create(product);
    products.value.push(data);
  };

  const deleteProduct = async (id: number) => {
    await new Product().delete(id);
    setProduct({});
    fetchAllProductsAdmin();
  }

  const updateProduct = async (id: number, product: UpdateAdminParams) => {
    await new Product().update(id, product);
    setProduct({});
    fetchAllProductsAdmin();
  };


  // const fetchAllProducts = async (brand?: number, category?: number) => {
  //   const { data } = await new Product().list({ brand, category });
  //   productList.value = data.filter((product, index, productList) => {
  //     return productList.map(product => product.product?.productId).indexOf(product.product?.productId) === index;
  //   })
  // };

  // const fetchOneProduct = async (id: number) => {
  //   const { data } = await new Product().detail(id);
  //   product.value = data!;
  // };

  return { getProduct, getProducts, fetchAllProductsAdmin, addProduct, deleteProduct, updateProduct };
};

export default useProductAdminStore;
