<script lang="ts">
import { defineComponent, computed } from 'vue';
import { iconProps } from './iconProps';

export default defineComponent({
  name: 'FIcon',
  props: iconProps(),
  setup(props) {
    const symbolId = computed(() => `#${props.prefix}-${props.icon}`);
    const style = computed(() => {
      return {
        fontSize:
          typeof props.size === 'number' ? `${props.size}px` : props.size
      };
    });
    return { symbolId, style };
  }
});
</script>

<template>
  <div class="f-icon" :style="style">
    <svg aria-hidden="true">
      <use :xlink:href="symbolId" :fill="color" />
    </svg>
  </div>
</template>
