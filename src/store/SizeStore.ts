import Size from "@/models/Size";
import type { SizeType } from "@/types/size";
import { defineStore } from "pinia";
import { ref, type Ref } from "vue";
import { computed } from "vue";

const useSizeStore = defineStore("size", () => {
    // State
    const sizes: Ref<SizeType[]> = ref([]);

    // Getters
    const getSizes = computed(() => sizes);

    // Setters
    const setSizes = (newSizes: SizeType[]) => (sizes.value = newSizes);

    // Action
    const fetchSizes = async () => {
        const { data } = await new Size().list();
        setSizes(data);
    };

    return {
        fetchSizes,
        getSizes,
    };
});

export default useSizeStore;