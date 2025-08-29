<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import { INTER_NUMBER } from '@/utils/constant';

interface Input {
  value: string;
}

const props = defineProps({
  modelValue: {
    type: Array as () => string[],
    default: () => [],
  },
});

const emit = defineEmits(['update:modelValue']);

const isError = ref(false);
const inputs = ref<Input[]>([
  { value: '' },
  { value: '' },
  { value: '' },
  { value: '' },
  { value: '' },
  { value: '' },
  // Add more input objects here
]);

const itemRefs = ref<{ [key: number]: HTMLElement }>({});
const curIndex = ref<number>(0);

const handleKeyDown = (event: { keyCode: number }): void => {
  const isVal = inputs.value[curIndex.value].value;
  if (event.keyCode === 8 && !isVal) {
    itemRefs.value[curIndex.value - 1]?.focus();
  }
};

const itemRef =
  (index: number) =>
  (el: HTMLElement): void => {
    itemRefs.value[index] = el;
  };

const onInput = (index: number, value: string): void => {
  isError.value = !INTER_NUMBER.test(value) && value !== '';
  inputs.value[index].value = value;
  if (isError.value) return;
  focusNextInput(value !== '' ? index : curIndex.value - 1);
  emit(
    'update:modelValue',
    inputs.value.map((input) => input.value)
  );
};

const focusNextInput = (index: number): void => {
  itemRefs.value[index + 1]?.focus();
};

const handleFocus = (index: number): void => {
  curIndex.value = index;
};

const inputValue = computed<string>({
  get: (): string => inputs.value[curIndex.value].value,
  set: (value: string): void => {
    inputs.value[curIndex.value].value = value;
    emit(
      'update:modelValue',
      inputs.value.map((input) => input.value)
    );
  },
});

watch(
  () => props.modelValue,
  (o: string[]) => {
    if (o.length && o.length <= 6) {
      inputs.value.forEach((input, index) => {
        input.value = o[index] || '';
      });
    } else {
      inputs.value.forEach((input) => {
        input.value = '';
      });
      itemRefs.value[0]?.focus();
    }
  },
  { immediate: true }
);

onMounted(() => {
  itemRefs.value[0]?.focus();
});
</script>

<template>
  <div class="flex flex-col input-wrap">
    <div class="flex justify-around items-center">
      <input
        v-for="(input, index) in inputs"
        :key="index"
        :ref="itemRef(index)"
        :value="input.value"
        class="input-item"
        maxlength="1"
        @keydown="handleKeyDown"
        @input="onInput(index, $event.target.value)"
        @focus="handleFocus(index)"
      />
    </div>
    <div class="error-text">
      <span v-if="isError">非法输入</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.input-wrap {
  width: 100%;
  padding: 14px 0;
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
    border-color: var(--primary-color);
  }
}

.error-text {
  padding-top: 6px;
  font-size: 12px;
  height: 20px;
  line-height: 20px;
  color: red;
}
</style>
