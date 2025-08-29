import { useRoute, useRouter, RouteRecordRaw, RouterView } from 'vue-router';
import { Transition, KeepAlive } from 'vue';
import * as Arco from '@arco-design/web-vue';
import Header from '@/components/Header';

export default defineComponent({
  name: 'Main',
  setup() {
    const isOnline = ref(true);
    const hasRoute = useRoute();
    const routes = ref<RouteRecordRaw[]>([]);

    const store = sideBar();
    const { push } = useRouter();
    const { isSidebar } = storeToRefs(store);

    const storeTagsView = tagsView();

    const fetchHeaderWidth = computed(() =>
      isSidebar.value ? 'calc(100% - 80px)' : 'calc(100% - 235px)'
    );

    const isHome = (route: RouteRecordRaw) => {
      const name = route && route.name;
      if (!name) return false;
      return String(name).trim().toLowerCase() === 'main';
    };

    const fetchBreadcrumb = () => {
      let hasMatched = hasRoute.matched.filter((item) => item.meta && item.meta.title);
      const hasRouteList: RouteRecordRaw[] = [
        { path: '/', meta: { title: '首页' }, redirect: '/Home' },
      ];
      if (!isHome(hasMatched[0])) {
        hasMatched = hasRouteList.concat(hasMatched);
      }
      routes.value = hasMatched.filter((item) => item.meta && item.meta.title);
    };

    const handleLink = (item: RouteRecordRaw) => {
      const { redirect, path } = item;
      if (redirect) {
        push(redirect === '/Home' ? '/' : redirect);
        return;
      }
      push(path);
    };

    watch(
      () => window.navigator.onLine,
      (o: boolean) => {
        isOnline.value = o;
      },
      { immediate: true }
    );

    watch(
      () => hasRoute.path,
      () => {
        if (hasRoute.path.startsWith('/redirect/')) return;
        fetchBreadcrumb();
      }
    );

    onBeforeMount(fetchBreadcrumb);

    return () => (
      <Arco.Layout>
        <Arco.LayoutSider
          v-model:collapsed={isSidebar.value}
          width={235}
          style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
            zIndex: 3,
          }}
        >
        </Arco.LayoutSider>

        <Arco.Layout style={{ marginLeft: isSidebar.value ? '80px' : '235px', minHeight: '100vh' }}>
          <Arco.LayoutHeader
            style={{
              background: '#f5f6f8',
              padding: 0,
              position: 'fixed',
              height: '61px',
              zIndex: 3,
              width: fetchHeaderWidth.value,
            }}
          >
            <Header />
          </Arco.LayoutHeader>

          <Arco.LayoutContent style={{ overflowY: 'auto', marginTop: '56px', minWidth: '1200px' }}>
            <div style={{ background: '#f5f6f8', minHeight: '730px' }}>
              {isOnline.value ? (
                <RouterView
                  v-slots={{
                    default: ({ Component, route }) => (
                      <Transition name="fade-transform" mode="out-in">
                        <KeepAlive include={['AllFees', 'TotalFees']}>
                          { Component ? <Component key={route.path} /> : null}
                        </KeepAlive>
                      </Transition>
                    ),
                  }}
                />
              ) : (
                <div class="flex-direction-column flex-align-items-center table-container">
                  <p class="network-text">网络异常</p>
                  <p class="text-size-14">请检查网络状态后刷新重试</p>
                </div>
              )}
            </div>
          </Arco.LayoutContent>
        </Arco.Layout>
      </Arco.Layout>
    );
  },
});
