module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  configureWebpack: {
    output: {
        publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
    }
}
}
