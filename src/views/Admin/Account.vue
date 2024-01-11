<template>
  <div class="account-management">
    <h1 class="flex justify-center text-3xl font-bold mb-4">QUẢN LÝ TÀI KHOẢN</h1>

    <div class="account-management__admin-accounts">
      <div class="card flex justify-content-center">
        <input type="text" v-model="searchEmail" placeholder="Tìm kiếm email" class="md:w-20rem w-full h-10"
          @input="searchByEmail" />

      </div>
      <DataTable :value="users" :paginator="true" :rows="5" :rows-per-page-options="[5, 10, 25]" :key="tableKey">
        <Column field="userId" header="ID"></Column>
        <Column field="emailAddress" header="Email"></Column>
        <Column field="lastName" header="Họ"></Column>
        <Column field="firstName" header="Tên"></Column>
        <Column field="phoneNumber" header="Số điện thoại"></Column>
        <Column header="Hành động">
          <template #body="rowData">
            <Button class="p-button-sm p-button-danger" label="Xóa" icon="pi pi-trash"
              @click="showDeleteDialog(rowData.data)"></Button>
          </template>
        </Column>
      </DataTable>
    </div>



    <div class="account-management__admin-accounts">
      <h2 class="flex justify-center text-3xl font-bold mb-4">PHÂN QUYỀN</h2>
      <div class="card flex justify-content-center">
        <Dropdown v-model="selectedRole" @update:model-value="onSelectRole" :options="roles" optionLabel="code"
          placeholder="Chọn quyền" class="w-full md:w-14rem" />
      </div>
      <div class="card flex justify-content-center">
        <input type="text" v-model="searchRole" placeholder="Tìm kiếm email" class="md:w-20rem w-full h-10"
          @input="searchByRole" />

      </div>
      <DataTable :value="userRoles" :paginator="true" :rows="5" :rows-per-page-options="[5, 10, 25]" :key="tableKey">

        <Column field="user.userId" header="ID User"></Column>
        <Column field="user.emailAddress" header="Email"></Column>
        <Column field="roleId" header="Khách hàng">
          <template #body="rowData">
            <RadioButton v-model="rowData.data.roleId" :value="1" @click="dataUserRole(rowData.data, 1)" />
          </template>
        </Column>
        <Column field="roleId" header="Nhân viên">
          <template #body="rowData">
            <RadioButton v-model="rowData.data.roleId" :value="2" @click="dataUserRole(rowData.data, 2)" />
          </template>
        </Column>
        <Column field="roleId" header="Quản lý">
          <template #body="rowData">
            <RadioButton v-model="rowData.data.roleId" :value="3" @click="dataUserRole(rowData.data, 3)" />
          </template>
        </Column>

      </DataTable>
    </div>



    <!-- Delete -->
    <Dialog v-model="deleteDialogVisible" :visible="deleteDialogVisible" header="Xác nhận xóa" :closable="false"
      class="category-list__dialog">
      <p>Bạn có chắc chắn muốn xóa User này?</p>

      <template #footer>
        <div class="category-list__dialog-buttons">
          <Button class="p-button-danger" label="Xóa" @click="deleteUser"></Button>
          <Button class="p-button-secondary" label="Hủy" @click="cancelDelete"></Button>
        </div>
      </template>
    </Dialog>
  </div>
</template>
  
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Dropdown from 'primevue/dropdown';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import useUserStore from '@/store/UserStore';
import useUserRoleStore from '@/store/UserRoleStore';
import useRoleStore from '@/store/RoleStore';
import { UserType, UserParams, CreationParams } from '@/types/user';
import { UserRoleType, UpdateUserRoleParams } from '@/types/userrole';
import { RoleType } from '@/types/role';
import RadioButton from 'primevue/radiobutton';

const deleteDialogVisible = ref(false);
const userStore = useUserStore();
const userRoleStore = useUserRoleStore();
const roleStore = useRoleStore();
const dialogVisible = ref(false);
const tableKey = ref(0);

const users = ref<UserType[]>([]);
const currentUser = ref<UserType>({});

