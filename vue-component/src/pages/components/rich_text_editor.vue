<template>
    <div style="width: 70%; position: relative;">
        <h3>富文本编辑器</h3>
        <p>使用 Ckeditor 作为富文本编辑器</p>
        <el-button style="margin-bottom: 20px;" @click="handleGetData">获取data</el-button>
        <div class="code-block">
            <fg-editor v-model="value" />
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            value: `hhhhhh  
            这是一个富文本编辑器，基于 ckeditor5, 使用vue做了封装，更改了部分样式，<p>欢迎大家使用!</p><p>欢迎大家使用!</p><p>欢迎大家使用!</p><p>欢迎大家使用!</p><p>欢迎大家使用!</p><p>欢迎大家使用!</p><p>欢迎大家使用!</p><p>欢迎大家使用!</p>`
        }
    },
    methods: {
        handleGetData(){
            console.log('this.value', this.value)
        }
    }
}
</script>