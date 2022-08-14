import {
  computed,
  defineComponent,
  reactive,
  ref,
  watch,
  toRefs,
  onMounted
} from 'vue';
import JsonEditor from '@/components/JsonEditor';
import { Message } from '@--ui';
export default defineComponent({
  name: 'HomeView',

  setup() {
    const showMessage = () => {
      // console.log(Message);
      Message();
    };

    const render = () => {
      return (
        <div class="demo-page">
          <header class="demo-header">Playground</header>
          <section class="demo-body">
            <aside class="demo-aside"></aside>
            <main class="demo-main">
              <div class="demo-main__content">
                <f-button onClick={showMessage} size="large">
                  1231
                </f-button>
                <f-icon icon="add" color="red" size={18}></f-icon>
              </div>
            </main>
          </section>
        </div>
      );
    };
    return {
      render,
      showMessage
    };
  },
  mounted() {
    // this.$message();
    // console.log(this.$message);
  },
  methods: {
    showMessage(this: { $message: () => void }) {
      // console.log(this);
      // this.$message();
    }
  },
  render() {
    return this.render();
  }
});
