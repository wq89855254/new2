import * as moment from "moment";

import synthesisApi from "../../../api/synthesis-api";
import stateMethod from "./state-method";


// 是否启用当要素的时间不在总控时间要求的范围内时就隐藏图层
const isHideLayerNotInZkRange = true;



const common = {
  // 通过总控时间和要素的时间列表来获取合适的要素时间, 该函数可以返回当前要素时间是否在总控时间要求的范围内的布尔值，以控制图层初始渲染的显示与隐藏
  getElementTimeByZk(zkTime, timeList, eleInterval, eleIntervalType) {
    const zkTimeMmt = moment(zkTime, "YYYYMMDDHHmm");
    if (eleIntervalType === "minutes") {
      const currMinute = zkTimeMmt.minutes();
      zkTimeMmt.minutes(currMinute - (currMinute % eleInterval));
    } else if (eleIntervalType === "hours") {
      const currHour = zkTimeMmt.hours();
      zkTimeMmt.hours(currHour - (currHour % eleInterval)).minutes(0);
    }

    const eleTime = zkTimeMmt.format("YYYYMMDDHHmm");

    if (timeList.includes(eleTime)) {
      return {
        isHideLayer: false,
        time: eleTime
      };
    }

    const afterTimeList = new Array(2)
      .fill(null)
      .map((el, i) => {
        const currTime = zkTimeMmt
          .clone()
          .add(eleInterval * (i + 1), eleIntervalType);
        return currTime.format("YYYYMMDDHHmm");
      })
      .reverse();

    const beforeTimeList = new Array(2).fill(null).map((el, i) => {
      const currTime = zkTimeMmt
        .clone()
        .subtract(eleInterval * (i + 1), eleIntervalType);
      return currTime.format("YYYYMMDDHHmm");
    });

    const validTimeList = [...afterTimeList, ...beforeTimeList];

    for (const itemTime of validTimeList) {
      if (timeList.includes(itemTime)) {
        return {
          isHideLayer: false,
          time: itemTime
        };
      }
    }

    return {
      isHideLayer: isHideLayerNotInZkRange ? true : false,  //在总控时间范围内是否能找到要素时间，若有则显示图层，没有则隐藏
      time: timeList[0]
    };
  }
};

