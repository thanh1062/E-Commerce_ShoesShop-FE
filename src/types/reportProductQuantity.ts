export interface reportProductQuantityType {
    name?: string;
    quantity?: number;
    color?: string;
    size?: string;
}

export interface CreationResponse {
    status: boolean;
    data: reportProductQuantityType;
    message?: string;
}

export interface ReportByProductQuantityTypeResponse {
    status: boolean;
    data?: reportProductQuantityType;
    message?: string;
}

export interface ListResponse {
    status: boolean;
    data: reportProductQuantityType[];
    message?: string;
}