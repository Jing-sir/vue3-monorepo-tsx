import { RuleObject } from '@arco-design/web-vue/es/form/interface';
import { GREATER_THAN_ZERO_NUMBER, INTER_NUMBER, IP_V4, IP_V6 } from '@/utils/constant';

export default function useValidatorConf() {
  const validateNumber = async (rule: RuleObject, value: string) => {
    // 验证码验证
    if (value === '') return Promise.reject('请输入');
    if (!INTER_NUMBER.test(value)) return Promise.reject('非法输入');

    return Promise.resolve();
  };

  const validateNumInput = async (rule: RuleObject, value: string) => {
    // 验证码验证
    if (value === '') return Promise.reject('请输入');
    if (!value) return Promise.reject('无效金额');
    if (!GREATER_THAN_ZERO_NUMBER.test(value)) return Promise.reject('无效金额');

    return Promise.resolve();
  };

  const validateIp = async (rule: RuleObject, value: string) => {
    // 验证码验证
    if (value === '') return Promise.reject('请输入');
    if (!IP_V4.test(value) && !IP_V6.test(value)) return Promise.reject('请输入有效ip地址');

    return Promise.resolve();
  };

  return {
    validateIp,
    validateNumber,
    validateNumInput,
  };
}
