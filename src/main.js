// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'

import Vue from 'vue'
import Vuex from 'vuex'
import Router from 'vue-router'
import { sync } from 'vuex-router-sync'
import App from './App'
import $http from '@/common/js/http'
import mixin from '@/common/js/mixins'
// import storage from '@/common/js/storage';

// element ui
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/element-ui/index.css'

// 加载公共样式
import './assets/css/app.styl'

// Vue.use(ElementUI);

// 加载element ui
import {
    Row,
    Col,
    Pagination,
    Dialog,
    Dropdown,
    Menu,
    Submenu,
    MenuItem,
    MenuItemGroup,
    Input,
    InputNumber,
    Radio,
    RadioGroup,
    RadioButton,
    Checkbox,
    CheckboxButton,
    CheckboxGroup,
    Switch,
    Select,
    Option,
    OptionGroup,
    Button,
    // ButtonGroup,
    DatePicker,
    TimeSelect,
    TimePicker,
    Form,
    FormItem,
    Tree,
    Alert,
    // Badge,
    // Upload,
    Loading,
    MessageBox,
    Message,
    Table,
    TableColumn,
    Upload,
    Notification,
    Tooltip
} from 'element-ui'

// Vue.prototype.$ELEMENT = { size: 'small' };

Vue.use(Row)
Vue.use(Col)
Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Dropdown)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Input)
Vue.use(InputNumber)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(RadioButton)
Vue.use(Checkbox)
Vue.use(CheckboxButton)
Vue.use(CheckboxGroup)
Vue.use(Switch)
Vue.use(Select)
Vue.use(Option)
Vue.use(OptionGroup)
Vue.use(Button)
Vue.use(DatePicker)
Vue.use(TimeSelect)
Vue.use(TimePicker)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Tree)
Vue.use(Alert)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Upload)
Vue.use(Tooltip)

Vue.use(Loading.directive)

Vue.prototype.$loading = Loading.service
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$notify = Notification
Vue.prototype.$message = Message

// ajax 扩展方法
Vue.prototype.$http = $http

const strict = process.env.NODE_ENV !== 'production'

Vue.config.productionTip = false

// 加载路由
let routes = [];
(r => {
    r.keys().forEach(key => {
        let mod = r(key)
        let data = mod.__esModule && mod.default ? mod.default : mod
        routes.push(...data)
    })
})(require.context('./routers', false, /^\.\/.*\.js$/))

Vue.use(Router)
const router = new Router({
    strict: strict,
    routes: routes,
    mode: 'history',
    base: '/'
})

// 加载vuex
const modules = {};
(r => {
    r.keys().forEach(key => {
        let mod = r(key),
            data = (mod.__esModule && mod.default) ? mod.default : mod
        modules[key.slice(2, -9)] = data
    })
})(require.context('./stores', true, /^\.\/.*\/index\.js$/))

Vue.use(Vuex)
const store = new Vuex.Store({
    modules,
    strict: strict // 产品环境下不能启用严格模式
})
sync(store, router)

Vue.mixin(mixin)
/* eslint-disable no-new */
new Vue({
    router,
    store,
    template: '<App/>',
    created () { },
    mounted () { },
    components: {
        App
    }
}).$mount('#app')

// 生产环境关闭调试信息
const NODE_ENV = process.env.VUE_APP_API;
(NODE_ENV === 'production') && (console.log = console.info = console.error = console.warn = function () {})
