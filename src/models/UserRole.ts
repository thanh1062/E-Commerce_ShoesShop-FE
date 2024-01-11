import { HTTPBaseService } from "@/utils/request";
import type {
  CreationParams,
  CreationResponse,
  ListResponse,
  UserRoleResponse,
  UpdateUserRoleParams,
  UserRoleParams,
} from "@/types/userRole";

class UserRole extends HTTPBaseService {
  public constructor() {
    super();
  }

  async list(params: UserRoleParams): Promise<ListResponse> {
    return await this.instance.get("/userroles", { params });
  }

  async detail(id: number): Promise<UserResponse> {
    return await this.instance.get(`/users/${id}`);
  }

  async create(params: CreationParams): Promise<CreationResponse> {
    return await this.instance.post("/userroles", params);
  }

  async update(id: number, params: UpdateUserRoleParams): Promise<UserRoleResponse> {
    return await this.instance.put(`/userroles/${id}`, params);
  }

  async delete(id: number): Promise<void> {
    this.instance.delete(`/users/${id}`);
  }

  deleteAll(ids: number[]): void {
    this.instance.delete(`/users/${ids.join(",")}`);
  }
}

export default UserRole;
