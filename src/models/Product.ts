import { HTTPBaseService } from "@/utils/request";
import type {
  CreationParams,
  CreationResponse,
  ListResponse,
  ProductVariationResponse,
  QueryProductVariationParams,
  UpdateParams,
} from "@/types/productVariation";

import type {
  ProductResponse,
  UpdateAdminParams,
  QueryProductParams,
} from "@/types/product";

class Product extends HTTPBaseService {
  public constructor() {
    super();
  }

  async productsAdmin(params: QueryProductParams): Promise<ListResponse> {
    return await this.instance.get("/admin/products", { params });
  }

  async list(params: QueryProductVariationParams): Promise<ListResponse> {
    return await this.instance.get("/products", { params });
  }

  async detail(id: number): Promise<ProductVariationResponse> {
    return await this.instance.get(`/products/${id}`);
  }
  
  async create(params: CreationParams): Promise<CreationResponse> {
    return await this.instance.post("/admin/products", params);
  }

  async update(id: number, params: UpdateAdminParams): Promise<ProductResponse> {
    return await this.instance.put(`/admin/products/${id}`, params);
  }

  async delete(id: number): Promise<void> {
    await this.instance.delete(`/admin/products/${id}`);
  }

  deleteAll(ids: number[]): void {
    this.instance.delete(`/products/${ids.join(",")}`);
  }
}

export default Product;
