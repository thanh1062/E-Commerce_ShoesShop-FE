<template>
  <div class="admin-report">
    <h1 class="admin-report__title">Báo cáo admin</h1>

    <div class="admin-report__filters">
      <label for="startDate">Từ ngày:</label>
      <Calendar v-model="startDate" id="startDate" :showIcon="true" :readonlyInput="true"></Calendar>

      <label for="endDate">Đến ngày:</label>
      <Calendar v-model="endDate" id="endDate" :showIcon="true" :readonlyInput="true"></Calendar>

      <Button class="p-button p-button-secondary" label="Tìm kiếm" @click="fetchReportData"></Button>
    </div>

    <div class="admin-report__summary">
      <div class="admin-report__summary-item">
        <div class="admin-report__summary-label">Tổng doanh thu tuần:</div>
        <div class="admin-report__summary-value">{{ weeklyRevenue }}</div>
      </div>
      <div class="admin-report__summary-item">
        <div class="admin-report__summary-label">Tổng doanh thu tháng:</div>
        <div class="admin-report__summary-value">{{ monthlyRevenue }}</div>
      </div>
      <div class="admin-report__summary-item">
        <div class="admin-report__summary-label">Tổng số lượng hàng đã bán tuần:</div>
        <div class="admin-report__summary-value">{{ weeklyTotalQuantity }}</div>
      </div>
      <div class="admin-report__summary-item">
        <div class="admin-report__summary-label">Tổng số lượng hàng đã bán tháng:</div>
        <div class="admin-report__summary-value">{{ monthlyTotalQuantity }}</div>
      </div>
    </div>

    <div class="admin-report__table" v-if="reportData.length > 0">
      <DataTable :value="reportData" :paginator="true" :rows="10" :rows-per-page-options="[5, 10, 25]">
        <Column field="userId" header="ID người dùng"></Column>
        <Column field="userName" header="Tên người dùng"></Column>
        <Column field="totalOrders" header="Tổng số đơn hàng"></Column>
        <Column field="totalRevenue" header="Tổng doanh thu"></Column>
      </DataTable>
    </div>

    <div v-else class="admin-report__empty">
      Không có dữ liệu báo cáo
    </div>

    <input type="file" id="fileInput" style="display: none" @change="handleFileInputChange" />
    <div class="admin-report__buttons">
      <Button class="p-button p-button-secondary" label="Nhập Excel" @click="handleImportClick"></Button>
      <Button class="p-button p-button-secondary" label="Xuất Excel" @click="exportExcel"></Button>
    </div>
  </div>
</template>
  
<script setup lang="ts">
import { ref, computed } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import Calendar from 'primevue/calendar';

interface ReportData {
  userId: string;
  userName: string;
  totalOrders: number;
  totalRevenue: number;
}

const startDate = ref<Date | null>(null);
const endDate = ref<Date | null>(null);
const reportData = ref<ReportData[]>([]);
const weeklyRevenue = computed(() => calculateWeeklyRevenue(reportData.value));
const monthlyRevenue = computed(() => calculateMonthlyRevenue(reportData.value));
const weeklyTotalQuantity = computed(() => calculateWeeklyTotalQuantity(reportData.value));
const monthlyTotalQuantity = computed(() => calculateMonthlyTotalQuantity(reportData.value));

function fetchReportData() {
  // Kiểm tra xem startDate và endDate có được chọn hay không
  if (!startDate.value || !endDate.value) {
    return;
  }

  // Giả sử có dữ liệu mẫu
  const sampleData: ReportData[] = [
    {
      userId: "1",
      userName: "Người dùng 1",
      totalOrders: 10,
      totalRevenue: 5000,
    },
    {
      userId: "2",
      userName: "Người dùng 2",
      totalOrders: 5,
      totalRevenue: 3000,
    },
    {
      userId: "3",
      userName: "Người dùng 3",
      totalOrders: 3,
      totalRevenue: 2000,
    },
  ];

  // Gán dữ liệu mẫu vào reportData
  reportData.value = sampleData;
}

function calculateWeeklyRevenue(data: ReportData[]): number {
  // Logic tính toán tổng doanh thu tuần từ dữ liệu báo cáo
  return data.reduce((total, item) => total + item.totalRevenue, 0);
}

function calculateMonthlyRevenue(data: ReportData[]): number {
  // Logic tính toán tổng doanh thu tháng từ dữ liệu báo cáo
  return data.reduce((total, item) => total + item.totalRevenue, 0);
}

function calculateWeeklyTotalQuantity(data: ReportData[]): number {
  // Logic tính toán tổng số lượng hàng đã bán tuần từ dữ liệu báo cáo
  return data.reduce((total, item) => total + item.totalOrders, 0);
}

function calculateMonthlyTotalQuantity(data: ReportData[]): number {
  // Logic tính toán tổng số lượng hàng đã bán tháng từ dữ liệu báo cáo
  return data.reduce((total, item) => total + item.totalOrders, 0);
}

function handleFileInputChange(event: Event) {
  const fileInput = event.target as HTMLInputElement;
  const file = fileInput.files?.[0];
  // Xử lý file đầu vào
}

function handleImportClick() {
  const fileInput = document.getElementById('fileInput');
  if (fileInput) {
    (fileInput as HTMLInputElement).click();
  }
}

function exportExcel() {
  // Logic xuất file Excel
}

</script>
  
<style scoped>
.admin-report {
  padding: 20px;
}

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
</style>
  