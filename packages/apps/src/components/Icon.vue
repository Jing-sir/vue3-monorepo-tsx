<template>
    <icon-font
        type="icon-person"
        :size="32"
    />
</template>

<script>
import { Icon } from '@arco-design/web-vue';

const IconFont = Icon.addFromIconFontCn({ src: '//at.alicdn.com/t/c/font_4236741_ak9xwdnyjlk.js' });

export default {
  components:{
    IconFont
  }
};
</script>
