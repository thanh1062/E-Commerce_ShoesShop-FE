import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
} from "axios";

export abstract class HTTPBaseService {
  protected instance: AxiosInstance;

  public constructor() {
    const baseURL = "http://localhost:8080/api/v1";

    this.instance = axios.create({
      baseURL,
    });

    this.instance.interceptors.request.use((config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;

      }

      return config;

    });



    this.instance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response?.status === 401) {
          const token = localStorage.getItem('token');

        }
        throw error;
      }
    );
  }
}

export default class HttpException extends Error {
  status: number;
  message: string;
  response: { [key: string]: string };
  constructor(
    status: number,
    message: string,
    response: { [key: string]: string }
  ) {
    super(message);
    this.status = status;
    this.message = message;
    this.response = response;
  }
}
