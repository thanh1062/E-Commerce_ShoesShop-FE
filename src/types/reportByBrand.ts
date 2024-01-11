export interface reportByBrandType {
    quantity?: number;
    name?: string;
}

export interface CreationResponse {
    status: boolean;
    data: reportByBrandType;
    message?: string;
}

export interface ReportByBrandTypeResponse {
    status: boolean;
    data?: reportByBrandType;
    message?: string;
}

export interface ListResponse {
    status: boolean;
    data: reportByBrandType[];
    message?: string;
}