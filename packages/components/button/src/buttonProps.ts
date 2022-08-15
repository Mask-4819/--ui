import { type } from 'os';
import type { ExtractPropTypes, PropType } from 'vue';

export const buttonType = ['primary', 'outline', 'text'] as const;
export const buttonSize = ['mini', 'small', 'medium', 'large'] as const;
export const buttonShape = ['square', 'round', 'circle'] as const;
export const buttonStatus = ['normal', 'success', 'warning', 'danger'] as const;
type TYPE = typeof buttonType[number];
type SIZE = typeof buttonSize[number];
type SHAPE = typeof buttonShape[number];
type STATUS = typeof buttonStatus[number];

export const buttonProps = () => {
  return {
    /**
     * @description 按钮的类型
     * @en
     * @values  "primary", "outline", "text"
     * @defaultValue "primary"
     */
    type: {
      type: String as PropType<TYPE>
    },
    /**
     * @description 按钮的尺寸
     * @en
     * @values 'mini', 'small', 'medium', 'large'
     * @defaultValue
     */
    size: {
      type: String as PropType<SIZE>
    },
    /**
     * @description 按钮的形状
     * @en
     * @values 'square' 'round' 'circle'
     * @defaultValue
     */
    shape: {
      type: String as PropType<SHAPE>
    },
    /**
     * @description 按钮的状态
     * @en
     * @values 'normal', 'success', 'warning', 'danger'
     * @defaultValue
     */
    status: {
      type: String as PropType<STATUS>,
      default: 'normal'
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
    },
    onClick: {
      type: Function as PropType<(event: MouseEvent) => void>
    }
  };
};
export type ButtonProps = ExtractPropTypes<ReturnType<typeof buttonProps>>;
