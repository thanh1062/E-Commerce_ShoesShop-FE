import type { BrandType } from "./brand";
import type { CategoryType } from "./category";
import type { ReviewType } from "./review";

export interface ProductType {
  productId?: number;
  brand?: BrandType;
  category?: CategoryType;
  name?: string;
  price?: number;
  sku?: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreationParams {
  name?: string;
  sku?: string;
  price?: number;
  description?: string;
  brand?: BrandType;
  category?: CategoryType;
}

export type UpdateAdminParams = Omit<ProductType, "id">;

export interface CreationResponse {
  status: boolean;
  //data: { id: number };
  data: ProductType;
  message?: string;
}

export interface ProductResponse {
  status: boolean;
  data?: ProductType;
  message?: string;
}

export interface ListResponse {
  status: boolean;
  data: ProductType[];
  message?: string;
}

export interface QueryProductParams {
  brand?: BrandType;
  category?: CategoryType;
  review?: ReviewType;
}
