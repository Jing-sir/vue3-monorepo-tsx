import { defineComponent, ref } from 'vue';
import TableSearchWrap from '@/components/TableSearchWrap/Index';

export default defineComponent({
  name: 'Home',
  setup() {
    const searchConf = ref([
      { modelKey: 'name', value: '', label: '姓名', type: 'input' },
      { modelKey: 'no', value: '', label: '编号', type: 'input' },
      { modelKey: 'email', value: '', label: '邮箱', type: 'input' },
      { modelKey: 'no', value: '', label: '渠道', type: 'input' },
      { modelKey: 'email', value: '', label: '电话号码', type: 'input' },
    ]);

    const arr = ref([
      { label: '订单号', value: 'orderNo', placeholder: '请输入', type: 'input' },
      { label: '用户UID', value: 'accountId', placeholder: '请输入', type: 'input' },
      { label: '用户标签', value: 'labelId', placeholder: '请选择', type: 'labelId' },
      { label: '所属代理商', value: 'agentName', placeholder: '请输入', type: 'input' },
      { label: '渠道客户编号', value: 'customerNo', placeholder: '请输入', type: 'input' },
      { label: '卡号', value: 'cardNo', placeholder: '请输入', type: 'input' },
      { label: '卡片渠道', value: 'ditchName', placeholder: '请选择', type: 'select', options: [] },
      { label: '卡片名称', value: 'cardName', placeholder: '请输入', type: 'input' },
      { label: '赎回币种', value: 'coinSymbol', placeholder: '请选择', type: 'select', options: [] },
      { label: '到账币种', value: 'creditedAmountSymbol', placeholder: '请选择', type: 'select', options: [] },
      { label: '预扣手续费币种', value: 'priorFeeSymbol', placeholder: '请选择', type: 'select', options: [] },
      { label: '原始币种', value: 'originalCoinId', placeholder: '请选择', type: 'select', options: [] },
      { label: '订单号', value: 'orderNo', placeholder: '请输入', type: 'input' },
      { label: '闪兑订单号', value: 'swapNo', placeholder: '请输入', type: 'input' },
      { label: '开卡关联订单号', value: 'applicationOrderNo', placeholder: '请输入', type: 'input' },
      { label: '创建时间', value: 'timeStart', placeholder: '请选择创建时间', timeFormat: 'timeStamp', type: 'date', timeValue: ['startCreateTime', 'endCreateTime'] },
      { label: '更新时间', value: 'timeVal', placeholder: '请选择创建时间', timeFormat: 'timeStamp', type: 'date', timeValue: ['startUpdateTime', 'endUpdateTime'] },
      { label: '来源', value: 'source', placeholder: '请选择', type: 'select', options: [] },
      { label: '订单状态', value: 'state', placeholder: '请选择', type: 'select', options: [] },
    ]);

    return {
      searchConf,
      arr,
    };
  },
  render() {
    return (
      <div class="main-wrapper">
        <TableSearchWrap search-conf={this.searchConf} />
        <p class="flex flex-row items-center">
        </p>
      </div>
    );
  },
});
