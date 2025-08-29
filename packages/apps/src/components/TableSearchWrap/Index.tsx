const { Button, Input, Select, Option, Space, Form, FormItem, DatePicker, RangePicker } = Arco;
import { IconCaretDown, IconCaretUp, IconSearch } from '@arco-design/web-vue/es/icon';
import { timeStampToDate } from '@/filters/dateFormat.ts';
import { debounce, keyBy, mapValues } from 'lodash-es';
import { SearchOption } from '@/interface/TableType';
import Arco from '@arco-design/web-vue';
import dayjs from 'dayjs';

export default defineComponent({
  name: 'Search',
  props: {
    searchConf: {
      type: Array as () => SearchOption[],
      default: () => [],
      required: true,
    },
    isMore: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['searchCallback'],
  setup(props, { emit, expose }) {
    const formRef = ref();
    const { t } = useI18n();
    const isSearch = ref(false);

    const formState = reactive({
      domains: props.searchConf,
    });

    const searchState = ref<{ searchKey: string; searchVal: string }>({
      searchKey: props.searchConf?.length ? props.searchConf[0].modelKey : '',
      searchVal: '',
    });

    const onToggleSearch = () => (isSearch.value = !isSearch.value);

    const onSearch = debounce(() => {
      emit('searchCallback', getSearchCal.value);
    }, 600);

    const onReset = () => {
      formRef.value.resetFields?.();
      getConfArr.value.forEach((item) => {
        item.value = item.type === 'select' ? null : '';
      });
      searchState.value.searchVal = '';
      emit('searchCallback', getSearchCal.value);
    };

    const getSearchCal = computed(() => {
      return {
        ...mapValues(keyBy(props.searchConf, 'modelKey'), (item) => {
          if (item.type === 'date' && Array.isArray(item.value)) {
            return item.value.map((date) => timeStampToDate(date));
          }
          if (item.type === 'date-single' && item.value) {
            return timeStampToDate(item.value);
          }
          return item.value;
        }),
        [searchState.value.searchKey]: searchState.value.searchVal,
      };
    });

    const getSearchOptions = computed(() =>
      props.searchConf?.filter((item) => item.type === 'input')
    );

    const getConfArr = computed(() =>
      formState.domains?.filter((item) => item.modelKey !== searchState.value.searchKey)
    );

    const fetchTipsText = computed(() => {
      return getSearchOptions.value?.length
        ? getSearchOptions.value.find((item) => item.modelKey === unref(searchState).searchKey)
        ?.label || ''
        : '';
    });

    return () => (
      <div class="w-full mb-5">
        <header class="flex justify-between w-full">
          <div class="flex justify-between w-full">
            { props.searchConf?.length ? (
              <div class="flex flex-row w-3/4">
                <Select
                  v-model={searchState.value.searchKey}
                  style={{ minWidth: 160 }}
                  onChange={onSearch}
                >
                  { getSearchOptions.value.map((item) => (
                    <Option key={item.modelKey} value={item.modelKey}>
                      { item.label }
                    </Option>
                  )) }
                </Select>
                <Input
                  v-model={searchState.value.searchVal}
                  allowClear
                  style={{ marginLeft: '16px', width: '40%' }}
                  placeholder={`${t('searchText')} ${fetchTipsText.value}`}
                  onInput={onSearch}
                  onPressEnter={onSearch}
                >
                  {{
                    prefix: () => <IconSearch class="search-icon" />,
                  }}
                </Input>
              </div>
            ) : (
              <slot name="left" />
            )}
          </div>
          { props.isMore && props.searchConf.length > 1 ? (
            <Space>
              <Button
                type="default"
                onClick={(e: Event) => { e.stopPropagation(); onToggleSearch(); }}
                v-slots={{
                  icon: () => (!isSearch.value ? <IconCaretDown /> : <IconCaretUp />)
                }}
              >
                { t('moreBtn') }
              </Button>
            </Space>
          ) : null }
        </header>

        { isSearch.value && props.searchConf.length > 1 ? (
          <div
            class={[
              'flex flex-col rounded-lg bg-[#fbfbfd] mt-3 animate__animated',
              isSearch.value ? 'animate__fadeIn' : 'animate__fadeOut',
              'animate__delay-0.6s',
            ]}
          >
            <Form ref={formRef} model={formState} layout="vertical">
              <div class="flex flex-row w-full flex-wrap pt-3 px-3">
                {getConfArr.value.map((item, i) => (
                  <FormItem key={i} label={item.label} name={item.modelKey} style={{ width: '16%', marginRight: '20px' }}>
                    { item.type === 'input' ? (
                      <Input
                        v-model={item.value}
                        placeholder={`${t('inputText[0]')}${item.label}`}
                        onInput={onSearch}
                        onPressEnter={onSearch}
                      />
                    ) : null }
                    { item.type === 'select' ? (
                      <Select
                        v-model={item.value}
                        options={item.optionsArr}
                        placeholder={`${t('inputText[0]')}${item.label}`}
                        {...item.props}
                        onChange={onSearch}
                      />
                    ) : null}
                    { item.type === 'date' ? (
                      <RangePicker
                        v-model={item.value}
                        style={{ width: '100%' }}
                        showTime={{
                          hideDisabledOptions: true,
                          defaultValue: [dayjs('00:00:00', 'HH:mm:ss'), dayjs('11:59:59', 'HH:mm:ss')],
                        }}
                        format="YYYY-MM-DD HH:mm:ss"
                        onChange={onSearch}
                      />
                    ) : null }
                    { item.type === 'date-single' ? (
                      <DatePicker
                        v-model={item.value}
                        style={{ width: '100%' }}
                        showTime={{
                          hideDisabledOptions: true,
                          defaultValue: dayjs('00:00:00', 'HH:mm:ss'),
                        }}
                        format="YYYY-MM-DD HH:mm:ss"
                        onChange={onSearch}
                      />
                    ) : null }
                  </FormItem>
                ))}
              </div>
            </Form>
            <div class="flex justify-end pb-3 pr-3">
              <Button type="primary" class="mr-2" onClick={onSearch}>
                {t('searchText')}
              </Button>
              <Button onClick={onReset}>{t('resetText')}</Button>
            </div>
          </div>
        ) : null }
      </div>
    );
  },
});
