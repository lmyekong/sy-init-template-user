/**
 * Created by zero.zhu
 * ukey.js 工具类方法
 */

'use strict'
import util from '../util'
import $MessageBox from 'element-ui/lib/message-box'
const ukey = {
    q (id) {
        return document.querySelector(id)
    },
    browserError () {
        const vm = this
        vm.showTips('请使用IE浏览器！')
    },
    // 显示PDF
    hidePDF () {
        const vm = this
        const browserType = util.browserType()
        const $pdf = vm.q('#pdfShow')
        if ($pdf && (browserType === 'IE' || browserType === 'Edge')) {
            $pdf.style.visibility = 'hidden'
        }
    },
    showPDF () {
        const vm = this
        const $pdf = vm.q('#pdfShow')
        if ($pdf) {
            $pdf.style.visibility = 'visible'
        }
    },
    showTips (msg, type) {
        const vm = this

        vm.hidePDF()
        $MessageBox.alert(msg, {
            type: !type ? 'error' : 'success',
            callback: () => {
                vm.showPDF()
            }
        })
    },
    // 证书初始化
    onLoad () {
        try {
            let eDiv = document.createElement('div')
            let objectHTML
            if (navigator.appName.indexOf('Internet') >= 0 || navigator.appVersion.indexOf('Trident') >= 0) {
                if (window.navigator.cpuClass === 'x86') {
                    objectHTML = '<object id="CryptoAgent" codebase="CryptoKit.Paperless.x86.cab" classid="clsid:B64B695B-348D-400D-8D58-9AAB1DA5851A" ></object>'
                } else {
                    objectHTML = '<object id="CryptoAgent" codebase="CryptoKit.Paperless.x64.cab" classid="clsid:8BF7E683-630E-4B59-9E61-C996B671EBDF" ></object>'
                }
            } else {
                objectHTML = '<embed id="CryptoAgent" type="application/npCryptoKit.Paperless.x86" style="height: 0px; width: 0px">'
            }
            // 加上重置相关的控件
            objectHTML += '<object id="objoca" classid="CLSID:54E8A6FE-0F00-4954-BB8B-A83EA0F6EC0C" width="0" height="0" ></object>'
            objectHTML += '<object id="objocb" classid="CLSID:9CBE7368-9331-47A8-8ED0-857629AD6484" width="0" height="0"></object>'

            eDiv.innerHTML = objectHTML
            eDiv.style.height = '0'
            eDiv.style.width = '0'
            eDiv.style.overflow = 'hidden'
            eDiv.style.fontSize = '0'
            eDiv.style.lineHeight = '0'
            document.body.appendChild(eDiv)
        } catch (e) {
            console.log(e)
        }
    },
    // 选择证书
    selectCertificate () {
        const vm = this
        const CryptoAgent = vm.q('#CryptoAgent')
        const objoca = vm.q('#objoca')

        try {
            // 检测是否插入ukey
            let checkUKeyNum = objoca.CheckUKeyNum()
            if (!checkUKeyNum) {
                vm.showTips('请先插入UKey！')
                return
            }
            const bSelectCertResult = CryptoAgent.SelectCertificate('', '', '', '')

            // Opera浏览器，NPAPI函数执行结果为false时，不能触发异常，需要自己判断返回值。
            if (!bSelectCertResult) {
                vm.showTips(CryptoAgent.GetLastErrorDesc())
                return
            }
            return bSelectCertResult
        } catch (e) {
            const errList = [
                'objoca.CheckUKeyNum is not a function',
                'CryptoAgent.SelectCertificate is not a function'
            ]
            if (errList.includes(e.message)) {
                vm.browserError()
                return
            }

            const errorDesc = CryptoAgent.GetLastErrorDesc()
            vm.showTips(errorDesc)
        }
    },
    // 获取选定的证书信息
    getCertInfo (type = 'SerialNumber') {
        const vm = this
        const CryptoAgent = vm.q('#CryptoAgent')

        try {
            const serialNum = CryptoAgent.GetSignCertInfo(type)
            // Opera浏览器，NPAPI函数执行结果为false时，不能触发异常，需要自己判断返回值。
            if (!serialNum) {
                vm.showTips(CryptoAgent.GetLastErrorDesc())
                return
            }
            return serialNum
        } catch (e) {
            if (e.message === 'CryptoAgent.GetSignCertInfo is not a function') {
                vm.browserError()
                return
            }
            vm.showTips(CryptoAgent.GetLastErrorDesc())
        }
    },
    // 获取印模图片
    getSealImage () {
        const vm = this
        const CryptoAgent = vm.q('#CryptoAgent')
        try {
            const sealImage = CryptoAgent.GetSealImage('JKLX_SHENGYE_P11.dll')
            return sealImage
        } catch (e) {
            vm.showTips('密码错误或系统异常！错误码：' + CryptoAgent.GetLastErrorDesc())
        }
    },
    // 获取PKCS值
    getPKCS (sealHash) {
        const vm = this
        const CryptoAgent = vm.q('#CryptoAgent')

        try {
            const pkcs7SealMsg = CryptoAgent.SignHashMsgPKCS7Detached(sealHash, 'SHA-1')
            if (!pkcs7SealMsg) {
                vm.showTips(CryptoAgent.GetLastErrorDesc())
                return
            }
            return pkcs7SealMsg
        } catch (e) {
            vm.showTips(CryptoAgent.GetLastErrorDesc())
        }
    }
}

export default ukey
