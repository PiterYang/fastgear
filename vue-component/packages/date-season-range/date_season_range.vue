<template>
    <div v-clickoutside="handleClose" style="position: relative;">
        <el-input
            class="el-date-editor"
            :placeholder="placeholder"
            @focus="handleFocus"
            :value="displayValue"
            @input="value => userInput = value"
            @change="handleChange"
            :validateEvent="false"
            @pick="pick"
            :readonly="true"
            ref="reference"
            :style="inputStyle"
        ></el-input>
        <div
            v-show="visible"
            class="el-picker-panel el-date-range-picker el-popper"
            style="positon: absolute;"
        >
            <div class="el-picker-panel__body">
                <div class="el-picker-panel__content el-date-range-picker__content is-left">
                    <div class="el-date-range-picker__header">
                        <button
                            type="button"
                            @click="leftPrevYear"
                            class="el-picker-panel__icon-btn el-icon-d-arrow-left"
                        ></button>
                        <div>{{ leftLabel }}</div>
                    </div>
                    <month-table
                        selection-mode="range"
                        :date="leftDate"
                        :default-value="defaultValue"
                        :min-date="minDate"
                        :max-date="maxDate"
                        :range-state="rangeState"
                        @changerange="handleChangeRange"
                        @pick="handleRangePick"
                    ></month-table>
                </div>
                <div class="el-picker-panel__content el-date-range-picker__content is-right">
                    <div class="el-date-range-picker__header">
                        <button
                            type="button"
                            @click="rightNextYear"
                            class="el-picker-panel__icon-btn el-icon-d-arrow-right"
                        ></button>
                        <div>{{ rightLabel }}</div>
                    </div>
                    <month-table
                        selection-mode="range"
                        :date="rightDate"
                        :default-value="defaultValue"
                        :min-date="minDate"
                        :max-date="maxDate"
                        :range-state="rangeState"
                        @changerange="handleChangeRange"
                        @pick="handleRangePick"
                    ></month-table>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
/**
 * @file:  View 组件 季节选择控件
 * @author: 在 element ui月份选择基础上 tao.yang 改了大部分逻辑
 * @date: 2020-04-27
 * @description: UI组件  可选择季节
 * @api: 组件外层 v-model 即可
 */
import monthTable from './date_season';
// import Clickoutside from './click_outside';
const valueEquals = function(a, b) {
    // considers Date object and string
    const dateEquals = function(a, b) {
        const aIsDate = a instanceof Date;
        const bIsDate = b instanceof Date;
        if (aIsDate && bIsDate) {
            return a.getTime() === b.getTime();
        }
        if (!aIsDate && !bIsDate) {
            return a === b;
        }
        return false;
    };

    const aIsArray = a instanceof Array;
    const bIsArray = b instanceof Array;
    if (aIsArray && bIsArray) {
        if (a.length !== b.length) {
            return false;
        }
        return a.every((item, index) => dateEquals(item, b[index]));
    }
    if (!aIsArray && !bIsArray) {
        return dateEquals(a, b);
    }
    return false;
};
const modifyDate = function(date, y, m, d) {
    return new Date(
        y,
        m,
        d,
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
        date.getMilliseconds()
    );
};
const getDayCountOfMonth = function(year, month) {
    if (month === 3 || month === 5 || month === 8 || month === 10) {
        return 30;
    }

    if (month === 1) {
        if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
            return 29;
        } else {
            return 28;
        }
    }

    return 31;
};
const changeYearMonthAndClampDate = function(date, year, month) {
    // clamp date to the number of days in `year`, `month`
    // eg: (2010-1-31, 2010, 2) => 2010-2-28
    const monthDate = Math.min(date.getDate(), getDayCountOfMonth(year, month));
    return modifyDate(date, year, month, monthDate);
};
const prevYear = function(date, amount = 1) {
    const year = date.getFullYear();
    const month = date.getMonth();
    return changeYearMonthAndClampDate(date, year - amount, month);
};
const nextYear = function(date, amount = 1) {
    const year = date.getFullYear();
    const month = date.getMonth();
    return changeYearMonthAndClampDate(date, year + amount, month);
};
const isDate = function(date) {
    if (date === null || date === undefined) return false;
    if (isNaN(new Date(date).getTime())) return false;
    if (Array.isArray(date)) return false; // deal with `new Date([ new Date() ]) -> new Date()`
    return true;
};

