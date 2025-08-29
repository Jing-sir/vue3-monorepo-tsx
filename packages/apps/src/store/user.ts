import { ref } from 'vue';
import { defineStore } from 'pinia';
import api from '@/api/sys';

export default defineStore('user', () => {
  const account = ref<string>();
  const userInfo = ref<PromiseReturnType<typeof api.loginInfo>>(Object.create(null));

  const fetchCurrUserInfo = (): void => {
    // 获取sidebar 列表路由
    api.loginInfo().then((r: PromiseReturnType<typeof api.loginInfo>) => {
      userInfo.value = r;
      // setI18nLanguage(r.language);
    });
  };

  return {
    account,
    userInfo,
    fetchCurrUserInfo,
  };
});
