<script setup lang="ts">
import { ref, watch } from 'vue';
import CodeInput from '@/components/CodeInput.vue';
import { SIX_NUMBER } from '@/utils/constant';
import { handlePaste } from '@/utils/common';
import { useRouter } from 'vue-router';

const { title } = defineProps({
  title: {
    type: String,
    require: true,
    default: () => '2FA验证',
  },
});
const emits = defineEmits(['setCodeVal']);

const router = useRouter();
const visible = ref(false);
const codeArr = ref<string[]>([]);

const onPaste = async () => {
  // code 粘贴事件
  codeArr.value = await handlePaste();
};

const resetInputs = () => {
  codeArr.value = [];
};

const onShowDialog = (val = false): void => {
  visible.value = val;
};

watch(
  () => codeArr.value,
  (newValue) => {
    const isNotEmpty = newValue.every((item) => item !== '');
    if (!SIX_NUMBER.test(codeArr.value.join(''))) return;

    if (isNotEmpty && newValue.length === 6) {
      visible.value = false;
      emits('setCodeVal', codeArr.value.join(''));
    }
  }
);

defineExpose({ onShowDialog, resetInputs });
</script>

<template>
  <a-modal v-model:open="visible" :title="title" :footer="null" @cancel="resetInputs">
    <div class="flex justify-between items-center btn-layout">
      <span>请输入谷歌验证码</span>
      <a-button class="paste-btn" type="link" @click.stop="onPaste">粘贴</a-button>
    </div>
    <CodeInput v-model="codeArr" />
  </a-modal>
</template>

<style scoped lang="scss">
.input-wrap {
  padding: 30px;
}

.input-item {
  outline: none;
  width: 46px;
  height: 50px;
  border: 1px solid #cccccc;
  border-radius: 4px;
  text-align: center;
  font-size: 20px;
  font-weight: bold;

  &:focus {
    border-color: #1890ff;
  }
}

.btn-layout {
  padding-left: 30px;
  padding-right: 16px;
  box-sizing: border-box;
}

.paste-btn {
  cursor: pointer;
  color: var(--primary-color);

  &:hover {
    color: #ff9600;
  }
}
</style>
