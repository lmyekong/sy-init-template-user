<template>
</template>

<script>
import PDF from '@/common/js/plugs/pdfobject'

export default {
    props: {
        type: {
            type: Number,
            default: 1
        },
        url: {
            type: String,
            default: ''
        },
        viewer: {
            type: String,
            default: ''
        },
        height: {
            type: String,
            default: '500px'
        }
    },
    data: () => ({
        pdf: null,
        options: {
            page: 1,
            fallbackLink: '对不起,您还没有安装PDF阅读器软件呢,为了方便预览PDF文档,请选择安装！',
            forcePDFJS: true
        }
    }),
    created () {
        if (this.type) {
            this.options.PDFJS_URL = 'http://mozilla.github.io/pdf.js/web/viewer.html'
            // this.options.PDFJS_URL = `${this.viewer}/pdfjs/web/viewer.html`
        } else {
            this.options.pdfOpenParams = {
                navpanes: 0,
                toolbar: 1,
                statusbar: 1,
                view: 'FitV',
                pagemode: 'thumbs'
            }
        }
    },
    methods: {
        loadPdf (url) {
            if (!url) return
            this.pdf = PDF
            this.pdf.embed(url, this.$el, this.options)
            this.$el.style.height = this.height
        }
    },
    mounted () {
        this.loadPdf(this.url)
    }
}
</script>
