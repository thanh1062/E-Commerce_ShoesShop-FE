<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
        <div class="w-full max-w-md p-4 bg-white rounded-md shadow-md">
            <h2 class="text-2xl font-bold mb-4">Tìm mật khẩu</h2>
            <div v-if="!emailSent">
                <p>Nhập địa chỉ email của bạn để nhận liên kết đặt lại mật khẩu.</p>
                <div class="mt-4">
                    <label for="email" class="block mb-1">Email:</label>
                    <input type="email" id="email" v-model="email" class="w-full p-2 border rounded">
                </div>
                <button @click="sendResetLink"
                    class="mt-4 w-full bg-blue-500 text-white font-bold py-2 px-4 rounded btn-color-light">
                    Gửi liên kết đặt lại mật khẩu
                </button>
            </div>
            <div v-else>
                <p class="mb-4">Một liên kết đặt lại mật khẩu đã được gửi đến địa chỉ email {{ email }}.</p>
                <p>Vui lòng kiểm tra hộp thư đến của bạn và làm theo hướng dẫn để đặt lại mật khẩu.</p>
                <button @click="goToLogin()"
                    class="mt-4 w-full bg-blue-500 text-white font-bold py-2 px-4 rounded btn-color-light">
                    Trở về trang đăng nhập
                </button>
            </div>
        </div>
    </div>
</template>
  
<script setup lang ="ts">
import { ref } from 'vue'
import useEmailStore from '@/store/EmailStore'
import { useRouter } from 'vue-router';


const router = useRouter();
const goToLogin = () => {
    router.push('/account/login');
}
const emailStore = useEmailStore();
const email = ref('')
const emailSent = ref(false); // Khởi tạo giá trị ban đầu là false

const sendResetLink = async () => {
    await emailStore.sendEmails(email.value);
    emailSent.value = true; // Cập nhật giá trị emailSent

};

</script>
  