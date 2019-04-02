import { ConditionLayout, ToolBtn } from '../../base';
import moment from 'moment';
export default {
  name: "whole-aging-select",
  components: { ConditionLayout, ToolBtn },
  props: {
    startTime: {
      type: String,
      required: true
    },
    aging1: {
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
      currAging: this.aging1,
      currAgingList: this.agingList.slice(),
      pageNum: 16,
      pageIndex: 0,
      agingIndex: 0,
      currFilterVal: 3
    };
  },
  computed: {
    currStartTime() {
      return moment(this.startTime, 'YYYY-MM-DD HH');
    },
    length() {
      return this.currAgingList.length;
    },
    pageSize() {
      return Math.ceil(this.length / this.pageNum);
    },
    isPageStart() {
      return this.pageIndex === 0;
    },
    isPageEnd() {
      return this.pageIndex === (this.pageSize - 1);
    },
    isAgingStart() {
      return this.agingIndex === 0;
    },
    isAgingEnd() {
      return this.agingIndex === (this.length - 1);
    },
    currPageList() {
      let currDay;
      return this.currAgingList.slice(this.pageIndex * this.pageNum, this.pageIndex * this.pageNum + this.pageNum).map(aging => {
        if (this.currStartTime.isValid()) {
          const fcstTime = this.currStartTime.clone().add(+aging, 'hours');
          // const isDayStart = fcstTime.hours() === 0;
          const day = fcstTime.date();
          const isDifferent = day !== currDay;
          if (isDifferent) {
            currDay = day;
          }
          return {
            aging,
            isDifferent,
            time: isDifferent ? fcstTime.format('DD日HH时') : fcstTime.format('HH')
          }
        }
        return {
          aging,
          isDifferent: false,
          time: ''
        }

      });
    }
  },
  watch: {
    agingIndex() {
      this.resetPageIndex();
    },
    aging1(aging) {
      this.currAging = aging;
      
      // this.resetAgingIndex();
      
    },
    agingList(agingList) {
      this.currAgingList = agingList.slice();
      // this.resetAgingIndex();
    }
  },
  updated() {
    this.resetAgingIndex();
  },
  mounted() {
    this.resetPageIndex();
    this.resetAgingIndex();
  },
  methods: {

    // 过滤
    onFilterChange() {
      this.currAgingList = this.agingList.filter(el => +el % this.currFilterVal === 0);
      let agingIndex = this.currAgingList.findIndex(el => el === this.currAging);
      if (agingIndex === -1) {
        agingIndex = 0;
        this.$emit('update:aging1', this.currAgingList[0]);
        this.$emit('aging-change');
      }
      this.agingIndex = agingIndex;
      this.currAging = this.currAgingList[agingIndex];
      this.resetPageIndex();
    },


    // 点击选中时效
    onClick(item) {
      if (this.currAging === item.aging) return;
      this.currAging = item.aging;
      this.$emit('update:aging1', this.currAging);
      this.$emit('aging-change');
    },

    // 翻页
    onSwitchPage(dir) {
      // debugger
      if (dir === 'left') {
        this.pageIndex--;
      }else {
        this.pageIndex++;
      }
      if (this.pageIndex < 0) {
        this.pageIndex = 0;
      }else if (this.pageIndex >= this.pageSize) {
        this.pageIndex = this.pageSize - 1;
      }
    },

    // 微调时效
    onTuningAging(sign) {
      if (sign === 1) {
        this.agingIndex++;
      }else {
        this.agingIndex--;
      }
      if (this.agingIndex < 0) {
        this.agingIndex = 0;
      }else if (this.agingIndex >= this.length) {
        this.agingIndex = this.length - 1;
      }
      this.currAging = this.currAgingList[this.agingIndex];
      this.$emit('update:aging1', this.currAging);
      this.$emit('aging-change');
    },

    // 重置当前页码
    resetPageIndex() {
      this.pageIndex = Math.floor(this.agingIndex / this.pageNum);
    },

    // 重置当前时效下标
    resetAgingIndex() {
      this.agingIndex = this.currAgingList.findIndex(aging => aging === this.currAging);
    },
    
    // 重置
    onClickReset() {
      this.currAgingList = this.agingList.slice();
      this.agingIndex = this.currAgingList.findIndex(el => el === this.currAging);
      this.resetPageIndex();
    }
  }
};
