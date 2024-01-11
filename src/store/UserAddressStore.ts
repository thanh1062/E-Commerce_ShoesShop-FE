import UserAddress from "@/models/UserAddress";
import type { QueryUserAddressParams, UserAddressType } from "@/types/userAddress";
import { defineStore } from "pinia";
import { ref, type Ref } from "vue";
import { computed } from "vue";

const useUserAddressStore = defineStore("userAddress", () => {
    // State
    const userAddresses: Ref<UserAddressType[]> = ref([]);
    const userAddressDefault: Ref<UserAddressType | undefined> = ref();

    // Getters
    const getUserAddresses = computed(() => userAddresses);
    const getUserAddress = computed(() => userAddressDefault);

    // Setters

    // Action
    const fetchUserAddresses = async (params: QueryUserAddressParams) => {
        const { data } = await new UserAddress().list(params);
        userAddresses.value = data;
    };

    const fetchUserDefaultAddress = async (params: QueryUserAddressParams) => {
        const { data } = await new UserAddress().list(params);
        userAddressDefault.value = data[0];
    };

    const addUserAddress = async (newUserAddress: UserAddressType) => {
        const { data } = await new UserAddress().create(newUserAddress);
        userAddressDefault.value = data;
    }

    return {
        fetchUserAddresses,
        fetchUserDefaultAddress,
        getUserAddresses,
        getUserAddress,
        addUserAddress,
    };
});

export default useUserAddressStore;