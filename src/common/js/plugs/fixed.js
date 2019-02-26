/**
 * Created by zero.zhu
 * 绝对定位插件
 * div(v-fixed="{class:'v-fixed',scroll:function}"), div(v-fixed="'v-fixed'")
 */

'use strict'
import util from '../util'

const fixed = {}
const install = fixed.install = function (Vue, options) {
    if (install.installed) {
        return
    };
    install.installed = true

    const CLASS_NAME = 'v-fixed'

    Vue.directive('fixed', {
        bind (el, binding, vnode) {
            binding.customListeners = {}
        },

        inserted (el, binding, vnode) {
            const cName = (typeof binding.value === 'string' ? binding.value : binding.value.class) || CLASS_NAME
            const offset = util.getOffset(el)
            // const offsetY = vnode.data.attrs.dataOffsety || 0;
            const eventHandler = () => {
                var st = document.body.scrollTop || document.documentElement.scrollTop
                if (st > offset.top) {
                    util.addClass(el, cName)
                } else {
                    util.removeClass(el, cName)
                }
                if (binding.value.scroll) {
                    binding.value.scroll()
                }
            }
            if (binding.customListeners) {
                binding.customListeners.onScroll = eventHandler
            }
            util.addEvent(window, 'scroll', eventHandler)
        },

        update (el, binding, vnode) {

        },

        unbind (el, binding, vnode) {
            const customListeners = binding.customListeners
            if (customListeners) {
                util.removeEvent(window, 'scroll', customListeners.onScroll)
                delete binding.customListeners
            }
        }
    })
}

export default fixed
