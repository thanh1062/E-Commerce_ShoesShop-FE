export interface DistrictType {
    districtId?: number;
    provinceId?: number;
    name?: string;
    prefix?: string;
}

export interface DistrictResponse {
    status: boolean;
    data?: DistrictType;
    message?: string;
}

export interface ListResponse {
    status: boolean;
    data: DistrictType[];
    message?: string;
}