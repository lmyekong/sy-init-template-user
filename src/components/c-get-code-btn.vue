<template>
  
  <button class="btn" :class="{blue:!disabled, disabled:disabled}" @click="getCode" :disabled="disabled">{{ (disabled && t > 0) ? '再次获取('+ t + ')' : (text || '获取验证码') }}</button>
       
</template>

<script>

export default {
    props: {
        countdown: {
            type: [Number, String],
            default: 60
        },
        text: {
            type: String,
            default: '获取验证码'
        }
    },
    data () {
        return {
            checked: true,
            disabled: false,
            s: null,
            t: this.countdown || 60
        }
    },

    methods: {
        // 获取证码
        getCode () {
            const vm = this
            if (vm.disabled || vm.t !== vm.countdown) return
            vm.$emit('getCode')

            if (!vm.checked) return

            vm.disabled = true
            vm.s = setInterval(() => {
                vm.t--
                if (vm.t <= 0) {
                    clearInterval(vm.s)
                    vm.disabled = false
                    vm.t = vm.countdown
                    vm.$emit('callback')
                }
            }, 1000)
        }

    }
}
</script>

<style lang="stylus" scoped>
.user-active {
  >>> .el-dialog {
    width: 650px;
  }

  >>> .el-dialog__body {
    padding-bottom: 0;
  }

  >>> .el-form-item__content {
    font-size: 0;
  }

  .el-form {
    text-align: left;

    .code-prev {
      width: 292px;
    }

    .code {
      width: 120px;
      margin: 0 10px;
    }
  }

  >>> .el-dialog__footer {
    text-align: center;
  }
}
</style>

