import type { ProductVariationType } from "./productVariation";
import type { UserType } from "./user";

export interface FavoriteType {
    favoriteId?: number;
    user?: UserType;
    productVariationId?: ProductVariationType;
    isLiked?: boolean;
}

export interface CreationParams {
    user?: UserType;
    productVariationId?: number;
    isLiked?: boolean;
}

export type UpdateParams = Omit<FavoriteType, "id">;

export interface CreationResponse {
    status: boolean;
    data: FavoriteType;
    message?: string;
}

export interface FavoriteResponse {
    status: boolean;
    data?: FavoriteType;
    message?: string;
}

export interface ListResponse {
    status: boolean;
    data: FavoriteType[];
    message?: string;
}



