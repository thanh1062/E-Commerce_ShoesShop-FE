import { HTTPBaseService } from "@/utils/request";
import type {
  ListResponse,

} from "@/types/color";

class Color extends HTTPBaseService {
  public constructor() {
    super();
  }

  async list(): Promise<ListResponse> {
    return await this.instance.get("/colors");
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

export default Color;
