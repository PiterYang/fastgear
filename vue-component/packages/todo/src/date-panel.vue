<template>
    <div class="date-panel">
        <date-panel ref="datePanel" @comfirm="comfirm" @pick="pick"></date-panel>
    </div>
</template>
<script>
import DatePanel from './el-date-panel.vue';

export default {
    props: {
        date: {
            default: () => new Date(),
            type: Date
        },
        showTime: {
            default: true,
            type: Boolean
        }
    },
    components: {
        DatePanel
    },
    model: {
        prop: 'date',
        event: 'change'
    },
    mounted() {
        this.$refs.datePanel.value = this.date;
        this.$refs.datePanel.showTime = this.showTime;
        this.$refs.datePanel.shortcuts = [
            {
                text: '明天',
                onClick: () => {
                    this.$options.tribute.selectItemAtIndex(
                        'date',
                        event,
                        this.pattern('yyyy-MM-dd hh:mm:ss', this.addHours(19, this.addDays(1))),
                        'customSelection'
                    );
                    this.$options.tribute.hideMenu();
                }
            },
            {
                text: '三天后',
                onClick: () => {
                    this.$options.tribute.selectItemAtIndex(
                        'date',
                        event,
                        this.pattern('yyyy-MM-dd hh:mm:ss', this.addHours(19, this.addDays(3))),
                        'customSelection'
                    );
                    this.$options.tribute.hideMenu();
                }
            },
            {
                text: '下周',
                onClick: () => {
                    this.$options.tribute.selectItemAtIndex(
                        'date',
                        event,
                        this.pattern('yyyy-MM-dd hh:mm:ss', this.addHours(19, this.addDays(7))),
                        'customSelection'
                    );
                    this.$options.tribute.hideMenu();
                }
            }
        ];
        this.$refs.datePanel.visible = true;
    },
    methods: {
        pick(date) {
            this.$refs.datePanel.value = date;
            this.$refs.datePanel.resetView && this.$refs.datePanel.resetView();

            this.$emit('change', date);
        },
        addDays(days, date) {
            let newDate = date || new Date();
            newDate.setDate(newDate.getDate() + days);
            return newDate;
        },
        addHours(hours, date, min = 0, sec = 0) {
            let newDate = date || new Date();
            newDate.setHours(hours, min, sec);
            return newDate;
        },
        comfirm(date) {
            // const el = this.$options.tribute.current.element;
            // el.scrollLeft = el.scrollWidth;
            // this.setCaretPosition(el);
            // setTimeout(() => {
            this.$options.tribute.selectItemAtIndex(
                'date',
                event,
                this.pattern('yyyy-MM-dd hh:mm:ss', date),
                'customSelection'
            );
            // return;
            this.$options.tribute.hideMenu();
            // }, 50);
        },
        setCaretPosition(input) {
            var range = document.createRange();

            range.selectNodeContents(input);

            range.collapse(false);

            var sel = window.getSelection();

            sel.removeAllRanges();

            sel.addRange(range);
        },
        pattern(fmt, date) {
            /** * 对Date的扩展，将 Date 转化为指定格式的String * 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q)
            可以用 1-2 个占位符 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) * eg: * (new
            Date()).pattern("yyyy-MM-dd hh:mm:ss.S")==> 2006-07-02 08:09:04.423
            * (new Date()).pattern("yyyy-MM-dd E HH:mm:ss") ==> 2009-03-10 二 20:09:04
            * (new Date()).pattern("yyyy-MM-dd EE hh:mm:ss") ==> 2009-03-10 周二 08:09:04
            * (new Date()).pattern("yyyy-MM-dd EEE hh:mm:ss") ==> 2009-03-10 星期二 08:09:04
            * (new Date()).pattern("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18
            */

            let o = {
                'M+': date.getMonth() + 1, //月份
                'd+': date.getDate(), //日
                'h+': date.getHours() % 12 == 0 ? 12 : date.getHours() % 12, //小时
                'H+': date.getHours(), //小时
                'm+': date.getMinutes(), //分
                's+': date.getSeconds(), //秒
                'q+': Math.floor((date.getMonth() + 3) / 3), //季度
                S: date.getMilliseconds() //毫秒
            };
            let week = {
                '0': '/u65e5',
                '1': '/u4e00',
                '2': '/u4e8c',
                '3': '/u4e09',
                '4': '/u56db',
                '5': '/u4e94',
                '6': '/u516d'
            };
            if (/(y+)/.test(fmt)) {
                fmt = fmt.replace(
                    RegExp.$1,
                    (date.getFullYear() + '').substr(4 - RegExp.$1.length)
                );
            }
            if (/(E+)/.test(fmt)) {
                fmt = fmt.replace(
                    RegExp.$1,
                    (RegExp.$1.length > 1
                        ? RegExp.$1.length > 2
                            ? '/u661f/u671f'
                            : '/u5468'
                        : '') + week[date.getDay() + '']
                );
            }
            for (let k in o) {
                if (new RegExp('(' + k + ')').test(fmt)) {
                    fmt = fmt.replace(
                        RegExp.$1,
                        RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
                    );
                }
            }
            return fmt;
        }
    }
};
</script>
<style scoped lang="less">
// .date-panel /deep/ .el-picker-panel__footer {
//     display: none !important;
// }
.date-panel /deep/ .el-picker-panel {
    width: 420px;
}
.date-panel /deep/ .el-time-panel {
    width: 158px;
}
//
</style>