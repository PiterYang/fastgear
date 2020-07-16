<template>
    <div id="app">
        <img alt="Vue logo" src="./assets/logo.png" />
        <season-range></season-range>
    </div>
</template>

<script>
import VueComponent from '../packages/index';
// import {SeasonRange} from './index.js';
// import Vue from 'vue';
const SeasonRange = VueComponent.SeasonRange;
// Vue.use(VueComponent);
console.log('seasnon', VueComponent);
console.log('seaRange', VueComponent.SeasonRange);
export default {
    name: 'App',
    components: {
        SeasonRange
    }
};
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
