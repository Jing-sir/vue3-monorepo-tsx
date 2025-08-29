import { onBeforeMount, reactive, ref, toRaw } from 'vue';
import NProgress from 'nprogress';
import { ColumnType } from '@/interface/StateType';
import allToRaw from '@/utils/allToRaw';

export interface ResponseType {
  pageNo: number;
  pageSize: number;
  totalPages: number;
  totalSize: number;
}

type IService<R, P extends any[]> = (...args: P) => Promise<R>;
interface IResponse<L extends any[] = any[]> extends ResponseType {
  list: L;
}

interface IOptions<Response> {
  columns?: ColumnType[];
  manual?: boolean;
}

export default function useFetchTableData<Response extends IResponse, Params extends any[]>(
  service: IService<Response, Params>,
  options: IOptions<Response> = {}
) {
  const { columns = [], manual = false } = options;
  const filterKeys = toRaw(columns)
    .filter((item) => typeof item.dataIndex === 'string')
    .map((item) => item.dataIndex as string);
  const defaultColumns = ref<ColumnType[]>(columns);
  const pagination = reactive<{
    pageNo: number;
    pageSize: number;
    pageTotal: number;
  }>({
    pageNo: 1,
    pageSize: 10,
    pageTotal: 0,
  });

  const dataSource = ref<Response['list']>([]);
  const loading = ref<boolean>(false);
  const runAsync = async (params: Record<string, any> = {}) => {
    if (loading.value) return;
    NProgress.start();
    loading.value = true;
    const { pageNo, pageSize } = toRaw(pagination);
    // @ts-ignore
    const { list, totalSize } = await service({
      ...allToRaw(params),
      pageNo,
      pageSize,
    }).finally(() => {
      loading.value = false;
      NProgress.done();
    });
    // @ts-ignore
    dataSource.value = list;
    pagination.pageTotal = totalSize;
  };
  const resetAndLoad = (params: Record<string, any> = {}) => {
    pagination.pageNo = 1;
    runAsync(params).then();
  };
  onBeforeMount(async () => {
    if (manual) return;
    await runAsync();
  });
  const filterColumns = (keys?: string[]) => {
    if (!keys) {
      defaultColumns.value = columns;
    } else {
      defaultColumns.value = columns.filter(
        (item) => !item.dataIndex || keys.includes(item.dataIndex)
      );
    }
  };
  return {
    loading,
    runAsync,
    pagination,
    dataSource,
    resetAndLoad,
    filterKeys,
    columns: defaultColumns,
    filterColumns,
  };
}
