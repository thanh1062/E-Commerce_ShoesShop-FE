import { HTTPBaseService } from "@/utils/request";
import type {
    CreationResponse,
    ListResponse,
    ReportTopUserTypeResponse,
    reportTopUserType,
} from "@/types/reportTopUser";

class ReportTopUser extends HTTPBaseService {
    public constructor() {
        super();
    }

    async list(): Promise<ListResponse> {
        return await this.instance.get("/admin/top-users");
    }
}

export default ReportTopUser;