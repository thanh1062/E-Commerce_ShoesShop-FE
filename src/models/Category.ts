import { HTTPBaseService } from "@/utils/request";
import type {
  CreationParams,
  CreationResponse,
  ListResponse,
  CategoryResponse,
  UpdateParams,
} from "@/types/category";

class Category extends HTTPBaseService {
  public constructor() {
    super();
  }

  async list(): Promise<ListResponse> {
    return await this.instance.get("/categories");
  }

  async detail(id: number): Promise<CategoryResponse> {
    return await this.instance.get(`/categories/${id}`);
  }

  async create(params: CreationParams): Promise<CreationResponse> {
    return await this.instance.post("/categories", params);
  }

  async update(id: number, params: UpdateParams): Promise<CategoryResponse> {
    return await this.instance.put(`/categories/${id}`, params);
  }

  async delete(id: number): Promise<void> {
    await this.instance.delete(`/categories/${id}`);
  }

  async deleteAll(ids: number[]): Promise<void> {
    this.instance.delete(`/categories/${ids.join(",")}`);
  }
}

export default Category;
