# 盛易通 企业端系统

* 供客户登录使用

## Build Setup

``` bash
$ ssh://git@192.168.2.172:7999/front-end/erp-new.git

建议使用yarn 或者 cnpm

yarn
https://yarnpkg.com/zh-Hans/
yarn config set registry https://registry.npm.taobao.org

cnpm
$ npm install -g cnpm --registry=https://registry.npm.taobao.org
```

``` bash
# 初始化项目，添加依赖
yarn add
cnpm install

# 更新所有依赖包或单个依赖包到最新并保存package.json
yarn upgrade --latest
yarn upgrade 包名 --latest

# 启动本地服务 localhost:8080
npm start
npm run serve-t(调用测试环境接口)
npm run serve-p(调用生产环境接口)

# 打包生产环境代码
npm run build

# 打包正式测试环境代码
npm run build-t

# 打包开发测试环境代码
npm run build-d

# build for production and view the bundle analyzer report
npm run build --report


```
## Convenient
- [x] 静态词典和参数配置文件 src/common/js/config.js
- [x] 全局混合src/common/js/mixin.js 下的所有的function和mixin
- [x] autoprefixer自动补全适配浏览器的前缀，如：-webkit-、-moz-
- [x] 修改服务端代码自动重启
- [x] 修改客户端代码自动同步到浏览器，小范围修改不会刷新页面


## 命名规范
* 所有文件，4个空格缩进，UTF-8 编码
* js 严格采用eslint风格规范

### 文件和文件夹命名
* 文件夹和文件名采用英文小写字母命名，多个英语单词用 “-” 分割，不使用驼峰命名，如：hello-world
* 编写组件使用 “c-” 打头，如：编写一个select组件，文件夹或者文件名定义[**c-select(点击可查看)**]

### 样式表命名
* 样式表命名采用英文小写字母命名，多个英语单词用 “-” 分割，不使用驼峰命名，如：hello-world
* autoprefixer自动补全适配浏览器的前缀，因此可以不用写兼容代码

### JS
* js变量使用驼峰命名，不使用-号分割

### Stylus代码风格
* 如果你的代码中包含大括号，确保大括号与选择器之间留空，冒号后面留空，注释内外前后留空


For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
