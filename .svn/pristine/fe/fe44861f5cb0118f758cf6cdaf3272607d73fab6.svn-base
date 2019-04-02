import * as moment from "moment";
import { ToolBtn } from '../../base';
export default {
  name: "time-select",
  components: { ToolBtn },
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    isBtnBoth: {
      type: Boolean,
      default: false
    },
    isShowMinute: {
      type: Boolean,
      default: false
    },
    dateTitle: {
      type: String,
      default: '日期'
    },
    hourTitle: {
      type: String,
      default: '初始时间'
    },
    date: {
      required: true,
      validator(value) {
        return moment.isMoment(value) || value === '';
      }
    },
    hour: {
      required: true,
      validator(value) {
        // debugger;
        return /^([01]\d|2[0123])$/.test(value) || value === '';
      }
    },
    minute: {
      validator(value) {
        return /^[012345]\d$/.test(value) || value === '';
      }
    },
    hourList: {
      required: true,
      validator(value) {
        if (Array.isArray(value)) {
          if (value.length === 0) return true; 
          return value.every(val => /^([01]\d|2[0123])$/.test(val));
        }
        return false;
      }
    },
    minuteList: {
      validator(value) {
        if (Array.isArray(value) && value.length > 1) {
          return value.every(val => /^[012345]\d$/.test(val));
        }
        return false;
      }
    }
  },
  watch: {
    date(val) {
      this.currDate = val ? val : null;
      this.$emit('update:date', val);
    },
    hour(val) {
      this.currHour = val;
      this.$emit('update:hour', val);
    },
    minute(val) {
      this.currMinute = val;
      this.$emit('update:minute', val);
    }
  },
  data() {
    return {
      currDate: null,
      currHour: this.hour,
      currMinute: this.minute,
    };
  },
  computed: {
    interval() {
      return Math.abs(this.hourList[0] - this.hourList[1]);
    },
    isVaild() {
      return this.currDate && this.currHour && this.hourList.length;
    }
  },
  mounted() {
    this.currDate = this.date ? this.date.clone() : null;
  },
  methods: {
    onChange(syncPropName) {
      if (!this.isVaild) return;

      if (syncPropName === 'date') {
        this.$emit('update:date', this.currDate);
      }else if (syncPropName === 'hour') {
        this.$emit('update:hour', this.currHour);
      }else if (syncPropName === 'minute') {
        this.$emit('update:minute', this.currMinute);
      }
      this.$emit('change');
    },

    onTuningTime(sign) {
      if (!this.isVaild) return;

      const time = moment(this.currDate.format('YYYYMMDD'), 'YYYYMMDD').add(+this.currHour, 'hours');
      if (sign === 1) {
        time.add(this.interval, 'hours');
      }else {
        time.subtract(this.interval, 'hours');
      }
      this.currDate = time;
      this.currHour = time.format('HH');
      this.$emit('update:date', this.currDate);
      this.$emit('update:hour', this.currHour);
      this.$emit('change');
    }
  }
};
