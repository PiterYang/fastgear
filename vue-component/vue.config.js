const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  pages: {
    index: {
      entry: "src/main.js",
      template: "public/index.html",
      filename: "index.html"
    }
  },
  chainWebpack: config => {
    config.module
      .rule("compile")
      .test(/\.js$/)
      .include.add(resolve("node_modules/element-ui/packages"))
      .add(resolve("node_modules/element-ui/src"))
      .end()
      .exclude.add(resolve("node_modules/element-ui/src/utils/date.js"))
      .end()
      .use("babel")
      .loader("babel-loader");
    config.module.rule("js");
    config.module.rule("js").use("babel-loader");
    config.module.rule("js").use("cache-loader");
    // config.externals({
    //   //   vue: "Vue"
    //   "element-ui": "element-ui"
    // });
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
