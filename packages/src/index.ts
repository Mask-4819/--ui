
/* created by 'npm run build:entry' order */
import type { App } from 'vue';
import Button from '../components/button/index'; 
import Icon from '../components/icon/index'; 
import Message from '../components/message/index'; 

/* 用于下面的遍历使用 */
const components = [
  Button,
  Icon,
  Message
];

/* 导出用于在项目中通过 use使用 */
const install = (app: App) => {
    Object.keys(components).forEach(item => {
        const component = components[item];
        if(component.install) {
            app.use(component);
        }
    });
    /* 全局组件实例挂载 */
    app.config.globalProperties.$message = Message;
    return app;
};

/* 适用于单个组件的解构引入 */
export {
  Button,
  Icon,
  Message
};

// 默认导出install方法, 用于对组件库的直接use
export default {
    install,
};
