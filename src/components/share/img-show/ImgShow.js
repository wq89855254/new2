import { createNamespacedHelpers } from "vuex";
const { mapState, mapGetters, mapMutations } = createNamespacedHelpers(
  "synthesis"
);
export default {
  name: "img-show",
  components: {},
  props: {
    srcs: {
      type: Array,
      required: true
    },
    coverSrcs: {
      type: Array
    },
    columnNumber: {
      type: Number,
      default: 2
    },
    aging: {
      type: String,
      required: true
    },
    agingList: {
      type: Array,
      required: true
    },
    level: {
      type: String
    },
    levelList: {
      type: Array
    },
    control: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {};
  },
  computed: {
    currSrcs() {
      return this.srcs;
    },
    currCoverSrcs() {
      return this.coverSrcs;
    },
    //是否有层次
    isHasLevel() {
      return this.level && this.levelList.length;
    },
    //是否是多张图片同时显示
    isManyPath() {
      return this.srcs.length > 1;
    },
    // 获取当前层次的index
    currLevelIndex() {
      return this.levelList.findIndex(el => el === this.level);
    },
    // 获取当前时效的index
    currAgingIndex() {
      return this.agingList.findIndex(el => el === this.aging);
    },
    isTopEnd() {
      return this.currLevelIndex === 0;
    },
    isBottomEnd() {
      return this.currLevelIndex === this.levelList.length - 1;
    },
    isLeftEnd() {
      return this.currAgingIndex === 0;
    },
    isRightEnd() {
      return this.currAgingIndex === this.agingList.length - 1;
    },
    imgWh() {
      if (this.isManyPath) {
        const len = 100 / this.columnNumber + "%";
        return {
          width: len,
          height: len
        };
      }
      return {
        width: "100%",
        height: "100%"
      };
    }
  },
  watch: {},
  mounted() {},
  methods: {
    ...mapMutations(["updata_zoomSwitch", "updata_zoomUrl"]),
    zoom(src) {
      this.updata_zoomSwitch(true);
      // console.log(this.srcs[0])
      this.updata_zoomUrl(this.srcs[0]);
    },
    // 图片加载失败时
    onImgError(index) {
      this.currSrcs.splice(index, 1, require("../../../assets/images/404.png"));
    },
    // 覆盖的图片加载失败时
    onCoverImgError(index) {
      this.currCoverSrcs.splice(index, 1);
    },
    // 点击切换图片时
    onClickSwitch(sign) {
      this.$emit("switch", sign);
    }
  }
};
