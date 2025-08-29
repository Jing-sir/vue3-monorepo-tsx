import { useRoute, useRouter, RouteRecordRaw } from 'vue-router';
import * as Arco from '@arco-design/web-vue';
import { Icon } from '@arco-design/web-vue';
import { storeToRefs } from 'pinia';
import '@iconfu/svg-inject';

export default defineComponent({
  name: 'SidebarTSX',
  setup() {
    const hasRoute = useRoute();
    const selectedKeys = ref<string[]>(['/']);

    const store = sideBar();
    const { push } = useRouter();
    const { routes, roleMenu, isSidebar } = storeToRefs(store);

    const openKeys = computed(() => routes.value?.map(({ path }) => path));

    const isShowChild = (children: RouteRecordRaw[] = []) => !children.length;
    const hasOneShowingChild = (children: RouteRecordRaw[] = [], item: RouteRecordRaw) =>
      children.length === 1 && item.meta?.hidden;

    const handleClickItem = (parentPath = '', childPath = '') => {
      push(childPath ? `${parentPath}/${childPath}` : parentPath);
    };

    watch(
      () => hasRoute.path,
      (o: string, n?: string) => {
        if (o !== n) {
          selectedKeys.value = [String(o === '/' ? '/' : o.split('/').pop())];
        }
      },
      { deep: true, immediate: true }
    );

    // 渲染菜单递归函数
    const renderMenu = (menu: RouteRecordRaw[]) =>
      menu.map((item) => {
        const children = item.children || [];
        if (hasOneShowingChild(children, item)) {
          return (
            <Arco.MenuItem key={item.path}>
              <div class="display-flex flex-align-items-center" onClick={() => handleClickItem(item.path)}>
                {item.meta?.icon && <Icon icon-type={item.meta.icon} class="icon-size" />}
                <span class="title">{item.meta?.title}</span>
              </div>
            </Arco.MenuItem>
          );
        } else if (!item.meta?.isShow) {
          return (
            <Arco.SubMenu key={item.path}>
              {{
                title: () => (
                  <div class="display-flex flex-align-items-center">
                    {item.meta?.icon && <Icon icon-type={item.meta.icon} class="icon-size" />}
                    <span class="title">{item.meta?.title}</span>
                  </div>
                ),
                default: () =>
                  children.map((childItem) => {
                    const childChildren = childItem.children || [];
                    if (isShowChild(childChildren) && !childItem.meta?.isShow) {
                      return (
                        <Arco.MenuItem key={childItem.path}>
                          <div
                            class="display-flex flex-align-items-center"
                            onClick={(e: Event) => {
                              e.stopPropagation();
                              handleClickItem(item.path, childItem.path);
                            }}
                          >
                            {childItem.meta?.icon && <Icon icon-type={childItem.meta.icon} class="icon-size" />}
                            <span class="title">{childItem.meta?.title}</span>
                          </div>
                        </Arco.MenuItem>
                      );
                    } else {
                      return (
                        <Arco.SubMenu key={childItem.path}>
                          {{
                            title: () => [
                              childItem.meta?.icon && <Icon icon-type={childItem.meta.icon} class="icon-size" />,
                              <span class="title">{childItem.meta?.title}</span>
                            ],
                            default: () =>
                              childChildren.map((child) => (
                                <Arco.MenuItem key={child.path}>
                                  <div
                                    onClick={(e: Event) => {
                                      e.stopPropagation();
                                      handleClickItem(childItem.path, child.path);
                                    }}
                                  >
                                    {child.meta?.icon && <Icon icon-type={child.meta.icon} class="icon-size" />}
                                    <span class="title">{child.meta?.title}</span>
                                  </div>
                                </Arco.MenuItem>
                              )),
                          }}
                        </Arco.SubMenu>
                      );
                    }
                  }),
              }}
            </Arco.SubMenu>
          );
        }
      });

    return () => (
      <div>
        <div class="is-flex flex-direction-column align-items-center logo-wrap" />
        <Arco.Menu v-model:openKeys={openKeys.value} v-model:selectedKeys={selectedKeys.value} mode="inline" theme="dark">
          {renderMenu(routes.value || [])}
        </Arco.Menu>
      </div>
    );
  },
});
