<template>
    <div class="flex justify-center px-4" @click="router.push('/')">
        <Image :src="Logo" alt="Image" width="150" />
    </div>
    <div class="mx-auto flex justify-center">
        <Card style="width: 25rem;">
            <template #title> {{ $t('signin') }} </template>
            <template #content>
                <div class="mb-4">
                    <label for="email">Email</label>
                    <InputText id="email" v-model="emailValue" placeholder="example@gmail.com" class="w-full" />
                    <span v-if="emailError" class="text-red-500">{{ emailError }}</span>
                </div>
                <div class="mb-4">
                    <div class="flex justify-between">
                        <label for="password">{{ $t('pass') }} </label>
                        <a class="block text-sm text-indigo-700 fontme hover:underline" href="/account/fogot">Tìm lại mật
                            khẩu?</a>
                    </div>
                    <Password v-model="passwordValue" placeholder="Password" :feedback="false" class="w-full w-inherit" />
                    <a class="block text-sm text-indigo-700 fontme hover:underline mt-2" href="/account/fogot">{{
                        $t('forgotpass') }}
                    </a>
                    <span v-if="passwordError" class="text-red-500">{{ passwordError }}</span>
                </div>
                <div class="flex">
                    <label class="inline-flex items-center">
                        <input type="checkbox"
                            class="text-indigo-600 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500" />
                        <span class="mx-2 text-sm text-gray-600">{{ $t('rememberme') }} </span>
                    </label>
                </div>

                <p class="errorMessage" v-if="getErrorMessage !== '' || getErrorMessage !== undefined">{{ getErrorMessage }}
                </p>
            </template>
            <template #footer>
                <Button type="submit" :label="$t('signin')" @click="validateForm()"
                    class="w-full px-4 py-2 text-sm text-center text-white bg-indigo-600 rounded-md focus:outline-none hover:bg-indigo-500 btn-color-light" />
                <span class="divider text-gray-500 text-sm">{{ $t('new-mem') }} </span>
                <Button type="submit" :label="$t('create')" @click="goToRegistration"
                    class="w-full px-4 py-2 text-sm text-center text-white bg-indigo-600 rounded-md focus:outline-none hover:bg-indigo-500 btn-color-light" />
            </template>
        </Card>
    </div>
</template>

<script setup lang="ts">
import Password from 'primevue/password';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Card from 'primevue/card';
import Logo from "@/assets/images/logo.png";
import Image from 'primevue/image';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import useAccountStore from "@/store/AccountStore";
import { useLanguageStore } from '@/store/language';
import { translate } from '@/i18n';

const $t = translate;
const languageStore = useLanguageStore();

const router = useRouter();
const emailValue = ref('');
const passwordValue = ref('');

const emailError = ref('');
const passwordError = ref('');


const isLogin = ref(false);

const { login, getErrorMessage } = useAccountStore();


async function validateForm() {
    emailError.value = emailValue.value ? '' : 'Email không được để trống.';
    passwordError.value = passwordValue.value ? '' : 'Password không được để trống.';

    // Kiểm tra định dạng email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailValue.value && !emailRegex.test(emailValue.value)) {
        emailError.value = 'Sai định dạng email.';
    }

    // Kiểm tra xem có lỗi không
    if (emailError.value || passwordError.value) {
        return false;
    }

    await login(emailValue.value, passwordValue.value);

    isLogin.value = true;

    return true;
}

const goToRegistration = () => {
    router.push('/account/register');
}
</script>