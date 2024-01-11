import ReportByBrand from "@/models/ReportByBrand";
import type { reportByBrandType } from "@/types/reportByBrand";
import { ref, computed, ComputedRef } from "vue";

const useReportByBrandStore = () => {
    // State
    const reportByBrands = ref<reportByBrandType[]>([]);
    const reportByBrand = ref<reportByBrandType | null>(null);

    // Getters
    const getReportByBrands: ComputedRef<reportByBrandType[]> = computed(() => reportByBrands.value);
    const getReportByBrand: ComputedRef<reportByBrandType | null> = computed(() => reportByBrand.value);

    // Actions
    const fetchReportByBrands = async () => {
        const { data } = await new ReportByBrand().list();
        setReportByBrands(data);
        console.log(data)
    };

    // Mutations
    const setReportByBrands = (newReportByBrands: reportByBrandType[]) => {
        reportByBrands.value = newReportByBrands;
    };

    const setReportByBrand = (newReportByBrand: reportByBrandType) => {
        reportByBrand.value = newReportByBrand;
    };

    return {
        getReportByBrands,
        getReportByBrand,
        fetchReportByBrands,
        setReportByBrands,
        setReportByBrand,
    };
};

export default useReportByBrandStore;