import { ref, computed } from "vue";
import type { ProductVariationSizeType, CreationProductVariationSizeParams, UpdateParams } from "@/types/productVariationSize";
import type { ProductType } from "@/types/product";
import { SizeType } from "@/types/size";
import ProductVariationSize from "@/models/ProductVariationSize";


const useProductVariationSizeAdminStore = () => {
  // State
  const productVariationSizes = ref<ProductVariationSizeType[]>([]);
  const productVariationSize = ref<Partial<ProductVariationSizeType>>({});

  // Getters
  const getproductVariationSizes = computed(() => productVariationSizes.value);
  const getproductVariationSize = computed(() => productVariationSize.value);

  // Mutations
  const setProductVariationSizes = (newProductVariationSizes: ProductVariationSizeType[]) => {
    productVariationSizes.value = newProductVariationSizes;
  };

  const setProductVariationSize = (newProductVariationSize: ProductVariationSizeType) => {
    productVariationSize.value = newProductVariationSize;
  };

  // Actions
  const fetchAllProductVariationSizesAdmin = async (size?: number, product?: number) => {
    const { data } = await new ProductVariationSize().list({
      size: size as SizeType,
      product: product as ProductType,
    });
    setProductVariationSizes(data);
  };

  const addProductVariationSize = async (productVariationSize: CreationProductVariationSizeParams) => {
    const { data } = await new ProductVariationSize().create(productVariationSize);
    productVariationSizes.value.push(data);
  };

  const deleteProductVariationSize = async (id: number) => {
    await new ProductVariationSize().delete(id);
    setProductVariationSize({});
    fetchAllProductVariationSizesAdmin();
  }

  const updateProductVariationSize = async (id: number, productVariationSize: UpdateParams) => {
    await new ProductVariationSize().update(id, productVariationSize);
    setProductVariationSize({});
    fetchAllProductVariationSizesAdmin();
  };

  return { getproductVariationSize, getproductVariationSizes, setProductVariationSize, fetchAllProductVariationSizesAdmin, addProductVariationSize, deleteProductVariationSize, updateProductVariationSize };
};

export default useProductVariationSizeAdminStore;
