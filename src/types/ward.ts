export interface WardType {
  wardId?: number;
  districtId?: number;
  provinceId?: number;
  name?: string;
  prefix?: string;
}

export interface WardResponse {
  status: boolean;
  data?: WardType;
  message?: string;
}

export interface ListResponse {
  status: boolean;
  data: WardType[];
  message?: string;
}
