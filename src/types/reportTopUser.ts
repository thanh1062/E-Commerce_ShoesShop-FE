export interface reportTopUserType {
    quantity?: number;
    fullname?: string;
}

export interface CreationResponse {
    status: boolean;
    data: reportTopUserType;
    message?: string;
}

export interface ReportTopUserTypeResponse {
    status: boolean;
    data?: reportTopUserType;
    message?: string;
}

export interface ListResponse {
    status: boolean;
    data: reportTopUserType[];
    message?: string;
}