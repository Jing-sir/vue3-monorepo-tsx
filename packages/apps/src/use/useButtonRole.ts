import { storeToRefs } from 'pinia';
import useSideBar from '@/store/sideBar';
import { useRoute } from 'vue-router';

export default function useButtonRole() {
  // 按钮权限列表获取
  const route = useRoute();
  const { roleMenu } = storeToRefs(useSideBar());
  const isShowBtn = (btnRole: string): boolean =>
    roleMenu.value.findIndex(({ name }) => name === `${String(route.name)}-${btnRole}`) > 0;

  return {
    isShowBtn,
  };
}
