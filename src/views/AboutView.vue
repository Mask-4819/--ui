<template>
  <div>
    <!-- <f-button v-model="name"></f-button> -->
    <i class="iconfont">&#xe891;</i>
    <Button>111</Button>
  </div>
</template>

<script>
import { Button } from '@--ui';
export default {
  name: 'TodoApp',
  components: {
    Button
  },
  data() {
    return {
      name: '123',
      todos: [
        {
          id: 1,
          text: 'Learn Vue.js 3',
          completed: false
        }
      ]
    };
  }
};
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
