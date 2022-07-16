// import ora from "ora";
import chalk from "chalk";

if (!process.argv[2]) {
  console.log(
    chalk.red("[组件名]必填 - Plase enter new component after 'new' ")
  );
  process.exit(1);
}

const fs = require("fs");
const path = require("path");
const fileSave = require("file-save");
const upperCamelCase = require("uppercamelcase");

const componentname = process.argv[2]; // 输入的内容 (小写) 用于设置组件的文件名字, 也可使烤串命名的方式
const ComponentName = upperCamelCase(componentname); // 转换为大驼峰命名方式，用于组件的name命名，以及组件的导入
const ComponentPath = path.resolve(
  __dirname,
  "../../packages/components",
  componentname
); // 组件文件写入路径
const ThemeStylePath = path.resolve(
  __dirname,
  "../../packages/theme-style/src"
); // 组件的样式文件写入路径

let createWay = "";
if (process.argv[3]) {
  createWay = upperCamelCase(process.argv[3]); // 创建方式： .tsx | .vue
}

// const spinner = ora(`Loading ${chalk.red('unicorns')}`);
// spinner.start();
fs.readFile("./1.txt", "utf8", (error, data) => {
  console.log(data);
});
// console.log(indexScss);
const componentsFile = require("../../components.json");
if (componentsFile[componentname]) {
  console.log(chalk.red(`${componentname} 已存在`));
  process.exit(1);
}
componentsFile[componentname] = `./packages/${componentname}/index.js`;
// fileSave(path.join(__dirname, '../../components.json')).write(JSON.stringify(componentsFile, null, "   ")).end('\n');

// 组件的主入口
const componentIndexFileConfig = {
  path: ComponentPath,
  filename: "index.ts",
  content: `import type { App } from 'vue';

import ${ComponentName} from './src/${componentname}';
${ComponentName}.install = function(app: App) {
    app.component(${ComponentName}.name, ${ComponentName});
};
export default ${ComponentName};`,
};

// 组件的src目录
const componentSrcFileConfig = {
  path: ComponentPath,
  filename: `src/${componentname}.tsx`,
  content: `import { defineComponent } from "vue";

export default defineComponent({
    name: "F${ComponentName}",
    step() {}
})`,
  // .vue文件模板
  vueTemplate: `<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "${ComponentName}",
    setup() {},
});
</script>

<template>
    <div class="f-${componentname}"></div>
</template>`,
};

if (createWay && createWay === "Vue") {
  componentSrcFileConfig.filename = `src/${componentname}.vue`;
  componentSrcFileConfig.content = componentSrcFileConfig.vueTemplate;
}

const ThemeStyleFileConfig = {
  path: ThemeStylePath,
  filename: `${componentname}.scss`,
  content: `@import "./mixins/mixins.scss";

@include b(${componentname}) {}`,
};

const Files = [
  componentIndexFileConfig,
  componentSrcFileConfig,
  ThemeStyleFileConfig,
];

// 创建组件的index.ts入口 以及src目录用于存在组件.tsx文件
Files.forEach((item, idx) => {
  fileSave(path.join(item.path, item.filename))
    .write(item.content, "utf8")
    .end("\n");
});

// spinner.stop();
