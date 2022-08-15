import chalk from 'chalk';

if (!process.argv[2]) {
  console.log(
    chalk.red("[组件名]必填 - Plase enter new component after 'new' ")
  );
  process.exit(1);
}

const fs = require('fs');
const path = require('path');
const fileSave = require('file-save'); // 保存文件插件
const upperCamelCase = require('uppercamelcase'); // 转化为大驼峰命名的插件

const componentname = process.argv[2]; // 输入的内容 (小写) 用于设置组件的文件名字
const ComponentName = upperCamelCase(componentname); // 转换为大驼峰命名方式，用于组件的name命名，以及组件的导入
const ComponentPath = path.resolve(
  __dirname,
  '../../packages/components',
  componentname
); // 组件文件写入路径
const ThemeStylePath = path.resolve(
  __dirname,
  '../../packages/theme-style/src'
); // 组件的样式文件写入路径

let createWay = '';
if (process.argv[3]) {
  createWay = upperCamelCase(process.argv[3]); // 创建方式： .tsx | .vue
}

const componentsFile = require('../../packages/components.json');
if (componentsFile[ComponentName]) {
  console.log(chalk.red(`${ComponentName} 已存在`));
  process.exit(1);
}
// 保存到json文件中去
componentsFile[ComponentName] = `./components/${componentname}/index.ts`;
fileSave(path.join(__dirname, '../../packages/components.json'))
  .write(JSON.stringify(componentsFile, null, '   '))
  .end('\n');

// 组件的主入口
const componentIndexFileConfig = {
  path: ComponentPath,
  filename: 'index.ts',
  content: `import { withInstall } from '../../src/util/install';

import _${ComponentName} from './src/${componentname}';
const ${ComponentName} = withInstall(_${ComponentName});
export default ${ComponentName};`
};
// 组件的src目录
const componentSrcFileConfig = {
  path: ComponentPath,
  filename: `src/${componentname}.tsx`,
  content: `import { defineComponent } from "vue";

export default defineComponent({
    name: "F${ComponentName}",
    setup() {}
})`,
  // .vue文件模板
  vueTemplate: `<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "F${ComponentName}",
    setup() {},
});
</script>

<template>
    <div class="f-${componentname}"></div>
</template>`
};
if (createWay && createWay === 'Vue') {
  componentSrcFileConfig.filename = `src/${componentname}.vue`;
  componentSrcFileConfig.content = componentSrcFileConfig.vueTemplate;
}
// 主题文件
const ThemeStyleFileConfig = {
  path: ThemeStylePath,
  filename: `${componentname}.scss`,
  content: `@import "./mixins/mixins.scss";

@include b(${componentname}) {}`
};
// 测试文件目录
const componentTestFileConfig = {
  path: ComponentPath,
  filename: '__test__/index.test.ts',
  content: `import ${ComponentName} from '../index.ts'

describe('${ComponentName}', () =>{});
    `
};
// 文档文件
const componentDocumentFileConfig = {
  path: ComponentPath,
  filename: '__demo__/README.md',
  content: `## ${ComponentName}组件文档`
};

const Files = [
  componentIndexFileConfig,
  componentSrcFileConfig,
  ThemeStyleFileConfig,
  componentTestFileConfig,
  componentDocumentFileConfig
];

// 创建组件的index.ts入口 以及src目录用于存在组件.tsx文件
Files.forEach((item, idx) => {
  console.log(item.filename);
  fileSave(path.join(item.path, item.filename))
    .write(item.content, 'utf8')
    .end('\n');
});
