<template>
    <div class="flex justify-center items-center h-screen ">
        <div class="w-full h-full flex">
            <TabView v-model:activeIndex="active" class="custom-tabpanel">
                <TabPanel header="My Account">
                    <div class="tabPanel-sub">
                        <h2>Tài khoản của tôi</h2>
                        <div class="form-detail">
                            <div class="form-title">
                                <label for="">Mã khách hàng: {{ currentUser.userId }}</label>
                            </div>
                            <div class="form-title">
                                <label for="">Email đăng nhập: {{ currentUser.emailAddress }}</label>
                            </div>
                            <div class="form-title">
                                <label for="">Họ và tên: {{ currentUser.lastName }} {{ currentUser.firstName }}</label>
                            </div>
                            <div class="form-title">
                                <label for=""></label>
                            </div>
                            <div class="form-title">
                                <label for="">Số điên thoại: {{ currentUser.phoneNumber }}</label>
                            </div>

                            <Button label="Sửa" @click="visible = true" class="cl-button" />
                            <Button label="Đổi mật khẩu" @click="visiblePass = true" class="cl-button" />
                        </div>
                    </div>
                </TabPanel>

            </TabView>
        </div>


        <Dialog v-model:visible="visible" modal :style="{ width: '50vw' }">
            <div class="form">
                <div class="flex justify-center text-2xl font-bold mt-4">Sửa thông tin</div>
                <span class="form-value">
                    <label for="">Mã khách hàng</label>
                    <InputText id="userId" v-model="currentUser.userId" readonly />
                </span>
                <span class="form-value">
                    <label for="">Email:</label>
                    <InputText id="email" v-model="currentUser.emailAddress" readonly />
                </span>
                <span class="form-value">
                    <label for="">Họ :</label>
                    <InputText id="lastnameValue" v-model="currentUser.lastName" />
                    <span v-if="lastNameError" class="text-red-500">{{ lastNameError }}</span>
                </span>
                <span class="form-value">
                    <label for="">Tên:</label>
                    <InputText id="firstnameValue" v-model="currentUser.firstName" />
                    <span v-if="firstNameError" class="text-red-500">{{ firstNameError }}</span>
                </span>
                <span class="form-value">
                    <label for="">Số điện thoại:</label>
                    <InputText id="phoneNumberValue" v-model="currentUser.phoneNumber" />
                    <span v-if="phoneNumberError" class="text-red-500">{{ phoneNumberError }}</span>
                </span>

            </div>
            <template #footer>
                <Button label="Huỷ" icon="pi pi-times" @click="visible = false" text
                    style="background-color: #00008B; color: white;" />
                <Button label="Lưu" icon="pi pi-check" @click="saveUser" autofocus
                    style="background-color: #00008B; color: white;" />
            </template>
        </Dialog>
        <Dialog v-model:visible="visiblePass" modal :style="{ width: '50vw' }">
            <div class="form">
                <div class="flex justify-center text-2xl font-bold mt-4">Đổi mật khẩu</div>
                <span class="form-value">
                    <label for="">Mật khẩu cũ:</label>
                    <InputText type="password" id="oldPassword" v-model="oldPasswordValue" placeholder="Mật khẩu củ" />
                    <span v-if="oldPasswordError" class="text-red-500">{{ oldPasswordError }}</span>
                </span>
                <span class="form-value">
                    <label for="">Mật khẩu mới:</label>
                    <InputText type="password" id="newPassword1" v-model="newPasswordValue1" placeholder="Mật khẩu mới" />
                    <span v-if="newPasswordError1" class="text-red-500">{{ newPasswordError1 }}</span>
                </span>
                <span class="form-value">
                    <label for="">Nhập lại mật khẩu mới:</label>
                    <InputText type="password" id="newPassword" v-model="newPasswordValue" placeholder="Mật khẩu mới" />
                    <span v-if="newPasswordError" class="text-red-500">{{ newPasswordError }}</span>
                </span>
                <div v-if="changeError">Mật khẩu mới không trùng nhau</div>
                <label class="errorMessage" v-if="getChangeErrorMessage !== '' || getChangeErrorMessage !== undefined">{{
                    getChangeErrorMessage }}</label>
            </div>
            <template #footer>
                <Button label="Huỷ" icon="pi pi-times" @click="visiblePass = false" text
                    style="background-color: #00008B; color: white;" />
                <Button label="Lưu" icon="pi pi-check" @click="updatePass" autofocus
                    style="background-color: #00008B; color: white;" />
            </template>
        </Dialog>
    </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel'
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import useUserStore from '@/store/UserStore';
import { UserType, UserParams, CreationParams, PasswordChangeParams } from '@/types/user';
import jwt_decode from "jwt-decode";

