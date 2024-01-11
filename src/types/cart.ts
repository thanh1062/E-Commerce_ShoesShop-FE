import { CartItemType } from "@/types/cartItem";
import type { UserType } from "@/types/user";

export interface CartType {
    cartId?: string;
    user?: UserType;
    itemTotalQuantity?: number;
    itemSubtotalPrice?: number;
    cartItems?: CartItemType[];
}

export type UpdateParams = Omit<CartType, "id">;

export interface CreationResponse {
    status: boolean;
    data: CartType;
    message?: string;
}

export interface ListResponse {
    status: boolean;
    data?: CartType;
    message?: string;
}

export interface CartResponse {
    status: boolean;
    data?: CartType;
    message?: string;
}
