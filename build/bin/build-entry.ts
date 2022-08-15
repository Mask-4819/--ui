const fs = require('fs');
const path = require('path');
const endOfLine = require('os').EOL;
const render = require('json-templater/string');
const uppercamelcase = require('uppercamelcase');

const outputPath = path.join(__dirname, '../../packages/src/index.ts');
// 顶部 import组件引入
const importTemplate = "import {{name}} from '../components/{{path}}/index'; ";
// 中间 component数组， 用于遍历的方式去install组件
const componentNameTemplate = '  {{name}}';

// 输出模板内容
const template = `
/* created by 'npm run build:entry' order */
import type { App } from 'vue';
{{import}}

/* 用于下面的遍历使用 */
const components = [
{{componentName}}
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
{{componentName}}
};

// 默认导出install方法, 用于对组件库的直接use
export default {
    install,
};
`;

//  import 引入组件
const importList = [];
const componentList = [];
const componentsFile = require('../../packages/components.json');

Object.keys(componentsFile).forEach((name) => {
  const componentName = uppercamelcase(name);
  // 写入import
  importList.push(
    render(importTemplate, {
      name: componentName,
      path: componentName.toLowerCase()
    })
  );
  componentList.push(
    render(componentNameTemplate, {
      name: name
    })
  );
});

const outputFile = render(template, {
  import: importList.join('' + endOfLine),
  componentName: componentList.join(',' + endOfLine)
});

fs.writeFileSync(outputPath, outputFile);
console.log('[build entry] DONE:', outputPath);