const visiblePass = ref(false);
const visible = ref(false);
const active = ref(0);
const userStore = useUserStore();
const users = ref<UserType[]>([]);
const currentUser = ref<UserType>({});
const tableKey = ref(0);

const { getChangeErrorMessage } = useUserStore();

const valueToken = localStorage.getItem('token');
const userValue = jwt_decode(valueToken!);
const email = userValue.user.email;

const oldPasswordValue = ref(null);
const newPasswordValue1 = ref(null);
const newPasswordValue = ref(null);

const changeError = ref(false);


const lastNameError = ref('');
const firstNameError = ref('');
const phoneNumberError = ref('');

const updatePass = async () => {
    validateChangePass();
    if (newPasswordValue.value === newPasswordValue1.value && validateChangePass()) {
        const pass: PasswordChangeParams = {
            oldPassword: oldPasswordValue.value!,
            newPassword: newPasswordValue.value!
        };
        await userStore.changePass(currentUser.value.userId, pass);


        currentUser.value = userStore.getUser.value;

        // visiblePass.value = false;
        changeError.value = false;

    } else {
        console.log("Sai mật khẩu mới")
        changeError.value = true;
    };

};



const searchByEmail = async () => {

    await userStore.fetchByEmail(email);

    currentUser.value = userStore.getUser.value;

    tableKey.value++;

};
const showEditDialog = (user: UserType) => {
    currentUser.value = { ...user };
    visible.value = true;

};

onMounted(searchByEmail);
const saveUser = async () => {
    if (validatePhoneNumber()) {
        // Thực hiện cập nhật danh mục
        try {
            await userStore.updateUser(currentUser.value.userId, currentUser.value as UserParams);
            await userStore.fetchByEmail(email);
            currentUser.value = userStore.getUser.value;
            tableKey.value++; // Force DataTable re-render
            window.location.reload();

        } catch (error) {
            console.error('Error updating user:', error);
            // Xử lý lỗi
        }
        currentUser.value = {};
        visible.value = false;
    }
}


function validatePhoneNumber() {
    lastNameError.value = currentUser.value.lastName ? '' : 'LastName is required.';
    firstNameError.value = currentUser.value.firstName ? '' : 'firstName is required.';


    const phoneNumberRegex = /^(0[2-9]|84[2-9])(\d{8})$/;
    if (!currentUser.value.phoneNumber) {
        phoneNumberError.value = 'Phone Number is required.';
    } else if (!phoneNumberRegex.test(currentUser.value.phoneNumber)) {
        phoneNumberError.value = 'Invalid phone number format.';
    } else {
        phoneNumberError.value = '';
    }
    if (firstNameError.value || lastNameError.value || phoneNumberError.value
    ) {
        return false;
    }
    return true;
}
const oldPasswordError = ref('');
const newPasswordError1 = ref('');
const newPasswordError = ref('');
function validateChangePass() {
    oldPasswordError.value = oldPasswordValue.value ? '' : 'Password không được để trống.';
    newPasswordError1.value = newPasswordValue1.value ? '' : 'Password không được để trống.';
    newPasswordError.value = newPasswordValue.value ? '' : 'Password không được để trống.';
    if (oldPasswordError.value || newPasswordError1.value || newPasswordError.value
    ) {
        return false;
    }

    return true;
}
</script>
<style></style>
  