<template>
    <div style="height: 400px;overflow: auto;position: relative;" class="test1111">
        <!-- <div style="height: 600px;"></div> -->
        <el-button @click="handleGetData">Get Data</el-button>
        <div style>
            <h3>快捷todo</h3>
            <fg-todo :containerClass="'test1111'" ref="todoEditor"></fg-todo>
        </div>
    </div>
</template>
<script>
export default {
    name: 'App',
    data() {
        return {season: [new Date(), new Date()], container: null};
    },
    methods: {
        handleGetData() {
            console.log('this.$ref', this.$refs['todoEditor'].getData());
        }
    }
};
</script>