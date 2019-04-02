export default {
  printInfo(state) {
    const allEleList = this.getAllElements(state);
    const hash = {};
    allEleList.forEach(el => {
      const { id, name, dataType } = el;
      hash[id] = { id, name, dataType };
    });
    console.log(JSON.stringify(hash, null, "\t"));
  },
  // 得到强天气所有要素
  getSwElements(state) {
    const currSplitScreen = state["splitScreen" + state.ssIndex];
    // 将强天气下的所有要素合并到一块
    const severeWeather = currSplitScreen.severeWeather;
    return [
      ...severeWeather.hourEleList,
      ...severeWeather.fy4EleList,
      ...severeWeather.traceEleList
    ];
  },
  // 得到云图所有要素
  getCpElements(state) {
    const currSplitScreen = state["splitScreen" + state.ssIndex];
    // 将云图下的所有要素合并到一块
    const cloudPicture = currSplitScreen.cloudPicture;
    return cloudPicture.tabList.reduce((curr, item) => {
      if (item.classifyList) {
        curr = curr.concat(
          item.classifyList.reduce(
            (inCurr, el) => inCurr.concat(el.eleList),
            []
          )
        );
      } else {
        curr = curr.concat(item.eleList);
      }
      return curr;
    }, []);
  },

  // 得到pup拼图所有要素
  getPpElements(state) {
    const currSplitScreen = state["splitScreen" + state.ssIndex];
    const pup = currSplitScreen.pup;
    return pup.pupEleList;
  },

  // 得到SWAN拼图所有要素
  getSnElements(state) {
    const currSplitScreen = state["splitScreen" + state.ssIndex];
    const swan = currSplitScreen.swan;
    return swan.eleList;
  },

  // 得到自动站所有要素
  getStElements(state) {
    const currSplitScreen = state["splitScreen" + state.ssIndex];
    const station = currSplitScreen.station;
    return [
      ...station.hourEleList,
      ...station.otherEleList,
      ...station.warnEleList
    ];
  },

  // 得到雷达特征量所有要素
  getRfElements(state) {
    const currSplitScreen = state["splitScreen" + state.ssIndex];
    return currSplitScreen.radarFeature;
  },

  // 得到所有要素
  getAllElements(state) {
    const swEleList = this.getSwElements(state);
    const cpEleList = this.getCpElements(state);
    const ppEleList = this.getPpElements(state);
    const stEleList = this.getStElements(state);
    const snEleList = this.getSnElements(state);
    const rfEleList = this.getRfElements(state);
    return [
      ...swEleList,
      ...cpEleList,
      ...ppEleList,
      ...stEleList,
      ...snEleList,
      ...rfEleList
    ];
  }
};
