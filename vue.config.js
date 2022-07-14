module.exports = {
    configureWebpack: {
        output: {
            publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
        }
    }
}