import { HTTPBaseService } from "@/utils/request";
import type { ListResponse } from "@/types/size";

class Size extends HTTPBaseService {
    public constructor() {
        super();
    }

    async list(): Promise<ListResponse> {
        return await this.instance.get("/sizes");
    }
}

export default Size;