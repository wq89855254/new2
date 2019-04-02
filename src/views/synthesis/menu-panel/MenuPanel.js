import _ from "lodash";
import * as axios from "axios";
import { createNamespacedHelpers } from "vuex";
import { MapNav } from "../../../components/share";
const { mapGetters, mapMutations, mapActions } = createNamespacedHelpers(
  "synthesis"
);
import {
  PanelLayout,
  TimeSelect,
  HourBtn,
  ElementBtn,
  IconElementBtn,
  SmallTitle
} from "../common";
export default {
  name: "menu-panel",
  components: {
    PanelLayout,
    TimeSelect,
    HourBtn,
    ElementBtn,
    IconElementBtn,
    SmallTitle,
    MapNav
  },
  data() {
    return {
      // 总控小时列表和分钟列表
      zkHourList: [
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
      zkMinuteList: [
        "00",
        "06",
        "12",
        "18",
        "24",
        "30",
        "36",
        "42",
        "48",
        "54"
      ],

      // 存储单站pup地图中的点数据
      stationPupMapData: [],

      // 菜单相关
      currMenuId: "severeWeather",
      prevMenuId: 'severeWeather',  //用于存储上一个选中菜单的id
      isShowPanel: true,
      menus: [
        {
          id: "shortPeriodFcst",
          name: "预报预警",
          imgSrc: require("../../../assets/images/synthesis/menu-shortPeriodFcst.png")
        },
        {
          id: "numberFcst",
          name: "数值预报",
          imgSrc: require("../../../assets/images/synthesis/menu-numberFcst.png")
        },
        {
          id: "severeWeather",
          name: "强天气",
          imgSrc: require("../../../assets/images/synthesis/menu-severeWeather.png")
        },
        {
          id: "cloudPicture",
          name: "云图",
          imgSrc: require("../../../assets/images/synthesis/menu-cloudPicture.png")
        },
        {
          id: "station",
          name: "自动站",
          imgSrc: require("../../../assets/images/synthesis/menu-station.png")
        },
        {
          id: "swan",
          name: "雷达拼图",
          imgSrc: require("../../../assets/images/synthesis/menu-swan.png")
        },
        {
          id: "statonPup",
          name: "单站pup",
          imgSrc: require("../../../assets/images/synthesis/menu-statonPup.png")
        },
        {
          id: "make",
          name: "产品制作",
          imgSrc: require("../../../assets/images/synthesis/menu-make.png")
        }
      ]
    };
  },
  computed: {
    ...mapGetters([
      "currSplitScreen", //当前分屏中的所有配置
      "severeWeather", //强天气
      "cloudPicture", //云图
      "pup", //pup拼图
      "station", //自动站
      "swan", //SWAN拼图
      "stationPup", //单站pup
      "fcstWarning", //预报预警
      "valueFcst", //数值预报
      "radarFeature"  //雷达特征量
    ]),
    currMenuName() {
      return this.menus.find(el => el.id === this.currMenuId).name;
    },
    stationPupStationId: {
      get() {
        return this.stationPup.currStationId;
      },
      set(value) {
        this.stp_update_station_id(value);
      }
    }
  },
  watch: {},
  created() {
    this.debouncedCpAdjustAging = _.debounce(this.onCpAdjustAging, 300);
    this.debouncedStAdjustThreshold = _.debounce(this.onStAdjustThreshold, 300);
    this.debouncedSnAdjustLvel = _.debounce(this.onSnAdjustLvel, 300);
    this.debouncedSnAdjustAging = _.debounce(this.onSnAdjustAging, 300);
    this.debouncedAutoRefresh = _.debounce(this.onClickAutoRefresh, 300);
    this.debouncedReturnLatest = _.debounce(this.onClickReturnLatest, 300);
  },
  mounted() {
    // 定时刷新关闭时才调用
    // // 得到最新的预报预警并提交请求数据的突变
    // this.get_latest_fcst_warning_time();
    // // 得到最新的数值预报时间
    // this.get_latest_value_fcst_time();

    // 初始化定时刷新
    this.is_time_to_refresh();
    // 单站pup_小地图数据
    this.getStationPupMapData();
  },
  methods: {
    ...mapMutations([
      "select_element",
      "sw_update_hour",
      "sw_update_element_condition",
      "cp_cut_tabs",
      "cp_aging_change",
      "st_threshold_change",
      "st_update_hour",
      "sn_level_change",
      "sn_aging_change",
      "stp_update_station_id",
      "stp_radio_element",
      "update_zk_date",
      "update_zk_hour",
      "update_zk_minute",
      "update_refresh_status",
      //预报预警
      "fw_update_short_term",
      "fw_update_short_time",
      "fw_switch_warn_type",
      "fw_update_warn_state",
      "fw_update_warn_province",
      // 数值预报
      "vf_switch_tabs",
      "vf_switch_element_tabs",
      "vf_update"
    ]),
    ...mapActions([
      "get_latest_element_time",
      "get_station_pup_latest_element_time",
      "get_latest_zk_time",
      "update_all_checked_element_time",
      "is_time_to_refresh",
      // 预报预警
      "get_latest_fcst_warning_time",
      // 数值预报
      "get_latest_value_fcst_time"
    ]),

    //强天气_更新小时
    onSwUpdateHour(hour) {
      if (this.severeWeather.currHour === hour) return;
      this.sw_update_hour(hour);
    },
    //强天气_更新要素条件
    onSwUpdateElementCondition(ele, conditionKey, conditionValue) {
      const eleOption = {
        ...ele,
        conditionKey,
        conditionValue
      };
      this.sw_update_element_condition(eleOption);
      if (conditionKey === "currAcc") {
        this.get_latest_element_time(eleOption);
      }
    },
    // 云图_tab切换
    onCpTabsChange(e) {
      this.cp_cut_tabs(e.target.value);
    },
    // 云图_时效改变时
    onCpAgingChange(eleOption, aging) {
      this.cp_aging_change({ ...eleOption, latestAging: aging });
    },

    //云图_左右调整时效,sign值为-1 or 1
    onCpAdjustAging(eleOption, sign) {
      const currIndex = eleOption.agingList.findIndex(
        aging => aging === eleOption.currAging
      );
      const lastIndex = eleOption.agingList.length - 1;
      let nextIndex = currIndex + sign;
      if (nextIndex < 0) {
        nextIndex = lastIndex;
      } else if (nextIndex > lastIndex) {
        nextIndex = 0;
      }
      this.cp_aging_change({
        ...eleOption,
        latestAging: eleOption.agingList[nextIndex]
      });
    },

    // 自动站_更新小时
    onStUpdateHour(hour) {
      if (this.station.currHour === hour) return;
      this.st_update_hour(hour);
    },

    // 自动站_阀值更新
    onStThresholdChange(eleOption, threshold) {
      this.st_threshold_change({ ...eleOption, latestThreshold: threshold });
    },

    //自动站_左右调整阀值,sign值为-1 or 1
    onStAdjustThreshold(eleOption, sign) {
      const currIndex = eleOption.thresholdList.findIndex(
        threshold => threshold === eleOption.currThreshold
      );
      const lastIndex = eleOption.thresholdList.length - 1;
      let nextIndex = currIndex + sign;
      if (nextIndex < 0) {
        nextIndex = lastIndex;
      } else if (nextIndex > lastIndex) {
        nextIndex = 0;
      }
      this.st_threshold_change({
        ...eleOption,
        latestThreshold: eleOption.thresholdList[nextIndex]
      });
    },

    // SWAN拼图_层次更新
    onSnLevelChange(eleOption, level) {
      console.log(eleOption, level);
      this.sn_level_change({ ...eleOption, latestLevel: level });
    },

    // SWAN拼图_时效更新
    onSnAgingChange(eleOption, aging) {
      this.sn_aging_change({ ...eleOption, latestAging: aging });
    },

    //SWAN拼图_左右调整层次,sign值为-1 or 1
    onSnAdjustLvel(eleOption, sign) {
      const currIndex = eleOption.levelList.findIndex(
        level => level.value === eleOption.currLevel
      );
      const lastIndex = eleOption.levelList.length - 1;
      let nextIndex = currIndex + sign;
      if (nextIndex < 0) {
        nextIndex = lastIndex;
      } else if (nextIndex > lastIndex) {
        nextIndex = 0;
      }
      this.sn_level_change({
        ...eleOption,
        latestLevel: eleOption.levelList[nextIndex].value
      });
    },

    //SWAN拼图_左右调整时效,sign值为-1 or 1
    onSnAdjustAging(eleOption, sign) {
      const currIndex = eleOption.agingList.findIndex(
        aging => aging.value === eleOption.currAging
      );
      const lastIndex = eleOption.agingList.length - 1;
      let nextIndex = currIndex + sign;
      if (nextIndex < 0) {
        nextIndex = lastIndex;
      } else if (nextIndex > lastIndex) {
        nextIndex = 0;
      }
      this.sn_aging_change({
        ...eleOption,
        latestAging: eleOption.agingList[nextIndex].value
      });
    },

    // 单站pup_小地图数据
    getStationPupMapData() {
      axios
        .get(
          "/proxy/10.20.67.111/nowcasting/dlsj/zh/single_radar_stations.json"
        )
        .then(data => {
          this.stationPupMapData = data.data["全国"];
        });
    },

    //点击返回最新
    onClickReturnLatest() {
      this.get_latest_zk_time();
    },

    // 点击关闭或开启定时刷新
    onClickAutoRefresh() {
      this.update_refresh_status();
      this.is_time_to_refresh();
    },

    // 总控日期改变
    onZkDateChange(date) {
      this.update_zk_date(date);
      this.update_all_checked_element_time();
    },

    // 总控小时改变
    onZkHourChange(hour) {
      this.update_zk_hour(hour);
      this.update_all_checked_element_time();
    },

    // 总控分钟改变
    onZkMinuteChange(minute) {
      this.update_zk_minute(minute);
      this.update_all_checked_element_time();
    },

    // 切换菜单
    onClickSwitchMenu(id) {
      this.prevMenuId = this.currMenuId;
      if (this.currMenuId !== id) {
        this.isShowPanel = true;
        this.currMenuId = id;
      } else {
        this.isShowPanel = !this.isShowPanel;
      }

      if (id === 'statonPup') {
        // this.$refs.mapNav.map.setView([36.87962060502676, 103.71093750000001])
        // console.log(this.$refs.mapNav.map.setView([36.87962060502676, 103.71093750000001]));
      }
    },

    // 预报预警_短期预报
    onFwShortTermChange(key, value) {
      if (key === "aging") {
        const prevAging = this.fcstWarning.shortTerm.aging;
        if (prevAging === value) {
          value = this.fcstWarning.shortTerm.aging ? "" : value;
        }
      }
      this.fw_update_short_term({ key, value });
    },
    // 预报预警_短时预报
    onFwShortTimeChange(key, value) {
      if (key === "eleList") {
        const prevValue = this.fcstWarning.shortTime.eleList.find(
          el => el.checked
        );
        value = prevValue && prevValue.id === value ? "" : value;
      }
      this.fw_update_short_time({ key, value });
    },

    // 预报预警_国家预警
    onFwWarnStateChange(key, value) {
      if (key === "aging") {
        const prevAging = this.fcstWarning.stateWarn.aging;
        if (prevAging === value) {
          value = this.fcstWarning.stateWarn.aging ? "" : value;
        }
      }
      this.fw_update_warn_state({ key, value });
    },

    // 预报预警_省级预警
    onFwWarnProvinceChange(key, value) {
      if (key === "aging") {
        const prevAging = this.fcstWarning.provinceWarn.aging;
        if (prevAging === value) return;
      } else if (key === "eleList") {
        const prevValue = this.fcstWarning.provinceWarn.eleList.find(
          el => el.checked
        );
        value = prevValue && prevValue.id === value ? "" : value;
      }
      this.fw_update_warn_province({ key, value });
    },

    // 数值预报_条件更新
    onVfChange(sign, value) {
      if (sign === "aging") {
        const curr = this.valueFcst.find(
          el => el.id === this.currSplitScreen.currValueFcstId
        );
        if (curr.aging === value) return;
      }

      this.vf_update({ sign, value });
    },

    // 数值预报_tabs切换
    onVfTabsChange(id) {
      this.vf_switch_element_tabs(id);
    }
  }
};
