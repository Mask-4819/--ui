# Build

> 基于 ts-node 的编写的自动构建组件文件夹脚本，目前仅支持 new 创建，不支持删除文件

## 搭建依赖

需要安装 ts-node

## 目录结构树

```
myapp
├─ .eslintrc.cjs
├─ .gitignore
├─ build // 构建目录
│  └─ bin
│     ├─ new.ts // new脚本，用于创建新的组件目录范式
├─ components.json // 组件信息，用于保存当前所拥有的组件及其路径
├─ env.d.ts
├─ index.html
├─ package-lock.json
├─ package.json
├─ packages // 组件包
│  ├─ components // 组件文件
│  │  └─ index.js
│  └─ theme-style // 样式文件夹
│     ├─ lib // 打包后的样式文件夹
│     └─ src // 样式的scss文件夹
│        ├─ common // scss 通用内容
│        └─ mixins // scss mixins集
├─ README.md
├─ src // 项目主入口
│  ├─ App.tsx
│  ├─ main.ts
├─ tsconfig.app.json
├─ tsconfig.config.json
├─ tsconfig.json
├─ tsconfig.vitest.json
└─ vite.config.ts
```

## 需求产生的原因

在对于进行文件相同的批量操作时，我们需要手动的一个个去创建文件，并且基于要写入的模板内容，进行大量重复的操作。
此处以搭建 vue 组件为例：

1. 在创建一个组件时我们需要在 **packages** 目录下创建一个 input 目录， input 目录内存在一个 index.ts 文件，
2. 创建 src 文件用于存放组件的主要内容 input.tsx | input.vue，
3. 还可能存在测试功能，需要一个 **\_\_test\_\_ ** 目录
4. 然后我们可能还需要一个保存文档的文件**\_\_demo\_\_ **目录
5. 还要在**heme-style** 创建一个 input.scss 文件
6. 还要对**components.json** 进行配置的追加

每一次写一个新的组件，都有如此多的文件夹需要去创建， 嘶~。

```typescript
// !index.ts文件模板
import type { App } from 'vue';

import Input from './src/input';
Input.install = function(app: App) {
    app.component(Input.name, Input);
};
export default Input;

// !src/input/input.tsx 文件模板
import { defineComponent } from "vue";

export default defineComponent({
    name: "FInput",
    step() {}
});

// !theme-style/input.scss文件模板

@import "./mixins/mixins.scss";
@include b(input) {}

// !src/__test__
...
// !src/__demo__
.....

```

​ 大量的模板创建，而且每次进行重复，为了优化开(zhuang)发(bi)体验。
​ 从以上模板的目录结构以及通用性进行分析，模板内容几乎是一致的，动态修改的只是每个组件的命名不一致，需要手动和动态的进行修改，由此引入交互式创建，通过手动输入组件名的方式，去动态的创建文件目录与文件，以及文件中的模板。

创建的方式存在两种:

1. 通过 GUI 的方式： 但是需要写单独的页面，并且每次还需要打开项目
2. 通过无界面的指令形式： 使用 node 去搭建键入式指令，尽心本地文件的读写操作。

3.

4. ​

结合：采用方式 2

## 增加配置

增加指令

```json
// !package.json文件
{
  "scripts": {
    "new": "ts-node build/bin/new.ts"
  }
}
```

在 vite 环境中需要修改 tsconfig.json 的配置

```json
// tsconfig.json文件
{
  "ts-node": {
    "compilerOptions": {
      "module": "CommonJS"
    }
  }
}
```

## 使用指令

**[ componentName ]**为组件的 name，为必填内容

```typescript
// 默认使用方式 (默认.tsx文件)
npm run new [componentName]

//.vue模板模式(可以.vue、_vue也可)。但：不能是 -vue  @vue 这种npm 带有含义的标识符
npm run new [componentName] .vue
```

## 脚本的实现解析

