import zhCN from '@arco-design/web-vue/es/locale/lang/zh-cn';
import enUS from '@arco-design/web-vue/es/locale/lang/en-us';
import { getI18nLanguage } from '@/setup/i18n-setup';
import { ConfigProvider } from '@arco-design/web-vue';
import { RouterView } from 'vue-router';
import i18n from './setup/i18n-setup';
import 'dayjs/locale/zh-cn';
import 'dayjs/locale/en';
import dayjs from 'dayjs';

export default defineComponent({
  setup() {
    const renderKey = computed(() => `app-key-${i18n.global.locale.value}-${Math.random()}`);

    const currLang = computed(() => (i18n.global.locale.value === 'zh-CN' ? zhCN : enUS));

    onBeforeMount(() => {
      dayjs.locale(getI18nLanguage() === 'zh-CN' ? 'zh-cn' : 'en');
    });

    return () => (
      <div id="app" style={{ width: '100%', minHeight: '100%', minWidth: '1200px', background: '#f5f6f8' }}>
        <ConfigProvider locale={currLang.value}>
          <RouterView key={renderKey.value} />
        </ConfigProvider>
      </div>
    );
  },
});
