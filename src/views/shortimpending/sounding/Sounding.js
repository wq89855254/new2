import * as moment from "moment";
import * as axios from "axios";
import { ClassifyTitle } from "../common";
import { TimeSelect, MapNav } from "../../../components/share";

export default {
  name: "sounding",
  components: { ClassifyTitle, TimeSelect, MapNav },
  props: {
    fy4Aging: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      currDataType: "act",
      currImgType: "NCEP",

      actDate: '',
      actHour: "08",
      actHourList: ["08", "14", "20"],

      fcstNcepDate: '',
      fcstNcepHour: "02",
      fcstNcepHourList: ["02", "08", "14", "20"],

      fcstListDate: '',
      fcstListHour: "02",
      fcstListHourList: ["02", "08", "14", "20"],

      fy4Date: moment("2018-11-07", "YYYY-MM-DD"),
      fy4Hour: "00",
      fy4HourList: ["00", "12"],
      stationInfo: {},
      province: "北京市",
      stationId: 54511,
      fy4PlaceId: 1,
      fcstPlaceInfos: [],
      fy4PlaceList: []
    };
  },
  computed: {
    actPlaceList() {
      let list = [];
      for (const key in this.stationInfo) {
        list = list.concat(this.stationInfo[key]);
      }
      return list;
    },
    fcstPlaceList() {
      return this.fcstPlaceInfos.map(el => ({ ...el, name: "" }));
    }
  },

  watch: {
    stationId(stationId) {
      if (this.currDataType === "act") {
        this.province = this.actPlaceList.find(
          el => el.number === stationId
        ).province;
      }
      this.emitEvent(this.currDataType);
    },
    fy4PlaceId() {
      this.emitEvent("fy4");
    },
    fy4Aging() {
      this.getFy4Data();
    }
  },

  mounted() {
    this.fy4RequestTokens = [];

    this.getStationPlaceInfo();
    this.getFcstPlaceInfo();
    this.getFy4Data();
    this.getLatestTime();
    
  },

  beforeDestroy() {},

  methods: {
    onChange() {},
    onDataTypeChange() {
      if (this.currDataType === "act") {
        this.province = "北京市";
        this.stationId = this.stationInfo[this.province][0].number;
      } else if (this.currDataType === "fcst") {
        this.stationId = 11600040000;  //this.fcstPlaceList[1400].number
      }
      this.emitEvent(this.currDataType);
    },
    onActTimeChange() {
      this.emitEvent(this.currDataType);
    },
    onfcstTimeChange() {
      this.emitEvent(this.currDataType);
    },
    onImgTypeChange() {
      this.emitEvent(this.currDataType);
    },
    onProvinceChange() {
      this.stationId = this.stationInfo[this.province][0].number;
    },
    onFy4TimeChange() {
      this.getFy4Data();
    },
    onFy4PlaceChange() {
      this.emitEvent("fy4");
    },
    // 获取站信息
    getStationPlaceInfo() {
      axios.get("/proxy/10.20.67.111/124station.json").then(data => {
        this.stationInfo = data.data;
      });
    },
    getFcstPlaceInfo() {
      axios.get("/proxy/10.20.67.111/ncepnwptlogpstations.json").then(data => {
        this.fcstPlaceInfos = data.data["北京"];
      });
    },

    // 得到风云4探空点数据
    getFy4Data() {
      if (this.fy4RequestTokens.length) {
        this.fy4RequestTokens.forEach(c => c());
        this.fy4RequestTokens = [];
      }
      const CancelToken = axios.CancelToken;
      axios
        .get(
          `/proxy/10.20.67.125/giirs/Fusion2tlogp/${this.fy4Date.format(
            "YYYYMMDD"
          ) + this.fy4Hour}.${this.fy4Aging}`,
          {
            cancelToken: new CancelToken(c => {
              this.fy4RequestTokens.push(c);
            })
          }
        )
        .then(data => {
          const allData = this.m5ToGetNafpGrid(data.data);
          if (allData.stations && allData.stations.length) {
            this.fy4PlaceList = allData.stations.map(el => ({
              number: +el.stationId,
              latitude: el.lat,
              longitude: el.lon,
              name: ""
            }));
          } else {
            this.fy4PlaceList = [];
          }
        });
    },

    // 触发事件
    emitEvent(type) {
      let startTime, showType, id;

      if (type === "act") {
        startTime = this.actDate
          .clone()
          .startOf("day")
          .add(+this.actHour, "hours");
        showType = this.currImgType;
        id = this.stationId;
      } else if (type === "fcst") {
        if (this.currImgType === "NCEP") {
          startTime = this.fcstNcepDate
            .clone()
            .startOf("day")
            .add(+this.fcstNcepHour, "hours");
        } else if (this.currImgType === "List") {
          startTime = this.fcstListDate
            .clone()
            .startOf("day")
            .add(+this.fcstListHour, "hours");
        }
        showType = this.currImgType;
        id = this.stationId;
      } else if (type === "fy4") {
        startTime = this.fy4Date
          .clone()
          .startOf("day")
          .add(+this.fy4Hour, "hours");
        showType = "";
        id = this.fy4PlaceId;
      }

      this.$emit("change", {
        type,
        startTime,
        showType,
        id
      });
    },

    m5ToGetNafpGrid(content) {
      var items = content.trim().split(/\s+/);

      if (items.length < 8) {
        return {
          status: 1,
          message: ""
        };
      }

      var year = "20" + items[3];
      var month = items[4];
      var day = items[5];
      var hour = items[6];
      var stationCount = parseInt(items[7], 10);

      var itemIndex = 8;

      var stations = [];

      for (var i = 0; i < stationCount; i++) {
        var stationId = items[itemIndex++];
        var lon = parseFloat(items[itemIndex++]);
        var lat = parseFloat(items[itemIndex++]);
        var alt = parseFloat(items[itemIndex++]);
        var count = parseInt(items[itemIndex++], 10);

        var datas = [];
        for (var j = 0; j < count / 6; j++) {
          datas.push({
            pressure: parseFloat(items[itemIndex++]),
            alt: parseFloat(items[itemIndex++]),
            temp: parseFloat(items[itemIndex++]),
            dew: parseFloat(items[itemIndex++]),
            windDir: parseFloat(items[itemIndex++]),
            windSpeed: parseFloat(items[itemIndex++])
          });
        }

        stations.push({
          stationId: stationId,
          lon: lon,
          lat: lat,
          alt: alt,
          datas: datas
        });
      }

      return {
        date: year + "-" + month + "-" + day + " " + hour + ":00:00",
        stations: stations
      };
    },

    // 获取时间
    getElementTime(eleName) {
      const params = new URLSearchParams();
      params.append("modeName", "qiangtianqi");
      params.append("eleName", eleName);
      params.append("strTime", "");
      params.append("forecastTime", "");
      params.append("level", "");
      params.append("userDefinedParas", "");
      return axios.post(
        "/proxy/10.20.67.111//PictureInfoForgetFilePath.action",
        params
      );
    },

    // 获取最新时间
    getLatestTime() {
      const list = [
        // 实况
        this.getElementTime("探空分析:实况探空:54511"),
        // 预报——Tlnp图
        this.getElementTime("模式探空:NCEP"),
        // 实况——时序图
        this.getElementTime("模式探空:List")
      ];

      const _getTime = (data) => {
        const timeStr = data.data.path.split(',')[2];
        const time = moment(timeStr, 'YYYY-MM-DD HH:mm:ss');
        if (time.isValid()) {
          return {
            date: time.clone().startOf('day'),
            hour: time.format('HH')
          };
        }
        return;
      };
      
      axios.all(list).then(data => {
        const actTime = _getTime(data[0]);
        const fcstNcepTime = _getTime(data[1]);
        const fcstListTime = _getTime(data[2]);
        if (actTime) {
          this.actDate = actTime.date;
          this.actHour = actTime.hour;
        }
        if (fcstNcepTime) {
          this.fcstNcepDate = fcstNcepTime.date;
          this.fcstNcepHour = fcstNcepTime.hour;
        }
        if (fcstListTime) {
          this.fcstListDate = fcstListTime.date;
          this.fcstListHour = fcstListTime.hour;
        }
        // console.log(actTime);
        // console.log(fcstNcepTime);
        // console.log(fcstListTime);

        this.emitEvent(this.currDataType);
      })
    },
  }
};
