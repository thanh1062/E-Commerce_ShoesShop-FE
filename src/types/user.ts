export interface UserType {
    userId?: number;
    password?: string;
    firstName?: string;
    lastName?: string;
    emailAddress?: string;
    phoneNumber?: string;
}

export interface CreationParams {
    password?: string;
    firstName?: string;
    lastName?: string;
    emailAddress?: string;
    phoneNumber?: string;
}
// update User
export type UserParams = Omit<UserType, "id">;

export interface LoginParams {
    email: String;
    password: String;
}

export type UpdateParams = Omit<UserType, "id">;

export interface CreationResponse {
    status: boolean;
    data: UserType;
    message?: string;
}

export interface UserResponse {
    status: boolean;
    data?: UserType;
    message?: string;
}

export interface ListResponse {
    status: boolean;
    data: UserType[];
    message?: string;
}

export interface QueryUserParams {
    user?: UserType;
}
export interface PasswordChangeParams {
    newPassword?: string;
    oldPassword?: string;
}