export default {
  // 微调时间
  tuning_element_time({ commit, state }, { id, time }) {
    const currElement = stateMethod
      .getAllElements(state)
      .find(el => el.id === id);
    if (currElement) {
      commit("update_element_time", { ...currElement, latestTime: time });
    }
  },

  // 删除指定id的要素(单站pup除外)
  delete_element({ commit, state }, id) {
    const currElement = stateMethod
      .getAllElements(state)
      .find(el => el.id === id);
    if (currElement && currElement.checked) {
      commit("select_element", currElement);
      commit("update_element_time_list", {
        id: currElement.id,
        timeList: []
      });
      commit("update_element_time", {
        ...currElement,
        latestTime: ""
      });
    }
  },

  // 删除所有选中要素
  delete_all_element({ commit, state }) {
    const checkedElementList = stateMethod
      .getAllElements(state)
      .filter(el => el.checked);
    checkedElementList.forEach(ele => {
      commit("select_element", ele);
      commit("update_element_time_list", {
        id: ele.id,
        timeList: []
      });
      commit("update_element_time", {
        ...ele,
        latestTime: ""
      });
    });

    // 单站pup
    // commit("stp_set_null_element_id");
    // commit("stp_radio_element", "");
  },

  // 得到要素最新时间
  get_latest_element_time({ commit, getters }, eleOption) {
    // 要素没有选中时清空时间
    if (!eleOption.checked) {
      commit("update_element_time_list", {
        id: eleOption.id,
        timeList: []
      });
      commit("update_element_time", {
        ...eleOption,
        latestTime: ""
      });
      return;
    }

    const { interval, intervalType } = eleOption;
    // 总控时间
    const formatedZkTime = getters.formatedZkTime;

    switch (eleOption.timeApiName) {
      case "dataTime":
        synthesisApi.getElementTimeForDataTime().then(data => {
          const currTime = data.data.data.find(
            el => el.name === eleOption.dataName
          );
          const isHasTime = currTime && currTime.times.length;
          const timeList = isHasTime ? currTime.times.map(el => "20" + el) : [];
          const resTime = common.getElementTimeByZk(
            formatedZkTime,
            timeList,
            interval,
            intervalType
          );
          console.log(resTime.time);
          commit('add_show_hide_layer_option', {[eleOption.id]: resTime.isHideLayer});
          commit("update_element_time_list", {
            id: eleOption.id,
            timeList
          });
          commit("update_element_time", {
            ...eleOption,
            latestTime: isHasTime ? resTime.time : ""
          });
        });
        break;

      default:
        let dataName = "";
        if (eleOption.outerDataNameChipKey) {
          const outerChip = eleOption[eleOption.outerDataNameChipKey];
          const innerChip = eleOption[eleOption.innerDataNameChipKey];
          dataName = eleOption.dataName + (outerChip ? outerChip : innerChip);
        } else {
          dataName = eleOption.dataName;
        }

        synthesisApi.getElementTime(dataName).then(data => {
          const timeList = data.data[0].times.map(time => "20" + time);
          const resTime = common.getElementTimeByZk(
            formatedZkTime,
            timeList,
            interval,
            intervalType
          );
          commit('add_show_hide_layer_option', {[eleOption.id]: resTime.isHideLayer});
          commit("update_element_time_list", {
            id: eleOption.id,
            timeList
          });
          commit("update_element_time", {
            ...eleOption,
            latestTime: timeList.length ? resTime.time : ""
          });
        });
        break;
    }
  },

  // 得到要素最新时间（只针对单站pup）
  get_station_pup_latest_element_time({ commit, state, getters }) {
    const stationPup = state["splitScreen" + state.ssIndex].stationPup;
    const formatedZkTime = getters.formatedZkTime;
    synthesisApi.getElementTime(stationPup.dataName).then(data => {
      const timeList = data.data[0].times.map(time => "20" + time);
      const isHasTimes = timeList.length > 0;

      const resTime = common.getElementTimeByZk(
        formatedZkTime,
        timeList,
        stationPup.interval,
        stationPup.intervalType
      );
      commit('add_show_hide_layer_option', {'stp': resTime.isHideLayer});
      commit("stp_update_times", {
        currEleTime: isHasTimes ? resTime.time : "",
        currEleTimeList: isHasTimes ? timeList : []
      });
      
    });
  },

  // 更新所有选中要素的时间(当总控时间改变时), 要素的时间更新就会触发监听请求对应的数据
  update_all_checked_element_time({ dispatch, commit, state }) {
    const allCheckedElement = stateMethod
      .getAllElements(state)
      .filter(el => el.checked);

    allCheckedElement.forEach(el => {
      dispatch("get_latest_element_time", el);
    });

    // 单站pup时间更新
    const stationPup = state["splitScreen" + state.ssIndex].stationPup;
    if (stationPup.currEleId && stationPup.currStationId) {
      dispatch("get_station_pup_latest_element_time", stationPup.dataName);
    }
  },

  // 获取总控的最新时间
  get_latest_zk_time({ dispatch, commit }) {
    synthesisApi.getElementTime("全国雷达拼图").then(data => {
      const timeList = data.data[0].times;
      const isHasTimes = timeList.length > 0;
      const time = timeList[0];
      let timeMmt;
      if (isHasTimes) {
        timeMmt = moment("20" + time, "YYYYMMDDHHmm");
      } else {
        timeMmt = moment();
        const currMinute = timeMmt.minutes();
        const minute = currMinute - (currMinute % 6);
        timeMmt.minutes(minute);
        timeMmt.subtract(24, "minutes");
      }

      commit("update_zk_date", timeMmt.clone().startOf("day"));
      commit("update_zk_hour", timeMmt.format("HH"));
      commit("update_zk_minute", timeMmt.format("mm"));

      dispatch("update_all_checked_element_time");
    });
  },

  // 开启或关闭定时刷新
  is_time_to_refresh({ dispatch, commit, state }) {
    const currSplitScreen = state["splitScreen" + state.ssIndex];
    if (currSplitScreen.isAutoRefresh) {
      dispatch("get_latest_zk_time");
      dispatch("get_latest_fcst_warning_time");
      dispatch("get_latest_value_fcst_time");
      commit("set_interval", () => {
        dispatch("get_latest_zk_time");
        dispatch("get_latest_fcst_warning_time");
        dispatch("get_latest_value_fcst_time");
      });
    } else {
      commit("clear_interval");
    }
  },

  // 得到预报预警下所有要素的最新起报时间并提交请求数据的突变
  get_latest_fcst_warning_time({ dispatch, commit, state }) {
    const params = "潜势预报,短时预报,强天气预警,省级预警";
    const fcstWarning = state["splitScreen" + state.ssIndex].fcstWarning;
    synthesisApi.getElementTime(params).then(data => {
      data = data.data;
      let shortTermTimes = data
        .find(el => el.name === "潜势预报")
        .times.map(el => "20" + el);
      let shortTimeTimes = data
        .find(el => el.name === "短时预报")
        .times.map(el => "20" + el);
      let stateWarnTimes = data
        .find(el => el.name === "强天气预警")
        .times.map(el => "20" + el);
      let provinceWarnTimes = data
        .find(el => el.name === "省级预警")
        .times.map(el => "20" + el);

      if (shortTermTimes.length) {
        const time = moment(shortTermTimes[0], "YYYYMMDDHHmm");
        commit('add_show_hide_layer_option', {'fw_short_term': false});
        commit("fw_update_short_term_time_list", { timeList: shortTermTimes });
        commit("fw_update_short_term_time", {
          date: time.clone().startOf("day"),
          hour: time.format("HH")
        });
      }else {
        commit("fw_update_short_term_time_list", { timeList: [] });
        commit("fw_update_short_term_time", {
          date: null,
          hour: fcstWarning.shortTerm.hour
        });
      }

      if (shortTimeTimes.length) {
        commit('add_show_hide_layer_option', {'fw_short_time': false});
        commit("fw_update_short_time_time_list", {
          timeList: shortTimeTimes
        });
        commit("fw_update_short_time_time", {
          date: shortTimeTimes[0]
        });
      }else {
        commit("fw_update_short_time_time_list", {
          timeList: []
        });
        commit("fw_update_short_time_time", {
          date: ''
        });
      }

      // stateWarnTimes = ['201903221800', '201903212000'];
      if (stateWarnTimes.length) {
        const time = moment(stateWarnTimes[0], "YYYYMMDDHHmm");
        commit('add_show_hide_layer_option', {'fw_warn_state': false});
        commit('fw_update_warn_state_time_list', {timeList: stateWarnTimes});
        commit("fw_update_warn_state_time", {
          date: time.clone().startOf("day"),
          hour: time.format("HH")
        });
      }else {
        commit('fw_update_warn_state_time_list', {timeList: []});
        commit("fw_update_warn_state_time", {
          date: null,
          hour: fcstWarning.stateWarn.hour
        });
      }

      if (provinceWarnTimes.length) {
        const time = moment(provinceWarnTimes[0], "YYYYMMDDHHmm");
        commit('add_show_hide_layer_option', {'fw_warn_province': false});
        commit('fw_update_warn_province_time_list', {timeList: provinceWarnTimes});
        commit("fw_update_warn_province_time", {
          date: time.clone().startOf("day"),
          hour: time.format("HH"),
          minute: time.format("mm")
        });
      }else {
        commit('fw_update_warn_province_time_list', {timeList: []});
        commit("fw_update_warn_province_time", {
          date: null,
          hour: fcstWarning.provinceWarn.hour,
          minute: fcstWarning.provinceWarn.minute,
        });
      }
    });
  },

  // 得到最新的数值预报时间并提交请求数据的突变
  get_latest_value_fcst_time({ dispatch, commit, state, getters }) {
    const idNameList = [["ncep", "数值预报NCEP"], ["ec", "数值预报EC"]];
    const params = idNameList.map(el => el[1]).join(",");
    synthesisApi.getElementTime(params).then(data => {
      data = data.data;
      idNameList.forEach(item => {
        const [id, name] = item;
        let times = data.find(el => el.name === name).times.map(el => '20' + el);
        // times = ['201903220800', '201903220200'];  //测试时间
        if (times.length) {
          const time = moment(times[0], "YYYYMMDDHHmm");
          commit('add_show_hide_layer_option', {['vf_' + id]: false});
          commit('vf_update_time_list', {
            id,
            timeList: times
          })
          commit("vf_update_time", {
            id,
            date: time.clone().startOf("day"),
            hour: time.format("HH")
          });
        }else {
          commit('vf_update_time_list', {
            id,
            timeList: []
          })
          commit("vf_update_time", {
            id,
            date: null,
            hour: getters.valueFcst.find(el => el.id === id).hour
          });
        }
      });
    });
  }
};
