<template>
    <div class="fg-todo-wrap">
        <div class="fg-todo-header">
            <el-button size="mini" @click="handleTo">+ To</el-button>
            <el-button size="mini" @click="handleFollower">+ Followr</el-button>
            <el-button size="mini" @click="handleDueDate">+ Due date</el-button>
            <span>
                shortcuts: To
                <span class="shortcut">@</span>&nbsp;Follower
                <span class="shortcut">@@</span>&nbsp;Due date
                <span class="shortcut">//</span>
            </span>
        </div>
        <todo
            v-for="item in todoItem"
            :id="item.id"
            :key="item.id"
            :addTodo="addTodo"
            :deleteTodo="deleteTodo"
            :values="values"
            :ref="item.id"
            :getLastActiveTodo="getLastActiveTodo"
        ></todo>
    </div>
</template>
<script>
import Todo from './component.vue';
export default {
    components: {
        Todo
    },
    name: 'FgTodo',
    data() {
        return {
            todoItem: [{id: 'todo-id' + new Date().getTime()}],
            lastActiveEl: null
        };
    },
    props: {
        values: {
            type: Array
        }
    },
    methods: {
        addTodo() {
            const random = new Date().getTime();
            this.todoItem.push({id: 'todo-id' + random});
            setTimeout(() => {
                document.querySelector(`#todo-id${random}`).focus();
            });
        },
        deleteTodo(id) {
            if (this.todoItem.length > 1) {
                const index = this.todoItem.findIndex(v => v.id === id);
                this.todoItem.splice(index, 1);
                setTimeout(() => {
                    let id;
                    if (index >= 1) {
                        id = this.todoItem[index - 1].id;
                    } else {
                        id = this.todoItem[index].id;
                    }
                    const el = document.querySelector(`#${id}`);
                    if (el.innerHTML === '') {
                        setTimeout(() => {
                            el.focus();
                        });
                    } else {
                        this.setCaretPosition(el);
                    }
                });
            }
        },
        setCaretPosition(input) {
            var range = document.createRange();

            range.selectNodeContents(input);

            range.collapse(false);

            var sel = window.getSelection();

            sel.removeAllRanges();

            sel.addRange(range);
        },
        handleTo() {
            this.getTribute(2);
        },
        handleFollower() {
            this.getTribute(0);
        },
        handleDueDate() {
            this.getTribute(1);
        },
        getLastActiveTodo(event) {
            this.lastActiveEl = event.target;
        },
        getTribute(index) {
            let el;
            if (this.lastActiveEl) {
                const id = this.lastActiveEl.getAttribute('id');
                this.$refs[id][0].tribute.showMenuForCollection(this.lastActiveEl, index);
            } else {
                const last = this.todoItem.length - 1;
                el = document.getElementById(this.todoItem[last].id);
                this.$refs[this.todoItem[last].id][0].tribute.showMenuForCollection(el, index);
            }
        }
    }
};
</script>
<style lang="less" scoped>
.fg-todo-wrap {
    min-width: 500px;
    border: 1px solid #c4c4c4;
    min-height: 200px;
    .fg-todo-header {
        background: #fafafa;
        padding: 3px;
        border-bottom: 1px solid #c4c4c4;
        color: #333333;
        font-size: 12px;
        /deep/ .el-button--mini {
            padding: 4px 12px;
        }
        .shortcut {
            background: #dedede;
            padding: 0 4px;
        }
    }
}
</style>