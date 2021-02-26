<template>
    <div style="overflow: hidden">
        <div class="mark"></div>
        <span
            :id="id"
            contenteditable
            class="tribute-demo-input"
            placeholder="@san.zhang 完成线上培训课程 @@si.li //2020-12-24 10:00"
        ></span>
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
        },
        innerHTML: {
            type: String,
            default() {
                return '';
            }
        }
    },
    data() {
        return {
            tribute: null
        };
    },
    mounted() {
        // example of alternative callback
        document.getElementById(this.id).innerHTML = this.innerHTML;
        let TributeClass = this.$refs['tribute'].getTribute();
        let tribute = new TributeClass({
            collection: [
                {
                    trigger: '@@',
                    values: this.values,
                    // values: [
                    //     {
                    //         key: 'hhhh1',
                    //         value: 'hhhh1',
                    //         uid: 'uid1@@',
                    //         uname: 'name1'
                    //     },
                    //     {
                    //         key: 'hhhh12',
                    //         value: 'hhhh12',
                    //         uid: 'uid12@@',
                    //         uname: 'name2'
                    //     },
                    //     {
                    //         key: 'hhhh23',
                    //         value: 'hhhh23',
                    //         uid: 'uid23@@',
                    //         uname: 'name3'
                    //     }
                    // ],
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
                    menuItemTemplate: function(item) {
                        return (
                            '<span contenteditable="false" class="left">' +
                            item.string +
                            '</span>' +
                            '<span class="right">' +
                            item.original.uname +
                            '</span>'
                        );
                    },
                    requireLeadingSpace: true,
                    // menuShowMinLength: 1,
                    noMatchTemplate: null
                },

                {
                    trigger: '//',
                    values: [],
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
                    //  menuShowMinLength: 1,
                },
                {
                    trigger: '@',
                    // values: [
                    //     {
                    //         key: 'key1',
                    //         value: 'value11',
                    //         uid: 'uid1',
                    //         uname: 'name3'
                    //     },
                    //     {
                    //         key: 'key2',
                    //         value: 'value22',
                    //         uid: 'uid12',
                    //         uname: 'name3'
                    //     },
                    //     {
                    //         key: 'key3',
                    //         value: 'value33',
                    //         uid: 'uid23',
                    //         uname: 'name3'
                    //     }
                    // ],
                    values: this.values,
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
                    menuItemTemplate: function(item) {
                        console.log(item);
                        return (
                            '<span contenteditable="false" class="left">' +
                            item.string +
                            '</span>' +
                            '<span class="right">' +
                            item.original.uname +
                            '</span>'
                        );
                    },
                    requireLeadingSpace: true,
                    noMatchTemplate: null

                    // autocompleteMode: true
                }
            ],
            vue: this
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
    display: block;
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
        user-select: none;
    }
    .fg-todo-follower {
        background: #fdf6ec;
        padding: 0 4px;
        color: #e6a23c;
        user-select: none;
    }
    .fg-todo-due-date {
        background: #f4f4f5;
        padding: 0 4px;
        color: #909399;
        user-select: none;
    }
}
[contenteditable='true']:empty:before {
    content: attr(placeholder);
    display: block;
    color: #ccc;
}
</style>