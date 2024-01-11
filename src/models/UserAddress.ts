import { HTTPBaseService } from "@/utils/request";
import type {
    CreationParams,
    CreationResponse,
    ListResponse,
    UserAddressResponse,
    UpdateParams,
    QueryUserAddressParams
} from "@/types/userAddress";

class UserAddress extends HTTPBaseService {
    public constructor() {
        super();
    }

    async list(params: QueryUserAddressParams): Promise<ListResponse> {
        return await this.instance.get("/userAddresses", { params });
    }

    async detail(id: number): Promise<UserAddressResponse> {
        return await this.instance.get(`/userAddresses/${id}`);
    }

    async create(params: CreationParams): Promise<CreationResponse> {
        return await this.instance.post("/userAddresses", params);
    }

    async update(id: number, params: UpdateParams): Promise<UserAddressResponse> {
        return await this.instance.put(`/userAddresses/${id}`, params);
    }

    async delete(id: number): Promise<void> {
        await this.instance.delete(`/userAddresses/${id}`);
    }
}

export default UserAddress;
