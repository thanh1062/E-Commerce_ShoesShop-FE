import { HTTPBaseService } from "@/utils/request";
import type {
  CreationParams,
  CreationResponse,
  ListResponse,
  ReviewResponse,
  UpdateParams,
} from "@/types/review";

class Review extends HTTPBaseService {
  public constructor() {
    super();
  }

  async list(): Promise<ListResponse> {
    return await this.instance.get("/admin/reviews");
  }

  async detail(id: number): Promise<ReviewResponse> {
    return await this.instance.get(`/reviews/${id}`);
  }

  async create(params: CreationParams): Promise<CreationResponse> {
    return await this.instance.post("/admin/reviews", params);
  }

  async update(id: number, params: UpdateParams): Promise<ReviewResponse> {
    return await this.instance.put(`/reviews/${id}`, params);
  }

  async delete(id: number): Promise<void> {
    await this.instance.delete(`/admin/reviews/${id}`);
  }

  async deleteAll(ids: number[]): Promise<void> {
    await this.instance.delete(`/reviews/${ids.join(",")}`);
  }
}

export default Review;