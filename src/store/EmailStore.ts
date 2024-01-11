import Email from '@/models/Email'
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useRouter } from 'vue-router';



const useEmailStore = defineStore("email", () => {

    const emailErrorMessage = ref("");
    const getEmailErrorMessage = computed(() => emailErrorMessage);

    const router = useRouter();
    const goToLogin = () => {
        router.push('/account/login');
    }

    const sendEmails = async (email: String) => {
        try {
            const emailInstance = new Email();
            await emailInstance.sendEmail(email);
            goToLogin
        } catch (error) {
            if (error.response.status === 400) {
                emailErrorMessage.value = "Email không chính xác";
                console.log(emailErrorMessage.value);
            }
        }
    };

    return { sendEmails, getEmailErrorMessage };
});

export default useEmailStore;
