import { HTTPBaseService } from "@/utils/request";
import type {
  CreationParams,
  CreationResponse,
  ListResponse,
  OrderById,
  OrderResponse,
  UpdateParams,
  OrderByCartId
} from "@/types/order";
import { QueryUserParams } from "@/types/user";

class Order extends HTTPBaseService {
  public constructor() {
    super();
  }

  async order(params: {cartId?: string}): Promise<ListResponse> {
    return await this.instance.get("/payment/paypal/success", { params });
  }

  async list(params: QueryUserParams): Promise<ListResponse> {
    return await this.instance.get("/orders", {params});
  }

  async listbyid(params: OrderById): Promise<ListResponse> {
    return await this.instance.get("/orders/byuserid", {params});
  }

  async detail(params:  OrderByCartId): Promise<OrderResponse> {
    return await this.instance.get("/orders/bycartid", {params});
  }

  async create(params: CreationParams): Promise<CreationResponse> {
    return await this.instance.post("/orders", params);
  }

  async update(id: string, params: UpdateParams): Promise<OrderResponse> {
    return await this.instance.put(`/orders/${id}`, params);
  }

  async delete(id: string): Promise<void> {
    await this.instance.delete(`/orders/${id}`);
  }

  async deleteAll(ids: string[]): Promise<void> {
    this.instance.delete(`/orders/${ids.join(",")}`);
  }
}

export default Order;
