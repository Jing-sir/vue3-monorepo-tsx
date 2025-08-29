import { AxiosInstance } from 'axios';
import { Api } from './api';

class FetchTest extends Api {
  loginInfo(): Promise<{
    account: string; // 账号
    bindAccount: string; // 绑定账号
    fullName: string; // 姓名
    isFACode: 0 | 1; // 是否有2fa,0没有 ,1有
    roleId: string; // 角色ID
    roleName: string; // 角色名称
    state: 1 | 2; // 状态 1、启用 2、禁用
    userId: string; // 用户ID
  }> {
    return this.api.post('/sys/user/getInfo');
  }
}
export default new FetchTest();
