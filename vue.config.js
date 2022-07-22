const path = require('path')  
module.exports = {
    publicPath: process.env.NODE_ENV === "production" ? "/" : "",
    assetsDir:"",
    outputDir: "dist",
    configureWebpack:{
        module: {
            rules: [
                // {
                //     test: /\.(png|svg|jpe?g|bin|gif|glb|gltf)$/,
                //     loader: 'file-loader',
                //     options: {
                //      esModule: false
                //    }
                // },
                // {
                //     test: /.vue$/,
                //     loader: 'vue-loader'
                   
                // },
            ],
        },
    },
    
}