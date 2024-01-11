<template>
  <div class="flex justify-center h-full">
    <div class="bg-slate-100 w-1/2 m-2 h-full">
      <div class="admin-report flex justify-center ">
        <div>
          <div class="admin-report__title mt-4">NHÃN HIỆU BÁN CHẠY</div>
        </div>
      </div>
      <div class="admin-report flex justify-center mb-4">
        <div class=" flex justify-content-center w-1/2 ">
          <Chart type="doughnut" :data="chartData" :options="chartOptions" class="w-full md:w-30rem" />
        </div>
      </div>
    </div>
    <Top5User />
  </div>
</template>
  
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import Chart from 'primevue/chart';
import { reportByBrandType } from '@/types/reportByBrand';
import useReportByBrandStore from '@/store/ReportByBrandStore';
import Top5User from '@/views/Admin/Top5User.vue';

const reportByBrandStore = useReportByBrandStore();
const ReportByBrands = ref<reportByBrandType[]>([]);

/*--Report: best selling by brands--*/
onMounted(async () => {
  chartData.value = setChartData();
  /*--Load Report By Brand--*/
  try {
    await reportByBrandStore.fetchReportByBrands();
    ReportByBrands.value = reportByBrandStore.getReportByBrands.value;

    // Truyền ReportByBrand.name vào labels []
    const labels = ReportByBrands.value.map((brand) => brand.name);
    chartData.value.labels = labels;
    const data = ReportByBrands.value.map((brand) => brand.quantity);
    chartData.value.datasets[0].data = data;
  } catch (error) {
    console.log('Error fetching ReportByBrands', error);
  }
});

// Biểu đồ Order
const chartData = ref();
const chartOptions = ref({
  cutout: '60%'
});

const setChartData = () => {
  const documentStyle = getComputedStyle(document.body);

  return {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [documentStyle.getPropertyValue('--blue-500'), documentStyle.getPropertyValue('--yellow-500'), documentStyle.getPropertyValue('--green-500'), documentStyle.getPropertyValue('--pink-500')],
        hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--green-400'), documentStyle.getPropertyValue('--pink-400')]
      }
    ]
  };
};

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
  