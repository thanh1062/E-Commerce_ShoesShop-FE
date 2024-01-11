import Role from "@/models/Role";
import type { RoleType } from "@/types/RoleType";
import { ref, type Ref } from "vue";
import { defineStore } from "pinia"
import { computed } from "vue";

const useRoleStore = defineStore("role", () => {
    // state
    const roles: Ref<RoleType[]> = ref([]);
    const role: Ref<RoleType> = ref({});
    // getters
    const getRoles = computed(() => roles);
    const getRole = computed(() => role);

    //Get User
    const fetchRoles = async () => {
        const { data } = await new Role().list();
        setRoles(data);
    };


    const setRole = (newRole: RoleType) =>
        (role.value = newRole);

    const setRoles = (newRoles: RoleType[]) =>
        (roles.value = newRoles);

    return {
        getRoles,
        getRole,
        fetchRoles,

    }
});

export default useRoleStore;
