import * as moment from "moment";

export default {

  // 当前分屏对象
  currSplitScreen(state) {
    return state["splitScreen" + state.ssIndex];
  },

  // 图层显隐控制对象（其中键表示要素配置中的id,即element-option.js中对象的键，值为布尔值，true表示隐藏图层，false表示显示图层）
  showHideLayerHash(state, getters) {
    return getters.currSplitScreen.showHideLayerHash;
  },


  // 格式化后的总控时间
  formatedZkTime(state, getters) {
    const currSs = getters.currSplitScreen;
    if (currSs.date) {
      return currSs.date.format('YYYYMMDD') + currSs.hour + currSs.minute;
    }
    return '';
  },


  // 强天气
  severeWeather(state, getters) {
    return getters.currSplitScreen.severeWeather;
  },

  // 云图
  cloudPicture(state, getters) {
    return getters.currSplitScreen.cloudPicture;
  },

  // pup拼图
  pup(state, getters) {
    return getters.currSplitScreen.pup;
  },

  // 自动站
  station(state, getters) {
    return getters.currSplitScreen.station;
  },

  // SWAN拼图
  swan(state, getters) {
    return getters.currSplitScreen.swan;
  },

  // 单站pup
  stationPup(state, getters) {
    return getters.currSplitScreen.stationPup;
  },

  // 预报预警
  fcstWarning(state, getters) {
    return getters.currSplitScreen.fcstWarning;
  },

  // 数值预报
  valueFcst(state, getters) {
    return getters.currSplitScreen.valueFcst;
  },

  // 雷达特征量
  radarFeature(state, getters) {
    return getters.currSplitScreen.radarFeature;
  }

};
