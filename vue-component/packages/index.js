import SeasonRange from "./date-season-range/index.js";
import Todo from "./todo/index";
// ...如果还有的话继续添加

const components = [
  SeasonRange,
  Todo
  // ...如果还有的话继续添加
];

const install = function(Vue) {
  components.map(component => {
    Vue.component(component.name, component);
  });
};

/* 支持使用标签的方式引入 */
if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export default {
  install,
  SeasonRange,
  Todo
  // ...如果还有的话继续添加
};
