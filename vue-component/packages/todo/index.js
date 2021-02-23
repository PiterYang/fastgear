import Todo from "./src/todo.vue";

Todo.install = Vue => Vue.component(Todo.name, Todo);

export default Todo;
