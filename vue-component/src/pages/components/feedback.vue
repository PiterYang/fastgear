<template>
    <div style="width: 70%; position: relative;">
        <h3>提交反馈</h3>
        <p>扩展 element ui 加入提交反馈的新功能</p>
        <p>页面右下角的小圆点，便是提交反馈入口，打开后即可上传图片和描述反馈的问题</p>
        <div>
            <fg-feedback uploadUrl="/api/feedback/attachment/upload" sendUrl="/api/send"/>
        </div>
        <div class="code-block">
            <fg-editor v-model="codeContent" isReadOnly />
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            codeContent: `<pre><code>&lt;template&gt;
	&lt;fg-feedback 
	  uploadUrl="/api/feedback/attachment/upload" 
	  sendUrl="/api/send"/&gt;
&lt;/template&gt;</code></pre>`
        }
    }
}
</script>