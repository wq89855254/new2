import * as moment from "moment";
import _ from "lodash";
import eleOption from "../element-option";

import { createNamespacedHelpers } from "vuex";
const {
  mapState,
  mapGetters,
  mapMutations,
  mapActions
} = createNamespacedHelpers("synthesis");

export default {
  name: "layer-manage",
  components: {},
  data() {
    return {
      isSpread: true,
      currTabId: "product",
      tabs: [
        {
          id: "product",
          name: "产品图层"
        },
        {
          id: "warning",
          name: "报警图层"
        }
      ],
      productLayerList1: [],
      productLayerList2: [],
      productLayerList3: [],
      productLayerList4: [],
      warnLayerList1: [],
      warnLayerList2: [],
      warnLayerList3: [],
      warnLayerList4: []
    };
  },
  computed: {
    ...mapState(["ssIndex"]),
    ...mapGetters([
      "currSplitScreen",
      "showHideLayerHash",
      "stationPup",
      "station",
      "severeWeather",
      "fcstWarning",
      "valueFcst"
    ]),
    currProductLayerList() {
      return this["productLayerList" + this.ssIndex];
    },
    currWarnLayerList() {
      return this["warnLayerList" + this.ssIndex];
    }
  },
  watch: {
    currProductLayerList(currProductLayerList) {
      // console.log(currProductLayerList)
    }
  },
  created() {
    this.debouncedDeleteAllLayer = _.debounce(this.onClickDeleteAllLayer, 300);
  },

  mounted() {
    // 订阅store中的mutations(只需要其中的一部分)
    this.cancelSubscribe = this.$store.subscribe((mutation, state) => {
      // debugger;
      switch (mutation.type) {
        case "synthesis/fw_update_short_term_time":
        case "synthesis/fw_update_short_term":
          //预报预警_短期预报
          this.fcstWarnAndValueFcstInfo("fw_short_term");
          break;
        case "synthesis/fw_update_short_time_time":
        case "synthesis/fw_update_short_time":
          //预报预警_短时预报
          this.fcstWarnAndValueFcstInfo("fw_short_time");
          break;
        case "synthesis/fw_update_warn_state_time":
        case "synthesis/fw_update_warn_state":
          // 预报预警_国家预警
          this.fcstWarnAndValueFcstInfo("fw_warn_state");
          break;
        case "synthesis/fw_update_warn_province_time":
        case "synthesis/fw_update_warn_province":
          // 预报预警_省级预警
          this.fcstWarnAndValueFcstInfo("fw_warn_province");
          break;
        case "synthesis/vf_update_time":
        case "synthesis/vf_update":
          this.fcstWarnAndValueFcstInfo("vf");
          // 数值预报
          break;

        case "synthesis/st_update_hour":
          // 自动站:小时选择
          const checkedHourEleList = this.station.hourEleList.filter(
            el => el.checked
          );
          checkedHourEleList.forEach(el => {
            const eleInfo = Object.assign(_.cloneDeep(el), {
              currHour: mutation.payload
            });
            this.updateElementInfo("normal", eleInfo);
          });
          break;
        case "synthesis/sw_update_hour":
          // 强天气:小时选择
          const checkedHourEleList1 = this.severeWeather.hourEleList.filter(
            el => el.checked
          );
          checkedHourEleList1.forEach(el => {
            const eleInfo = Object.assign(_.cloneDeep(el), {
              currHour: mutation.payload
            });
            this.updateElementInfo("normal", eleInfo);
          });
          break;
        case "synthesis/sw_update_element_condition":
          // 强天气:观测
          if (mutation.payload.conditionKey === "currObserve") {
            const eleInfo1 = _.cloneDeep(mutation.payload);
            this.updateElementInfo("normal", eleInfo1);
          }
          break;
        case "synthesis/update_element_time":
          // 所有:更新数据时间
          const eleInfo2 = Object.assign(_.cloneDeep(mutation.payload), {
            currHour: this.severeWeather.currHour
          });
          this.updateElementInfo("normal", eleInfo2);
          break;
        case "synthesis/sn_level_change":
        // SWAN拼图_层次更新
        case "synthesis/sn_aging_change":
        // SWAN拼图_时效更新
        case "synthesis/st_threshold_change":
        // 自动站: 阀值更新
        case "synthesis/cp_aging_change":
          //云图: 更新时效
          const eleInfo3 = _.cloneDeep(mutation.payload);
          this.updateElementInfo("normal", eleInfo3);
          break;
        case "synthesis/stp_set_null_element_id":
        // 单站pup: 清空当前选中的要素id
        case "synthesis/stp_update_station_id":
        // 单站pup: 更新站点
        case "synthesis/stp_update_times":
          // 单站pup: 更新时间
          this.updateElementInfo("stationPup");
          break;
      }
    });
  },

  beforeDestroy() {
    this.cancelSubscribe();
  },

  methods: {
    ...mapMutations([
      "stp_update_times",
      "stp_set_null_element_id",
      "stp_radio_element",
      "fw_update_short_term_time",
      "fw_update_short_time_time",
      "fw_update_warn_state_time",
      "fw_update_warn_province_time",
      "fw_update_short_term",
      "fw_update_short_time",
      "fw_update_warn_state",
      "fw_update_warn_province",
      "vf_update",
      "vf_update_time",
      "show_hide_layer"
    ]),
    ...mapActions([
      "tuning_element_time",
      "delete_element",
      "delete_all_element"
    ]),

    fcstWarnAndValueFcstInfo(type) {
      const manageList = [];

      switch (type) {
        case "fw_short_term":
          {
            const { date, hour, aging, timeList } = this.fcstWarning.shortTerm;
            const { timeFormat, typeName } = eleOption.fw_short_term;
            const checked = aging !== "";
            if (date) {
              const id = "fw_short_term";
              if (checked) {
                const currTime = date.format("YYYYMMDD") + hour + "00";
                const name = typeName + "(" + aging + "h)";
                manageList.push({
                  checked,
                  currTime,
                  showTime: moment(currTime, "YYYYMMDDHHmm").format(timeFormat),
                  id,
                  name,
                  timeList
                });
              } else {
                manageList.push({
                  checked,
                  id
                });
              }
            }
          }
          break;
        case "fw_short_time":
          {
            const { date, timeList, eleList } = this.fcstWarning.shortTime;
            const { timeFormat, typeName } = eleOption.fw_short_time;
            const checkedEle = eleList.find(el => el.checked);
            if (date) {
              const id = "fw_short_time";
              if (checkedEle) {
                //有值即代表选中
                const currTime = date;
                const name = typeName + "(" + checkedEle.name + ")";
                manageList.push({
                  checked: true,
                  currTime,
                  showTime: moment(currTime, "YYYYMMDDHHmm").format(timeFormat),
                  id,
                  name,
                  timeList
                });
              } else {
                manageList.push({
                  checked: false,
                  id
                });
              }
            }
          }
          break;
        case "fw_warn_state":
          {
            const { date, hour, aging, timeList } = this.fcstWarning.stateWarn;
            const { timeFormat, typeName } = eleOption.fw_warn_state;
            const checked = aging !== "";
            if (date) {
              const id = "fw_warn_state";
              if (checked) {
                const currTime = date.format("YYYYMMDD") + hour + "00";
                const name = typeName + "(" + aging + "h)";
                manageList.push({
                  checked,
                  currTime,
                  showTime: moment(currTime, "YYYYMMDDHHmm").format(timeFormat),
                  id,
                  name,
                  timeList
                });
              } else {
                manageList.push({
                  checked,
                  id
                });
              }
            }
          }
          break;
        case "fw_warn_province":
          {
            const {
              date,
              hour,
              minute,
              aging,
              timeList,
              eleList
            } = this.fcstWarning.provinceWarn;
            const { timeFormat, typeName } = eleOption.fw_warn_province;
            const checkedEle = eleList.find(el => el.checked);
            if (date) {
              const id = "fw_warn_province";
              if (checkedEle) {
                const currTime = date.format("YYYYMMDD") + hour + minute;
                const name = typeName + "(" + checkedEle.name + aging + "h)";
                manageList.push({
                  checked: true,
                  currTime,
                  showTime: moment(currTime, "YYYYMMDDHHmm").format(timeFormat),
                  id,
                  name,
                  timeList
                });
              } else {
                manageList.push({
                  checked: false,
                  id
                });
              }
            }
          }
          break;
        case "vf":
          this.valueFcst.forEach(typeItem => {
            const {
              id,
              date,
              hour,
              aging,
              timeList,
              typeEleList,
              typeEleId
            } = typeItem;
            const currEle = typeEleList
              .find(el => el.id === typeEleId)
              .eleList.find(el => el.checked);
            if (date) {
              const manageId = "vf_" + id;
              if (currEle) {
                const { timeFormat, typeName } = eleOption[manageId];
                const currTime = date.format("YYYYMMDD") + hour + "00";
                const name = typeName + "(" + currEle.name + aging + ")";
                manageList.push({
                  checked: true,
                  currTime,
                  showTime: moment(currTime, "YYYYMMDDHHmm").format(timeFormat),
                  id: manageId,
                  name,
                  timeList
                });
              } else {
                manageList.push({
                  checked: false,
                  id: manageId
                });
              }
            }
          });
          break;
      }

      // console.log(manageList);

      manageList.forEach(el => {
        let layerTypeName = "";
        if (el.id === "fw_warn_state" || el.id === "fw_warn_province") {
          layerTypeName = "currWarnLayerList";
        } else {
          layerTypeName = "currProductLayerList";
        }
        const currLayerList = this[layerTypeName];

        const elIndex = currLayerList.findIndex(item => item.id === el.id);
        const isNoElement = elIndex === -1;
        if (el.checked) {
          if (isNoElement) {
            currLayerList.unshift(el);
          } else {
            currLayerList.splice(elIndex, 1, el);
          }
        } else {
          if (!isNoElement) {
            currLayerList.splice(elIndex, 1);
          }
        }
      });
    },

    updateElementInfo(typeName, eleInfo) {
      if (eleInfo) {
        // console.log(eleInfo.id);
      }
      if (typeName === "normal") {
        const eleIndex = this.currProductLayerList.findIndex(
          el => el.id === eleInfo.id
        );
        const isNoElement = eleIndex === -1;
        const {
          checked,
          latestTime,
          time,
          name,
          timeFormat,
          timeList,
          id
        } = eleInfo;
        const currTime = latestTime || time;
        if (checked) {
          const item = {
            currTime,
            showTime: moment(currTime, "YYYYMMDDHHmm").format(timeFormat),
            id,
            name,
            timeList
          };
          if (isNoElement) {
            this.currProductLayerList.unshift(item);
          } else {
            this.currProductLayerList.splice(eleIndex, 1, item);
          }
        } else {
          if (!isNoElement) {
            this.currProductLayerList.splice(eleIndex, 1);
          }
        }
      } else if (typeName === "stationPup") {
        //单站pup
        const eleIndex = this.currProductLayerList.findIndex(
          el => el.id === this.stationPup.moduleId
        );
        const isNoElement = eleIndex === -1;
        if (this.stationPup.currEleId && this.stationPup.currStationId) {
          const item = {
            currTime: this.stationPup.currEleTime,
            showTime: moment(
              this.stationPup.currEleTime,
              "YYYYMMDDHHmm"
            ).format(this.stationPup.timeFormat),
            id: this.stationPup.moduleId,
            name: "单站PUP",
            timeList: this.stationPup.currEleTimeList
          };
          if (isNoElement) {
            this.currProductLayerList.unshift(item);
          } else {
            this.currProductLayerList.splice(eleIndex, 1, item);
          }
        } else {
          if (!isNoElement) {
            this.currProductLayerList.splice(eleIndex, 1);
          }
        }
      }
    },

    // 左右调整时间
    onTuningTime(sign, item) {
      const { id, currTime, timeList } = item;
      const currIndex = timeList.findIndex(t => t === currTime);
      const lastIndex = timeList.length - 1;
      let nextIndex = currIndex + sign;
      if (nextIndex < 0) {
        nextIndex = 0;
      } else if (nextIndex > lastIndex) {
        nextIndex = lastIndex;
      }
      const cTime = timeList[nextIndex];

      if (currTime === cTime) return;
      
      // 单站pup
      if (id === "stp") {
        this.stp_update_times({
          currEleTime: cTime,
          currEleTimeList: timeList
        });
      } else if (id === "fw_short_term") {
        // 短期预报
        const time = moment(cTime, "YYYYMMDDHHmm");
        const date = time.clone().startOf("day");
        const hour = time.format("HH");
        this.fw_update_short_term_time({ date, hour });
      } else if (id === "fw_short_time") {
        // 短时预报
        this.fw_update_short_time_time({ date: cTime });
      } else if (id === "fw_warn_state") {
        // 国家级预警
        const time = moment(cTime, "YYYYMMDDHHmm");
        const date = time.clone().startOf("day");
        const hour = time.format("HH");
        this.fw_update_warn_state_time({ date, hour });
      } else if (id === "fw_warn_province") {
        // 省级预警
        const time = moment(cTime, "YYYYMMDDHHmm");
        const date = time.clone().startOf("day");
        const hour = time.format("HH");
        const minute = time.format("mm");
        this.fw_update_warn_province_time({ date, hour, minute });
      } else if (id === "vf_ncep" || id === "vf_ec") {
        // 数值预报
        const time = moment(cTime, "YYYYMMDDHHmm");
        const date = time.clone().startOf("day");
        const hour = time.format("HH");
        this.vf_update_time({ id: id.split("_")[1], date, hour });
      } else {
        // 综合实况
        this.tuning_element_time({ id, time: cTime });
      }
    },

    // 点击删除要素(图层)
    onClickDeleteElement(item) {
      const { id } = item;
      // 单站pup
      if (id === "stp") {
        this.stp_set_null_element_id();
        this.stp_radio_element("");
      } else if (id === "fw_short_term") {
        // 短期预报
        this.fw_update_short_term({ key: "aging", value: "" });
      } else if (id === "fw_short_time") {
        // 短时预报
        this.fw_update_short_time({ key: "eleList", value: "" });
      } else if (id === "fw_warn_state") {
        // 国家级预警
        this.fw_update_warn_state({ key: "aging", value: "" });
      } else if (id === "fw_warn_province") {
        // 省级预警
        this.fw_update_warn_province({ key: "eleList", value: "" });
      } else if (id === "vf_ncep" || id === "vf_ec") {
        // 数值预报
        this.vf_update({ sign: "element", value: "" }); //只有选中对应的模式才能删除对应的控制
      } else {
        // 综合实况
        this.delete_element(item.id);
      }
    },

    // 隐藏显示图层
    onHideShowLayer(item) {
      // console.log('显示隐藏图层');
      // console.log(item);
      // console.log(this.showHideLayerHash);
      this.show_hide_layer(item.id);
    },

    // 删除所有图层
    onClickDeleteAllLayer() {
      this.delete_all_element();
    },

    // 是否有图例
    isHasLegend(id) {
      return eleOption[id].isHasLegend;
    }
  }
};
