<template>
    <div style="width: 70%;">
        <h3>新功能介绍</h3>
        <p>扩展 element ui 加入新功能介绍，底层使用 intro.js 实现</p>
        <div class="code-block">
            <el-button  id="guard" @click="handleGetData">Guard</el-button>
        </div>
        <fg-guard element="#guard" content="这是一个新功能介绍的提示文案" doneLabel="知道了" :handleDoneClick="handleDoneClick" :visible="true" />
        <fg-guard content="这是一个全屏新功能介绍的提示文案" doneLabel="知道了"  :visible="visible" />
        <div class="code-block">
            <fg-editor v-model="codeContent" isReadOnly />
        </div>
    </div>
</template>
<script>
import {CK_EDITOR_CONDIG} from '../../config';
export default {
    data(){
        return {
            visible: false, 
            codeContent: `<pre><code>&lt;fg-guard 
  element="#guard" 
  content="这是一个新功能介绍的提示文案" 
  doneLabel="知道了" 
  :handleDoneClick="handleDoneClick" 
  :visible="true" /&gt;
&lt;fg-guard 
  content="这是一个全屏新功能介绍的提示文案" 
  doneLabel="知道了"  
  :visible="visible" /&gt;

&lt;script&gt;
exprot default {
    data(){
        return {}
    },
    methods:{
        handleDoneClick(){
            this.visible = true
        }
    }
    
}
&lt;/script&gt;</code></pre><p>&nbsp;</p>`
        }
    },
    methods: {
        handleDoneClick(){
            this.visible = true
        },
        handleGetData(){
            console.log(window.editor2.getData())
        }
    }
}
</script>