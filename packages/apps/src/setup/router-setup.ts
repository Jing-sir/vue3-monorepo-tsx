import type {
  Router,
  RouteLocationNormalized,
  RouteLocationRaw,
  _RouteLocationBase,
} from 'vue-router'; /// doc: https://router.vuejs.org/api

import { createRouter, createWebHistory } from 'vue-router'; /// doc: https://router.vuejs.org/api
import { storeToRefs } from 'pinia';
import routes from '../routes';
import pinia from '../store/Index';
import useSidebar from '@/store/sideBar';
import cookies from 'cookies-js';
import api from '@/api/permission';

const TITLE: string = window.document.title; // 获取初始window窗口的标题
// const locales: string[] = i18n.global?.availableLocales.map((_locale: Locale) => _locale.toLowerCase()) || []; // 项目支持的语言包[小写]

const router: Router = createRouter({
  history:
    createWebHistory(/* process.env.BASE_URL  适用于OSS/CDN，process.env.BASE_URL仅适用于开发部署 */),
  routes, // short for `routes: routes`
  scrollBehavior<ScrollBehavior>(to: RouteLocationNormalized, from: RouteLocationNormalized) {
    return { top: 0 };
  },
});

const routerNext = {
  // router进入页面前执行的事件
  /* setLanguage({ meta, path }: RouteLocationNormalized): Promise<boolean> { // 语言设置
        const {
            lang = locales.find(_locale => new RegExp(`^/${_locale}`, 'im').test(path)) /* 路径设置语言 || getI18nLanguage()
        } = meta;

        // if (lang) setI18nLanguage(lang as LangKeyString);
        return Promise.resolve(true);
    }, */
  setTitle({ meta }: RouteLocationNormalized): Promise<boolean> {
    // 窗口标题设置
    const { title } = meta;
    window.document.title = (typeof title === 'function' ? title() : title) || TITLE; // 动态修改窗口标题
    return Promise.resolve(true);
  },

  async setRequiresAuth(to: RouteLocationNormalized): Promise<boolean | string> {
    // 路由鉴权
    // 路由鉴权
    const { requiresAuth } = to.meta;
    const hasToken = cookies.get('walletToken');
    if (hasToken) {
      const store = useSidebar(pinia);
      const { roleMenu } = storeToRefs(store);
      if (roleMenu.value?.length > 0) {
        if (to.path === '/login') return Promise.resolve('/'); // 如果已登录，则重定向到主页
        const fetchObj = Object.fromEntries(
          roleMenu.value?.map((item: PromiseReturnType<typeof api.homeMenu>[0]) => [
            item.name,
            item.name,
          ])
        );
        const { role, requiresAuth } = to.meta;
        if (!role && !requiresAuth) return Promise.resolve('/error');
        if (!fetchObj[role] && requiresAuth) return Promise.resolve('/error/404');
      }

      return Promise.resolve(true);
    }

    // if (!hasToken && to.path !== '/login') return Promise.resolve('/login');
    return Promise.resolve(true);
  },
  setRedirect({ meta }: RouteLocationNormalized, ...args: any[]): Promise<boolean> {
    const { redirection } = meta;

    if (redirection) {
      return Promise.resolve(
        typeof redirection === 'function' ? redirection.apply(router, args) : redirection
      );
    }

    return Promise.resolve(true);
  }
};

router.beforeEach(
  (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized /* , next: NavigationGuardNext */
  ): Promise<RouteLocationRaw | boolean> =>
    Promise.all(
      Object.values(routerNext).map((func: Function): Promise<boolean | string> => func(to, from))
    ).then((response: (string | boolean)[]): RouteLocationRaw | boolean => {
      const path = [...response]
        .reverse() /* 遵循webpack-loader加载与解析顺序规则 */
        .find((_path: string | boolean) => _path && typeof _path === 'string') as string;
      switch (true) {
        case Boolean(path):
          return { path, replace: true };
        case response.some((isNext) => !isNext):
          return false;
        default:
          return true;
      }
    })
);

router.afterEach((/* to: RouteLocationNormalized, from: RouteLocationNormalized */): void => {
  // 自定义元素滚动到顶部
  const el: HTMLElement | null = document.getElementById('app');
  if (el) el.scrollTop = <number>0;
});

export const route = (Object.keys(router.currentRoute.value) as (keyof _RouteLocationBase)[])
  .reduce((acc, cur) => {
    Object.defineProperty(acc, cur, {
      get: () => router.currentRoute.value[cur],
      enumerable: true,
      configurable: true,
    });
    return acc;
  }, {} as Partial<_RouteLocationBase>) as _RouteLocationBase;

export default router;

declare module 'vue-router' {
  // 扩展RouteMeta类型信息
  interface RouteMeta {
    // is optional
    lang?: string;
    title?: string | Function;
    requiresAuth?: boolean | Function;
    isShow?: boolean | Function;
    role: string;
    icon?: string;
    // must be declared by every route
    redirection?: Function | string;
  }
}
