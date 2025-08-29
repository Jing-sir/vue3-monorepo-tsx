import { AxiosInstance } from 'axios';

import http from '../plugins/http';

abstract class Api {
  protected api: AxiosInstance;

  constructor() {
    const url = import.meta.env.VITE_APP_BASE_URL;
    const baseUrl = `${url}/sys/permission`;
    this.api = http[baseUrl] || http.instance(baseUrl);
  }
  // protected abstract verifyParamsSchema<T>(params: object, schema: object): T | null;  // 如果需要中间件拦截(参数验证等服务)，可以使用Joi集成服务
}

class FetchTest extends Api {
  permissionList(): Promise<
    {
      id: string; // 权限ID	string
      name: string; // 名称
      type: string; // 类型:1=页面，2=按钮	string
      path: string; // 路径
      title: string; // 标题
      route: string; // 路由
      parentId: string; // 父ID
      checked: number; // 是否选中:1=是,2=否
    }[]
  > {
    // 权限列表
    return this.api.get('/list');
  }

  check(params: { roleId: string }): Promise<
    {
      // 编辑获取角色权限
      id: string;
      name: string;
      type: string;
      path: string;
      title: string;
      route: string;
      parentId: string;
      checked: number;
    }[]
  > {
    return this.api.get('/check', { params });
  }

  homeMenu(): Promise<
    {
      id: string; // 权限ID
      name: string; // 名称
      type: string | number; // 类型:1=页面，2=按钮
      path: string; // 路径
      title: string; // 标题
      route: string; // 路由
      parentId: string; // 父ID
    }[]
  > {
    // 首页菜单
    return this.api.get('/homeMenu');
  }
}
export default new FetchTest();
