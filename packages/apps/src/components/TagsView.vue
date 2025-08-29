<template>
  <div class="tags-view-container">
    <div class="tags-view-wrapper overflow-x">
      <span
        class="tags-view-item"
        :class="{ active: $route.path === '/' }"
        @click="$router.push('/')"
        >首页</span
      >
      <span
        v-for="({ name, path, meta, fullPath, params, query }, i) in visitedViews"
        :key="path"
        class="tags-view-item"
        :class="{ active: $route.name === name }"
        @click="handleGoCacheRoute({ path, fullPath, query, params })"
      >
        {{ meta.title }}
        <span class="icon-close" @click.stop="deleteVisitedView(i, $route.path === path)">x</span>
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch } from 'vue';
import { useRoute, useRouter, RouteLocationNormalizedLoaded } from 'vue-router';
import { storeToRefs } from 'pinia';
import useTagsView from '@/store/tagsView';

export default defineComponent({
  name: 'TagsView',
  setup() {
    const store = useTagsView();
    const route = useRoute();
    const router = useRouter();
    watch(
      () => route.path,
      (o: string, n?: string) => {
        if (o && o !== n) store.addVisitedView(route);
      },
      { deep: true, immediate: true }
    ); // 监听路由更新tabs

    const { visitedViews: _visitedViews } = storeToRefs(store);
    const visitedViews = _visitedViews as unknown as RouteLocationNormalizedLoaded[];

    const deleteVisitedView = (index: number, isActive: boolean): void =>
      store.deleteVisitedView(index, isActive);

    const handleGoCacheRoute = (route: RouteLocationNormalizedLoaded) => {
      router.replace({ ...route, hash: '#no-refresh' });
    };

    return {
      visitedViews,
      deleteVisitedView,
      handleGoCacheRoute,
    };
  },
});
</script>

<style lang="scss" scoped>
.tags-view-container {
  overflow-x: auto;
  overflow-y: hidden;
  height: 40px;
  line-height: 40px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 12%), 0 0 3px 0 rgb(0 0 0 / 4%);
  white-space: nowrap;
  padding-left: 10px;
  box-sizing: border-box;

  .tags-view-wrapper {
    overflow-x: scroll;

    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 30px;
      line-height: 30px;
      border: 1px solid #d8dce5;
      color: #495060;
      background: #fff;
      padding: 0 8px;
      font-size: 12px;
      border-radius: 2px;
      margin-right: 6px;

      // &:first-of-type {
      //     margin-left: 15px;
      // }

      // &:last-of-type {
      //     margin-right: 15px;
      // }

      &.active {
        background-color: var(--primary-color);
        color: #fff;
        border-color: var(--primary-color);

        &::before {
          content: '';
          background: #fff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 2px;
        }
      }
    }
  }

  .icon-close {
    width: 12px;
    height: 12px;
    line-height: 12px;
    font-size: 12px;
    display: inline-block;
    margin-left: 2px;
    border-radius: 50%;
    text-align: center;
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    transform-origin: 100% 50%;

    &::before {
      transform: scale(0.6);
      display: inline-block;
      vertical-align: -3px;
    }

    &:hover {
      background-color: #b4bccc;
      color: #fff;
    }
  }

  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgb(0 0 0 / 30%);

    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;

      &:hover {
        background: #eee;
      }
    }
  }
}
</style>
