import { HTTPBaseService } from "@/utils/request";

class Email extends HTTPBaseService {
    public constructor() {
        super();
    }

    async sendEmail(email: String): Promise<void> {
        try {
            this.instance.post(`/email/send-email/${email}`);
        } catch (error) {
            throw error;
        }
    }
}

export default Email;
