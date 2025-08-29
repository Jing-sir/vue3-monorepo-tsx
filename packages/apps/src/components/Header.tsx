import { useRoute, useRouter, RouteRecordRaw } from 'vue-router';
import * as Arco from '@arco-design/web-vue';
import ColorPicker from './ColorPicker';
import { storeToRefs } from 'pinia';

export default defineComponent({
  name: 'Header',
  setup() {
    const googleRef = ref<any>();
    const resetPassRef = ref<any>();
    const hasRoute = useRoute();
    const routes = ref<RouteRecordRaw[]>([]);

    const store = sideBar();
    const userStore = user();
    const { push } = useRouter();
    const storeTagsView = tagsView();
    const { isSidebar } = storeToRefs(store);

    const handleIsSidebar = (status: boolean) => store.updateIsSidebar(!status);

    const isHome = (route: RouteRecordRaw) => {
      const name = route && route.name;
      if (!name) return false;
      return String(name).trim().toLocaleLowerCase() === 'main'.toLocaleLowerCase();
    };

    const handleOpenGoogle = () => googleRef.value.handleShowDialog(true);
    const handleOpenPass = () => resetPassRef.value.handleShowDialog(true);

    const fetchBreadcrumb = () => {
      let hasMatched: RouteRecordRaw[] = hasRoute.matched.filter(
        (item) => item.meta && item.meta.title
      );
      const hasRouteList: RouteRecordRaw[] = [
        { path: '/', meta: { title: '首页', role: '' }, redirect: '/Home' },
      ];
      if (!isHome(hasMatched[0])) {
        hasMatched = hasRouteList.concat(hasMatched);
      }
      routes.value = hasMatched.filter((item) => item.meta && item.meta.title);
    };

    const handleLink = (item: RouteRecordRaw) => {
      const { redirect, path } = item;
      if (redirect) {
        const routePath = redirect === '/Home' ? '/' : redirect;
        push(String(routePath));
        return;
      }
      push(path);
    };

    const handleLoginOut = () => {
    };

    watch(
      () => hasRoute.path,
      () => {
        if (hasRoute.path.startsWith('/redirect/')) return;
        fetchBreadcrumb();
      }
    );

    onBeforeMount(() => {
      // fetchBreadcrumb();
      // userStore.fetchCurrUserInfo();
    });

    return () => (
      <div>
        <div class="flex justify-between items-center header">
          <div class="is-flex flex-direction-row align-items-center">
            <div class="sidebar-btn-active" onClick={() => handleIsSidebar(isSidebar.value)}>
              {isSidebar.value ? (
                <icon-menu-unfold style={{ fontSize: '18px' }} />
              ) : (
                <icon-menu-fold style={{ fontSize: '18px' }} />
              )}
            </div>
            <Arco.Breadcrumb>
              {routes.value.map((item, index) => (
                <Arco.BreadcrumbItem key={item.path}>
                  {item.redirect === 'noRedirect' || index === routes.value.length - 1 ? (
                    <span class="no-redirect">{item.meta?.title}</span>
                  ) : (
                    <a onClick={(e: Event) => { e.preventDefault(); handleLink(item); }}>
                      {item.meta?.title}
                    </a>
                  )}
                </Arco.BreadcrumbItem>
              ))}
            </Arco.Breadcrumb>
          </div>

          <div class="is-flex flex-direction-row align-items-center">
            <ColorPicker />
            <Arco.Dropdown>
              {{
                default: () => (
                  <div class="is-flex flex-direction-row align-items-center cursor-pointer">
                    <div class="user-header">{11}</div>
                    <p class="user-text">{22}</p>
                  </div>
                ),
                overlay: () => (
                  <Arco.Menu>
                    <Arco.MenuItem key="0" onClick={handleOpenGoogle}>
                      修改2FA
                    </Arco.MenuItem>
                    <Arco.MenuItem key="1" onClick={handleOpenPass}>
                      修改密码
                    </Arco.MenuItem>
                    <Arco.MenuItem key="2" onClick={handleLoginOut}>
                      退出登录
                    </Arco.MenuItem>
                  </Arco.Menu>
                ),
              }}
            </Arco.Dropdown>
          </div>
        </div>
      </div>
    );
  },
});
