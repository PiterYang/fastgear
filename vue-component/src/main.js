import Vue from "vue";
import App from "./App.vue";
import ElementUI from "element-ui";
Vue.use(ElementUI, { size: "small" });
import "element-ui/lib/theme-chalk/index.css";
const directiveFiles = require.context("./directives", false, /.+\.js$/);
directiveFiles.keys().forEach(fileName => {
  const directiveConfig = directiveFiles(fileName);
  // 获取指令名称
  const directiveName = fileName
    // 移除开始的 './'
    .replace(/^\.\//, "")
    // 移除文件扩展
    .replace(/\.\w+$/, "");
  // 注册指令, 文件名作为指令名
  Vue.directive(directiveName, directiveConfig.default || directiveConfig);
});
Vue.config.productionTip = false;
new Vue({
  render: h => h(App)
}).$mount("#app");
