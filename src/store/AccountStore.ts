import Account from "@/models/Account";
import type { UserType } from "@/types/user";
import { defineStore } from "pinia";
import { ref, type Ref } from "vue";
import jwt_decode from "jwt-decode";
import { computed } from "vue";
import router from "@/router";

const useAccountStore = defineStore("account", () => {
    // State
    const user: Ref<UserType | null> = ref(null);
    const userToken: Ref<string> = ref("");
    const errorMessage = ref("");

    // Getters
    const getUser = computed(() => user);
    const getToken = computed(() => userToken);

    const getErrorMessage = computed(() => errorMessage);

    // Action
    const login = async (email: string, password: string) => {
        const localToken = localStorage.getItem("token");
        if (localToken) {
            user.value = decodeToken(localToken);
            router.push({ name: "Home" });
            return true;
        } else if (!localToken) {
            try {
                const token = await new Account().login({ email, password });
                if (token) {
                    localStorage.setItem("token", token);
                    user.value = decodeToken(token);
                    router.push({ name: "Home" });
                    return true;
                } else {
                    return false;
                }
            } catch (error) {
                if (error.response.status === 401) {

                    errorMessage.value = error.response.data;
                    console.log(errorMessage.value);

                }

            }
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        user.value = null;
        userToken.value = "";

    };

    const setToken = (newToken?: string) => {
        userToken.value = newToken || "";
    };

    const setUser = (newUser?: UserType) => {
        user.value = user!.value;
    };

    const decodeToken = (token: string): UserType => {
        userToken.value = token;
        const decodedUser = jwt_decode(token);
        const userRoles: string[] = decodedUser.user.roles?.map(
            role => role.authority
        );
        const fullName = decodedUser.user.fullName.split(" ");
        return {
            emailAddress: decodedUser.user.email,
            firstName: fullName[0],
            lastName: fullName[1],
            phoneNumber: decodedUser.user.phoneNumber,
            roles: userRoles,
        };
    };

    const getCurrentToken = ():string | null | undefined => {
        return localStorage.getItem("token");
    }
    return { getUser, getToken, login, logout, setToken, setUser, getErrorMessage, getCurrentToken };
});

export default useAccountStore;