export const nextMonth = function(date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    return month === 11
        ? changeYearMonthAndClampDate(date, year + 1, 0)
        : changeYearMonthAndClampDate(date, year, month + 1);
};

const calcDefaultValue = defaultValue => {
    if (Array.isArray(defaultValue)) {
        return [new Date(defaultValue[0]), new Date(defaultValue[1])];
    } else if (defaultValue) {
        return [new Date(defaultValue), nextMonth(new Date(defaultValue))];
    } else {
        return [new Date(), nextMonth(new Date())];
    }
};
const displayText = {
    0: '1月-3月',
    1: '4月-6月',
    2: '7月-9月',
    3: '10月-12月'
};
export default {
    name: 'SeasonRange',
    components: {
        monthTable
    },
    // directives: {
    //     Clickoutside
    // },
    props: {
        defaultValue: {
            type: String // example: 2020-1
        },
        placeholder: {
            type: String
        },
        rangeSeparator: {
            type: String
        },
        value: {},
        inputStyle: {}
    },
    data() {
        return {
            showSeason: false,
            firstClickSeason: '',
            secondClickSeason: '',
            year: new Date().getFullYear() - 1,
            showValue: '',
            prevDisable: false,
            prevDisable1: false,
            year1: new Date().getFullYear(),
            clickNum: 0,
            firstClickYear: '',
            secondClickYear: '',
            cark2ClickStyle: {1: false, 2: false, 3: false, 4: false},
            carkClickStyle: {1: false, 2: false, 3: false, 4: false},
            visible: false,
            minDate: '',
            maxDate: '',
            rangeState: {endDate: null, selecting: false, row: null, column: null},
            leftDate: new Date(),
            rightDate: nextYear(new Date()),
            pickerVisible: false,
            displayValue: '',
            unlinkPanels: false
        };
    },
    created() {},
    watch: {
        defaultValue: function() {
            // if (!Array.isArray(this.value)) {
            //     const [left, right] = calcDefaultValue(val);
            //     this.leftDate = left;
            //     this.rightDate =
            //         val && val[1] && left.getFullYear() !== right.getFullYear() && this.unlinkPanels
            //             ? right
            //             : nextYear(this.leftDate);
            // }
        },
        value: {
            immediate: true,
            handler(newVal) {
                if (!newVal) {
                    this.minDate = null;
                    this.maxDate = null;
                } else if (Array.isArray(newVal)) {
                    this.minDate = isDate(newVal[0]) ? this.seasonFirstMonthDate(newVal[0]) : null;
                    this.maxDate = isDate(newVal[1]) ? this.seasonFirstMonthDate(newVal[1]) : null;
                    this.displayValue = this.formatToDisplayValue(newVal);
                    if (this.minDate) {
                        this.leftDate = this.minDate;
                        this.rightDate = nextYear(this.leftDate);
                    } else {
                        this.leftDate = calcDefaultValue(this.defaultValue)[0];
                        this.rightDate = nextYear(this.leftDate);
                    }
                }
            }
        },
        pickerVisible(val) {
            if (val) {
                this.showPicker();
            } else {
                this.hidePicker();
            }
        }
    },
    computed: {
        // displayValue() {
        //     if (this.userInput !== null) {
        //         return this.userInput;
        //     } else {
        //         return '';
        //     }
        // },
        leftLabel() {
            return this.leftDate.getFullYear() + ' ' + '年';
        },

        rightLabel() {
            return this.rightDate.getFullYear() + ' ' + '年';
        },

        leftYear() {
            return this.leftDate.getFullYear();
        },

        rightYear() {
            return this.rightDate.getFullYear() === this.leftDate.getFullYear()
                ? this.leftDate.getFullYear() + 1
                : this.rightDate.getFullYear();
        }
    },
    methods: {
        handleClose() {
            if (!this.pickerVisible) return;
            this.pickerVisible = false;
        },
        handleFocus() {
            this.pickerVisible = true;
        },
        handleChange() {
            if (this.userInput) {
                const value = this.parseString(this.displayValue);
                if (value) {
                    this.picker.value = value;
                    if (this.isValidValue(value)) {
                        this.emitInput(value);
                        this.userInput = null;
                    }
                }
            }
            if (this.userInput === '') {
                this.emitInput(null);
                this.emitChange(null);
                this.userInput = null;
            }
        },
        emitInput(val) {
            // const formatted = this.formatToValue(val);
            // if (!valueEquals(this.value, formatted)) {
            //     this.$emit('input', formatted);
            // }
            // const formatted = this.formatToValue(val);
            this.$emit('input', val);
        },
        formatToValue(val) {
            const year1 = val[0].getFullYear();
            const year2 = val[1].getFullYear();
            const month1 = val[0].getMonth();
            const month2 = val[1].getMonth();
            return `${year1}/${month1}-${year2}/${month2}`;
        },
        emitChange(val) {
            // determine user real change only
            if (!valueEquals(val, this.valueOnOpen)) {
                this.$emit('change', val);
                this.valueOnOpen = val;
                if (this.validateEvent) {
                    this.dispatch('ElFormItem', 'el.form.change', val);
                }
            }
        },
        handleChangeRange(val) {
            this.minDate = val.minDate;
            this.maxDate = val.maxDate;
            this.rangeState = val.rangeState;
        },
        handleRangePick(val, close = true) {
            // const defaultTime = this.defaultTime || [];
            const minDate = val.minDate;
            const maxDate = val.maxDate;
            if (this.maxDate === maxDate && this.minDate === minDate) {
                return;
            }
            this.onPick && this.onPick(val);
            this.maxDate = maxDate;
            this.minDate = minDate;
            setTimeout(() => {
                this.maxDate = maxDate;
                this.minDate = minDate;
            }, 10);
            if (!close) return;
            this.handleConfirm();
        },
        handleConfirm(visible = false) {
            if (this.isValidValue([this.minDate, this.maxDate])) {
                this.pick([this.minDate, this.maxDate], visible);
            }
        },
        leftPrevYear() {
            this.leftDate = prevYear(this.leftDate);
            if (!this.unlinkPanels) {
                this.rightDate = prevYear(this.rightDate);
            }
            // this.resetView();
        },
        rightNextYear() {
            if (!this.unlinkPanels) {
                this.leftDate = nextYear(this.leftDate);
            }
            this.rightDate = nextYear(this.rightDate);
            // this.resetView();
        },
        handleMouseEnter() {},
        pick(date = '', visible = false) {
            this.userInput = null;
            this.pickerVisible = this.visible = visible;
            this.emitInput(date);
            this.resetView && this.resetView();
        },
        resetView() {
            this.minDate =
                this.value && isDate(this.value[0])
                    ? this.seasonFirstMonthDate(new Date(this.value[0]))
                    : null;
            this.maxDate =
                this.value && isDate(this.value[0])
                    ? this.seasonFirstMonthDate(new Date(this.value[1]))
                    : null;
        },
        isValidValue(value) {
            return (
                Array.isArray(value) &&
                value &&
                value[0] &&
                value[1] &&
                isDate(value[0]) &&
                isDate(value[1]) &&
                value[0].getTime() <= value[1].getTime()
            );
        },
        showPicker() {
            this.pickerVisible = this.visible = true;
            this.resetView && this.resetView();
        },
        hidePicker() {
            this.pickerVisible = this.visible = false;
            this.resetView && this.resetView();
        },
        seasonFirstMonthDate(date) {
            var year = date.getFullYear();
            var month = Math.floor(date.getMonth() / 3) * 3;
            return new Date(year, month);
        },
        formatToDisplayValue(arrayData) {
            let leftYear = arrayData[0].getFullYear();
            let rightYear = arrayData[1].getFullYear();
            let leftMonth = Math.floor(arrayData[0].getMonth() / 3);
            let rightMonth = Math.floor(arrayData[1].getMonth() / 3);
            return `${leftYear}年${displayText[leftMonth]}至${rightYear}年${displayText[rightMonth]}`;
        }
    }
};
</script>
<style lang="less" scoped>
.no-hover:hover {
    color: #606266 !important;
}
.hoverBtn:hover {
    color: #fff !important;
    background: #409eff;
}
.active {
    color: #fff !important;
    background: #409eff !important;
}
</style>
