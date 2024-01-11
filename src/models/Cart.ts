import { HTTPBaseService } from "@/utils/request";
import type { CartResponse, ListResponse } from "@/types/cart";
import type { CreationParams } from "@/types/cartItem";

class Cart extends HTTPBaseService {
  public constructor() {
    super();
  }

  async list(params: {cartId?: string}): Promise<ListResponse> {
    return await this.instance.get("/cart", { params });
  }

  async create(params: CreationParams): Promise<CartResponse> {
    return await this.instance.post(`/cart/update`, params);
  }

  async delete(cartId: string, cartItemId: number): Promise<CartResponse> {
    let params = { cartItemId };
    return await this.instance.delete(`/cart/remove/${cartId}`, { params });
  }

  async deleteCartId(cartId: string): Promise<boolean> {
    return await this.instance.delete(`/cart/delete/${cartId}`);
  }

  async deleteCartItemId(cartId: string): Promise<boolean> {
    return await this.instance.delete(`/cart/item/delete/${cartId}`);
  }
}

export default Cart;
