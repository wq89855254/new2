import * as moment from "moment";
import * as axios from "axios";
import { ToolBtn } from "../../base";

export default {
  name: "near",
  components: { ToolBtn },
  props: {
    date: {
      required: true,
      validator(value) {
        return moment.isMoment(value) || value === null;
      }
    },
    hour: {
      required: true,
      validator(value) {
        return /^([01]\d|2[0123])$/.test(value);
      }
    },
    minute: {
      required: true,
      validator(value) {
        return /^[012345]\d$/.test(value);
      }
    },
    hourList: {
      required: true,
      validator(value) {
        if (Array.isArray(value) && value.length > 1) {
          return value.every(val => /^([01]\d|2[0123])$/.test(val));
        }
        return false;
      }
    },
    minuteList: {
      required: true,
      validator(value) {
        if (Array.isArray(value) && value.length > 1) {
          return value.every(val => /^[012345]\d$/.test(val));
        }
        return false;
      }
    }
  },
  data() {
    return {
      currDate: this.date,
      currHour: this.hour,
      currMinute: this.minute
    };
  },
  watch: {
    date(date) {
      this.currDate = date;
    },
    hour(hour) {
      this.currHour = hour;
    },
    minute(minute) {
      this.currMinute = minute;
    },
  },
  computed: {
    minuteInterval() {
      return Math.abs(this.minuteList[0] - this.minuteList[1]);
    }
  },

  mounted() {
  },

  beforeDestroy() {},

  methods: {
    onChange(sign) {
      switch (sign) {
        case "date":
          this.$emit("update:date", this.currDate);
          break;
        case "hour":
          this.$emit("update:hour", this.currHour);
          break;
        case "minute":
          this.$emit("update:minute", this.currMinute);
          break;
      }
      this.$emit("change");
    },
    onTuningTime(sign) {
      const date = this.currDate.clone().startOf('day').add(+this.currHour, 'hours').add(+this.currMinute, 'minutes');
      const isAdd = sign === 1;
      if (isAdd) {
        date.add(this.minuteInterval, 'minutes');
      }else {
        date.subtract(this.minuteInterval, 'minutes');
      }
      let hours = date.format('HH');
      const minutes = date.format('mm');
      const cloneHourList = this.hourList.slice();
      if (isAdd) {
        hours = cloneHourList.sort((a, b) => a - b).find(h => h >= hours);
        if (hours === undefined) {
          hours = this.hourList[0];
          date.add(1, 'days');
        }
      }else {
        hours = cloneHourList.sort((a, b) => b - a).find(h => h <= hours);
        if (hours === undefined) {
          hours = this.hourList.slice(-1)[0];
          date.subtract(1, 'days');
        }
      }
      this.currDate = date.clone().startOf('day').add(+hours, 'hours').add(+minutes, 'minutes');
      this.currHour = hours;
      this.currMinute = minutes;
      this.$emit("update:date", this.currDate);
      this.$emit("update:hour", this.currHour);
      this.$emit("update:minute", this.currMinute);
      this.$emit('change');

    }
  }
};
