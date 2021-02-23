<template>
    <div style="overflow: hidden">
        <div class="mark"></div>
        <p
            :id="id"
            contenteditable
            class="tribute-demo-input"
            placeholder="Type '@' for To,Type '@@' for follower,Type '//' for Due date"
        ></p>
        <tribute ref="tribute" />
    </div>
</template>
<script>
import './tribute.css';
import Tribute from './Tribute.vue';
export default {
    name: 'FgTodo',
    components: {
        Tribute
    },
    props: {
        id: {
            type: String,
            default: 'test'
        },
        addTodo: {
            type: Function
        },
        deleteTodo: {
            type: Function
        },
        values: {
            type: Array
        },
        getLastActiveTodo: {
            type: Function
        }
    },
    data() {
        return {
            tribute: null
        };
    },
    mounted() {
        // example of alternative callback
        let TributeClass = this.$refs['tribute'].getTribute();
        let _this = this;
        let tribute = new TributeClass({
            collection: [
                {
                    trigger: '@@',
                    // values: _this.values,
                    values: [
                        {
                            key: 'hhhh1',
                            value: 'hhhh1',
                            uid: 'uid1@@'
                        },
                        {
                            key: 'hhhh12',
                            value: 'hhhh12',
                            uid: 'uid12@@'
                        },
                        {
                            key: 'hhhh23',
                            value: 'hhhh23',
                            uid: 'uid23@@'
                        }
                    ],
                    selectTemplate: function(item) {
                        if (typeof item === 'undefined') return null;
                        if (this.range.isContentEditable(this.current.element)) {
                            return (
                                '<span contenteditable="false" class="fg-todo-follower" value="' +
                                item.original.uid +
                                '">' +
                                '@@' +
                                item.original.value +
                                '</span>'
                            );
                        }

                        return '@' + item.original.value;
                    },
                    requireLeadingSpace: true,
                    menuShowMinLength: 0,
                    noMatchTemplate: null
                },

                {
                    trigger: '//',
                    values: [
                        {
                            key: 'hhhh1',
                            value: 'hhhh1',
                            email: 'hhhh1'
                        },
                        {
                            key: 'hhhh12',
                            value: 'hhhh12',
                            email: 'hhhh12'
                        },
                        {
                            key: 'hhhh23',
                            value: 'hhhh23',
                            email: 'hhhh23'
                        }
                    ],
                    // values: _this.values,
                    selectTemplate: function(item) {
                        if (typeof item === 'undefined') return null;
                        if (this.range.isContentEditable(this.current.element)) {
                            return (
                                '<span contenteditable="false" class="fg-todo-follow" value="' +
                                item.original.key +
                                '">' +
                                item.original.value +
                                '</span>'
                            );
                        }

                        return '@' + item.original.value;
                    },
                    requireLeadingSpace: true,
                    noMatchTemplate: null
                },
                {
                    trigger: '@',
                    values: [
                        {
                            key: 'test1',
                            value: 'test1',
                            uid: 'uid1'
                        },
                        {
                            key: 'test12',
                            value: 'test12',
                            uid: 'uid12'
                        },
                        {
                            key: 'test23',
                            value: 'test23',
                            uid: 'uid23'
                        }
                    ],
                    // values: _this.values,
                    selectTemplate: function(item) {
                        if (typeof item === 'undefined') return null;
                        if (this.range.isContentEditable(this.current.element)) {
                            return (
                                '<span contenteditable="false" class="fg-todo-to" value="' +
                                item.original.uid +
                                '">' +
                                '@' +
                                item.original.value +
                                '</span>'
                            );
                        }

                        return '@' + item.original.value;
                    },
                    requireLeadingSpace: true,
                    noMatchTemplate: null
                    // autocompleteMode: true
                }
            ],
            vue: _this
            // menuContainer: document.getElementById('content'),
        });
        this.tribute = tribute;
        setTimeout(() => {
            tribute.attach(document.getElementById(this.id));
        }, 100);
    }
};
</script>
<style lang="less" scope>
.mark {
    width: 12px;
    height: 12px;
    border: 1px solid rgba(0, 0, 0, 0.36);
    float: left;
    margin-right: 4px;
    margin-top: 13px;
    margin-left: 4px;
}
.tribute-demo-input {
    outline: none;
    border: none;
    padding: 3px 5px;
    border-radius: 2px;
    font-size: 15px;
    min-height: 32px;
    cursor: text;
    width: calc(100% - 38px);
    float: left;
    margin: 0;
    line-height: 32px;
    .fg-todo-to {
        background: #ecf5ff;
        padding: 0 4px;
        color: #409eff;
    }
    .fg-todo-follower {
        background: #fdf6ec;
        padding: 0 4px;
        color: #e6a23c;
    }
    .fg-todo-due-date {
        background: #f4f4f5;
        padding: 0 4px;
        color: #909399;
    }
}
[contenteditable='true']:empty:before {
    content: attr(placeholder);
    display: block;
    color: #ccc;
}
</style>