const userRoles = ref<UserRoleType[]>([]);
const currentUserRole = ref<UserRoleType>({});

const roles = ref<RoleType[]>([]);
const currentRole = ref<RoleType>({});

const selectedRole = ref<any>(null);



const onSelectRole = () => {
  userRoles.value = userRoleStore.getUserRoles.value;
  if (selectedRole.value !== null) {
    userRoles.value = userRoles.value.filter((role) => role.role?.code === selectedRole.value.code);
  } else {
    userRoles.value = userRoleStore.getUserRoles.value;
  }

}
const searchRole = ref('');
const searchByRole = () => {
  userRoles.value = userRoleStore.getUserRoles.value;
  if (searchRole.value === '') {
    userRoles.value = userRoleStore.getUserRoles.value;

  } else {
    userRoles.value = userRoles.value.filter((role) => role.user?.emailAddress === searchRole.value);
    tableKey.value++;
  }
};
onMounted(async () => {
  if (searchEmail.value === '') {
    try {
      await userStore.fetchUsers();
      users.value = userStore.getUsers.value;

    } catch (error) {

    }
  } else {
    await userStore.fetchByKey(searchEmail.value);

    users.value = userStore.getUsers.value;

    tableKey.value++;
  };





  try {
    await userRoleStore.fetchUserRoles();
    userRoles.value = userRoleStore.getUserRoles.value;
  } catch (error) {

  };
  try {
    await roleStore.fetchRoles();
    roles.value = roleStore.getRoles.value;
  } catch (error) {

  }

});
//search
const searchEmail = ref('');


const searchByEmail = async () => {

  if (searchEmail.value === '') {
    try {
      await userStore.fetchUsers();
      users.value = userStore.getUsers.value;

    } catch (error) {

    }
  } else {
    await userStore.fetchByKey(searchEmail.value);

    users.value = userStore.getUsers.value;
    console.log(users.value);
    tableKey.value++;
  }
};






const dataUserRole = async (updateUserRole: UserRoleType, newRoleId: number) => {

  currentUserRole.value = { ...updateUserRole, roleId: newRoleId };

  const newUserRole: UpdateUserRoleParams = {
    userRoleId: currentUserRole.value.userRoleId,
    userId: currentUserRole.value.user?.userId,
    user: currentUserRole.value.user!,
    roleId: currentUserRole.value.roleId!,
    role: currentUserRole.value.role!
  }

  saveUserRole(newUserRole, currentUserRole.value.userRoleId);
};


//Update user role
const saveUserRole = async (newUserRole: UpdateUserRoleParams, newUserRoleId: number) => {
  await userRoleStore.updateUserRole(newUserRoleId, newUserRole);
  await userRoleStore.fetchUserRoles();
  userRoles.value = userRoleStore.getUserRoles.value;
  alert("Thay quyền thành công")
  currentUserRole.value = {};
  dialogVisible.value = false;
}




// show delete
const showDeleteDialog = (user: UserType) => {
  currentUser.value = { ...user };

  deleteDialogVisible.value = true;
};



//Delete User
const deleteUser = async () => {
  try {
    await userStore.deleteUser(currentUser.value.userId);
    await userStore.fetchUsers();
    users.value = userStore.getUsers.value;
    window.location.reload();
    tableKey.value += 1; // Force DataTable re-render
  } catch (error) {
    console.error('Error deleting category:', error);
    // Xử lý lỗi
  }

  currentUser.value = {};
  deleteDialogVisible.value = false;
  await userStore.fetchUsers();
};

function cancelDelete() {
  deleteDialogVisible.value = false;
}




</script>
  
<style scoped>
.account-management__title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.account-management__stats {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.account-management__stat {
  text-align: center;
}

.account-management__stat-value {
  font-size: 20px;
  font-weight: bold;
}

.account-management__stat-label {
  font-size: 14px;
  color: gray;
}

.account-management__admin-accounts,
.account-management__user-accounts {
  margin-bottom: 20px;
}

.account-management__section-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

.account-management__dialog {
  width: 1000px;
}

.account-management__dialog-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style>
  