<script setup lang="ts">
const props = defineProps({
  flowArr: {
    type: Array,
    require: true,
    default: () => [],
  },
  sendUser: {
    // 审核状态
    type: String,
    require: true,
    default: () => '',
  },
});
</script>

<template>
  <div>
    <div class="is-flex flex-direction-row align-items-start">
      <div class="is-flex flex-direction-row flow-item">
        <div class="is-flex flex-direction-column align-items-center">
          <span class="block"></span>
          <span class="desc">发起</span>
          <span v-if="props.sendUser" class="desc">{{ props.sendUser }}</span>
        </div>
        <div class="line"></div>
      </div>
      <div v-for="(item, i) of props.flowArr" :key="i" class="is-flex flex-direction-row flow-item">
        <div class="is-flex flex-direction-column align-items-center">
          <span class="block"></span>
          <a-tooltip placement="topLeft" :title="item.user">
            <span class="desc" :title="item.user">{{ item.user || '--' }}</span>
          </a-tooltip>
          <span class="desc" :style="{ color: item.checkState === 1 ? '#11a816' : '#f4064d' }">{{
                    >{{ item.checkState === 1 ? "已审核" : "待审核" }}</span>
          <span v-if="item.checkResult === 1" class="desc" :style="{ color: '#11a816' }">通过</span>
          <span v-if="item.checkResult === 2" class="desc" :style="{ color: '#ef1d09' }">拒绝</span>
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
    width: 40px;
    margin-top: 6px;
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
