<template></template>
<script>
import intro from 'intro.js'
import 'intro.js/introjs.css';
export default {
    name: 'FgGuard',
    data(){
        return {}
    },
    props:['nextLabel', 'prevLabel', 'doneLabel', 'element', 'content', 'handleDoneClick', 'visible'],
    mounted(){
        
    },
    watch: {
        visible:{
            handler(val){
                if(val){
                    this.showGuard()
                }
            },
            immediate: true
        }
    },
    methods: {
        showGuard(){
            console.log(111)
            let options = {
                showProgress: false,
                showBullets: false,
                showStepNumbers: false,
                exitOnOverlayClick: false,
                disableInteraction: true,
                tooltipClass: 'intro-my-layers',
                highlightClass: 'intro-my-helper',
                steps: [{intro: this.content}]
            }
            if(this.element){
                options.steps[0].element = this.element
            }
            if(this.nextLabel){
                options.nextLabel = this.nextLabel
            }
            if(this.prevLabel){
                options.prevLabel = this.prevLabel
            }
            if(this.doneLabel){
                options.doneLabel = this.doneLabel
            }
            console.log('options', options)
            setTimeout(() => {
                intro().setOptions(options).start().oncomplete(() => {
                    this.handleDoneClick && this.handleDoneClick()
                })
            }, 500)
            
        }
    }
}
</script>
<style lang="less">
@intor-color: #6955c6;
.intro-my-helper-step3 .btn {
    background: #f90;
    border-color: #f90;
    color: #fff;
    margin: 5px;
    box-sizing: border-box;
    padding-top: 7px;
    text-align: center;
    height: 31px;
    width: 55px;
    border-radius: 3px;
}
.intro-my-helper {
    border: 1px solid @intor-color!important;
    box-shadow: 0 2px 15px @intor-color!important;
    border-radius: 6px !important;
    position: absolute;
}
.intro-my-layers {
    background-color: @intor-color !important;
    padding: 5px 15px 10px !important;
    color: #fff;
    border-radius: 6px !important;
    width: 250px !important;
    position: absolute;
    .intor-step-nums {
        position: absolute;
        bottom: 14px;
        right: 82px;
    }
    .introjs-arrow {
        border-bottom-color: @intor-color !important;
        border-top-color: @intor-color!important;
    }
    .introjs-button {
        border-radius: 8px !important;
        color: @intor-color!important;
    }
    .introjs-skipbutton{
        color: #fff;
    }
    .introjs-tooltipbuttons{
        border-top: none;
    }
    .introjs-tooltip-header{
        padding-right: 0
    }
}
.intro-my-layers-meeting0 {
    width: 470px !important;
    max-width: 470px !important;
    padding: 5px 15px 10px !important;
    .introjs-tooltipbuttons {
        text-align: center !important;
        padding-top: 30px !important;
        padding-bottom: 15px !important;
        .introjs-donebutton {
            padding: 0.6em 1.5em !important;
        }
    }
}
</style>