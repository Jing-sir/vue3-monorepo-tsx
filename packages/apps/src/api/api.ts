import type { AxiosInstance } from 'axios';
import http from '../plugins/http';

export abstract class Api {
  protected api: AxiosInstance;

  constructor() {
    const baseUrl = String(import.meta.env.VITE_APP_BASE_URL);
    console.log(baseUrl, '===')
    this.api = http[baseUrl] || http.instance(baseUrl);
  }
}
