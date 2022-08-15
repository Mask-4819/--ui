import { event } from 'cypress/types/jquery';
import { emit } from 'process';
import { computed, defineComponent, PropType } from 'vue';

// const SIZES = ['mini', 'small', 'medium', 'large'] as const;
// type Size = typeof SIZES[number];
// const STATUS = ['normal', 'success', 'warning', 'danger'] as const;
// type Status = typeof STATUS[number];
// const BUTTON_TYPES = ['primary', 'outline', 'text'] as const;
// type ButtonTypes = typeof BUTTON_TYPES[number];
import {
  buttonProps,
  buttonType,
  buttonSize,
  buttonShape,
  buttonStatus
} from './buttonProps';

export default defineComponent({
  name: 'FButton',
  props: buttonProps(),
  emits: ['click'],
  setup(props, { slots, emit }) {
    const { type, size, shape, status, disabled, loading } = props;
    // const fixcontent = '--';
    const preClass = 'f-button';
    const hasPrototype = (target, arr): boolean => {
      return arr.includes(target) ? true : false;
    };
    const classList = computed(() => {
      return {
        [`${preClass}`]: true,
        [`${preClass}--${type}`]: hasPrototype(type, buttonType),
        [`${preClass}--${size}`]: hasPrototype(size, buttonSize),
        [`${preClass}--${shape}`]: hasPrototype(shape, buttonShape),
        [`${preClass}--${status}`]: hasPrototype(status, buttonStatus),
        ['is-disabled']: disabled,
        ['is-loading']: loading
      };
    });

    const onClick = (event: Event) => {
      emit('click');
    };

    const render = () => {
      return (
        <button onClick={onClick} class={classList.value}>
          {slots.default ? slots.default() : ''}
        </button>
      );
    };
    return {
      render,
      classList
    };
  },
  computed: {
    classes() {
      return {
        [`f--${this.type}`]: this.type
      };
    }
  },
  render() {
    return this.render();
  }
});
