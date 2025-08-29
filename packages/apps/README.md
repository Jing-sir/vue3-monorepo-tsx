# Vue 3 + TypeScript + Vite + tailwind

#### 项目文件创建是以大模块为主文件目录，细分模块为辅的文件目录构造。例如，首页模块创建Home文件夹, Index.tsx为主入口，里面则对应细分如：Banner模块、Notify模块、Download模块 api目录_
#### api文件夹存放的是接口文件
#### 命名细则是根据后端接口地址来命名创建如：/api/v1/account
#### 则在文件中创建：account.ts文件，依此类推 components目录
#### 公用组件模块目录文件夹 assets静态资源目录
#### images存放图片
#### iconfont存放本地字体图标，需要使用: Uniconde标准不会在部署的时候出现乱码
#### stylesheet样式文件存放目录 lang目录
#### lang多语言文件存放目录 plugins目录
#### plugins项目插件目录
#### axios封装，[doc](https://axios-http.com/docs/intro)
#### event事件, [doc setup目录](https://www.w3schools.com/nodejs/nodejs_events.asp)
#### 多语言设置封装: [i18n-next，doc](https://www.i18next.com/)
#### 路由设置封装：[router-setup doc](https://router.vuejs.org/zh/) utils目录
#### 工具文件存放在：utils文件夹中 
#### store目录存放的是状态管理器代码，使用的库是：[pinia doc](https://pinia.vuejs.org/)
#### views项目组件存放目录

```bash
# nuxt.config.ts
配置了Components组件自动导入工具
配置了AutoImport文件夹自动导入工具
配置了vue-i18n国际化工具
