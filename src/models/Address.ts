import { HTTPBaseService } from "@/utils/request";
import type {
  CreationParams,
  CreationResponse,
  ListResponse,
  AddressResponse,
  UpdateParams,
} from "@/types/address";

class Address extends HTTPBaseService {
  public constructor() {
    super();
  }

  async list(): Promise<ListResponse> {
    return await this.instance.get("/addresses");
  }

  async detail(id: number): Promise<AddressResponse> {
    return await this.instance.get(`/addresses/${id}`);
  }

  async create(params: CreationParams): Promise<CreationResponse> {
    return await this.instance.post("/addresses", params);
  }

  async update(id: number, params: UpdateParams): Promise<AddressResponse> {
    return await this.instance.put(`/addresses/${id}`, params);
  }

  async delete(id: number): Promise<void> {
    await this.instance.delete(`/addresses/${id}`);
  }

  async deleteAll(ids: number[]): Promise<void> {
    this.instance.delete(`/addresses/${ids.join(",")}`);
  }
}

export default Address;
