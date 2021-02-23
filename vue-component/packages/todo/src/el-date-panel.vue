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
        }
    }
};
</script>
