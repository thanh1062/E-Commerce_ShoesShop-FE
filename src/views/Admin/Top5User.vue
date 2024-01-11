<template>
    <div class="bg-slate-100 w-1/2 m-2">
        <div class="admin-report flex justify-center mt-4">
            <div>
                <div class="admin-report__title">TOP 5 KHÁCH HÀNG THÂN THIẾT</div>
            </div>
        </div>
        <div class="admin-report flex justify-center mb-4">
            <div class=" flex justify-content-center ">
                <Chart type="bar" :data="chartData" :options="chartOptionsUser" class="chart-top" />
            </div>
        </div>
    </div>
</template>
    
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import Chart from 'primevue/chart';
import { reportTopUserType } from '@/types/reportTopUser';
import useReportTopUser from '@/store/ReportTopUser';

const reportTopUserStore = useReportTopUser();
const ReportTopUsers = ref<reportTopUserType[]>([]);

/*--Report: best selling by brands--*/
onMounted(async () => {
    /*--Load Report By Brand--*/
    try {
        await reportTopUserStore.fetchReportTopUser();
        ReportTopUsers.value = reportTopUserStore.getReportTopUsers.value;
        console.log("data: ", ReportTopUsers.value)
        // Truyền ReportByBrand.name vào labels []
        const labels = ReportTopUsers.value.map((user) => user.fullname);
        chartData.value.labels = labels;
        const data = ReportTopUsers.value.map((user) => user.quantity);
        chartData.value.datasets[0].data = data;
    } catch (error) {
        console.log('Error fetching ReportByBrands', error);
    }
});
// Biểu đồ Top 5
const chartData = ref({
    labels: [],
    datasets: [
        {
            label: 'Số lượng đơn hàng đã đặt',
            data: [],
            backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)'],
            borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)'],
            borderWidth: 1
        }
    ]
});
const chartOptionsUser = ref({
    scales: {
        y: {
            beginAtZero: true,
            max: 50,
        }
    }
});

</script>
    
<style scoped>
.admin-report__title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
}

.admin-report__filters {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
}

.admin-report__filters label {
    margin-right: 10px;
}

.admin-report__summary {
    display: flex;
    margin-bottom: 20px;
}

.admin-report__summary-item {
    flex: 1;
    text-align: center;
}

.admin-report__summary-label {
    font-weight: bold;
}

.admin-report__summary-value {
    font-size: 18px;
    font-weight: bold;
    margin-top: 5px;
}

.admin-report__table {
    margin-bottom: 20px;
}

.admin-report__empty {
    text-align: center;
    font-style: italic;
    color: #999;
}

.admin-report__buttons {
    display: flex;
    justify-content: center;
    margin-top: 20px;
}

.chart-top {
    width: 34rem;
    height: 17rem;
}
</style>
    