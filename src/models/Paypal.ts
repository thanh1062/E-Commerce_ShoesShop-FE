import { HTTPBaseService } from "@/utils/request";
import { PaymentInterface, ListResponse } from "@/types/paymentRequest";
import type { CartType } from "@/types/cart";
import { PaymentRequestType } from "@/types/paymentRequest";

class Payment extends HTTPBaseService implements PaymentInterface {
  constructor() {
    super();
  }

  // async listbyid(params: string): Promise<ListResponse> {
  //   return await this.instance.get("/payment/paypal/success", {params});
  // }

  async list(params: {cartId?: string}): Promise<ListResponse> {
    return await this.instance.get("/payment/paypal/success", { params });
  }

  async processPayment(paymentData: PaymentRequestType): Promise<string> {
    try {
      const response = await this.instance.post("/payment/checkout", paymentData);
      return response.data;
    } catch (error) {
      throw new Error("Error processing payment: " + error.message);
    }
  }
}

export default Payment;
