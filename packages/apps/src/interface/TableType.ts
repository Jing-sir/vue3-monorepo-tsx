export interface TableResultType {
  pageNo: number;
  pageSize: number;
  totalSize: number;
  totalPages: number;
  prevPage: number;
  nextPage: number;
}

export interface ChainRowType {
  id: number; // id
  chainName: string; // 链简称
  slip44: number; // slip44
  txUri: string;
  addressUri: string;
  chainAllName: string; // 链全称
  browser: string; // 区块浏览器
  rollBackState: number; // 回滚状态 1、是 2、否
  depositConfirmNum: number; // 充值确认数
  withdrawConfirmNum: number; // 提币确认数
  lastBlockHeight: number; // 当前高度
  parserBlockHeight: number; // 解析高度
  chainState: number; // 链状态 1、启用 2、禁用
}

export interface TabsType {
  name: string;
  code: string;
  value?: string;
  role?: string;
}

export interface ColumnType {
  // column type
  title: string;
  dataIndex?: string;
  key?: string;
  slots?: {
    customRender: string;
  };
  children?: Array<{ title: string; dataIndex: string; key: string }>;
  className?: string;
  align?: string;
  width?: string | number;
  customRender?: (data: { index: number; text: string | number; record: any }) => void;
  fixed?: string;
  ellipsis?: boolean;
}

export type SearchOption = {
  value: string | null;
  label: string;
  modelKey: string;
  type: 'input' | 'select' | 'date' | 'date-single';
  optionsArr?:
    | { value: string | null | number; label: string }[]
    | ComputedRef<{ value: string | null | number; label: string }[]>;
  props?: Record<string, any>;
};
