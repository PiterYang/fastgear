<template>
    <table @click="handleMonthTableClick" @mousemove="handleMouseMove" class="el-month-table">
        <tbody>
            <tr v-for="(row, key) in rows" :key="key">
                <td :class="getCellStyle(cell)" v-for="(cell, key) in row" :key="key">
                    <div>
                        <a class="cell">{{cell.text}}</a>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</template>
<script>
/**
 * @file:  View 组件 季节选择控件
 * @author: 在 element ui月份选择基础上 tao.yang 改了大部分逻辑
 * @date: 2020-04-27
 * @description: UI组件  可选择季节 基础组件
 */
const clearDate = date => {
    return new Date(date.getFullYear(), date.getMonth());
};
const getMonthTimestamp = function(time) {
    if (typeof time === 'number' || typeof time === 'string') {
        return clearDate(new Date(time)).getTime();
    } else if (time instanceof Date) {
        return clearDate(time).getTime();
    } else {
        return NaN;
    }
};
const displayText = {
    0: '1月-3月',
    1: '4月-6月',
    2: '7月-9月',
    3: '10月-12月'
};
export default {
    props: {
        defaultValue: {
            default: '',
            type: String
        },
        minDate: {},
        maxDate: {},
        disabledDate: {},
        date: {},
        value: {},
        rangeState: {
            default() {
                return {
                    endDate: null,
                    selecting: false
                };
            }
        },
        selectionMode: {
            type: String
        }
    },
    data() {
        return {
            tableRows: [[], []],
            lastRow: null,
            lastColumn: null
        };
    },
    watch: {
        'rangeState.endDate'(newVal) {
            this.markRange(this.minDate, newVal);
        },

        minDate(newVal, oldVal) {
            if (newVal !== oldVal) {
                this.markRange(this.minDate, this.maxDate);
            }
        },

        maxDate(newVal, oldVal) {
            if (newVal !== oldVal) {
                this.markRange(this.minDate, this.maxDate);
            }
        }
    },
    computed: {
        rows() {
            const rows = this.tableRows;
            const disabledDate = this.disabledDate;
            const selectedDate = [];
            const now = new Date().getMonth() + 1;
            for (let i = 0; i < 2; i++) {
                const row = rows[i];
                for (let j = 0; j < 2; j++) {
                    let cell = row[j];
                    if (!cell) {
                        cell = {
                            row: i,
                            column: j,
                            type: 'normal',
                            inRange: false,
                            start: false,
                            end: false
                        };
                    }

                    cell.type = 'normal';

                    const index = i * 2 + j;
                    const time = this.date;
                    cell.inRange = time >= this.minDate && time <= this.maxDate;
                    cell.start = this.minDate && time === this.minDate;
                    cell.end = this.maxDate && time === this.maxDate;
                    const isToday = time === now;

                    if (isToday) {
                        cell.type = 'today';
                    }
                    cell.text = displayText[index];
                    let cellDate = time;
                    cell.disabled = typeof disabledDate === 'function' && disabledDate(cellDate);
                    // cell.selected = arrayFind(
                    //     selectedDate,
                    //     date => date.getTime() === cellDate.getTime()
                    // );

                    this.$set(row, j, cell);
                }
            }
            return rows;
        }
    },
    methods: {
        dateInSeason(year, season) {
            return true;
        },
        coerceTruthyValueToArray(val) {
            if (Array.isArray(val)) {
                return val;
            } else if (val) {
                return [val];
            } else {
                return [];
            }
        },
        arrayFindIndex(arr, pred) {
            for (let i = 0; i !== arr.length; ++i) {
                if (pred(arr[i])) {
                    return i;
                }
            }
            return -1;
        },

        arrayFind(arr, pred) {
            const idx = this.arrayFindIndex(arr, pred);
            return idx !== -1 ? arr[idx] : undefined;
        },
        cellMatchesDate(cell, date) {
            cell = cell.text.slice(0, 1);

            const value = new Date(date);
            return (
                this.date.getFullYear() === value.getFullYear() &&
                Number(cell) === this.getQuarter(value)
            );
        },
        getCellStyle(cell) {
            const style = {};
            const year = this.date.getFullYear();
            const today = new Date();
            const season = cell.row * 2 + cell.column;
            const defaultValue = this.defaultValue
                ? Array.isArray(this.defaultValue)
                    ? this.defaultValue
                    : [this.defaultValue]
                : [];
            style.disabled =
                typeof this.disabledDate === 'function'
                    ? this.datesInSeason(year, season).every(this.disabledDate)
                    : false;
            style.current =
                this.arrayFindIndex(
                    this.coerceTruthyValueToArray(this.value),
                    date => date.getFullYear() === year && this.getQuarter(date) === season
                ) >= 0;
            style.today = today.getFullYear() === year && this.getQuarter(today) === season + 1;
            style.default = defaultValue.some(date => this.cellMatchesDate(cell, date));

            if (cell.inRange) {
                style['in-range'] = true;

                if (cell.start) {
                    style['start-date'] = true;
                }

                if (cell.end) {
                    style['end-date'] = true;
                }
            }
            return style;
        },
        getYear(date) {
            const arr = date.split('-');
            return arr[0];
        },
        getSeason(date) {
            const arr = date.split('-');
            return arr[1];
        },
        getQuarter(d) {
            d = d || new Date(); // If no date supplied, use today
            var q = [1, 2, 3, 4];
            return q[Math.floor(d.getMonth() / 3)];
        },
        handleMonthTableClick(i) {
            let target = event.target;
            if (target.tagName === 'A') {
                target = target.parentNode.parentNode;
            }
            if (target.tagName === 'DIV') {
                target = target.parentNode;
            }
            if (target.tagName !== 'TD') return;
            const column = target.cellIndex;
            const row = target.parentNode.rowIndex;
            const month = (row * 2 + column) * 3;
            const newDate = this.getMonthOfCell(month);
            if (this.selectionMode === 'range') {
                if (!this.rangeState.selecting) {
                    this.$emit('pick', {minDate: newDate, maxDate: null});
                    this.rangeState.selecting = true;
                } else {
                    if (newDate >= this.minDate) {
                        this.$emit('pick', {minDate: this.minDate, maxDate: newDate});
                    } else {
                        this.$emit('pick', {minDate: newDate, maxDate: this.minDate});
                    }
                    this.rangeState.selecting = false;
                }
            } else {
                this.$emit('pick', month);
            }
        },
        getSeasonOfCell(month) {
            const year = this.date.getFullYear();
            return new Date(year, month, 1);
        },
        markRange(minDate, maxDate) {
            minDate = getMonthTimestamp(minDate);
            maxDate = getMonthTimestamp(maxDate) || minDate;

            [minDate, maxDate] = [Math.min(minDate, maxDate), Math.max(minDate, maxDate)];
            const rows = this.rows;
            for (let i = 0, k = rows.length; i < k; i++) {
                const row = rows[i];
                for (let j = 0, l = row.length; j < l; j++) {
                    const cell = row[j];
                    const index = (i * 2 + j) * 3;
                    const time = new Date(this.date.getFullYear(), index).getTime();

                    cell.inRange = minDate && time >= minDate && time <= maxDate;
                    cell.start = minDate && time === minDate;
                    cell.end = maxDate && time === maxDate;
                }
            }
        },
        handleMouseMove(event) {
            if (!this.rangeState.selecting) return;

            let target = event.target;
            if (target.tagName === 'A') {
                target = target.parentNode.parentNode;
            }
            if (target.tagName === 'DIV') {
                target = target.parentNode;
            }
            if (target.tagName !== 'TD') return;

            const row = target.parentNode.rowIndex;
            const column = target.cellIndex;
            // can not select disabled date
            if (this.rows[row][column].disabled) return;

            // only update rangeState when mouse moves to a new cell
            // this avoids frequent Date object creation and improves performance
            if (row !== this.lastRow || column !== this.lastColumn) {
                this.lastRow = row;
                this.lastColumn = column;
                this.$emit('changerange', {
                    minDate: this.minDate,
                    maxDate: this.maxDate,
                    rangeState: {
                        selecting: true,
                        endDate: this.getMonthOfCell((row * 2 + column) * 3)
                    }
                });
            }
        },
        getMonthOfCell(month) {
            const year = this.date.getFullYear();
            return new Date(year, month, 1);
        }
    }
};
</script>
