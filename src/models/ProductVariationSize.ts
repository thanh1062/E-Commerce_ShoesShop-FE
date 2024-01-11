import { HTTPBaseService } from "@/utils/request";
import type {
  CreationParams,
  CreationResponse,
  ListResponse,
  ProductVariationSizeResponse,
  QueryProductVariationSizeParams,
  UpdateParams,
} from "@/types/productVariationSize";


class ProductVariationSize extends HTTPBaseService {
  public constructor() {
    super();
  }

  async list(params: QueryProductVariationSizeParams): Promise<ListResponse> {
    return await this.instance.get("/admin/productVariationSizes", { params });
  }

  async detail(id: number): Promise<ProductVariationSizeResponse> {
    return await this.instance.get(`/products/${id}`);
  }

  async create(params: CreationParams): Promise<CreationResponse> {
    return await this.instance.post("/admin/productVariationSizes", params);
  }

  async update(id: number, params: UpdateParams): Promise<ProductVariationSizeResponse> {
    return await this.instance.put(`/admin/productVariationSizes/${id}`, params);
  }

  async delete(id: number): Promise<void> {
    await this.instance.delete(`/admin/productVariationSizes/${id}`);
  }

  deleteAll(ids: number[]): void {
    this.instance.delete(`/products/${ids.join(",")}`);
  }
}

export default ProductVariationSize;
