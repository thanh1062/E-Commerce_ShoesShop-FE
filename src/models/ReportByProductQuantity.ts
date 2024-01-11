import { HTTPBaseService } from "@/utils/request";
import type {
    CreationResponse,
    ListResponse,
    reportProductQuantityType,
    ReportByProductQuantityTypeResponse
} from "@/types/reportProductQuantity";

class ReportByProductQuantity extends HTTPBaseService {
    public constructor() {
        super();
    }

    async list(): Promise<ListResponse> {
        return await this.instance.get("/admin/product-inventory");
    }
}

export default ReportByProductQuantity;