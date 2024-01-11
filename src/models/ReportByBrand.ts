import { HTTPBaseService } from "@/utils/request";
import type {
    CreationResponse,
    ListResponse,
    reportByBrandType,
    ReportByBrandTypeResponse
} from "@/types/reportByBrand";

class ReportByBrand extends HTTPBaseService {
    public constructor() {
        super();
    }

    async list(): Promise<ListResponse> {
        return await this.instance.get("/admin/report-by-brands");
    }
}

export default ReportByBrand;