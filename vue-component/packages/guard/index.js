import FgGuard from "./guard";

FgGuard.install = Vue =>
  Vue.component(FgGuard.name, FgGuard);

export default FgGuard;