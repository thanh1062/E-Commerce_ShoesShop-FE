import { HTTPBaseService } from "@/utils/request";
import type { ListResponse, ProvinceResponse } from "@/types/province";

class Province extends HTTPBaseService {
  public constructor() {
    super();
  }

  async list(): Promise<ListResponse> {
    return await this.instance.get("/provinces");
  }

  async detail(id: number): Promise<ProvinceResponse> {
    return await this.instance.get(`/provinces/${id}`);
  }
}

export default Province;
