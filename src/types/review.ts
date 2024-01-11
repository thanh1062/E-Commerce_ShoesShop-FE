import type { ProductVariationType } from "./productVariation";
import type { UserType } from "./user";

export interface ReviewType {
    reviewId?: number;
    user?: UserType;
    productVariationId?: ProductVariationType;
    content?: string;
    rateStar?: number;
    createdAt?: Date;
}

export interface CreationParams {
    user?: UserType;
    productVariationId?: number;
    content?: string;
    rateStar?: number;
    createdAt?: Date;
}

export type UpdateParams = Omit<ReviewType, "id">;

export interface CreationResponse {
    status: boolean;
    data: ReviewType;
    message?: string;
}

export interface ReviewResponse {
    status: boolean;
    data?: ReviewType;
    message?: string;
}

export interface ListResponse {
    status: boolean;
    data: ReviewType[];
    message?: string;
}

