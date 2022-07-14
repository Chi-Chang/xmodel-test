module.exports = {
    configureWebpack: {
        output: {
            publicPath: process.env.NODE_ENV === 'production' ? '/https://main.d1p9shlk30rdmr.amplifyapp.com/' : '/',
        }
    }
}