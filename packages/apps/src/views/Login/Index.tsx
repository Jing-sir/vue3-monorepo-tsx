import { defineComponent, ref } from 'vue';
import { Form, FormItem, Input, Checkbox, Button, Message } from '@arco-design/web-vue';
import '@arco-design/web-vue/dist/arco.css';
import api from '@/api/fetchTest.ts';

export default defineComponent({
  name: 'LoginPage',
  setup() {
    const formRef = ref<typeof Form | null>(null);

    const formData = ref({
      username: 'Alice',
      password: '123456',
    });

    const rules = {
      username: [{ required: true, message: '请输入用户名' }],
      password: [{ required: true, message: '请输入密码' }],
    };

    const onSubmit = async () => {
      try {
        await formRef.value?.validate();
        const res = await api.userLogin(formData.value);
        console.log('登录成功', res);
      } catch (e) {
        console.log('验证失败', e);
      }
    };

    return () => (
      <div class="flex h-screen text-white bg-gradient-to-br from-[#1e293b] to-[#334155]">
        {/* 左侧简介区域 */}
        <div class="hidden md:flex w-1/2 flex-col items-center justify-center px-12">
          <h1 class="text-5xl font-extrabold mb-6 text-white">OEX Admin</h1>
          <p class="text-lg text-gray-300 mb-4">
            欢迎使用企业级后台管理系统
          </p>
          <p class="text-gray-400">
            高效 · 安全 · 专业
          </p>
        </div>

        {/* 右侧登录表单 */}
        <div class="flex w-full md:w-1/2 items-center justify-center">
          <div class="w-96 bg-white p-10 rounded-2xl shadow-2xl border border-gray-200">
            <h2 class="text-3xl font-bold text-gray-900 mb-8 text-center">
              登录后台
            </h2>

            <Form ref={formRef} model={formData.value} rules={rules} layout="vertical">
              <FormItem field="username" hideLabel>
                <Input
                  v-model={formData.value.username}
                  placeholder="用户名"
                  allowClear
                />
              </FormItem>

              <FormItem field="password" hideLabel>
                <Input
                  v-model={formData.value.password}
                  placeholder="密码"
                  type="password"
                  allowClear
                />
              </FormItem>

              <div class="flex justify-between items-center mb-4 text-sm text-gray-600">
                <a href="#" class="text-blue-600 hover:underline">
                  忘记密码?
                </a>
              </div>

              <Button
                type="primary"
                long
                class="!bg-blue-700 hover:!bg-blue-600 shadow-md"
                onClick={onSubmit}
              >
                登录
              </Button>
            </Form>
          </div>
        </div>
      </div>
    );
  },
});
