import ReportTopUser from "@/models/ReportTopUser";
import type { reportTopUserType } from "@/types/reportTopUser";
import { ref, computed, ComputedRef } from "vue";

const useReportTopUser = () => {
    // State
    const reportTopUsers = ref<reportTopUserType[]>([]);
    const reportTopUser = ref<reportTopUserType | null>(null);

    // Getters
    const getReportTopUsers: ComputedRef<reportTopUserType[]> = computed(() => reportTopUsers.value);
    const getReportTopUser: ComputedRef<reportTopUserType | null> = computed(() => reportTopUser.value);

    // Actions
    const fetchReportTopUser = async () => {
        const { data } = await new ReportTopUser().list();
        setReportTopUsers(data);
        console.log(data)
    };

    // Mutations
    const setReportTopUsers = (newReportTopUsers: reportTopUserType[]) => {
        reportTopUsers.value = newReportTopUsers;
    };

    const setReportTopUser = (newReportTopUser: reportTopUserType) => {
        reportTopUser.value = newReportTopUser;
    };

    return {
        getReportTopUser,
        getReportTopUsers,
        fetchReportTopUser,
        setReportTopUser,
        setReportTopUsers,
    };
};

export default useReportTopUser;