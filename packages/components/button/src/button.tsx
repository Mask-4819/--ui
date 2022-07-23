/**
 *  仅用于现实测试案例, 不代表最终成果
 */

import { type } from "os";
import { computed, defineComponent, PropType } from "vue";

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
        value: null,
        /**
         * @description 按钮的类型 
         * @en 
         * @values  "primary", "outline", "text"
         * @defaultValue  
         */
        type: {
            type: String as PropType<ButtonTypes>,
        },
        /**
         * @description 按钮的尺寸
         * @en 
         * @values 'mini', 'small', 'medium', 'large'
         * @defaultValue 
         */
        size: {
            type: String as PropType<Size>,
        },
        /**
         * @description 按钮的形状
         * @en 
         * @values 'square' 'round' 'circle'
         * @defaultValue 
         */
        shape: {
            type: String as PropType<'square' | 'round' | 'circle' | undefined>,
        },
        /**
         * @description 按钮的状态
         * @en 
         * @values 'normal', 'success', 'warning', 'danger'
         * @defaultValue 
         */
        status: {
            type: String as PropType<Status>,
        },
        /**
         * @description 按钮加载状态
         * @en 
         * @values  true false
         * @defaultValue 
         */
        loading: {
            type: Boolean
        },
        /**
         * @description 按钮是否禁用
         * @en 
         * @values true false
         * @defaultValue 
         */
        disabled: {
            type: Boolean
        }
    },
    setup(props, context) {
        // const prefix: string = "f-";
        // console.log(context.slots.default);
        const { type, size, shape, status, disabled, loading } = props;
        const fixcontent = "--";
        const preClass = "f-button";
        const classList = computed(() => {
            return {
                [`${preClass}`]: true,
                [`${preClass}--${type}`]: type,
                [`${preClass}--${size}`]: size,
                [`${preClass}--${shape}`]: shape,
                [`${preClass}--${status}`]: status,
                ["is-disabled"]:disabled,
                ["is-loading"]:loading,
        }

        });

const render = () => {
    return (<button class={classList.value}>123123</button>)
};
return {
    render
}
    },
computed: {
    classes() {
        return {
            [`f--${this.type}`]: this.type,
        }
    }

},
render() {
    return this.render();
}
})
