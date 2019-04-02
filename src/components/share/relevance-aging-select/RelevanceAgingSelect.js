import { ConditionLayout, ToolBtn } from "../../base";
import TimeSelect from "../time-select/TimeSelect.vue";
import _ from "lodash";
import moment from "moment";
export default {
  name: "relevance-aging-select",
  components: { ConditionLayout, ToolBtn, TimeSelect },
  props: {
    // 实况时间
    actTime: {
      required: true,
      validator: function(value) {
        return moment.isMoment(value);
      }
    },

    // 预报相关配置
    fcst: {
      type: Object,
      required: true
    },

    isDisabled: {
      type: Boolean,
      default: false
    },
    // concatList: {
    //   type: Array,
    //   required: true
    // },
    // noConcatList: {
    //   type: Array,
    //   required: true
    // }
  },
  data() {
    return {
      momeryitem: null,
      pageSize: 26,
      pageIndex: 0,
      // 实况时间
      actDate: this.actTime.clone().startOf("day"),
      actHour: this.actTime.format("HH"),
      actHourList: [
        "00",
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20",
        "21",
        "22",
        "23"
      ],

      // 起报时间
      fcstDate: "",
      fcstHour: "",
      concatList: [],
      noConcatList: [],
      isConcat: true
    };
  },
  computed: {
    currConcatList() {
      return this.concatList.slice(
        this.pageSize * this.pageIndex,
        this.pageSize * this.pageIndex + this.pageSize
      );
    },
    currNoConcatList() {
      return this.noConcatList.slice(
        this.pageSize * this.pageIndex,
        this.pageSize * this.pageIndex + this.pageSize
      );
    },

    currList() {
      return this.isConcat ? this.concatList : this.noConcatList;
    },

    // 当前选中的时间下标
    currIndex() {
      return this.currList.findIndex(el => el.active);
    },
    lastIndex() {
      return this.currList.length - 1;
    },
    isFirstIndex() {
      return this.currIndex === 0;
    },
    isLastIndex() {
      return this.currIndex === this.lastIndex;
    },

    lastPageIndex() {
      return Math.ceil(this.concatList.length / this.pageSize) - 1;
    },
    isFirstPageIndex() {
      return this.pageIndex === 0;
    },
    isLastPageIndex() {
      return this.pageIndex === this.lastPageIndex;
    }
  },
  watch: {
    currIndex(currIndex) {
      this.pageIndex = Math.floor(currIndex / this.pageSize);
    },
    currList() {
      this.pageIndex = 0;
    },
    fcst() {
      if (this.fcst.fcstTime.isValid()) {
        this.fcstDate = this.fcst.fcstTime.clone().startOf("day");
        this.fcstHour = this.fcst.fcstTime.format("HH");
      } else {
        this.fcstDate = "";
        this.fcstHour = this.fcst.startHourList[0];
      }
      this.updateTimeList();
    }
  },
  created() {
    this.debouncedSetPageSize = _.debounce(this.setPageSize, 300);
  },
  mounted() {
    this.setPageSize();
    if (this.fcst.fcstTime.isValid()) {
      this.fcstDate = this.fcst.fcstTime.clone().startOf("day");
      this.fcstHour = this.fcst.fcstTime.format("HH");
    } else {
      this.fcstDate = "";
      this.fcstHour = this.fcst.startHourList[0];
    }
    this.updateTimeList();
    window.addEventListener('resize', this.resizeHandler)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resizeHandler)
  },
  methods: {
    resizeHandler(e) {
      // console.log(e);
      // this.debouncedSetPageSize();
    },
    onClickSwitch(item) {
      if (this.momeryitem === item) return;
      this.momeryitem = item;
      this.currList.forEach(el => {
        el.active = el === item;
      });
      this.$emit("change", {
        isConcat: this.isConcat,
        ...item
      });
    },
    onConcat(isConcat) {
      this.isConcat = isConcat;
      const activedItem = this.currList.find(el => el.active);
      this.$emit("change", {
        isConcat: this.isConcat,
        ...activedItem
      });
    },
    tuningTime(num) {
      const index = this.currList.findIndex(el => el.active);
      const nextIndex = index + num;
      if (nextIndex < 0 || nextIndex > this.lastIndex) return;
      let activeItem;
      this.currList.forEach((el, i) => {
        if (i === nextIndex) {
          el.active = true;
          activeItem = el;
        } else {
          el.active = false;
        }
      });
      this.$emit("change", {
        isConcat: this.isConcat,
        ...activeItem
      });
    },
    onSwitchPage(num) {
      const pageIndex = this.pageIndex + num;
      if (pageIndex < 0 || pageIndex > this.lastPageIndex) return;
      this.pageIndex = pageIndex;
    },

    onChange(type) {
      this.updateTimeList();
      if (type === "act") {
        this.$emit(
          "update:actTime",
          this.actDate === ""
            ? moment(null)
            : this.actDate.clone().startOf('day').add(+this.actHour, "hours")
        );
      } else if (type === "fcst") {
        const newFcstTime =
          this.fcstDate === ""
            ? moment(null)
            : this.fcstDate.clone().startOf('day').add(+this.fcstHour, "hours");
        console.log(newFcstTime.format('YYYY-MM-DD HH:mm:ss'));
        this.$emit(
          "update:fcst",
          Object.assign({}, this.fcst, { fcstTime: newFcstTime })
        );
      }
      // console.log(type);
      const activedItem = this.currList.find(el => el.active);
      this.$emit("time-select", activedItem);
    },

    // 更新时间列表
    updateTimeList() {

      const isHasActTime = this.actDate && this.actDate.isValid();
      const isHasFcstTime = this.fcstDate && this.fcstDate.isValid();
      let actTime = null, fcstTime = null;
      
      if (isHasActTime) {
        actTime = this.actDate.clone().startOf('day').add(+this.actHour, "hours");
      }
      if (isHasFcstTime) {
        fcstTime = this.fcstDate.clone().startOf('day').add(+this.fcstHour, "hours");
      }

      // console.log(actTime.format('YYYY-MM-DD HH:mm:ss'));

      const fcstConcatList = new Array(this.fcst.agingLength)
        .fill(0)
        .map((el, i) => {
          if (isHasActTime) {
            const currTime = actTime.clone().add(i + 1, "hours");
            return {
              name: currTime.format("HH"),
              time: currTime.format("YYYY-MM-DD HH:00:00"),
              isFcst: true,
              active: false
            };
          }
          return {
            name: "",
            time: "",
            isFcst: true,
            active: false
          };
        });

      const fcstNoConcatList = new Array(this.fcst.agingLength)
        .fill(0)
        .map((el, i) => {
          if (isHasFcstTime) {
            const currTime = fcstTime.clone().add(i + 1, "hours");
            return {
              name: "+" + (i + 1),
              time: currTime.format("YYYY-MM-DD HH:00:00"),
              isFcst: true,
              active: false
            };
          }
          return {
            name: "+" + (i + 1),
            time: "",
            isFcst: true,
            active: false
          };
        });
      const concatList = [...this.getActTimeList(actTime), ...fcstConcatList];
      const noConcatList = [
        ...this.getActTimeList(actTime),
        ...fcstNoConcatList
      ];
      this.concatList = concatList;
      this.noConcatList = noConcatList;
      // console.log(concatList);
      // console.log(noConcatList);
    },

    // 得到实况时间列表
    getActTimeList(date) {
      return new Array(3)
        .fill(0)
        .map((el, i) => {
          if (date) {
            const currTime = date.clone().subtract(i, "hours");
            return {
              name: currTime.format("HH"),
              time: currTime.format("YYYY-MM-DD HH:00:00"),
              isFcst: false,
              active: i === 0
            };
          }
          return {
            name: '',
            time: '',
            isFcst: false,
            active: i === 0
          };
        })
        .reverse();
    },

    // 设置pageSize
    setPageSize() {
      const listBox = this.$refs.listBox;
      const rightBtn = this.$refs.rightBtn;
      const pageSize = Math.floor(listBox.clientWidth / 33);
      this.pageSize = pageSize;
      rightBtn.style.marginRight = listBox.clientWidth % 33 + 'px';  //将余数添加到右侧按钮的右侧margin
    }
  }
};
