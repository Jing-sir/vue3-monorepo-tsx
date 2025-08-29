<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import api from '@/api/examine';

const props = defineProps({
  amount: { type: String, require: true, default: () => '' },
  id: { type: String, require: true, default: () => '' },
});

const flowArr = ref<PromiseReturnType<typeof api.getEnterpriseTransferConfig>>([]); // 审批流数组

const fetchFlowInfo = (): void => {
  if (props.id && props.amount) {
    api
      .getEnterpriseTransferConfig({ coinId: props.id, amount: props.amount })
      .then((r) => {
        flowArr.value = r;
      })
      .catch(() => {
        flowArr.value = [];
      });
  }
};

const formatFlow = computed(() => flowArr.value[0]?.checkReqList || []);

watch(
  () => props.id,
  (value) => {
    if (value) fetchFlowInfo();
  },
  { immediate: true }
);

defineExpose({ fetchFlowInfo });
</script>

<template>
  <div>
    <div v-if="formatFlow.length">
      <div v-if="props.amount">
        <div class="is-flex flex-direction-row align-items-center">
          <div class="is-flex flex-direction-row flow-item">
            <div class="is-flex flex-direction-column align-items-center">
              <span class="block"></span>
              <span class="desc">发起</span>
            </div>
            <div class="line"></div>
          </div>
          <div
            v-for="(item, i) of formatFlow"
            :key="i"
            class="is-flex flex-direction-row flow-item"
          >
            <div class="is-flex flex-direction-column align-items-center">
              <span class="block"></span>
              <a-tooltip placement="topLeft" :title="item.checkUserName">
                <span class="desc" :title="item.checkUserName">{{
                  item.checkUserName || '1'
                }}</span>
              </a-tooltip>
            </div>
            <div class="line"></div>
          </div>
          <div class="is-flex flex-direction-row flow-item">
            <div class="is-flex flex-direction-column align-items-center">
              <span class="block"></span>
              <span class="desc">结束</span>
            </div>
          </div>
        </div>
      </div>
      <span v-else class="desc">填入转账金额后，显示对应审批流程</span>
    </div>
    <span v-else>--</span>
  </div>
</template>

<style scoped lang="scss">
.flow-item {
  font-size: 12px;

  .block {
    width: 10px;
    height: 10px;
    background: #1677ff;
    border-radius: 50%;
  }

  .desc {
    margin-top: 6px;
    width: 40px;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .line {
    height: 1px;
    background: #1677ff;
    width: 20px;
    margin: 4px 6px 0 6px;
  }
}

.desc {
  color: darkgray;
}
</style>
