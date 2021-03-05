import Todo from "./src/todo-editor.vue";

Todo.install = Vue => Vue.component(Todo.name, Todo);

export default Todo;
