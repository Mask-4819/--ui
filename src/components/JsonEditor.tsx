import { computed, defineComponent, onMounted, ref, watch } from "vue";
import JSONEditor from "jsoneditor/dist/jsoneditor.min.js";
import "jsoneditor/dist/jsoneditor.min.css";
export default defineComponent({
    name: "JsonEditor",
    setup(props, { attrs, emit }) {
        // const editor = ref(null);
        console.log(attrs.modelValue);
        let editor = "";
        const innerValue = ref(null);
        const setValue = (val) => {
            console.log(val);
            emit('update:modelValue', val);
        };
        onMounted(() => {
            console.log("mounted~")
            let el = document.querySelector("#jsoneditor");
            let options = {
                mode: "code",
                modes: ["code", "form", "tree", "view"],
                onChange: () => {
                    
                    // 编辑模式下，onChange 即编辑内容有变更
                    try {
                        // 此时需要获取编辑内容
                        const value = editor.get();
                        setValue(value);
                    } catch (e) {}
                }
            }
            editor = new JSONEditor(el, options);
            editor.set(attrs.modelValue);
        });
        const render = () => {
            return (
                <div id="jsoneditor">
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
