import { defineComponent } from 'vue';
import { RouterLink, RouterView } from 'vue-router';

export default defineComponent({
  name: 'App',
  setup() {
    return () => (
      <>
        <RouterView />
      </>
    );
  }
});
