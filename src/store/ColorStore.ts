import Color from "@/models/Color";
import type { ColorType, CreationParams, UpdateAdminParams } from "@/types/color";
import { ref, computed } from "vue";

const useColorStore = () => {
  // State
  const colors = ref<ColorType[]>([]);
  const color = ref<Partial<ColorType>>({});

  // Getters
  const getColors = computed(() => colors.value);
  const getColor = computed(() => color.value);

  // Mutations
  const setColors = (newColors: ColorType[]) => {
    colors.value = newColors;
  };

  const setColor = (newColor: ColorType) => {
    color.value = newColor;
  };

  // Actions
  const fetchAllColor = async () => {
    const { data } = await new Color().list({});
    setColors(data);
  };

  // const addProduct = async (product: CreationParams) => {
  //   const { data } = await new Product().create(product);
  //   products.value.push(data);
  // };

  // const deleteProduct = async (id: number) => {
  //   await new Product().delete(id);
  //   setProduct({});
  //   fetchAllProductsAdmin();
  // }

  // const updateProduct = async (id: number, product: UpdateAdminParams) => {
  //   await new Product().update(id, product);
  //   setProduct({});
  //   fetchAllProductsAdmin();
  // };

  return { getColors, getColor, fetchAllColor };
};

export default useColorStore;
