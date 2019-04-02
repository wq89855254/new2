import stateMethod from "./state-method";

export default {
  // 切换分屏
  cut_split_screen(state, index) {
    const nList = [1, 2, 3, 4];
    if (nList.indexOf(index) === -1) {
      throw "Must be 1, 2, 3, 4";
    }
    state.ssIndex = index;
  },
  updata_zoomSwitch(state,val){
    state.zoomSwitch=val
  },
  updata_zoomUrl(state,url){
    state.zoomUrl=url
  },

  // 选中或取消选中元素
  select_element(state, eleOption) {
    const allEleList = stateMethod.getAllElements(state);
    const currEle = allEleList.find(el => el.id === eleOption.id);
    if (currEle) {
      currEle.checked = !currEle.checked;
    }
  },
  // 更新元素时间(eleOption进行了浅拷贝，新加了latestTime字段用于存储最新时间)
  update_element_time(state, eleOption) {
    const allEleList = stateMethod.getAllElements(state);
    const currEle = allEleList.find(el => el.id === eleOption.id);
    if (currEle) {
      currEle.time = eleOption.latestTime;
    }
  },
  // 更新元素时间列表
  update_element_time_list(state, payload) {
    const allEleList = stateMethod.getAllElements(state);
    const currEle = allEleList.find(el => el.id === payload.id);
    if (currEle) {
      currEle.timeList = payload.timeList;
    }
  },

  // 强天气_更新小时
  sw_update_hour(state, hour) {
    const severeWeather = state["splitScreen" + state.ssIndex].severeWeather;
    severeWeather.currHour = hour;
  },

  // 强天气_更新要素条件
  sw_update_element_condition(state, eleOption) {
    const eleList = stateMethod.getSwElements(state);
    const currEle = eleList.find(el => el.id === eleOption.id);
    if (currEle) {
      currEle[eleOption.conditionKey] = eleOption.conditionValue;
    }
  },
  // 云图_tabs切换
  cp_cut_tabs(state, name) {
    const cloudPicture = state["splitScreen" + state.ssIndex].cloudPicture;
    cloudPicture.currTabName = name;
  },
  // 云图_改变要素时效(此eleOption经过了浅拷贝，在这currAging不是最新的值，但latestAging是最新的)
  cp_aging_change(state, eleOption) {
    const eleList = stateMethod.getCpElements(state);
    const currEle = eleList.find(el => el.id === eleOption.id);
    if (currEle) {
      currEle.currAging = eleOption.latestAging;
    }
  },
  // 自动站_阀值更新
  st_threshold_change(state, eleOption) {
    const eleList = stateMethod.getStElements(state);
    const currEle = eleList.find(el => el.id === eleOption.id);
    if (currEle) {
      currEle.currThreshold = eleOption.latestThreshold;
    }
  },

  // 自动站_小时更新
  st_update_hour(state, hour) {
    const station = state["splitScreen" + state.ssIndex].station;
    station.currHour = hour;
  },

  // SWAN拼图_层次更新
  sn_level_change(state, eleOption) {
    const eleList = stateMethod.getSnElements(state);
    const currEle = eleList.find(el => el.id === eleOption.id);
    if (currEle) {
      currEle.currLevel = eleOption.latestLevel;
    }
  },

  // SWAN拼图_时效更新
  sn_aging_change(state, eleOption) {
    const eleList = stateMethod.getSnElements(state);
    const currEle = eleList.find(el => el.id === eleOption.id);
    if (currEle) {
      currEle.currAging = eleOption.latestAging;
    }
  },

  // 单站pup_更新站id
  stp_update_station_id(state, id) {
    const stationPup = state["splitScreen" + state.ssIndex].stationPup;
    stationPup.currStationId = id;
  },

  // 单站pup_单选要素
  stp_radio_element(state, id) {
    const stationPup = state["splitScreen" + state.ssIndex].stationPup;
    stationPup.eleList = stationPup.eleList.map(el => {
      el.checked = el.id === id;
      return el;
    });
    stationPup.currEleId = id;
  },
  // 单站pup_清空当前选中的要素id
  stp_set_null_element_id(state) {
    const stationPup = state["splitScreen" + state.ssIndex].stationPup;
    stationPup.currEleId = "";
  },

  // 单站pup_更新时间
  stp_update_times(state, { currEleTime, currEleTimeList }) {
    const stationPup = state["splitScreen" + state.ssIndex].stationPup;
    stationPup.currEleTime = currEleTime;
    stationPup.currEleTimeList = currEleTimeList;
  },

  // 选择基本图层
  select_base_layer(state, id) {
    const currSplitScreen = state["splitScreen" + state.ssIndex];
    currSplitScreen.currBaseLayerId = id;
  },

  // 选择图层要素(边界线，行政点名称，河流等)
  select_layer_element(state, id) {
    const currSplitScreen = state["splitScreen" + state.ssIndex];
    currSplitScreen.layerElementList.forEach(el => {
      if (el.id === id) {
        el.checked = !el.checked;
      }
    });
  },
  // 取消或选择所有图层要素(边界线，行政点名称，河流等)
  select_all_layer_element(state, isSelectAll) {
    const currSplitScreen = state["splitScreen" + state.ssIndex];
    currSplitScreen.layerElementList.forEach(el => {
      el.checked = isSelectAll;
    });
  },

  // 更新总控日期
  update_zk_date(state, date) {
    const currSplitScreen = state["splitScreen" + state.ssIndex];
    currSplitScreen.date = date; //moment
  },

  // 更新总控小时
  update_zk_hour(state, hour) {
    const currSplitScreen = state["splitScreen" + state.ssIndex];
    currSplitScreen.hour = hour; //HH
  },

  // 更新总控分钟
  update_zk_minute(state, minute) {
    const currSplitScreen = state["splitScreen" + state.ssIndex];
    currSplitScreen.minute = minute; //mm
  },

  // 更新定时刷新状态(true还是false)
  update_refresh_status(state) {
    const currSplitScreen = state["splitScreen" + state.ssIndex];
    currSplitScreen.isAutoRefresh = !currSplitScreen.isAutoRefresh;
  },

  //设置定时刷新
  set_interval(state, fn) {
    const currSplitScreen = state["splitScreen" + state.ssIndex];
    currSplitScreen.timer = setInterval(fn, 2 * 60 * 1000);
  },

  // 清除定时刷新
  clear_interval(state) {
    const currSplitScreen = state["splitScreen" + state.ssIndex];
    clearInterval(currSplitScreen.timer);
    currSplitScreen.timer = null;
  },

  // 预报预警_短期预报_条件更新 payload： {key: string, value: any}
  fw_update_short_term(state, payload) {
    const currSplitScreen = state["splitScreen" + state.ssIndex];
    const { key, value } = payload;
    if (!["date", "hour", "aging"].includes(key)) throw `${key} is invalid`;
    currSplitScreen.fcstWarning.shortTerm[key] = value;
  },

  // 预报预警_短期预报_更新时间
  fw_update_short_term_time(state, payload) {
    const currSplitScreen = state["splitScreen" + state.ssIndex];
    const { date, hour } = payload;
    const shortTerm = currSplitScreen.fcstWarning.shortTerm;
    shortTerm.date = date;
    shortTerm.hour = hour;
  },
  // 预报预警_短期预报_更新时间列表
  fw_update_short_term_time_list(state, payload) {
    const currSplitScreen = state["splitScreen" + state.ssIndex];
    const { timeList } = payload;
    const shortTerm = currSplitScreen.fcstWarning.shortTerm;
    shortTerm.timeList = timeList;
  },

  // 预报预警_短时预报_条件更新 payload： {key: string, value: any}
  fw_update_short_time(state, payload) {
    const currSplitScreen = state["splitScreen" + state.ssIndex];
    const { key, value } = payload;
    const shortTime = currSplitScreen.fcstWarning.shortTime;
    if (!["eleList", "date"].includes(key)) throw `${key} is invalid`;
    if (key === "eleList") {
      shortTime.eleList.forEach(el => {
        el.checked = el.id === value;
      });
    } else if (key === "date") {
      shortTime.date = value;
    }
  },

  // 预报预警_短时预报_更新时间
  fw_update_short_time_time(state, payload) {
    const currSplitScreen = state["splitScreen" + state.ssIndex];
    const { date } = payload;
    const shortTime = currSplitScreen.fcstWarning.shortTime;
    shortTime.date = date;
  },
  // 预报预警_短时预报_更新时间列表
  fw_update_short_time_time_list(state, payload) {
    const currSplitScreen = state["splitScreen" + state.ssIndex];
    const { timeList } = payload;
    const shortTime = currSplitScreen.fcstWarning.shortTime;
    shortTime.timeList = timeList;
  },

  // 预报预警_预警信号_预警类型切换
  fw_switch_warn_type(state, id) {
    const currSplitScreen = state["splitScreen" + state.ssIndex];
    currSplitScreen.fcstWarning.currWarnId = id;
  },

  // 预报预警_国家预警_条件更新 payload： {key: string, value: any}
  fw_update_warn_state(state, payload) {
    const currSplitScreen = state["splitScreen" + state.ssIndex];
    const { key, value } = payload;
    if (!["date", "hour", "aging"].includes(key)) throw `${key} is invalid`;
    currSplitScreen.fcstWarning.stateWarn[key] = value;
  },

  // 预报预警_国家预警_更新时间
  fw_update_warn_state_time(state, payload) {
    const currSplitScreen = state["splitScreen" + state.ssIndex];
    const { date, hour } = payload;
    const stateWarn = currSplitScreen.fcstWarning.stateWarn;
    stateWarn.date = date;
    stateWarn.hour = hour;
  },

  // 预报预警_国家预警_更新时间列表
  fw_update_warn_state_time_list(state, payload) {
    const currSplitScreen = state["splitScreen" + state.ssIndex];
    const { timeList } = payload;
    const stateWarn = currSplitScreen.fcstWarning.stateWarn;
    stateWarn.timeList = timeList;
  },

  // 预报预警_省级预警_条件更新 payload： {key: string, value: any}
  fw_update_warn_province(state, payload) {
    const currSplitScreen = state["splitScreen" + state.ssIndex];
    const provinceWarn = currSplitScreen.fcstWarning.provinceWarn;
    const { key, value } = payload;
    if (!["date", "hour", "minute", "aging", "eleList"].includes(key))
      throw `${key} is invalid`;

    if (key === "eleList") {
      provinceWarn.eleList.forEach(el => {
        el.checked = el.id === value;
      });
    } else {
      provinceWarn[key] = value;
    }
  },

  // 预报预警_省级预警_更新时间
  fw_update_warn_province_time(state, payload) {
    const currSplitScreen = state["splitScreen" + state.ssIndex];
    const { date, hour, minute } = payload;
    const provinceWarn = currSplitScreen.fcstWarning.provinceWarn;
    provinceWarn.date = date;
    provinceWarn.hour = hour;
    provinceWarn.minute = minute;
  },
  // 预报预警_省级预警_更新时间列表
  fw_update_warn_province_time_list(state, payload) {
    const currSplitScreen = state["splitScreen" + state.ssIndex];
    const { timeList } = payload;
    const provinceWarn = currSplitScreen.fcstWarning.provinceWarn;
    provinceWarn.timeList = timeList;
  },

  // 数值预报_模式切换
  vf_switch_tabs(state, id) {
    const currSplitScreen = state["splitScreen" + state.ssIndex];
    currSplitScreen.currValueFcstId = id;
  },

  // 数值预报_要素分类切换
  vf_switch_element_tabs(state, id) {
    const currSplitScreen = state["splitScreen" + state.ssIndex];
    const curr = currSplitScreen.valueFcst.find(
      el => el.id === currSplitScreen.currValueFcstId
    );
    curr.typeEleId = id;
  },

  // 数值预报_更新时间
  vf_update_time(state, payload) {
    const currSplitScreen = state["splitScreen" + state.ssIndex];
    const { id, date, hour } = payload;
    const currModel = currSplitScreen.valueFcst.find(el => el.id === id);
    if (!currModel) throw `${id} is invalid`;
    currModel.date = date;
    currModel.hour = hour;
  },

  // 数值预报_更新时间列表
  vf_update_time_list(state, payload) {
    const currSplitScreen = state["splitScreen" + state.ssIndex];
    const { id, timeList } = payload;
    const currModel = currSplitScreen.valueFcst.find(el => el.id === id);
    if (!currModel) throw `${id} is invalid`;
    currModel.timeList = timeList;
  },

  // 数值预报_条件更新 payload： {sign: string, value: any}
  vf_update(state, payload) {
    const { sign, value } = payload;
    if (!["date", "hour", "aging", "level", "element"].includes(sign))
      throw `${sign} is invalid`;

    const currSplitScreen = state["splitScreen" + state.ssIndex];
    const curr = currSplitScreen.valueFcst.find(
      el => el.id === currSplitScreen.currValueFcstId
    );
    switch (sign) {
      case "date":
        curr.date = value;
        break;
      case "hour":
        curr.hour = value;
        break;
      case "aging":
        curr.aging = value;
        break;
      case "level":
        const currClass = curr.typeEleList.find(el => el.id === curr.typeEleId);
        currClass.level = value;
        break;
      case "element":
        curr.typeEleList.forEach(item => {
          item.eleList.forEach(el => {
            if (el.id === value) {
              el.checked = !el.checked;
            } else {
              el.checked = el.id === value;
            }
          });
        });
        break;
    }
  },

  // 添加某一要素的显示隐藏图层的配置 payload: {[idName string]: boolean}, 这里其实要添加一个删除的mutation，但考虑产生的数据不多而且不删除也没有什么负作用，所有就省略了
  add_show_hide_layer_option(state, payload) {
    const currSplitScreen = state["splitScreen" + state.ssIndex];
    currSplitScreen.showHideLayerHash = Object.assign(
      {},
      currSplitScreen.showHideLayerHash,
      payload
    );
  },

  //显示或者隐藏某一要素图层(showHideLayerHash中的键值都来自于add_show_hide_layer_option)
  show_hide_layer(state, id) {
    const currSplitScreen = state["splitScreen" + state.ssIndex];
    const showHideHash = currSplitScreen.showHideLayerHash;
    if (showHideHash[id] === undefined) throw `The ${id} doesn't exist`;
    // showHideHash[id] = !showHideHash[id];
    currSplitScreen.showHideLayerHash = Object.assign({}, showHideHash, {
      [id]: !showHideHash[id]
    });
  }
};
