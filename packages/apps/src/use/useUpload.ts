import { message } from '@arco-design/web-vue';
import { FileItem } from '@/interface/StateType';

export default function useUpload() {
  const beforeUpload = (file: FileItem) => {
    const isJpgOrPng =
      file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg';
    if (!isJpgOrPng) {
      message.error('请上传jpg或png格式文件');
    }
    const isLt2M = file.size / 1024 / 1024 < 5;
    if (!isLt2M) {
      message.error('请上传5M以内的图片');
    }
    return isJpgOrPng && isLt2M;
  };

  return {
    beforeUpload,
  };
}
