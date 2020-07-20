module.exports = {
  pages: {
    index: {
      entry: "src/main.js",
      template: "public/index.html",
      filename: "index.html"
    }
  },
  chainWebpack: config => {
    config.module.rule("js");
    config.module.rule("js").use("babel-loader");
    config.module.rule("js").use("cache-loader");
    config.externals({
      //   vue: "Vue"
      "element-ui": "element-ui"
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
