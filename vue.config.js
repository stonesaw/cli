module.exports = {
  publicPath: './',
  chainWebpack: (config) => {
    config.module
      .rule("text")
      .test(/\.txt$/i)
      .use("raw-loader")
      .loader("raw-loader")
      .end();
  },
}
