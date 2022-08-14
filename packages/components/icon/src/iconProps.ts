import type { ExtractPropTypes, PropType } from 'vue';

export const iconProps = () => {
  return {
    /**
     * @description 前缀icon
     * @en
     * @values
     * @defaultValue "icon"
     */
    prefix: {
      type: String,
      default: 'icon'
    },
    /**
     * @description 图标名称
     * @en
     * @values
     * @defaultValue
     */
    icon: {
      type: String,
      required: true
    },
    /**
     * @description 颜色
     * @en
     * @values
     * @defaultValue
     */
    color: {
      type: String,
      default: '#333'
    },
    size: [String, Number] as PropType<string | number>
  };
};

export type IconProps = ExtractPropTypes<ReturnType<typeof iconProps>>;
