import { HTTPBaseService } from "@/utils/request";
import type { ListResponse, WardResponse } from "@/types/ward";

class Ward extends HTTPBaseService {
  public constructor() {
    super();
  }

  async list(): Promise<ListResponse> {
    return await this.instance.get("/wards");
  }

  async detail(id: number): Promise<WardResponse> {
    return await this.instance.get(`/wards/${id}`);
  }
}

export default Ward;
