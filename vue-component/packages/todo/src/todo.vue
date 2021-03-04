<template>
    <div class="fg-todo-wrap">
        <div class="fg-todo-header">
            <el-button size="mini" @mousedown.native="handleTo($event)">+ To</el-button>
            <el-button size="mini" @mousedown.native="handleFollower($event)">+ Followr</el-button>
            <el-button size="mini" @mousedown.native="handleDueDate($event)">+ Due date</el-button>
            <span>
                <span style="padding-left: 57px;">
                    shortcuts: To&nbsp;
                    <span class="shortcut">@</span>
                </span>
                <span style="padding-left: 12px">
                    Follower&nbsp;
                    <span class="shortcut">@@</span>
                </span>
                <span style="padding-left: 12px;">
                    Due date&nbsp;
                    <span class="shortcut">//</span>
                </span>
            </span>
        </div>
        <span class="todo-editor-container">
            <todo
                v-for="(item, index) in todoItem"
                :id="item.id"
                :key="item.id"
                :addTodo="() => addTodo(index)"
                :deleteTodo="deleteTodo"
                :values="values"
                :ref="item.id"
                :getLastActiveTodo="getLastActiveTodo"
                :innerHTML="item.innerHTML"
                :containerClass="containerClass"
            ></todo>
        </span>
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
            // todoItem: [{id: 'todo-id' + new Date().getTime(), innerHTML: ''}],
            lastActiveEl: null
        };
    },
    props: {
        values: {
            type: Array,
            default() {
                return [
                    {
                        key: 'hhhh1',
                        value: 'hhhh1',
                        uid: 'uid1@@',
                        uname: 'name1'
                    },
                    {
                        key: 'hhhh12',
                        value: 'hhhh12',
                        uid: 'uid12@@',
                        uname: 'name2'
                    },
                    {
                        key: 'hhhh23',
                        value: 'hhhh23',
                        uid: 'uid23@@',
                        uname: 'name3'
                    }
                ];
            }
        },
        todoItem: {
            type: Array,
            default() {
                return [{id: 'todo-id' + new Date().getTime(), innerHTML: ''}];
            }
        },
        containerClass: {
            type: String,
            default: () => ''
        }
    },
    methods: {
        addTodo(index) {
            const random = new Date().getTime();
            this.todoItem.splice(index + 1, 0, {id: 'todo-id' + random, innerHTML: ''});
            setTimeout(() => {
                document.querySelector(`#todo-id${random}`).focus();
            });
            // setTimeout(() => {
            //     this.getData();
            // });
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
        handleTo(e) {
            e.preventDefault();
            this.getTribute(2);
        },
        handleFollower(e) {
            e.preventDefault();
            this.getTribute(0);
        },
        handleDueDate(e) {
            e.preventDefault();
            this.getTribute(1);
        },
        getLastActiveTodo(event) {
            // this.lastActiveEl = document
            //     .querySelector('.todo-editor-container')
            //     .contains(document.activeElement)
            //     ? document.activeElement
            //     : event.target;
        },
        getTribute(index) {
            let el;
            this.lastActiveEl = document
                .querySelector('.todo-editor-container')
                .contains(document.activeElement)
                ? document.activeElement
                : null;
            if (this.lastActiveEl) {
                const id = this.lastActiveEl.getAttribute('id');
                this.$refs[id][0].tribute.showMenuForCollection(this.lastActiveEl, index);
            } else {
                const last = this.todoItem.length - 1;
                el = document.getElementById(this.todoItem[last].id);
                this.$refs[this.todoItem[last].id][0].tribute.showMenuForCollection(el, index);
            }
        },
        getData() {
            const list = this.todoItem.filter(v => {
                return document.getElementById(v.id).innerHTML.trim() !== '';
            });
            const getValue = el => [].slice.call(el).map(v => v.getAttribute('value'));
            // const querySelectorAll = document.querySelectorAll;
            const todos = list.map(v => {
                const el = document.getElementById(v.id);
                const followerEl = document.querySelectorAll(`#${v.id} .fg-todo-follower`);
                const toEl = document.querySelectorAll(`#${v.id} .fg-todo-to`);
                const dueDateEl = document.querySelectorAll(`#${v.id} .fg-todo-due-date`);
                let todo = {};
                todo.follower = getValue(followerEl);
                todo.to = getValue(toEl);
                todo.dueDate = getValue(dueDateEl);
                todo.content = el.innerHTML
                    .replace(/<[^>]+>(.*?)<\/[^>]+>/g, '')
                    .replace(/&nbsp;/gi, ' ')
                    .trim(); //去掉所有的html标记和标记里面的内容
                todo.id = v.id;
                todo.innerHTML = el.innerHTML;
                return todo;
            });
            return todos;
        }
    }
};
</script>
<style lang="less" scoped>
.fg-todo-wrap {
    width: 650px;
    border: 1px solid #c4c4c4;
    min-height: 200px;
    .fg-todo-header {
        background: #fafafa;
        padding: 3px 12px;
        border-bottom: 1px solid #c4c4c4;
        color: #333333;
        font-size: 14px;
        line-height: 24px;
        /deep/ .el-button--mini {
            padding: 2px 12px;
        }
        .el-button--mini + .el-button--mini {
            margin-left: 16px;
        }
        .shortcut {
            background: #dedede;
            padding: 0 4px;
        }
    }
}
</style>