import type { CategoryType } from "./category";

export interface SizeType {
    sizeId?: number;
    category?: CategoryType;
    value?: string;
    code?: string
}

export interface ListResponse {
    status: boolean;
    data: SizeType[];
    message?: string;
}