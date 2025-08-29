<template>
  <div class="flex-direction-column flex-align-items-center router-view-wrap">
    <!--    <IconFont style="font-size: 150px; margin-top: 100px;" type="icon-meiyouquanxian" />-->
    <a-empty style="margin-top: 140px" description="暂无权限,请咨询管理员" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'NotRolePurview',
});
</script>
