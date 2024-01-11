import Province from "@/models/Province";
import type { ProvinceType } from "@/types/province";
import { defineStore } from "pinia";
import { ref, type Ref } from "vue";
import { computed } from "vue";

const useProvinceStore = defineStore("province", () => {
    // State
    const provinces: Ref<ProvinceType[]> = ref([]);
    const province: Ref<ProvinceType | undefined> = ref();

    // Getters
    const getProvinces = computed(() => provinces);
    const getProvince = computed(() => province);

    // Setters
    const setProvinces = (newProvinces: ProvinceType[]) => (provinces.value = newProvinces);
    const setProvince = (newProvince: ProvinceType) => (province.value = newProvince);

    // Action
    const fetchProvinces = async () => {
        const { data } = await new Province().list();
        setProvinces(data);
    };

    const fetchProvince = async (id: number) => {
        const { data } = await new Province().detail(id);
        setProvince(data!);
    };

    return {
        fetchProvinces,
        fetchProvince,
        getProvinces,
        getProvince,
    };
});

export default useProvinceStore;