// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential', 
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-multiple-empty-lines': [1, {"max": 20}], // 空行最多不能超过2行
    'no-unused-vars': [1, {"vars": "all", "args": "after-used"}], // 不能有声明后未被使用的变量或参数
    
    'space-before-function-paren': 0, // 函数参数前面要加空格
    'space-before-blocks': 0, // 函数块前面要加空格
    'semi': [0, "always"], // 语句强制分号结尾
    "no-inline-comments": 0, // 禁止行内备注
    "no-irregular-whitespace": 0, // 不能有不规则的空格
    "no-multi-spaces": 0, // 不能用多余的空格
    "no-trailing-spaces": 0,//一行结束后面不要有空格
    "no-spaced-func": 0, // 函数调用时 函数名与()之间不能有空格
    "no-undef": 0, // 不能有未定义的变量
    "no-undef-init": 0, //变量初始化时不能直接给它赋值为undefined
    "no-undefined": 0, //不能使用undefined
    "arrow-spacing": 0, //=>的前/后括号
    "comma-spacing": 0, //逗号前后的空格
    "key-spacing": [0, { "beforeColon": false, "afterColon": true }],//对象字面量中冒号的前后空格
    "semi-spacing": [0, {"before": false, "after": true}],//分号前后空格
    "spaced-comment": 0,//注释风格要不要有空格什么的
    "comma-dangle": [0, "never"],//对象字面量项尾不能有逗号
    "padded-blocks": 0,//块语句内行首行尾是否要空行    
    "no-mixed-spaces-and-tabs": [0], //关闭禁止混用tab和空格
    "no-invalid-regexp": 0,//禁止无效的正则表达式
    "quotes": [0, "single"],//引号类型 `` "" ''
    "one-var": 0,//连续声明
    "space-infix-ops": 0,//中缀操作符周围要不要有空格
    "eol-last": 0,//文件以单一的换行符结束
    "no-useless-escape": 0,
    'import/no-unresolved': 0,
    
  }
}
