export interface ProvinceType {
    provinceId?: number;
    name?: string;
    code?: string;
}
export interface ProvinceResponse {
    status: boolean;
    data?: ProvinceType;
    message?: string;
}

export interface ListResponse {
    status: boolean;
    data: ProvinceType[];
    message?: string;
}