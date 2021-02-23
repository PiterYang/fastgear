<template>
    <div style="display: flex;flex:1;">
        <div class="fg-left">
            <el-menu
                :default-active="$route.path"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
                router
            >
                <el-menu-item index="/component/update_log">
                    <span slot="title">更新日志</span>
                </el-menu-item>

                <el-menu-item-group>
                    <template slot="title">开发指南</template>
                    <el-menu-item index="/component/install">安装</el-menu-item>
                    <el-menu-item index="/component/quick_start">快速上手</el-menu-item>
                </el-menu-item-group>

                <el-menu-item-group>
                    <template slot="title">组件</template>
                    <el-menu-item index="/component/season">season range</el-menu-item>
                    <el-menu-item index="/component/guard">service guard</el-menu-item>
                    <el-menu-item index="/component/feedback">feedback</el-menu-item>
                    <el-menu-item index="/component/rich_text_editor">rich text editor</el-menu-item>
                    <el-menu-item index="/component/tree_select">tree select</el-menu-item>
                    <el-menu-item index="/component/all_select">all select</el-menu-item>
                    <el-menu-item index="/component/todo">todo</el-menu-item>
                </el-menu-item-group>
            </el-menu>
        </div>
        <div class="fg-main" style="display: flex; flex:1;">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            defaultActive: ''
        };
    },
    mounted() {
        console.log('this.$route', this.$route);
    },
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        }
    },
    watch: {
        '$route.path': function(current) {
            console.log('current', current);
            this.defaultActive = current
                .split('/')
                .slice(0, 2)
                .join('/');
            console.log(this.defaultActive);
        }
    }
};
</script>
<style lang="less" scoped>
.fg-left {
    float: left;
    width: 260px;
    height: 100%;
    overflow: auto;
}
.fg-main {
    padding: 10px;
}
</style>