import { ref, computed } from 'vue';
export default function useGoogleTitle() {
  const isCode = ref<'ENABLE' | 'DISABLE'>('ENABLE');

  const fetchTitle = computed(() => (isCode.value === 'ENABLE' ? '禁用' : '启用'));

  return {
    isCode,
    fetchTitle,
  };
}
