import ReportByProductQuantity from "@/models/ReportByProductQuantity";
import type { reportProductQuantityType } from "@/types/reportProductQuantity";
import { ref, computed, ComputedRef } from "vue";

const useReportByProductQuantiy = () => {
    // State
    const reportByProductQuantitys = ref<reportProductQuantityType[]>([]);
    const reportByProductQuantity = ref<reportProductQuantityType | null>(null);

    // Getters
    const getByProductQuantitys: ComputedRef<reportProductQuantityType[]> = computed(() => reportByProductQuantitys.value);
    const getByProductQuantity: ComputedRef<reportProductQuantityType | null> = computed(() => reportByProductQuantity.value);

    // Actions
    const fetchReportProductQuantity = async () => {
        const { data } = await new ReportByProductQuantity().list();
        setReportByProductQuantitys(data);
        console.log(data)
    };

    // Mutations
    const setReportByProductQuantitys = (newreportByProductQuantitys: reportProductQuantityType[]) => {
        reportByProductQuantitys.value = newreportByProductQuantitys;
    };

    const setReportByProductQuantity = (newreportByProductQuantity: reportProductQuantityType) => {
        reportByProductQuantity.value = newreportByProductQuantity;
    };

    return {
        getByProductQuantitys,
        getByProductQuantity,
        fetchReportProductQuantity,
        setReportByProductQuantity,
        setReportByProductQuantitys,
    };
};

export default useReportByProductQuantiy;