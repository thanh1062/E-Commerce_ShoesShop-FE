import { HTTPBaseService } from "@/utils/request";
import type {
  CreationParams,
  CreationResponse,
  ListResponse,
  UserResponse,
  UpdateParams,
} from "@/types/role";

class Role extends HTTPBaseService {
  public constructor() {
    super();
  }

  async list(): Promise<ListResponse> {
    return await this.instance.get("/roles");
  }

  async detail(id: number): Promise<UserResponse> {
    return await this.instance.get(`/users/${id}`);
  }

  async create(params: CreationParams): Promise<CreationResponse> {
    return await this.instance.post("/users", params);
  }

  async update(id: number, params: UpdateParams): Promise<UserResponse> {
    return await this.instance.put(`/users/${id}`, params);
  }

  async delete(id: number): Promise<void> {
    this.instance.delete(`/users/${id}`);
  }

  deleteAll(ids: number[]): void {
    this.instance.delete(`/users/${ids.join(",")}`);
  }
}

export default Role;