在 npm 当中，可以通过在 scripts 中添加自定义的指令，然后通过 npm run [name] 的方式去执行 "scripts" 中指定的脚本。

上述中添加了 "new": "ts-node build/bin/new.ts" 指令， 则表示在 npm 执行指令后，会自动去执行 ts-node build/bin/new.ts 脚本。

在执行 ts-node 时，会动 Node.js 的进程，由此涉及 process，看下方官方例子

```js
// 官方例子：
 node process-args.js one two=three four

 //在nodejs进程中，可以通过process获取当前进程，其中 argv参数是一个数组，保存的是执行脚本时，所涉及的所有参数内容。
 // 上述例子中，对于 process.argv进行获取后，得到的内容是
 ['/usr/local/bin/node', '/Users/mjr/work/node/process-args.js', 'one', 'two=three', 'four'];

// 应用到自身指令问题
npm run new input  转化node脚本--> ts-node build/bin/new.ts input
// 由此得到 process.argv:
 ['/usr/local/bin/node', '/Users/mjr/work/node/process-args.js', 'input'];
// 通过 process.argv 获取输入的指令内容
```

## 脚本代码

```javascript
//暂未处理文档模板与测试模板
// import ora from "ora";
import chalk from 'chalk'

if (!process.argv[2]) {
  console.log(
    chalk.red("[组件名]必填 - Plase enter new component after 'new' ")
  )
  process.exit(1)
}

const fs = require('fs')
const path = require('path')
const fileSave = require('file-save')
const upperCamelCase = require('uppercamelcase')

const componentname = process.argv[2] // 输入的内容 (小写) 用于设置组件的文件名字, 也可使烤串命名的方式
const ComponentName = upperCamelCase(componentname) // 转换为大驼峰命名方式，用于组件的name命名，以及组件的导入
const ComponentPath = path.resolve(
  __dirname,
  '../../packages/components',
  componentname
) // 组件文件写入路径
const ThemeStylePath = path.resolve(__dirname, '../../packages/theme-style/src') // 组件的样式文件写入路径

let createWay = ''
if (process.argv[3]) {
  createWay = upperCamelCase(process.argv[3]) // 创建方式： .tsx | .vue
}

// const spinner = ora(`Loading ${chalk.red('unicorns')}`);
// spinner.start();
const componentsFile = require('../../components.json')
if (componentsFile[componentname]) {
  console.log(chalk.red(`${componentname} 已存在`))
  process.exit(1)
}
componentsFile[componentname] = `./packages/${componentname}/index.js`
fileSave(path.join(__dirname, '../../components.json'))
  .write(JSON.stringify(componentsFile, null, '   '))
  .end('\n')

// 组件的主入口(component/[componentname]/index.ts)
const componentIndexFileConfig = {
  path: ComponentPath,
  filename: 'index.ts',
  content: `import type { App } from 'vue';

import ${ComponentName} from './src/${componentname}';
${ComponentName}.install = function(app: App) {
    app.component(${ComponentName}.name, ${ComponentName});
};
export default ${ComponentName};`
}

// 组件的src目录(component/[componentname]/src)
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
</template>`
}

if (createWay && createWay === 'Vue') {
  componentSrcFileConfig.filename = `src/${componentname}.vue`
  componentSrcFileConfig.content = componentSrcFileConfig.vueTemplate
}
// 样式文件(theme-style/src/[componentname].scss)
const ThemeStyleFileConfig = {
  path: ThemeStylePath,
  filename: `${componentname}.scss`,
  content: `@import "./mixins/mixins.scss";

@include b(${componentname}) {}`
}

const Files = [
  componentIndexFileConfig,
  componentSrcFileConfig,
  ThemeStyleFileConfig
]

// 创建组件的index.ts入口 以及src目录用于存在组件.tsx文件
Files.forEach((item, idx) => {
  fileSave(path.join(item.path, item.filename))
    .write(item.content, 'utf8')
    .end('\n')
})

// spinner.stop();
```
