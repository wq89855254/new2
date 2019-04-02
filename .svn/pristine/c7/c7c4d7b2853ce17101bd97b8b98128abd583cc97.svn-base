import { ConditionLayout } from '../../base';
import moment from "moment";

// 小时与分钟列表验证器
const hmListValidator = value => {
  if (Array.isArray(value)) {
    return value.every(el => {
      if (typeof el === "string") {
        return /^\d{2}$/.test(el);
      }
      return false;
    });
  }
  return false;
};

export default {
  name: "date-select",
  components: { ConditionLayout },
  props: {
    date: {
      type: Object,
      default() {
        return moment();
      }
    },
    hour: {
      validator(value) {
        return /^\d{2}$/.test(value);
      }
    },
    minute: {
      validator(value) {
        return /^\d{2}$/.test(value);
      }
    },
    hourList: {
      validator: hmListValidator
    },
    minuteList: {
      validator: hmListValidator
    }
  },
  data() {
    return {
      currDate: this.date.clone(),
      currHour: this.hour,
      currMinute: this.minute,
      isShowHour: !!this.hourList && !!this.hour, // this.hour值为undefined时表明没有传值，有值就表明值的验证通过了
      isShowMinute: !!this.minuteList && !!this.minute
    };
  },
  computed: {
    currFullDate() {
      return (
        this.currDate.format("YYYY-MM-DD") +
        " " +
        this.currHour +
        ":" +
        this.currMinute
      );
    }
  },
  mounted() {
    // console.log(this.isShowHour);
    // console.log(this.isShowMinute);
    // console.log(this.minuteList)

    if (this.isShowHour) {
      this._hourIndex = 0;
      this._hourLength = this.hourList.length;
    }
    if (this.isShowMinute) {
      this._minuteIndex = 0;
      this._minuteLength = this.minuteList.length;
    }
  },
  methods: {
    moment,
    // 时间改变时触发
    onChange(propName) {
      let updateVal;
      if (propName === "date") {
        updateVal = this.currDate;
      } else if (propName === "hour") {
        updateVal = this.currHour;
      } else if (propName === "minute") {
        updateVal = this.currMinute;
      }
      this.$emit("update:" + propName, updateVal); //同步父组件传递进来的属性
      this.$emit("date-change");
    },

    // 时间微调
    onTuningTime(sign) {
      if (sign === 1) {
        if (this.isShowMinute) {
          this._minuteIndex++;
          this._minuteIndex = this._minuteIndex % this._minuteLength;
          this.currMinute = this.minuteList[this._minuteIndex];
          this.$emit("update:minute", this.currMinute);
          if (this._minuteIndex === 0) {
            this._hourIndex++;
            this._hourIndex = this._hourIndex % this._hourLength;
            this.currHour = this.hourList[this._hourIndex];
            this.$emit("update:hour", this.currHour);
            if (this._hourIndex === 0) {
              this.currDate = this.currDate.add(1, "days").clone();
              this.$emit("update:date", this.currDate);
            }
          }
        } else if (this.isShowHour) {
          this._hourIndex++;
          this._hourIndex = this._hourIndex % this._hourLength;
          this.currHour = this.hourList[this._hourIndex];
          this.$emit("update:hour", this.currHour);
          if (this._hourIndex === 0) {
            this.currDate = this.currDate.add(1, "days").clone();
            this.$emit("update:date", this.currDate);
          }
        } else {
          this.currDate = this.currDate.add(1, "days").clone();
          this.$emit("update:date", this.currDate);
        }
      } else {
        if (this.isShowMinute) {
          this._minuteIndex--;
          if (this._minuteIndex < 0) {
            this._minuteIndex = this._minuteLength - 1;
          }
          this.currMinute = this.minuteList[this._minuteIndex];
          this.$emit("update:minute", this.currMinute);
          if (this._minuteIndex === this._minuteLength - 1) {
            this._hourIndex--;
            if (this._hourIndex < 0) {
              this._hourIndex = this._hourLength - 1;
            }
            this.currHour = this.hourList[this._hourIndex];
            this.$emit("update:hour", this.currHour);
            if (this._hourIndex === this._hourLength - 1) {
              this.currDate = this.currDate.subtract(1, "days").clone();
              this.$emit("update:date", this.currDate);
            }
          }
        } else if (this.isShowHour) {
          this._hourIndex--;
          if (this._hourIndex < 0) {
            this._hourIndex = this._hourLength - 1;
          }
          this.currHour = this.hourList[this._hourIndex];
          this.$emit("update:hour", this.currHour);
          if (this._hourIndex === this._hourLength - 1) {
            this.currDate = this.currDate.subtract(1, "days").clone();
            this.$emit("update:date", this.currDate);
          }
        } else {
          this.currDate = this.currDate.subtract(1, "days").clone();
          this.$emit("update:date", this.currDate);
        }
      }
      this.$emit('date-change');
    }
  }
};
