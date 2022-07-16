/**
 *  仅用于现实测试案例, 不代表最终成果
 */

import { computed, defineComponent,PropType} from "vue";

const SIZES = ['mini', 'small', 'medium', 'large'] as const;
type Size = typeof SIZES[number];
const STATUS = ['normal', 'success', 'warning', 'danger'] as const;
type Status = typeof STATUS[number];
const BUTTON_TYPES = [
    'primary',
    'outline',
    'text',
] as const;
type ButtonTypes = typeof BUTTON_TYPES[number];

export default defineComponent({
    name: "FButton",
    props: {
        /**
         * @description 按钮的类型 
         * @en 
         * @values  "primary", "outline", "text"
         * @defaultValue  primary
         */
        type: {
            type: String as PropType<ButtonTypes>,
            default: "primary"
        },
        /**
         * @description 按钮的尺寸
         * @en 
         * @values 'mini', 'small', 'medium', 'large'
         * @defaultValue medium
         */
        size: {
            type: String as PropType<Size>,
        },
        /**
         * @description 按钮的形状
         * @en 
         * @values 'square' 'round' 'circle'
         * @defaultValue square
         */
        shape: {
            type: String as PropType<'square' | 'round' | 'circle' | undefined>,
        },
        /**
         * @description 按钮的状态
         * @en 
         * @values 'normal', 'success', 'warning', 'danger'
         * @defaultValue normal
         */
        status: {
            type: String as PropType<Status>,
        },
        /**
         * @description 按钮加载状态
         * @en 
         * @values  true false
         * @defaultValue fasle
         */
        loading: {
            type: Boolean
        },
        /**
         * @description 按钮是否禁用
         * @en 
         * @values true false
         * @defaultValue fasle
         */
        disabled: {
            type: Boolean
        }
    },
    setup(props) {
        // const prefix: string = "f-";
        const fixcontent = "--";
        const classList = computed(() => {
            return [
                "f-button",
                props.type&&props.type !== "primary" ? `f-button--${props.type}` : "",
                props.size&&props.size !== "medium" ? `f-button--${props.size}` : "",
                props.shape&&props.shape !== "square" ? `is-${props.shape}` : "",
                props.status&&props.status !== "norml" ? `f-button--${props.status}` : "",
                {
                    "is-disabled": props.disabled,
                    "is-loading": props.loading,
                },
            ]
        });

        const render = () => {
            return (
                <button class={classList.value}>123</button>
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
