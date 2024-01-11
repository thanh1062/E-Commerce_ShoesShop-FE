import type { RoleType } from "./role";
import type { UserType } from "./user";

export interface UserRoleType {
    userRoleId?: number;
    userId?: number;
    roleId?: number;
    user?: UserType;
    role?: RoleType;
}

export interface CreationParams {
    user?: UserType;
    role?: RoleType;
}

export interface UserRoleResponse {
    status: boolean;
    data?: UserRoleType;
    message?: string;
}
export type UpdateUserRoleParams = Omit<UserRoleType, "id">;

export interface ListResponse {
    status: boolean;
    data?: UserRoleType[];
    message?: string;
}

export interface UserRoleParams {
    user?: UserType;
    role?: RoleType;
}

export interface CategoryResponse {
    status: boolean;
    data?: UserRoleType;
    message?: string;
}