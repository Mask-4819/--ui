import { computed, defineComponent, reactive,ref, watch, toRefs, onMounted } from "vue";
import JsonEditor from "@/components/JsonEditor";
export default defineComponent({
    name: "HomeView",
    setup(props) {
        const dataList = ref({ size: "big", status: 'warning' });
        const modelData = toRefs({dataList});
        watch(dataList, (value) => {
            console.log({...modelData.dataList.value});
        }, { deep: true});
        const render = () => {
            return (
                <div class="demo-page">
                    <header class="demo-header">Playground</header>
                    <section class="demo-body">
                        <aside class="demo-aside">
                            <h1>{dataList}</h1>
                            <JsonEditor v-model={dataList.value} />
                        </aside>
                        <main class="demo-main">
                            <div class="demo-main__content">
                                <f-button {...modelData.dataList.value}>123</f-button>
                            </div>
                        </main>
                    </section>


                </div>

            )
        };
        return {
            render
        }
    },
    render() {
        return this.render();
    }
})
