import type { LoginParams } from "@/types/user";
import { HTTPBaseService } from "@/utils/request";


class Account extends HTTPBaseService {
  public constructor() {
    super();
  }
  // async login(params: LoginParams): Promise<string> {
  //   const { data } = await this.instance.post("users/login", params);
  //   const token = data;
  //   return token;
  // }
  async login(params: LoginParams): Promise<string> {
    try {
      const response = await this.instance.post("users/login", params);
      const token = response.data;
      return token;
    } catch (error) {
      throw error;
    }
  }
}

export default Account;
