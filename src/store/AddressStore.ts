import Address from "@/models/Address";
import type { AddressType, CreationParams, UpdateParams } from "@/types/address";
import { DistrictType } from "@/types/district";
import { ProvinceType } from "@/types/province";
import { WardType } from "@/types/ward";
import { defineStore } from "pinia";
import { ref, type Ref } from "vue";
import { computed } from "vue";

const useAddressStore = defineStore("address", () => {
    // State
    const addresses: Ref<AddressType[]> = ref([]);
    const address: Ref<AddressType | undefined> = ref();

    // Getters
    const getAddresses = computed(() => addresses);
    const getAddress = computed(() => address);

    // Setters
    const setAddresses = (newAddresses: AddressType[]) => (addresses.value = newAddresses);
    const setAddress = (newAddress: AddressType) => (address.value = newAddress);

    // Action
    const fetchAddresses = async () => {
        const { data } = await new Address().list();
        setAddresses(data);
    };

    const fetchAddress = async (id: number) => {
        const { data } = await new Address().detail(id);
        setAddress(data!);
    };

    const addAddress = async (newAddress: CreationParams) => {
        const { data } = await new Address().create(newAddress);
        setAddress(data!);
    }

    const updateAddress = async (id: number, updateAddress: UpdateParams) => {
        const { data } = await new Address().update(id, updateAddress);
        setAddress(data!);
    }

    const deleteAddress = async (id: number) => {
        await new Address().delete(id);
    };

    return {
        fetchAddresses,
        fetchAddress,
        getAddresses,
        getAddress,
        addAddress,
        updateAddress,
    };
});

export default useAddressStore;