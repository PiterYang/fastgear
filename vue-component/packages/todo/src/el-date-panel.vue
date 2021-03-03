<template>
    <transition name="el-zoom-in-top" @after-enter="handleEnter" @after-leave="handleLeave">
        <div
            v-show="visible"
            class="el-picker-panel el-date-picker el-popper fg-todo-date-picker"
            :class="[{
        'has-sidebar': $slots.sidebar || shortcuts,
        'has-time': showTime
      }, popperClass]"
        >
            <div class="el-picker-panel__body-wrapper">
                <slot name="sidebar" class="el-picker-panel__sidebar"></slot>
                <div class="el-picker-panel__sidebar" v-if="shortcuts">
                    <button
                        type="button"
                        class="el-picker-panel__shortcut"
                        v-for="(shortcut, key) in shortcuts"
                        :key="key"
                        @click="handleShortcutClick(shortcut)"
                    >{{ shortcut.text }}</button>
                </div>
                <div class="el-picker-panel__body">
                    <div class="el-date-picker__time-header" v-if="showTime">
                        <span class="el-date-picker__editor-wrap">
                            <el-input
                                :placeholder="t('el.datepicker.selectDate')"
                                :value="visibleDate"
                                size="small"
                                @input="val => userInputDate = val"
                                @change="handleVisibleDateChange"
                            />
                        </span>
                        <span
                            class="el-date-picker__editor-wrap"
                            v-clickoutside="handleTimePickClose"
                        >
                            <el-input
                                ref="input"
                                @focus="timePickerVisible = true"
                                :placeholder="t('el.datepicker.selectTime')"
                                :value="visibleTime"
                                size="small"
                                @input="val => userInputTime = val"
                                @change="handleVisibleTimeChange"
                            />
                            <time-picker
                                ref="timepicker"
                                :time-arrow-control="arrowControl"
                                @pick="handleTimePick"
                                :visible="timePickerVisible"
                                @mounted="proxyTimePickerDataProperties"
                            ></time-picker>
                        </span>
                    </div>
                    <div
                        class="el-date-picker__header"
                        :class="{ 'el-date-picker__header--bordered': currentView === 'year' || currentView === 'month' }"
                        v-show="currentView !== 'time'"
                    >
                        <button
                            type="button"
                            @click="prevYear"
                            :aria-label="t(`el.datepicker.prevYear`)"
                            class="el-picker-panel__icon-btn el-date-picker__prev-btn el-icon-d-arrow-left"
                        ></button>
                        <button
                            type="button"
                            @click="prevMonth"
                            v-show="currentView === 'date'"
                            :aria-label="t(`el.datepicker.prevMonth`)"
                            class="el-picker-panel__icon-btn el-date-picker__prev-btn el-icon-arrow-left"
                        ></button>
                        <span
                            @click="showYearPicker"
                            role="button"
                            class="el-date-picker__header-label"
                        >{{ yearLabel }}</span>
                        <span
                            @click="showMonthPicker"
                            v-show="currentView === 'date'"
                            role="button"
                            class="el-date-picker__header-label"
                            :class="{ active: currentView === 'month' }"
                        >{{t(`el.datepicker.month${ month + 1 }`)}}</span>
                        <button
                            type="button"
                            @click="nextYear"
                            :aria-label="t(`el.datepicker.nextYear`)"
                            class="el-picker-panel__icon-btn el-date-picker__next-btn el-icon-d-arrow-right"
                        ></button>
                        <button
                            type="button"
                            @click="nextMonth"
                            v-show="currentView === 'date'"
                            :aria-label="t(`el.datepicker.nextMonth`)"
                            class="el-picker-panel__icon-btn el-date-picker__next-btn el-icon-arrow-right"
                        ></button>
                    </div>

                    <div class="el-picker-panel__content">
                        <date-table
                            v-show="currentView === 'date'"
                            @pick="handleDatePick"
                            :selection-mode="selectionMode"
                            :first-day-of-week="firstDayOfWeek"
                            :value="value"
                            :default-value="defaultValue ? new Date(defaultValue) : null"
                            :date="date"
                            :cell-class-name="cellClassName"
                            :disabled-date="disabledDate"
                        ></date-table>
                        <year-table
                            v-show="currentView === 'year'"
                            @pick="handleYearPick"
                            :value="value"
                            :default-value="defaultValue ? new Date(defaultValue) : null"
                            :date="date"
                            :disabled-date="disabledDate"
                        ></year-table>
                        <month-table
                            v-show="currentView === 'month'"
                            @pick="handleMonthPick"
                            :value="value"
                            :default-value="defaultValue ? new Date(defaultValue) : null"
                            :date="date"
                            :disabled-date="disabledDate"
                        ></month-table>
                    </div>
                </div>
            </div>

            <div class="el-picker-panel__footer" v-show="footerVisible && currentView === 'date'">
                <el-button
                    size="mini"
                    type="text"
                    class="el-picker-panel__link-btn"
                    @click="changeToNow"
                    v-show="selectionMode !== 'dates'"
                >{{ t('el.datepicker.now') }}</el-button>
                <el-button
                    plain
                    size="mini"
                    class="el-picker-panel__link-btn"
                    @click="confirm"
                >{{ t('el.datepicker.confirm') }}</el-button>
            </div>
        </div>
    </transition>
</template>
<script type="text/babel">
import DatePanel from 'element-ui/packages/date-picker/src/panel/date.vue';
import {modifyWithTimeString} from 'element-ui/src/utils/date-util';
export default {
    extends: DatePanel,

    methods: {
        changeToNow() {
            // NOTE: not a permanent solution
            //       consider disable "now" button in the future
            if (
                (!this.disabledDate || !this.disabledDate(new Date())) &&
                this.checkDateWithinRange(new Date())
            ) {
                this.date = new Date();
                this.emit(this.date);
                this.$emit('comfirm', this.date);
            }
        },

        confirm() {
            if (this.selectionMode === 'dates') {
                this.emit(this.value);
                this.$emit('comfirm', this.value);
            } else {
                // value were emitted in handle{Date,Time}Pick, nothing to update here
                // deal with the scenario where: user opens the picker, then confirm without doing anything
                const value = this.value
                    ? this.value
                    : modifyWithTimeString(this.getDefaultValue(), this.defaultTime);
                this.date = new Date(value); // refresh date
                this.emit(value);
                this.$emit('comfirm', value);
            }
        },
        handleEnter() {
            document
                .querySelector('.fg-todo-date-picker')
                .addEventListener('keydown', this.handleKeydown);
        },

        handleLeave() {
            this.$emit('dodestroy');
            document
                .querySelector('.fg-todo-date-picker')
                .removeEventListener('keydown', this.handleKeydown);
        }
    }
};
</script>
