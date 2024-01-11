import UserRole from "@/models/UserRole";
import type { UserRoleType, CreationParams, UpdateUserRoleParams } from "@/types/userRole";
import { ref, type Ref } from "vue";
import { defineStore } from "pinia"
import { computed } from "vue";
import type { RoleType } from "@/types/role";
import type { UserType } from "@/types/user";


const useUserRoleStore = defineStore("userRole", () => {
    // state
    const userRoles: Ref<UserRoleType[]> = ref([]);
    const userRole: Ref<UserRoleType> = ref({});
    // getters
    const getUserRoles = computed(() => userRoles);
    const getUserRole = computed(() => userRole);

    //Get User
    const fetchUserRoles = async (user?: number, role?: number) => {
        const { data } = await new UserRole().list({
            user: user as UserType,
            role: role as RoleType,
        });
        setUserRoles(data);
    };

    const addUserRole = async (userRole: CreationParams) => {
        const { data } = await new UserRole().create(userRole);
        userRoles.value.push(data);
    }

    const updateUserRole = async (id: number, userRole: UpdateUserRoleParams) => {
        await new UserRole().update(id, userRole);
        setUserRole({});
        fetchUserRoles();
    };

    const setUserRole = (newUser: UserRoleType) =>
        (userRole.value = newUser);

    const setUserRoles = (newUsers: UserRoleType[]) =>
        (userRoles.value = newUsers);

    return {
        getUserRoles,
        getUserRole,
        fetchUserRoles,
        addUserRole,
        updateUserRole
    }
});

export default useUserRoleStore;
