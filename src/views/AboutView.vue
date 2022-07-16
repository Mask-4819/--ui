<template>
  <div></div>
</template>

<script>
export default {
  name: "TodoApp",

  data() {
    return {
      todos: [
        {
          id: 1,
          text: "Learn Vue.js 3",
          completed: false,
        },
      ],
    };
  },
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
