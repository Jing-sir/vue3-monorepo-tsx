import { defineComponent } from 'vue';
import { storeToRefs } from 'pinia';
import * as Arco from '@arco-design/web-vue';
import theme from '@/store/theme';

export default defineComponent({
  name: 'ThemeSwitcher',
  setup() {
    const store = theme();
    const { themeState } = storeToRefs(store);

    const handleChange = (isOrange?: boolean) => {
      store.onChangeTheme(isOrange);
    };

    return () => (
      <Arco.Tooltip title="主题色" placement="left">
        <Arco.Popover
          v-slots={{
            title: () => null,
            content: () => (
              <div>
                <div
                  class="is-flex flex-direction-row color-item"
                  onClick={() => handleChange(true)}
                >
                  <p class="color-block orange"></p>
                  #ff6900
                </div>
                <div
                  class="is-flex flex-direction-row color-item"
                  onClick={() => handleChange(false)}
                >
                  <p class="color-block blue"></p>
                  #1890ff
                </div>
              </div>
            ),
          }}
        >
          <div
            class="color-block"
            style={{ background: themeState.value.token.colorPrimary }}
          ></div>
        </Arco.Popover>
      </Arco.Tooltip>
    );
  },
});
