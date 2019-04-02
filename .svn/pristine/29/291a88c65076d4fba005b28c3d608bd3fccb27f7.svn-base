import "../../../assets/js/iscroll.js";
import { ConditionLayout } from '../../base';

export default {
  name: "aging-select",
  components: { ConditionLayout },
  props: {
    aging: {
      type: String,
      required: true
    },
    agingList: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      myScroll: null,
      currAging: this.aging,
      length: this.agingList.length,
      index: 0
    };
  },
  watch: {
    aging(val) {
      // console.log(val);
      this.currAging = val;
      this.$emit("update:aging", val);
    }
  },
  mounted() {
    const index = this.agingList.findIndex(el => el === this.aging);
    if (index === -1) {
      this.index = 0;
      this.currAging = this.agingList[0];
      this.$emit("update:aging", this.currAging);
      this.$emit('aging-change');
    }

    this.myScroll = new IScroll("#box", {
      scrollX: true,
      scrollY: false,
      mouseWheel: true
    });
  },
  methods: {
    onTuningTime(sign) {
      if (sign === 1) {
        this.index++;
      } else {
        this.index--;
      }
      if (this.index >= this.length) {
        this.index = this.length - 1;
      } else if (this.index < 0) {
        this.index = 0;
      }
      this.currAging = this.agingList[this.index];
      this.$emit("update:aging", this.currAging);
      this.$emit('aging-change');

      //这里的逻辑还不完善，有时间改
      const pl = 24 + 45 * (this.index + 1) + this.myScroll.x;
      if (sign === 1) {
        if (pl >= this.myScroll.wrapperWidth) {
          this.myScroll.scrollTo(
            this.myScroll.x + (this.myScroll.wrapperWidth - pl),
            0,
            1000,
            IScroll.utils.ease.back
          );
        }
      } else {
        if (pl % this.myScroll.wrapperWidth <= 45) {
          this.myScroll.scrollTo(
            this.myScroll.x + 57,
            0,
            1000,
            IScroll.utils.ease.back
          );
        }
      }
    },
    onClick(aging) {
      this.currAging = aging;
      this.index = this.agingList.findIndex(el => el === aging);
      this.$emit("update:aging", this.currAging);
      this.$emit('aging-change');
    }
  }
};
