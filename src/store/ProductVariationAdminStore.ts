import ProductVariation from "@/models/ProductVariation";
import { ref, computed } from "vue";
import type { ProductVariationType, CreationProductVariationParams } from "@/types/productVariation";
import type { ProductType, CreationParams, UpdateAdminParams } from "@/types/product";
import type { ColorType } from "@/types/color";


const useProductVariationAdminStore = () => {
  // State
  const productVariations = ref<ProductVariationType[]>([]);
  const productVariation = ref<Partial<ProductVariationType>>({});

  // Getters
  const getproductVariations = computed(() => productVariations.value);
  const getproductVariation = computed(() => productVariation.value);

  // Mutations
  const setProductVariations = (newProductVariations: ProductVariationType[]) => {
    productVariations.value = newProductVariations;
  };

  const setProductVariation = (newProductVariation: ProductVariationType) => {
    productVariation.value = newProductVariation;
  };

  // Actions
  const fetchAllProductVariationsAdmin = async (color?: number, product?: number) => {
    //const { data } = await new Product().productsAdmin({ brand, category });
    const { data } = await new ProductVariation().list({
      color: color as ColorType,
      product: product as ProductType,
    });
    setProductVariations(data);
  };

  const addProductVariation = async (productVariation: CreationProductVariationParams) => {
    const { data } = await new ProductVariation().create(productVariation);
    productVariations.value.push(data);
  };

  const deleteProductVariation = async (id: number) => {
    await new ProductVariation().delete(id);
    setProductVariation({});
    fetchAllProductVariationsAdmin();
  }

  // const updateProduct = async (id: number, product: UpdateAdminParams) => {
  //   await new Product().update(id, product);
  //   setProduct({});
  //   fetchAllProductsAdmin();
  // };

  return { getproductVariation, getproductVariations, setProductVariation, fetchAllProductVariationsAdmin, addProductVariation, deleteProductVariation };
};

export default useProductVariationAdminStore;
