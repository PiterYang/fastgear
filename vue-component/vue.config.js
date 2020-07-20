module.exports = {
  pages: {
    index: {
      entry: "src/main.js",
      template: "public/index.html",
      filename: "index.html"
    }
  },
  chainWebpack: config => {
    // config.module
    // .rule("vue")
    // .include.add("/packages")
    // .end()
    // .use("vue-loader")
    // .loader("babel-loader")
    // .tap(options => {
    //   return options;
    // });
    config.module
      .rule("js")
      .include.add("/packages")
      .end()
      .use("babel")
      .loader("babel-loader")
      .tap(options => {
        return options;
      });
    config.externals({
      //   vue: "Vue"
      //   "element-ui": "ELEMENT"
    });
    config.module.rules.delete("eslint");
  },
  productionSourceMap: false,
  css: {
    extract: false
  },
  configureWebpack: {
    output: {
      libraryExport: "default",
      libraryTarget: "umd"
    }
  }

  //   output: {
  //     libraryExport: "default"
  //   }
};
