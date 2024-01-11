import { ProductVariationType } from "./productVariation";
import type { SizeType } from "./size";

export interface ProductVariationSizeType {
  productVariationSizeId?: number;
  size?: SizeType;
  quantity?: number;
  productVariation?: ProductVariationType;
}

export interface CreationProductVariationSizeParams {
  size?: SizeType;
  productVariation?: ProductVariationType;
}

export type UpdateParams = Omit<ProductVariationSizeType, "id">;

export interface CreationResponse {
  status: boolean;
  data: { id: number };
  message?: string;
}

export interface ProductVariationSizeResponse {
  status: boolean;
  data?: ProductVariationSizeType;
  message?: string;
}

export interface ListResponse {
  status: boolean;
  data: ProductVariationSizeType[];
  message?: string;
}

export interface QueryProductVariationSizeParams {
  color?: number;
  productId?: number;
}