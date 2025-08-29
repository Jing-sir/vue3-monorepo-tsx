import { ref } from 'vue';
import { defineStore } from 'pinia';
import { useRouter, useRoute, RouteLocationNormalized } from 'vue-router';

export default defineStore('tagsView', () => {
  const visitedViews = ref(Object.create([])); // tabs数据存储

  const firstToUpper = (str: string): string =>
    str.replace(/( |^)[a-z]/g, (L: string) => L.toUpperCase());

  const addVisitedView = (view: RouteLocationNormalized): void => {
    // 更新tabs
    const { path, meta, query, fullPath, name, params } = view;
    if (name === 'Home' || path.includes('login') || path.includes('error')) return;
    const acc = visitedViews.value.findIndex((item: RouteLocationNormalized) => item.name === name);
    if (acc === -1) visitedViews.value.push({ path, meta, query, fullPath, params, name });
    else visitedViews.value[acc] = { path, meta, query, fullPath, params, name };
  };

  const $router = useRouter();
  const route = useRoute();
  const deleteVisitedView = (index: number, isActive: boolean): void => {
    // 删除tabs
    visitedViews.value.splice(index, 1);
    if (isActive) {
      const latestView = visitedViews.value.slice(-1)[0];
      $router.replace(latestView || '/');
    }
  };

  const deleteVisitedViewByName = (name: string, isActive: boolean): void => {
    // 删除tabs
    const index = visitedViews.value.findIndex(
      (item: RouteLocationNormalized) => item.name === name
    );
    visitedViews.value.splice(index, 1);
    if (isActive) {
      const latestView = visitedViews.value.slice(-1)[0];
      $router.replace(latestView || '/');
    }
  };

  const delCurRouter = (): void => {
    // 删除当前路由
    visitedViews.value = visitedViews.value.filter(
      (item: { path: string }) => item.path !== route.path
    );
  };

  const clearVisitedView = (): void => {
    // 清除tabs
    visitedViews.value = [];
  };

  return {
    delCurRouter,
    visitedViews,
    firstToUpper,
    addVisitedView,
    clearVisitedView,
    deleteVisitedView,
    deleteVisitedViewByName,
  };
});
