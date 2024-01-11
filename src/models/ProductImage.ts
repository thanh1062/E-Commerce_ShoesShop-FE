import { HTTPBaseService } from "@/utils/request";
import type {
  CreationParams,
  CreationResponse,
  ListResponse,
  ProductImageResponse,
  QueryProductImageParams,
  UpdateParams,
} from "@/types/productImages";


class ProductImage extends HTTPBaseService {
  public constructor() {
    super();
  }

  async list(params: QueryProductImageParams): Promise<ListResponse> {
    return await this.instance.get("/admin/productImages", { params });
  }

  async detail(id: number): Promise<ProductImageResponse> {
    return await this.instance.get(`/products/${id}`);
  }

  async create(params: CreationParams): Promise<CreationResponse> {
    return await this.instance.post("/admin/productImages", params);
  }

  async update(id: number, params: UpdateParams): Promise<ProductImageResponse> {
    return await this.instance.put(`/admin/productImages/${id}`, params);
  }

  async delete(id: number): Promise<void> {
    await this.instance.delete(`/admin/productImages/${id}`);
  }

  deleteAll(ids: number[]): void {
    this.instance.delete(`/products/${ids.join(",")}`);
  }
}

export default ProductImage;
