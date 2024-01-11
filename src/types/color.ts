export interface ColorType {
  colorId?: number;
  value?: string;
}
export interface OrderResponse {
  status: boolean;
  data?: ColorType;
  message?: string;
}

export interface ListResponse {
  status: boolean;
  data: ColorType[];
  message?: string;
}
