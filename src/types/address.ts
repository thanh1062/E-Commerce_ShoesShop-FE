export interface AddressType {
  addressId?: number;
  address?: string;
  fullName?:string;
  phoneNumber?:string;
  email?:string;
  wardId?: number;
  districtId?: number;
  provinceId?: number;
}

export interface CreationParams {
  fullName?:string;
  phoneNumber?:string;
  email?:string;
  address: string;
  wardId: number;
  districtId: number;
  provinceId: number;
}

export type UpdateParams = Omit<AddressType, "addressId">;

export interface CreationResponse {
  status: boolean;
  data: AddressType;
  message?: string;
}

export interface AddressResponse {
  status: boolean;
  data?: AddressType;
  message?: string;
}

export interface ListResponse {
  status: boolean;
  data: AddressType[];
  message?: string;
}
