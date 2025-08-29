import { defineStore } from 'pinia';
import { ref } from 'vue';

export default defineStore('theme', () => {
  const themeState = ref({
    token: {
      colorPrimary: '#ff6900',
    },
  });

  const onChangeTheme = (val = true): void => {
    // 切换主题
    themeState.value.token.colorPrimary = val ? '#ff6900' : '#1890ff';
    document.documentElement.style.setProperty('--primary-color', val ? '#ff6900' : '#1890ff');
  };

  return {
    themeState,
    onChangeTheme,
  };
});
