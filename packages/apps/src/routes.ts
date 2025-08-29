import constantRoutes from '@/routes/constantRoutes';
import type { RouteRecordRaw } from 'vue-router';
import asyncRoutes from '@/routes/asyncRoutes';

const routes: RouteRecordRaw[] = [...asyncRoutes, ...constantRoutes];

export default routes;
