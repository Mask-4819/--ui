<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';
export const messageType = ['success', 'warning', 'type', 'error'] as const;
type TYPE = typeof messageType[number];

export default defineComponent({
  name: 'FMessage',
  props: {
    /**
     * @description 弹窗类型
     * @en
     * @values  'success', 'warning', 'type', 'error'
     * @defaultValue "type"
     */
    type: {
      type: String as PropType<TYPE>
    },
    /**
     * @description message内容
     * @en
     * @values
     * @defaultValue
     */
    message: String,

    /**
     * @description 延时关闭时间
     * @en
     * @values
     * @defaultValue 1000
     */
    duration: Number,
    /**
     * @description 是否现实关闭按钮
     * @en
     * @values true fasle
     * @defaultValue
     */
    showClose: {
      type: Boolean,
      default: true
    },
    /**
     * @description 关闭弹窗
     * @en
     * @values
     * @defaultValue
     */
    onClose: String
  },
  setup(props) {}
});
</script>

<template>
  <div class="f-message">123</div>
</template>
