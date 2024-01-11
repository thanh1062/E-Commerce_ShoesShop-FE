import Ward from "@/models/Ward";
import type { WardType } from "@/types/ward";
import { defineStore } from "pinia";
import { ref, type Ref } from "vue";
import { computed } from "vue";

const useWardStore = defineStore("ward", () => {
    // State
    const wards: Ref<WardType[]> = ref([]);
    const ward: Ref<WardType | undefined> = ref();

    // Getters
    const getWards = computed(() => wards);
    const getWard = computed(() => ward);

    // Setters
    const setWards = (newWards: WardType[]) => (wards.value = newWards);
    const setWard = (newWard: WardType) => (ward.value = newWard);

    // Action
    const fetchWards = async () => {
        const { data } = await new Ward().list();
        setWards(data);
    };

    const fetchWard = async (id: number) => {
        const { data } = await new Ward().detail(id);
        setWard(data!);
    };

    return {
        fetchWards,
        fetchWard,
        getWards,
        getWard,
        setWard,
    };
});

export default useWardStore;