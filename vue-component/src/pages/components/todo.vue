<template>
    <div class="test1111" style="overflow: auto;">
        <!-- <div style="height: 600px;"></div> -->
        <el-button @click="handleGetData">Get Data</el-button>
        <div style>
            <h3>快捷todo</h3>
            <fg-todo ref="todoEditor" :values="values" :todoItem="todoItem"></fg-todo>
        </div>
        <div class="code-block">
            <fg-editor v-model="codeContent" isReadOnly />
        </div>
    </div>
</template>
<script>
export default {
    name: 'App',
    data() {
        return {
            values: [
                {
                    key: 'userKey1',
                    value: 'value1',
                    uname: 'chianes name1',
                    uid: 'uid1'
                },
                {
                    key: 'userKey2',
                    value: 'value2',
                    uname: 'chianes name2',
                    uid: 'uid2'
                },
                {
                    key: 'tao.yang',
                    value: 'tao.yang1',
                    uname: 'chianes tao.yang1',
                    uid: 'tao.yang1'
                },
                {
                    key: 'tao.yang',
                    value: 'tao.yang2',
                    uname: 'chianes tao.yang2',
                    uid: 'tao.yang2'
                },
                {
                    key: 'tianqi.zhao',
                    value: 'tao.yang1',
                    uname: 'chianes tao.yang1',
                    uid: 'tao.yang1'
                },
                {
                    key: 'userKey3', // 选项的key，搜索项
                    value: 'value3', // 选项的英文名
                    uname: 'chianes name3', // 选项的中文名
                    uid: 'uid3' // 选项ID
                }
            ],
            todoItem: [
                {
                    id: 'todo-id' + new Date().getTime(),
                    innerHTML: '',
                    to: [], // todo 归属者
                    follower: [], // todo 关注者
                    dueDate: [], // 截止日期
                    content: '' // todo 内容
                }
            ],
            codeContent: `<pre><code>&lt;fg-todo
    ref="todos"
    :values="todoValues"
    :containerClass="you scroll container class"
    :todoItem="todoItem"
&gt;&lt;/fg-todo&gt;

&lt;script&gt;
exprot default {
    data(){
        return {
            values: [{
                key: 'userKey1',
                value: 'value1',
                uname: 'chianes name1',
                uid: 'uid1'
            },{
                key: 'userKey2',
                value: 'value2',
                uname: 'chianes name2',
                uid: 'uid2'
            },{
                key: 'userKey3', // 选项的key，搜索项
                value: 'value3', // 选项的英文名 
                uname: 'chianes name3', // 选项的中文名
                uid: 'uid3' // 选项ID
            }],
            todoItem: [{
                id: 'todo-id' + new Date().getTime(),
                innerHTML: '',
                to: [], // todo 归属者
                follower: [], // todo 关注者
                dueDate: [], // 截止日期
                content: '' // todo 内容
            }]
        }
    },
    methods:{
        getValues(){
            const value = this.$refs['todos'].getData()
            console.log('value', value)
        }
    }
    
}</code></pre>`
        };
    },
    methods: {
        handleGetData() {
            console.log('data', this.$refs['todoEditor'].getData());
        }
    }
};
</script>
<style lang="less" scoped>
.code-block{
    height: 200px;
}
</style>