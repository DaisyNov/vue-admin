const path = require('path');
module.exports = {
    //基本路径
    publicPath: process.env.NODE_ENV === 'production' ? '' : './',
    // 输出文件目录，不同的环境打不同包名
    outputDir: process.env.NODE_ENV === "production" ? 'dist' : 'devdist',
    //eslint-loader 是否再保存时检查
    lintOnSave: false,
    /**
     * webpack 配置，see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
     */
    chainWebpack: (config) => {
        const svgRule = config.module.rule("svg");
        svgRule.uses.clear();
        svgRule
            .use("svg-sprite-loader")
            .loader("svg-sprite-loader")
            .options({
                symbolId:"icon-[name]",
                include:["./src/icons"]
            });
    },
    configureWebpack: (config) => {
        config.resolve = {
            extensions: ['.js','.json','.vue'],
            alias: {
                'vue':'vue/dist/vue.js',
                '@': path.resolve(__dirname,'./src'),
                'public': path.resolve(__dirname,'./public'),
                'components': path.resolve(__dirname,'./components')
            }
        }
    },
    // 生产环境下是否生成 sourceMap 文件
    productionSourceMap:false,
    //css 相关配置
    css: {
        // 是否使用css分离插件 ExtractTextPlugin
        extract: true,
        // 开启 CSS source maps
        sourceMap: false,
        // 启用 CSS modules for all css / pre-processor files.
        requireModuleExtension: true,
        // css 预设器配置项
        loaderOptions: {
            sass:{
                prependData: `@import "./src/styles/main.scss";`
            }
        }
    },
    //use thread-loader for babel & TS in production build
    //enabled by default if the mechine has more than 1 cores
    parallel:require('os').cpus().length > 1,
    //PWA 插件相关配置
    pwa:{},
    //webpack-dev-server 相关配置
    devServer: {
        port:8080,            //访问端口
        host: "0.0.0.0",      // 指定使用地址，默认localhost,0.0.0.0 代表可以被外界访问
        open: false,          //编译完成是否打开网页
        https: false,         //编译失败时刷新页面
        hot: true,            //开启热加载
        hotOnly: false,
        proxy: {
            '/devApi': {
                target: "http://www.web-jshtml.cn/dependenciesapi/token", //API服务器的地址  http://www.web-jshtml.cn/api
                ws:true,   //是否代理websockets
                changeOrigin: true,
                pathRewrite: {
                    '^/devApi': ''
                }
            }
        },
        overlay: {            // 全屏模式下是否显示脚本错误
            warnings: true,
            errors: true
        },
        before: () => {},     // 第三方插件
    },
    /**
     * 第三方插件配置
     */
    pluginOptions:{}
}