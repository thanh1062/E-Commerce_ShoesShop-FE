export interface BrandType {
  brandId?: number;
  name?: string;
}

export interface CreationParams {
  name: string;
}

export type UpdateParams = Omit<BrandType, "brandId">;

export interface CreationResponse {
  status: boolean;
  data: BrandType;
  message?: string;
}

export interface BrandResponse {
  status: boolean;
  data?: BrandType;
  message?: string;
}

export interface ListResponse {
  status: boolean;
  data: BrandType[];
  message?: string;
}
