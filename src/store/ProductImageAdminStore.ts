import ProductImage from "@/models/ProductImage";
import { ref, computed } from "vue";
import type { ProductImagesType, CreationProductImageParams, UpdateParams } from "@/types/productImages";
import ProductVariation from "@/models/ProductVariation";
import type { ProductVariationType } from "@/types/productVariation";


const useProductImageAdminStore = () => {
  // State
  const productImages = ref<ProductImagesType[]>([]);
  const productImage = ref<Partial<ProductImagesType>>({});

  // Getters
  const getproductImages = computed(() => productImages.value);
  const getproductImage = computed(() => productImage.value);

  // Mutations
  const setProductImages = (newProductImages: ProductImagesType[]) => {
    productImages.value = newProductImages;
  };

  const setProductImage = (newProductImage: ProductImagesType) => {
    productImage.value = newProductImage;
  };

  // Actions
  const fetchAllProductImagesAdmin = async (productVariation?: number) => {
    //const { data } = await new Product().productsAdmin({ brand, category });
    const { data } = await new ProductImage().list({
      productVariation: productVariation as ProductVariationType,
    });
    setProductImages(data);
  };

  const addProductImage = async (productImage: CreationProductImageParams) => {
    const { data } = await new ProductImage().create(productImage);
    productImages.value.push(data);
  };

  const deleteProductImage = async (id: number) => {
    await new ProductImage().delete(id);
    setProductImage({});
    fetchAllProductImagesAdmin();
  }

  const updateProductImage = async (id: number, productImage: UpdateParams) => {
    await new ProductImage().update(id, productImage);
    setProductImage({});
    fetchAllProductImagesAdmin();
  };

  return { getproductImage, getproductImages, setProductImage, fetchAllProductImagesAdmin, addProductImage, deleteProductImage, updateProductImage };
};

export default useProductImageAdminStore;
