import type { UserType } from "./user";
import type { OrderLineType } from "./orderLine";
import { AddressType } from "./address";
export interface OrderType {
    orderId?: string;
    address?: AddressType;
    orderTotalPrice?: number;
    ordersStatus?: string;
    createdAt?: string;
    updatedAt?: string;
    user?: UserType;
    orderLines?: OrderLineType;
  }
  
  export interface CreationParams {
    addressId?: number;
    orderTotalPrice?: number;
    ordersStatus?: string;
    createdAt?: string;
    updatedAt?: string;
    userId?: number;
    orderLines?: OrderLineType;
  }
  
  export type UpdateParams = Omit<OrderType, "orderId">;
  
  export interface CreationResponse {
    status: boolean;
    data: OrderType;
    message?: string;
  }
  
  export interface OrderResponse {
    status: boolean;
    data?: OrderType;
    message?: string;
  }
  
  export interface ListResponse {
    status: boolean;
    data: OrderType[];
    message?: string;
  }
  
  export interface OrderById {
    userId: number;
  }

    export interface OrderByCartId {
    cartId: string;
  }
  // export interface UserType {
  //   userId?: number;
  //   username?: string;
  //   email?: string;
  //   password?: string;
  // }
  
  