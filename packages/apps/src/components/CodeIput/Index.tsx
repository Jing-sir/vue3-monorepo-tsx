import { INTER_NUMBER } from '@/utils/constant';
import type { PropType } from 'vue';
import './index.css';

interface Input {
  value: string;
}

export default defineComponent({
  name: 'CodeInput',
  props: {
    modelValue: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const isError = ref(false);
    const inputs = ref<Input[]>(Array.from({ length: 6 }, () => ({ value: '' })));
    const itemRefs = ref<{ [key: number]: HTMLInputElement | null }>({});
    const curIndex = ref(0);

    const itemRef = (index: number) => (el: HTMLInputElement | null) => {
      itemRefs.value[index] = el;
    };

    const focusNextInput = (index: number) => {
      const next = index + 1;
      if (next < inputs.value.length) {
        itemRefs.value[next]?.focus();
      }
    };

    const handleKeyDown = (event: KeyboardEvent, index: number) => {
      if (event.key === 'Backspace' && !inputs.value[index].value) {
        itemRefs.value[index - 1]?.focus();
      }
    };

    const handleFocus = (index: number) => {
      curIndex.value = index;
    };

    const handleInput = (index: number, value: string) => {
      isError.value = !INTER_NUMBER.test(value) && value !== '';
      if (isError.value) return;
      inputs.value[index].value = value;
      emit('update:modelValue', inputs.value.map(i => i.value));
      if (value !== '') focusNextInput(index);
    };

    // 外部值同步到内部 inputs
    watch(
      () => props.modelValue,
      (val) => {
        if (val && val.length <= 6) {
          inputs.value.forEach((input, idx) => {
            input.value = val[idx] || '';
          });
        } else {
          inputs.value.forEach(input => (input.value = ''));
          itemRefs.value[0]?.focus();
        }
      },
      { immediate: true }
    );

    onMounted(() => {
      itemRefs.value[0]?.focus();
    });

    return () => (
      <div class="flex flex-col input-wrap">
        <div class="flex justify-between items-center">
          {inputs.value.map((input, index) => (
            <input
              key={index}
              ref={itemRef(index)}
              value={input.value}
              class="input-item"
              maxlength={1}
              onKeydown={(e) => handleKeyDown(e, index)}
              onInput={(e: Event) =>
                handleInput(index, (e.target as HTMLInputElement).value)
              }
              onFocus={() => handleFocus(index)}
            />
          ))}
        </div>
        <div class="error-text">
          {isError.value && <span>非法输入</span>}
        </div>
      </div>
    );
  },
});
