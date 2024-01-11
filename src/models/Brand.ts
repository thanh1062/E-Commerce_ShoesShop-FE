import { HTTPBaseService } from "@/utils/request";
import type {
  CreationParams,
  CreationResponse,
  ListResponse,
  BrandResponse,
  UpdateParams,
} from "@/types/brand";

class Brand extends HTTPBaseService {
  public constructor() {
    super();
  }

  async list(): Promise<ListResponse> {
    return await this.instance.get("/brands");
  }

  async detail(id: number): Promise<BrandResponse> {
    return await this.instance.get(`/brands/${id}`);
  }

  async create(params: CreationParams): Promise<CreationResponse> {
    return await this.instance.post("/brands", params);
  }

  async update(id: number, params: UpdateParams): Promise<BrandResponse> {
    return await this.instance.put(`/brands/${id}`, params);
  }

  async delete(id: number): Promise<void> {
    await this.instance.delete(`/brands/${id}`);
  }

  async deleteAll(ids: number[]): Promise<void> {
    this.instance.delete(`/brands/${ids.join(",")}`);
  }
}

export default Brand;
