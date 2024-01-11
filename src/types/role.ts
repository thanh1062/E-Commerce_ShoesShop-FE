export interface RoleType {
    roleId?: number;
    description?: string;
    code?: string;
}
export interface ListResponse {
    status: boolean;
    data: RoleType[];
    message?: string;
}