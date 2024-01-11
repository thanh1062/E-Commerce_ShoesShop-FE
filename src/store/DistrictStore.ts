import District from "@/models/District";
import type { DistrictType } from "@/types/district";
import { defineStore } from "pinia";
import { ref, type Ref } from "vue";
import { computed } from "vue";

const useDistrictStore = defineStore("district", () => {
    // State
    const districts: Ref<DistrictType[]> = ref([]);
    const district: Ref<DistrictType | undefined> = ref();

    // Getters
    const getDistricts = computed(() => districts);
    const getDistrict = computed(() => district);
    const getDistrictsByName = computed(() => districts.value.map(d => d.name));

    // Setters
    const setDistricts = (newDistricts: DistrictType[]) => (districts.value = newDistricts);
    const setDistrict = (newDistrict: DistrictType) => (district.value = newDistrict);

    // Action
    const fetchDistricts = async () => {
        const { data } = await new District().list();
        setDistricts(data);
    };

    const fetchDistrict = async (id: number) => {
        const { data } = await new District().detail(id);
        setDistrict(data!);
    };

    return {
        fetchDistricts,
        fetchDistrict,
        getDistricts,
        getDistrict,
        getDistrictsByName
    };
});

export default useDistrictStore;