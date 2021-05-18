import SeasonRange from "./date-season-range/index.js";
import Todo from "./todo/index";
import Guard from './guard/index'
import Editor from './rich-text-editor/index'
import Feedback from './feedback/index'
// ...如果还有的话继续添加

const components = [
  SeasonRange,
  Todo,
  Guard,
  Editor,
  Feedback
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
  Todo,
  Guard,
  Editor,
  Feedback
  // ...如果还有的话继续添加
};
