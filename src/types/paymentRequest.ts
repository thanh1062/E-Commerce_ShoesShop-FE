import { CartType } from "./cart";
import { UserType } from "./user";

export interface PaymentRequestType {
    userId?: number;
    addressId?: number;
    cart?: CartType;
}

export interface ListResponse {
    status: boolean;
    data: PaymentRequestType[];
    message?: string;
  }

export interface OrderByCartId {
    cartId: number;
}