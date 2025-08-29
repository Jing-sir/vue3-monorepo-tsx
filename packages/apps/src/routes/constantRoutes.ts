import { RouteRecordRaw } from 'vue-router';

// 常规路由

const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'main',
    component: () => import(/* webpackChunkName: "main" */ '../Main.tsx'),
    meta: {
      requiresAuth: false,
      role: 'Home',
      title: '首页',
      hidden: true,
      icon: 'icon-zhuye',
    },
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import(/* webpackChunkName: "Home" */ '../views/Home/Index'),
        meta: {
          title: '首页',
          role: 'Home',
          isShow: true,
          requiresAuth: false,
        },
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "main" */ '../views/Login/Index.tsx'),
  },
  {
    path: '/error',
    name: 'error-main',
    component: () => import(/* webpackChunkName: "main" */ '../Main.tsx'),
    meta: {
      title: 'error',
      role: 'error',
      icon: '',
      isShow: true,
      requiresAuth: false,
    },
    children: [
      {
        path: '',
        name: 'error',
        component: () => import(/* webpackChunkName: "error" */ '../components/Error.tsx'),
        meta: { title: '404', role: '404', isShow: true, requiresAuth: false },
      },
      {
        path: '404',
        name: 'notRole',
        component: () => import(/* webpackChunkName: "error" */ '../components/NotRolePurview.vue'),
        meta: { title: '404', role: '404', isShow: true, requiresAuth: false },
      },
    ],
  },
];

export default constantRoutes;
