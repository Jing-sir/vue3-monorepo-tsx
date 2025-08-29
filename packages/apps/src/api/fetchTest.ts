import { Api } from './api.ts';

class FetchTest extends Api {
  userLogin(params: { username: string; password: string }): Promise<any> {
    return this.api.post('/login', params);
  }
}
export default new FetchTest();
