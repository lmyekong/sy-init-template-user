<template>
  <div class="upload">
    <template v-if="imgUrl">
      <div class="img-box" :style="{backgroundImage: 'url(' + imgUrl + ')'}"></div>
      <span class="del" @click.stop="del" title="删除"><i class="el-icon-circle-close"></i></span>
    </template>
    <template v-else>
      <input type="file" name="img" @change="change" ref="img">
      <div>
        <i class="el-icon-plus"></i>
        <p>上传图片</p>
      </div>
    </template>
  </div>
</template>

<script>
import {
    A_UPLOAD_COMMON_NOTEMP_FILE,
    A_DEL_COMMON_FILE
} from '@stores/common/types'
export default {
    props: {
        autoUpload: {
            type: Boolean,
            default: true
        },
        value: {
            default: () => {
                return {}
            }
        },
        isClean: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            fileId: '',
            imgUrl: '',
            delS: false
        }
    },
    watch: {
        isClean () {
            this.imgUrl = ''
        }
    },
    created () {
        // console.log(this.value)
    },
    methods: {
        change () {
            const vm = this
            const maxsize = 1 * 1024 * 1024 // 1M
            const suffix = ['jpg', 'jpeg', 'png', 'gif', 'bmp']
            const file = vm.$refs.img.files[0]
            const createObjectURL = function (blob) {
                return window[window.URL ? 'URL' : 'webkitURL']['createObjectURL'](blob)
            }

            // 文件类型和大小检测
            if (file.size) {
                const fileSuffix = file.name.slice(file.name.lastIndexOf('.') + 1)
                if (file.size > maxsize || !fileSuffix || !suffix.includes(fileSuffix)) {
                    vm.$alert('只能上传图片文件，并且文件大小不能超过1M！', {
                        type: 'error',
                        callback: act => {}
                    })
                    return
                }
            }

            vm.imgUrl = createObjectURL(file)
            vm.$emit('change', file)

            if (vm.autoUpload) {
                vm.upload()
            }
        },
        upload () {
            const vm = this
            const file = vm.$refs.img.files[0]
            const data = {
                business_id: this.value.business_id + '',
                file_list_name: file.name,
                file_list_type: 'SmallTransferTemp',
                file_name: [file.name],
                fileTip: '',
                doNotConvert: true
            }
            vm.$store.dispatch(A_UPLOAD_COMMON_NOTEMP_FILE, {
                data,
                file: {
                    'file': file
                }
            }).then(res => {
                // vm.$refs.img.value = ''
                vm.fileId = res.physicalList[0].fileId
                vm.$emit('success', res)
            }, () => {
                vm.$emit('error')
            })
        },
        del () {
            const vm = this
            vm.imgUrl = ''
            // this.delS = true
            vm.$store.dispatch(A_DEL_COMMON_FILE, {
                fileId: vm.fileId
            }).then(res => {
                vm.$emit('delItem')
            })
        }
    }
}
</script>

<style lang="scss" scoped>

.upload {
  position: relative;
  display: inline-block;
  vertical-align: top;
  width: 90px;
  height: 90px;
  margin: 20px 20px 0 0;
  border: 1px dashed #dddee1;
  border-radius: 4px;
  text-align: center;
  // overflow: hidden;
  background-color: #fbfbfb;
  .del {
    position: absolute;
    right: -15px;
    top: -10px;
    z-index: 11 ;
    cursor: pointer;
    width: 30px;
    height: $width;
    font-size: 18px;
    line-height: 20px;
  }
  input {
    position: absolute;
    z-index: 10;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
  }

  .img-box {
    height: 100%;
    background-position: 50% 50%;
    background-repeat: no-repeat;
    background-size: 100% auto;
  }

  .el-icon-plus {
    margin-top: 25px;
  }

  p {
    margin-top: -10px;
    font-size: 14px;
  }
}


</style>

