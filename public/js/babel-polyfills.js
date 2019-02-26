// 不同操作系统的IE10和11对浏览器支持程度不一致，所以采用babel的polyfills
(function () {
    var ga = document.createElement('script')
    var ua = window.navigator.userAgent
    var src = ''
    if (ua.indexOf('MSIE ') !== -1 || ua.indexOf('Trident/') !== -1) {
        // src = 'https://as.alipayobjects.com/g/component/??console-polyfill/0.2.2/index.js,es5-shim/4.5.7/es5-shim.min.js,es5-shim/4.5.7/es5-sham.min.js,es6-shim/0.35.1/es6-sham.min.js,es6-shim/0.35.1/es6-shim.min.js,html5shiv/3.7.2/html5shiv.min.js,media-match/2.0.2/media.match.min.js'
        src = 'https://cdn.polyfill.io/v2/polyfill.min.js?features=es5,es6'
        ga.src = src
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s)
    }
})()
