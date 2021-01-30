<template>
    <div id="home">
        <img alt="Vue logo" src="../assets/logo.png" />
        <season-range v-model="season"></season-range>
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

<style>
#home {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
