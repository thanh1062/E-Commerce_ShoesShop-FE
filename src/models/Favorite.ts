import { HTTPBaseService } from "@/utils/request";

import type {
  CreationParams,
  CreationResponse,
  ListResponse,
  FavoriteResponse,
  UpdateParams,
} from "@/types/favorite";

class Favorite extends HTTPBaseService {
  public constructor() {
    super();
  }

  async list(): Promise<ListResponse> {
    return await this.instance.get("/admin/favorites");
  }

  async check(id: number): Promise<FavoriteResponse> {
    return await this.instance.get(`/favorites/${id}`);
  }

  async create(params: CreationParams): Promise<CreationResponse> {
    return await this.instance.post("/admin/favorites", params);
  }

  async update(id: number, params: UpdateParams): Promise<FavoriteResponse> {
    return await this.instance.put(`/favorites/${id}`, params);
  }

  async delete(id: number): Promise<void> {
    await this.instance.delete(`/admin/favorites/${id}`);
  }

  async deleteAll(ids: number[]): Promise<void> {
    await this.instance.delete(`/favorites/${ids.join(",")}`);
  }
}

export default Favorite;