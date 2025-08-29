import { getCurrentInstance, reactive, ref, watch } from 'vue';
import { PagingDefaultConf } from '@/utils/constant';
import { throttleFunc } from '@/utils/common';

export default function useTableConf(fetchTableDataCallback: () => void) {
  const isLoading = ref(false);
  const paginationConfig = reactive({ ...PagingDefaultConf }); // 分页信息

  const handleSizeChange = ({ pageSize, current }: { pageSize: number; current: number }): void => {
    // 切换每页数量
    paginationConfig.pageSize = pageSize;
    paginationConfig.current = current;
    fetchTableDataCallback();
  };

  const onSearch = () => {
    paginationConfig.current = 1;
    throttledSearch();
  };

  // 使用截流函数创建一个截流后的搜索函数
  const throttledSearch = throttleFunc(() => {
    if (typeof fetchTableDataCallback === 'function') {
      fetchTableDataCallback();
    }
  }, 800);

  return {
    onSearch,
    isLoading,
    paginationConfig,
    handleSizeChange,
  };
}
