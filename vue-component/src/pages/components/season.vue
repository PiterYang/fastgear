<template>
    <div style="width: 70%; position: relative;">
        <h3>季度选择组件</h3>
        <p>补充了 element ui 只有月度年度选择器的短板</p>
        <fg-season-range class="season-range" v-model="season"></fg-season-range>
        <div class="code-block">
            <textarea name="season" id="season" style="border:none; visibility: hidden;"></textarea>
        </div>
    </div>
</template>
<script>
import {CK_EDITOR_CONDIG} from '../../config';
export default {
    name: 'App',
    data() {
        return {season: [new Date(), new Date()]};
    },
    mounted(){
        setTimeout(() => {
            this.ClassicEditor.create(document.querySelector('#season'), {
                ...CK_EDITOR_CONDIG
            })
                .then(editor => {
                    editor.isReadOnly = true;
                    editor.setData(`<pre><code>&lt;season-select v-model="value2" inputStyle="width: 300px;" style="width:300px" /&gt;

&lt;script&gt;
    export default {
        data(){
            return {
                value2: [new Date(), new Date()]
            }
        }
    }
&lt;/script&gt;

v-model绑定的值：和 element-ui 中的 el-date-picker 一致

inputStyle：用来设置组件中显示选中季度的 input 样式

style： 则是设置组件最外层元素样式</code></pre>`);
                    window.editor1 = editor;
                })
                .catch(error => {
                    console.error(error);
                });
        });
    }
};
</script>
<style lang="less" scoped>
    .code-block{
        margin-top: 20px;
    }
    .season-range /deep/ .el-date-range-picker {
        position: absolute;
        z-index: 10;
    }
</style>
<style lang="less">