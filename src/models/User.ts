import { HTTPBaseService } from "@/utils/request";
import type {
  CreationParams,
  CreationResponse,
  ListResponse,
  UserResponse,
  UpdateParams,
  PasswordChangeParams,
} from "@/types/user";

class User extends HTTPBaseService {
  public constructor() {
    super();
  }

  async list(): Promise<ListResponse> {
    return await this.instance.get("/users");
  }

  async detail(id: number): Promise<UserResponse> {
    return await this.instance.get(`/users/${id}`);
  }
  async findByEmail(email: String): Promise<UserResponse> {
    return await this.instance.get(`/users/email/${email}`);
  }
  async findByKey(key: String): Promise<ListResponse> {
    return await this.instance.get(`/users/key/${key}`);
  }

  async create(params: CreationParams): Promise<CreationResponse> {
    try {
      return await this.instance.post("/users", params);
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, params: UpdateParams): Promise<UserResponse> {
    return await this.instance.put(`/users/${id}`, params);
  }
  async changePass(id: number, params: PasswordChangeParams): Promise<UserResponse> {
    try {
      return await this.instance.post(`/users/changepassword/${id}`, params);
    } catch (error) {
      throw error;
    }
  }
  async delete(id: number): Promise<void> {
    this.instance.delete(`/users/${id}`);
  }

  deleteAll(ids: number[]): void {
    this.instance.delete(`/users/${ids.join(",")}`);
  }
}

export default User;
