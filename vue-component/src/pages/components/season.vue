<template>
    <div>
        <h3>季度选择组件</h3>
        <p>补充了 element ui 只有月度年度选择器的短板</p>
        <fg-season-range v-model="season"></fg-season-range>
    </div>
</template>
<script>
export default {
    name: 'App',
    data() {
        return {season: [new Date(), new Date()]};
    }
};
</script>
