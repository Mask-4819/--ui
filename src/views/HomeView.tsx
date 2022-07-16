import { computed, defineComponent} from "vue";
export default defineComponent({
    name: "FButton",
    setup(props) {
        const classList = computed(() => {
        });

        const render = () => {
            return (
                <div>123</div>
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
