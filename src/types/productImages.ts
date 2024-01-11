import { ProductVariationType } from "./productVariation";

export interface ProductImagesType {
    productImageld?: number;
    imageUrl?: string;
    isPrimary?: boolean;
    productVariation?: ProductVariationType;
}

export type UpdateParams = Omit<ProductImagesType, "id">;

export interface CreationProductImageParams {
    productVariation?: ProductVariationType;
}

export interface CreationResponse {
    status: boolean;
    data: { id: number };
    message?: string;
}

export interface ProductImageResponse {
    status: boolean;
    data?: ProductImagesType;
    message?: string;
}

export interface ListResponse {
    status: boolean;
    data: ProductVariationType[];
    message?: string;
}

export interface QueryProductImageParams {
    productVariationId?: number;
}

