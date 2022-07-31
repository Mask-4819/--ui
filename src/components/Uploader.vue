<template>
  <div class="file-upload">
    <input type="file" />
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'
type UploadStaus = 'ready' | 'loading' | 'success' | 'error'
type CheckUpload = (file: File) => boolean | Promise<File>
export interface UploadFile {
  uid: string
  size: number
  name: string
  status: UploadStaus
  raw: File
  resp?: any
  url?: string
}
export default defineComponent({
  props: {
    action: {
      type: String,
      required: true
    },
    beforeUpload: {
      type: Function as PropType<CheckUpload>
    },
    drag: {
      type: Boolean,
      default: false
    },
    showUploadList: {
      type: Boolean,
      default: true
    }
  },
  emits: ['success', 'error', 'change'],
  setup() {
    return {}
  }
})
</script>
<style lang="scss"></style>
