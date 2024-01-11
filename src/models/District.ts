import { HTTPBaseService } from "@/utils/request";
import type { ListResponse, DistrictResponse } from "@/types/district";

class District extends HTTPBaseService {
  public constructor() {
    super();
  }

  async list(): Promise<ListResponse> {
    return await this.instance.get("/districts");
  }

  async detail(id: number): Promise<DistrictResponse> {
    return await this.instance.get(`/districts/${id}`);
  }
}

export default District;
