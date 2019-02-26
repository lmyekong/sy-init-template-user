const path = require('path')
const webpack = require('webpack')

function resolve (dir) {
    return path.join(__dirname, '.', dir)
}

module.exports = {
    lintOnSave: false,
    devServer: {
        host: '0.0.0.0',
        port: 9999,
        https: false,
        hotOnly: false,
        proxy: null, // string | Object
        before: app => {
            // app is an express instance
        }
    },
    configureWebpack: {
        resolve: {
            modules: [
                'node_modules'
                // resolve("src")
            ],
            extensions: ['.js', '.vue', '.json', '.css', '.styl'],
            alias: {
                'vue$': 'vue/dist/vue.esm.js',
                'vuex$': 'vuex/dist/vuex.esm.js',
                'vue-router$': 'vue-router/dist/vue-router.esm.js',

                '@': resolve('src'),
                '@stores': resolve('src/stores'),
                '@views': resolve('src/views')
            }
        },
        plugins: [
            new webpack.ContextReplacementPlugin(/moment[\\/]locale$/, /^\.\/(zh-cn)$/)
        ]
    }
}
