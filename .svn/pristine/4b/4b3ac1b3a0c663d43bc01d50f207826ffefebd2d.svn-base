import * as moment from "moment";
import L from "leaflet";
import _ from "lodash";
import * as axios from "axios";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapGetters, mapMutations } = createNamespacedHelpers(
  "synthesis"
);
import eleOption from "../element-option";
import "../../../assets/js/leaflet-rh";
import "../../../assets/js/leaflet-markercluster/leaflet.markercluster";

// import * as d3 from 'd3';
// import * as d3Contour from 'd3-contour';
// console.log(d3);

export default {
  name: "maps",
  components: {},
  props: {
    elementInfo: {
      type: Object
    }
  },
  data() {
    return {
      isShowBaseLayerPanel: false,
      isVoice: true,
      isSync: true,
      isFullScreenshot: false,
      isAreaScreenshot: false,
      splitScreenNumber: 1, //当前分屏数，1：1分屏，2：2分屏， 4：4分屏
      mapIds: ["map1", "map2", "map3", "map4"],
      mapLayer1: {},
      mapLayer2: {},
      mapLayer3: {},
      mapLayer4: {}
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
    currMapId() {
      return "map" + this.ssIndex;
    },
    currMapLayer() {
      return this["mapLayer" + this.ssIndex];
    },
    currMap() {
      return this["map" + this.ssIndex];
    }
  },
  watch: {
    currMapId() {
      if (this.isSync) {
        this.syncMap();
      }
    },
    isSync(isSync) {
      if (isSync) {
        this.syncMap();
      } else {
        this.mapIds.forEach(id => {
          this[id].off("moveend");
        });
      }
    },

    // 图层的显示隐藏
    showHideLayerHash(hash, oldHash) {
      for (const key in hash) {
        const newVal = hash[key];
        const oldVal = oldHash[key];
        if (oldVal !== undefined && newVal !== oldVal) {
          // console.log(hash, oldHash);
          const layer = this.currMapLayer[key];
          if (layer) {
            if (newVal) {
              layer.remove();
            } else {
              layer.addTo(this.currMap);
            }
            // console.log(layer);
          }
        }
      }
    }
  },
  created() {
    this.debouncedLc = _.debounce(this.layerController, 300);
    this.debouncedLcSationPup = _.debounce(
      this.layerController_stationPup,
      300
    );
  },
  mounted() {
    this.$message.config({ top: "100px", duration: 1 });
    this.initMap();

    // 订阅store中的mutations(只需要其中的一部分)
    this.cancelSubscribe = this.$store.subscribe((mutation, state) => {
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

        case "synthesis/select_base_layer":
          this.renderBaseLayer();
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
      "cut_split_screen",
      "select_base_layer",
      "select_layer_element",
      "select_all_layer_element"
    ]),

    updateElementInfo(typeName, eleInfo) {
      // console.log(eleInfo.name);
      if (typeName === "normal") {
        // this.debouncedLc(eleInfo);
        this.layerController(eleInfo);
      } else if (typeName === "stationPup") {
        //单站pup
        // this.debouncedLcSationPup();
        this.layerController_stationPup();
      }
    },

    fcstWarnAndValueFcstInfo(type) {
      const infoList = [];
      switch (type) {
        case "fw_short_term":
          {
            let { date, hour, aging } = this.fcstWarning.shortTerm;
            aging = this.formatAging(aging);
            const { typeName } = eleOption.fw_short_term;
            const checked = aging !== "";
            const id = "fw_short_term";
            if (checked) {
              if (date) {
                const latestTime = date.format("YYYYMMDD") + hour + "00";
                infoList.push({
                  id,
                  checked,
                  latestTime,
                  aging
                });
              } else {
                const message = typeName + (aging ? "(" + aging + "h)" : "");
                this.$message.warning(message + "暂无数据!");
              }
            } else {
              infoList.push({
                id,
                checked
              });
            }
          }
          break;
        case "fw_short_time":
          {
            const { date, eleList } = this.fcstWarning.shortTime;
            const { typeName } = eleOption.fw_short_time;
            const checkedEle = eleList.find(el => el.checked);
            const id = "fw_short_time";
            if (checkedEle) {
              //有值即代表选中
              if (date) {
                infoList.push({
                  id,
                  checked: true,
                  latestTime: date,
                  pathId: checkedEle.pathId
                });
              } else {
                const message = typeName + "(" + checkedEle.name + ")";
                this.$message.warning(message + "暂无数据!");
              }
            } else {
              infoList.push({
                checked: false,
                id
              });
            }
          }
          break;
        case "fw_warn_state":
          {
            let { date, hour, aging } = this.fcstWarning.stateWarn;
            aging = this.formatAging(aging);
            const { typeName } = eleOption.fw_warn_state;
            const checked = aging !== "";
            const id = "fw_warn_state";
            if (checked) {
              if (date) {
                const latestTime = date.format("YYYYMMDD") + hour + "00";
                infoList.push({
                  id,
                  checked,
                  latestTime,
                  aging
                });
              } else {
                const message = typeName + "(" + aging + "h)";
                this.$message.warning(message + "暂无数据!");
              }
            } else {
              infoList.push({
                checked,
                id
              });
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
              eleList
            } = this.fcstWarning.provinceWarn;
            const { typeName } = eleOption.fw_warn_province;
            const checkedEle = eleList.find(el => el.checked);
            const id = "fw_warn_province";
            if (checkedEle) {
              if (date) {
                const latestTime = date.format("YYYYMMDD") + hour + minute;
                infoList.push({
                  id,
                  checked: true,
                  latestTime,
                  pathId: checkedEle.pathId,
                  aging
                });
              } else {
                const message = typeName + "(" + checkedEle.name + aging + "h)";
                this.$message.warning(message + "暂无数据!");
              }
            } else {
              infoList.push({
                checked: false,
                id
              });
            }
          }
          break;
        case "vf":
          this.valueFcst.forEach(typeItem => {
            const { id, date, hour, aging, typeEleList, typeEleId } = typeItem;
            const currType = typeEleList.find(el => el.id === typeEleId);
            const currEle = currType.eleList.find(el => el.checked);
            const manageId = "vf_" + id;
            const { typeName } = eleOption[manageId];
            if (currEle) {
              if (date) {
                const latestTime = date.format("YYYYMMDD") + hour + "00";
                const level = currEle.type === "无层次" ? "" : currType.level;
                infoList.push({
                  id: manageId,
                  checked: true,
                  latestTime,
                  pathId: currEle.pathId,
                  aging,
                  level
                });
              } else {
                const message = typeName + "(" + currEle.name + aging + ")";
                this.$message.warning(message + "暂无数据!");
              }
            } else {
              infoList.push({
                checked: false,
                id: manageId
              });
            }
          });
          break;
      }

      // console.log(infoList);
      infoList.forEach(el => {
        if (el.checked) {
          this.renderElementData(el);
        } else {
          this.removeLayersById(el.id);
        }
      });
    },

    initMap() {
      this.mapIds.forEach((id, i) => {
        this[id] = L.map(id, {
          center: [37.17782559332976, 107.314453125],
          zoom: 5,
          minZoom: 4,
          maxZoom: 13,
          attributionControl: false,
          zoomControl: false
        });

        // L.control
        //   .zoom({
        //     position: id === "map2" || id === "map4" ? "topleft" : "topright"
        //   })
        //   .addTo(this[id]);

        this["mapLayer" + (i + 1)]["default"] = L.tileLayer(
          eleOption.default.path,
          { zIndex: 0 }
        ).addTo(this[id]);

        this["mapLayer" + (i + 1)]["layer_ele_boundary"] = L.tileLayer(
          eleOption.layer_ele_boundary.path,
          { zIndex: 700 }
        ).addTo(this[id]);

        this["mapLayer" + (i + 1)]["layer_ele_point_name"] = L.tileLayer(
          eleOption.layer_ele_point_name.path,
          { zIndex: 700 }
        ).addTo(this[id]);

        this["mapLayer" + (i + 1)]["layer_ele_river"] = L.tileLayer(
          eleOption.layer_ele_river.path,
          { zIndex: 700 }
        ).addTo(this[id]);
      });

      if (this.isSync) {
        this.syncMap();
      }
    },

    // 分屏结束时
    onSplitScreenEnd(event) {
      if (event.propertyName === "width" || event.propertyName === "height") {
        const mapId = event.target.id.split("_")[1];
        // console.log(mapId);
        this[mapId]._onResize();
      }
    },

    // 切换分屏
    onClickSwitchSplitScreen(index) {
      this.cut_split_screen(index);
    },

    // 同步地图操作
    syncMap() {
      const currMap = this[this.currMapId];
      this.mapIds.forEach(id => {
        this[id].off("moveend");
      });
      currMap.on("moveend", e => {
        const center = currMap.getCenter();
        const zoom = currMap.getZoom();
        // console.log(center, zoom);
        this.mapIds.forEach(id => {
          if (id === this.currMapId) return;
          this[id].flyTo(center, zoom);
        });
      });
    },

    // 图层控制器(添加与删除图层)
    layerController(elementInfo) {
      const checked = elementInfo.checked;
      // 选中
      if (checked) {
        // 选中但没有时间
        if (
          (elementInfo.latestTime === undefined && !elementInfo.time) ||
          elementInfo.latestTime === ""
        ) {
          this.$message.warning(elementInfo.name + "暂无数据!");
          return;
        }
        this.requestData(elementInfo);
        return;
      }

      // 未选中
      this.removeLayersById(elementInfo.id);
    },

    // 请求数据
    requestData(elementInfo) {
      if (elementInfo.conditionKey === "currAcc") {
        //强天气>累计: 将conditionValue中的值更新到currAcc上
        elementInfo.currAcc = elementInfo.conditionValue;
      } else if (elementInfo.conditionKey === "currObserve") {
        //强天气>观测: 将conditionValue中的值更新到currAcc上
        elementInfo.currObserve = elementInfo.conditionValue;
      } else if (elementInfo.latestTime === undefined) {
        //所有: 将时间更新到latestTime
        elementInfo.latestTime = elementInfo.time;
      } else if (
        elementInfo.currAging &&
        elementInfo.latestAging === undefined
      ) {
        //云图: 将时效更新到latestAging
        elementInfo.latestAging = elementInfo.currAging;
      } else if (
        elementInfo.currThreshold &&
        elementInfo.latestThreshold === undefined
      ) {
        //自动站: 将阀值更新到latestThreshold
        elementInfo.latestThreshold = elementInfo.currThreshold;
      } else if (
        elementInfo.currLevel &&
        elementInfo.latestLevel === undefined
      ) {
        //SWAN拼图: 层次更新
        elementInfo.latestLevel = elementInfo.currLevel;
      }

      this.renderElementData(elementInfo);
    },

    // 单站pup:图层控制器(添加与删除图层)
    layerController_stationPup() {
      // console.log(this.stationPup);
      const {
        moduleId,
        currEleTime,
        currEleId,
        currStationId
      } = this.stationPup;
      const elementInfo = {
        id: moduleId,
        latestTime: currEleTime,
        currEleId,
        currStationId
      };

      if (currEleTime) {
        if (currEleId) {
          this.renderElementData(elementInfo);
        } else {
          this.removeLayersById(elementInfo.id);
        }
      } else {
        this.$message.warning("单站pup暂无数据!");
      }
    },

    // 基础图层切换
    renderBaseLayer() {
      const currBaseLayerId = this.currSplitScreen.currBaseLayerId;
      const baseLayerList = this.currSplitScreen.baseLayerList;
      const currEleOption = eleOption[currBaseLayerId];

      this.tileLayerRender(currEleOption.id, currEleOption.path);
      baseLayerList.forEach(el => {
        if (el.id === currBaseLayerId || el.id === "default") return;
        this.removeLayer(el.id);
      });

      this.select_all_layer_element(currBaseLayerId !== "xingzheng");
      this.currSplitScreen.layerElementList.forEach(item => {
        const currEleOption = eleOption[item.id];
        this.removeLayer(item.id);
        if (item.checked) {
          this.tileLayerRender(currEleOption.id, currEleOption.path, 700);
        }
      });
    },

    // 基础图层要素切换(边界线，行政点名称，河流等)
    onClickSelectLayerElement(item) {
      this.select_layer_element(item.id);
      const currEleOption = eleOption[item.id];
      this.removeLayer(item.id);
      if (item.checked) {
        this.tileLayerRender(currEleOption.id, currEleOption.path, 700);
      }
    },

    // 渲染要素数据
    renderElementData(elementInfo) {
      const path = eleOption.getPath(elementInfo);
      const currEleOption = eleOption[elementInfo.id];
      const dataType = currEleOption.dataType;
      // console.log(dataType);
      switch (dataType) {
        case "tile":
          this.tileLayerRender(currEleOption.id, path);
          break;
        case "imageOverlay":
          this.imageOverlayLayerRender(currEleOption.id, path);
          break;
        case "text":
          this.textLayerRender(currEleOption.id, path);
          break;
        case "dat":
          this.datLayerRender(currEleOption.id, path);
          break;
        case "plot10min":
          this.plot10minLayerRender(elementInfo, path);
          break;
        case "PupMosaicJson58":
          this.pupMosaicJson58LayerRender(elementInfo, path);
          break;
        case "PupMosaicJson59":
          this.pupMosaicJson59LayerRender(elementInfo, path);
          break;
        case "PupMosaicJson60":
          this.pupMosaicJson60LayerRender(elementInfo, path);
          break;
        case "PupMosaicJson61":
          this.pupMosaicJson61LayerRender(elementInfo, path);
          break;
        case "PupMosaicJson62":
          this.pupMosaicJson62LayerRender(elementInfo, path);
          break;
      }
    },

    // 添加tile图层
    tileLayerRender(id, path, zIndex) {
      zIndex = zIndex === undefined ? eleOption[id].zIndex : zIndex;

      if (!this.currMapLayer[id]) {
      }
      const layer = L.tileLayer(path, { zIndex });
      this.storeLayersById(id, layer);
      this.removeLayer(id);
      this.currMapLayer[id] = layer;
      this.addLayer(id, layer);

      // console.log(this.currMapLayer);
      // console.log(layer);
    },

    // 添加imageOverlay图层
    imageOverlayLayerRender(id, path) {
      const { place, zIndex } = eleOption[id];
      const renderImage = place => {
        const imageBounds = L.latLngBounds(
          L.latLng(place.south, place.west),
          L.latLng(place.north, place.east)
        );
        const layer = L.imageOverlay(path, imageBounds, {
          pane: "tilePane",
          zIndex
        });
        this.storeLayersById(id, layer);
        layer.on("load", () => {
          this.removeLayer(id);
          this.currMapLayer[id] = layer;
        });
        layer.on("error", () => {
          this.removeLayer(id);
          this.currMapLayer[id] = layer;
        });
        this.addLayer(id, layer);
      };
      if (place) {
        renderImage(place);
        return;
      }

      const CancelToken = axios.CancelToken;
      this.cancelRequest(id);
      axios
        .get(path + ".json", {
          cancelToken: new CancelToken(c => {
            let tokenList = this.currMapLayer[id + "_token"];
            if (!tokenList) {
              tokenList = this.currMapLayer[id + "_token"] = [];
            }
            tokenList.push(c);
          })
        })
        .then(data => {
          const place = data.data;
          renderImage(place);
        });
    },

    // 添加text图层
    textLayerRender(id, path) {
      const CancelToken = axios.CancelToken;
      this.cancelRequest(id);
      axios
        .get(path, {
          cancelToken: new CancelToken(c => {
            let tokenList = this.currMapLayer[id + "_token"];
            if (!tokenList) {
              tokenList = this.currMapLayer[id + "_token"] = [];
            }
            tokenList.push(c);
          })
        })
        .then(data => {
          this.removeLayer(id);
          const layer = L.RH.lightningLayer({});
          layer.parseM4Data(data.data);
          // layer.addTo(this.currMap);
          this.storeLayersById(id, layer);
          this.currMapLayer[id] = layer;
          this.addLayer(id, layer);
        });
    },

    // 添加dat图层
    datLayerRender(id, path) {
      const CancelToken = axios.CancelToken;
      this.cancelRequest(id);
      axios
        .get(path, {
          cancelToken: new CancelToken(c => {
            let tokenList = this.currMapLayer[id + "_token"];
            if (!tokenList) {
              tokenList = this.currMapLayer[id + "_token"] = [];
            }
            tokenList.push(c);
          })
        })
        .then(data => {
          const gridData = parseM4Data(data.data);
          const currEleOption = eleOption[id];
          const { clevels, ccolors } = currEleOption;
          this.gridDataToShade(id, gridData, clevels, ccolors);
        });
    },

    gridDataToShade(id, GridData, clevels, ccolors) {
      var n = GridData.lonCount,
        m = GridData.latCount,
        lonstart = GridData.startLon,
        latstart = GridData.startLat,
        longap = GridData.lonStep,
        latgap = GridData.latStep,
        values = [];

      var min = null;
      var max = null;

      for (var i = 0; i < GridData.DS.length; i++) {
        var v = GridData.DS[i];

        if (v === 9999 || v === 9999.0) {
          v = null;
        }

        if (min === null || (v !== null && v < min)) {
          min = v;
        }

        if (max === null || (v !== null && v > max)) {
          max = v;
        }

        values.push(v === null ? -9999 : v);
      }

      if (clevels.length * 4 != ccolors.length) {
        throw new Error("ccolors length is not equal to clevels x 4");
      }

      var colorMap = {};
      for (var i = 0; i < clevels.length; i++) {
        let val = clevels[i];

        colorMap["" + val] = [
          ccolors[i * 4],
          ccolors[i * 4 + 1],
          ccolors[i * 4 + 2],
          ccolors[i * 4 + 3]
        ];
      }

      var thresholds = clevels;

      var contours = d3Contour
        .contours()
        .size([n, m])
        .smooth(true)
        .thresholds(thresholds)(values);

      for (var s = 0; s < contours.length; s++) {
        var d = contours[s];

        for (var i = 0; i < d.coordinates.length; i++) {
          for (var k = 0; k < d.coordinates[i].length; k++) {
            for (var j = 0; j < d.coordinates[i][k].length; j++) {
              var entity = d.coordinates[i][k][j];

              var a0 = entity[0];
              var a1 = entity[1];

              entity[0] = lonstart + a0 * longap;
              entity[1] = latstart + a1 * latgap;
            }
          }
        }
      }

      var geoJson = { type: "FeatureCollection", features: contours };

      var layer = L.geoJSON(geoJson, {
        pane: "tilePane",
        style: feature => {
          var v = feature.geometry.value;

          var cor = colorMap["" + v];

          return {
            weight: 0,
            fillOpacity: cor[3] / 255,
            color: "rgb(" + cor[0] + "," + cor[1] + "," + cor[2] + ")"
          };
        }
      });
      this.removeLayer(id);
      // layer.addTo(this.currMap);
      this.storeLayersById(id, layer);
      this.addLayer(id, layer);
    },

    // 添加plot10min图层
    plot10minLayerRender(elementInfo, path) {
      const CancelToken = axios.CancelToken;
      this.cancelRequest(elementInfo.id);
      axios
        .get(path, {
          cancelToken: new CancelToken(c => {
            let tokenList = this.currMapLayer[elementInfo.id + "_token"];
            if (!tokenList) {
              tokenList = this.currMapLayer[elementInfo.id + "_token"] = [];
            }
            tokenList.push(c);
          })
        })
        .then(data => {
          data = data.data;
          if (data != null) {
            //判断是否有数据
            if (data.substring && data.substring(1, 4) == "PNG") {
              // getErrorPrompt("自动站降水," + time);
            }
            var datas = [];
            for (var i = 0; i < data.features.length; i++) {
              var feature = data.features[i].geometry;
              feature.type = this.capitalizeFirstLetter(feature.type);
              datas.push({
                latlng: feature.coordinates,
                properties: data.features[i].properties
              });
            }
            if (elementInfo.name === "极大风") {
              this.zdzWindRender(elementInfo, datas);
            } else {
              this.zdzCommonRender(elementInfo, datas);
            }
          }
        });
    },
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },

    // 自动站报警--wind
    zdzWindRender(elementInfo, datas) {
      const threshold = elementInfo.latestThreshold;
      var zdzDatas = [];
      for (var i = 0; i < datas.length; i++) {
        var item = datas[i];
        const { ID, WS, WD, T, R, MaxWind_Time } = item.properties;
        if (WS != 9999 && WD != 9999) {
          if (WS >= threshold) {
            zdzDatas.push({
              stationId: ID,
              stationName: "",
              lng: item.latlng[0],
              lat: item.latlng[1],
              datas: [WS, null, null, null],
              datasVisibilityMask: [true, false, false, false],
              showAnyway: true,
              windSD: {
                speed: WS,
                dir: WD
              },
              stationImageUrl: null,
              properties: { ID, WS, WD, T, R, MaxWind_Time },
              vaneColorFn: function(speed, direcation) {
                var ret = "black";
                if (speed >= 17 && speed < 25) {
                  ret = "#F0F";
                } else if (speed >= 25 && speed < 30) {
                  ret = "#FF6600";
                } else if (speed >= 30) {
                  ret = "#211551";
                }
                return ret;
              }
            });
          }
        }
      }

      var windLayer = L.RH.zdzLayer({
        clickHandler: item => {
          if (this._popup) {
            this._popup.remove();
            this._popup = null;
          }
          setTimeout(() => {
            this._popup = L.popup({ maxWidth: 500 })
              .setLatLng(L.latLng(item.lat, item.lng))
              .setContent('<div class="my-marker-cluster-popup">xxxxx</div>')
              .openOn(this.currMap);
            console.log(this._popup);
            this.getZdzInfo(this._popup, {
              ...item.properties,
              id: item.stationId
            });
          });
        }
      });
      windLayer.setData(zdzDatas);

      this.removeLayer(elementInfo.id);
      this.currMapLayer[elementInfo.id] = windLayer;
      this.storeLayersById(id, windLayer);
      const isHideLayer = this.showHideLayerHash[elementInfo.id].isHideLayer;
      if (!isHideLayer) {
        this.currMap.addLayer(windLayer);
      }
    },

    // 自动站报警-rain,temp
    zdzCommonRender(elementInfo, datas) {
      const eleNameHash = {
        降水: "R",
        // "极大风": "WS",
        "温度>": "T",
        "温度<": "T"
      };
      const eleKey = eleNameHash[elementInfo.name];
      const threshold = elementInfo.latestThreshold;

      var markers = L.markerClusterGroup({
        showCoverageOnHover: false,
        maxClusterRadius: 50,
        iconCreateFunction: function(cluster) {
          var markers = cluster.getAllChildMarkers();
          const extMarker = markers.slice().sort((a, b) => {
            if (elementInfo.name === "温度<") {
              return a._myData.currData - b._myData.currData;
            }
            return b._myData.currData - a._myData.currData;
          })[0];
          const { id, currData } = extMarker._myData;
          let isWarning = false;
          if (elementInfo.name === "温度<") {
            isWarning = currData <= threshold;
          } else {
            isWarning = currData >= threshold;
          }
          const icon = new L.DivIcon({
            className:
              "my-marker-cluster" + (isWarning ? " my-marker-ani" : ""),
            html: `<div>${currData}</div>`,
            iconSize: new L.Point(40, 40)
          });
          return icon;
        }
      });

      datas.forEach((item, i) => {
        const props = item.properties;
        const id = props["ID"];
        const currData = props[eleKey];
        if (currData === undefined || currData == 9999) return;

        let isWarning = false;
        if (elementInfo.name === "温度<") {
          isWarning = currData <= threshold;
        } else {
          isWarning = currData >= threshold;
        }

        const myIcon = L.divIcon({
          className:
            "my-marker-cluster-marker" + (isWarning ? " my-marker-ani" : ""),
          html: `<div>${currData}</div>`
        });
        const marker = L.marker(new L.LatLng(item.latlng[1], item.latlng[0]), {
          icon: myIcon
        });
        marker._myData = { id, currData };
        marker.bindPopup('<div class="my-marker-cluster-popup"></div>', {
          maxWidth: 500
        });

        marker.on("click", () => {
          this.getZdzInfo(marker, { ...props, id }, false);
        });

        markers.addLayer(marker);
      });

      this.removeLayer(elementInfo.id);
      this.currMapLayer[elementInfo.id] = markers;
      this.storeLayersById(id, markers);
      const isHideLayer = this.showHideLayerHash[elementInfo.id].isHideLayer;
      if (!isHideLayer) {
        this.currMap.addLayer(markers);
      }
    },

    getZdzInfo(obj, props, isPopup = true) {
      const params = new URLSearchParams();
      params.append("stationId", this.getStationId(props.id));
      axios
        .post("/proxy/10.20.67.111/stweather/StationDataInfoServlet", params)
        .then(data => {
          const name = data.data;
          obj[
            isPopup ? "setContent" : "setPopupContent"
          ](`<div class="my-marker-cluster-popup">
            <ul>
              <li>
                <div>
                  <span>站号:</span>
                  <span>${props.id}</span>
                </div>
                <div>
                  <span>站名:</span>
                  <span>${name}</span>
                </div>
              </li>
              <li>
                <div>
                  <span>降水:</span>
                  <span>${props.R === undefined ? "" : props.R}mm</span>
                </div>
                <div>
                  <span>温度:</span>
                  <span>${props.T === undefined ? "" : props.T}℃</span>
                </div>
              </li>
              <li>
                <div>
                  <span>风力:</span>
                  <span>${props.WS === undefined ? "" : props.WS}m/s</span>
                </div>
                <div>
                  <span>风向:</span>
                  <span>${props.WD === undefined ? "" : props.WD}</span>
                </div>
              </li>
              <li>
                <div>
                  <span>极大风出现时间:</span>
                  <span>${
                    props.MaxWind_Time === undefined ? "" : props.MaxWind_Time
                  }</span>
                </div>
              </li>
            </ul>
            </div>`);
        });
    },

    getStationId(id) {
      id = id + "";
      return String.fromCharCode(id.slice(0, 2)) + id.slice(2);
    },

    pupMosaicJson58LayerRender(elementInfo, path) {
      const CancelToken = axios.CancelToken;
      this.cancelRequest(elementInfo.id);
      axios
        .get(path, {
          cancelToken: new CancelToken(c => {
            let tokenList = this.currMapLayer[elementInfo.id + "_token"];
            if (!tokenList) {
              tokenList = this.currMapLayer[elementInfo.id + "_token"] = [];
            }
            tokenList.push(c);
          })
        })
        .then(data => {
          const dataList = data.data.features;
          console.log(dataList);

          var markers = L.markerClusterGroup({
            showCoverageOnHover: false,
            maxClusterRadius: 50,
            iconCreateFunction: function(cluster) {
              const icon = new L.DivIcon({
                className: "my-marker-cluster-yellow icon-fbzz my-marker-ani",
                html: '',
                iconSize: new L.Point(40, 40)
              });
              return icon;
            }
          });

          dataList.forEach((item, i) => {
            const props = item.properties;

            const myIcon = L.divIcon({
              className: "my-marker-yellow icon-fbzz my-marker-ani",
              html: `<div>${props.id}</div>`
            });
            const marker = L.marker(
              new L.LatLng(props.lat, props.lon),
              {
                icon: myIcon
              }
            );
            marker.bindPopup('<div class="my-marker-cluster-popup">xxxxxx</div>', {
              maxWidth: 500
            });
            markers.addLayer(marker);
          });

          this.removeLayer(elementInfo.id);
          this.currMapLayer[elementInfo.id] = markers;
          this.storeLayersById(elementInfo.id, markers);
          const isHideLayer = this.showHideLayerHash[elementInfo.id]
            .isHideLayer;
          if (!isHideLayer) {
            this.currMap.addLayer(markers);
          }
        });
    },
    pupMosaicJson59LayerRender(elementInfo, path) {
      const CancelToken = axios.CancelToken;
      this.cancelRequest(elementInfo.id);
      axios
        .get(path, {
          cancelToken: new CancelToken(c => {
            let tokenList = this.currMapLayer[elementInfo.id + "_token"];
            if (!tokenList) {
              tokenList = this.currMapLayer[elementInfo.id + "_token"] = [];
            }
            tokenList.push(c);
          })
        })
        .then(data => {
          const dataList = data.data.features;
          console.log(dataList);

          var markers = L.markerClusterGroup({
            showCoverageOnHover: false,
            maxClusterRadius: 50,
            iconCreateFunction: function(cluster) {
              const icon = new L.DivIcon({
                className: "my-marker-cluster-yellow icon-bbzs my-marker-ani",
                html: '',
                iconSize: new L.Point(40, 40)
              });
              return icon;
            }
          });

          dataList.forEach((item, i) => {
            const props = item.properties;

            const myIcon = L.divIcon({
              className: "my-marker-yellow icon-bbzs my-marker-ani",
              html: ``,
              iconSize: new L.Point(40, 40)
            });
            const marker = L.marker(
              new L.LatLng(props.lat, props.lon),
              {
                icon: myIcon
              }
            );
            marker.bindPopup('<div class="my-marker-cluster-popup">xxxxxx</div>', {
              maxWidth: 500
            });
            markers.addLayer(marker);
          });

          this.removeLayer(elementInfo.id);
          this.currMapLayer[elementInfo.id] = markers;
          this.storeLayersById(elementInfo.id, markers);
          const isHideLayer = this.showHideLayerHash[elementInfo.id]
            .isHideLayer;
          if (!isHideLayer) {
            this.currMap.addLayer(markers);
          }



        });
    },
    pupMosaicJson60LayerRender(elementInfo, path) {
      const CancelToken = axios.CancelToken;
      this.cancelRequest(elementInfo.id);
      axios
        .get(path, {
          cancelToken: new CancelToken(c => {
            let tokenList = this.currMapLayer[elementInfo.id + "_token"];
            if (!tokenList) {
              tokenList = this.currMapLayer[elementInfo.id + "_token"] = [];
            }
            tokenList.push(c);
          })
        })
        .then(data => {
          const dataList = data.data.features;
          console.log(dataList);
        });
    },
    pupMosaicJson61LayerRender(elementInfo, path) {
      const CancelToken = axios.CancelToken;
      this.cancelRequest(elementInfo.id);
      axios
        .get(path, {
          cancelToken: new CancelToken(c => {
            let tokenList = this.currMapLayer[elementInfo.id + "_token"];
            if (!tokenList) {
              tokenList = this.currMapLayer[elementInfo.id + "_token"] = [];
            }
            tokenList.push(c);
          })
        })
        .then(data => {
          const dataList = data.data.features;
          console.log(dataList);
        });
    },
    pupMosaicJson62LayerRender(elementInfo, path) {
      const CancelToken = axios.CancelToken;
      this.cancelRequest(elementInfo.id);
      axios
        .get(path, {
          cancelToken: new CancelToken(c => {
            let tokenList = this.currMapLayer[elementInfo.id + "_token"];
            if (!tokenList) {
              tokenList = this.currMapLayer[elementInfo.id + "_token"] = [];
            }
            tokenList.push(c);
          })
        })
        .then(data => {
          const dataList = data.data.features;
          console.log(dataList);
        });
    },

    // 存储指定要素下所有加载的图层
    storeLayersById(id, layer) {
      id = "all_layer_" + id;
      let layers = this.currMapLayer[id];
      if (!Array.isArray(layers)) {
        layers = this.currMapLayer[id] = [];
      }
      layers.push(layer);
    },

    // 添加图层
    addLayer(id, layer) {
      let isShowLayer;
      if (this.showHideLayerHash[id] === undefined) {
        isShowLayer = true;
      } else {
        isShowLayer = !this.showHideLayerHash[id].isHideLayer;
      }
      if (isShowLayer) {
        layer.addTo(this.currMap);
      }
    },

    // 删除指定要素下所有加载的图层
    removeLayersById(id) {
      id = "all_layer_" + id;
      let layers = this.currMapLayer[id];
      if (Array.isArray(layers)) {
        layers.forEach(lr => lr.remove());
        this.currMapLayer[id] = [];
      }
    },

    // 删除图层
    removeLayer(id) {
      const layer = this.currMapLayer[id];
      if (layer) {
        layer.remove();
        this.currMapLayer[id] = null;
      }
    },

    // 取消请求
    cancelRequest(id) {
      const tokenList = this.currMapLayer[id + "_token"];
      if (tokenList && Array.isArray(tokenList)) {
        tokenList.forEach(c => c());
        this.currMapLayer[id + "_token"] = null;
      }
    },

    // 格式化时效
    formatAging(aging) {
      const leng = ("" + aging).length;
      if (leng === 1) {
        aging = "00" + aging;
      } else if (leng === 2) {
        aging = "0" + aging;
      }
      return aging;
    }
  }
};
