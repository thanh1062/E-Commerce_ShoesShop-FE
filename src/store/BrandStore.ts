import Brand from "@/models/Brand";
import type { UpdateParams } from "@/types/brand";
import type { BrandType, CreationParams } from "@/types/brand";
import { defineStore } from "pinia";
import { ref, computed, Ref } from "vue";

const useBrandStore = defineStore("brand", () => {
  // State
  const brands: Ref<BrandType[]> = ref([]);
  const brand: Ref<BrandType> = ref({});

  // Getters
  const getBrands = computed(() => brands);
  const getBrand = computed(() => brand);

  // Action
  const fetchBrands = async () => {
    const { data } = await new Brand().list();
    brands.value = data;
  };

  const addBrand = async (brand: CreationParams) => {
    const { data } = await new Brand().create(brand);
    brands.value.push(data);
  };

  const updateBrand = async (id: number, updatedBrand: UpdateParams) => {
    await new Brand().update(id, updatedBrand);
    brand.value = {};
    fetchBrands();
  };

  const deleteBrand = async (id: number) => {
    await new Brand().delete(id);
    brand.value = {};
    fetchBrands();
  };

  return {
    brands,
    brand,
    getBrand,
    getBrands,
    fetchBrands,
    addBrand,
    updateBrand,
    deleteBrand,
  };
});

export default useBrandStore;
