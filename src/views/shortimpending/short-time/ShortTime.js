import * as moment from "moment";
import * as axios from "axios";
import { ClassifyTitle, SectionTitle } from "../common";
import { TimeSelect } from "../../../components/share";
import datas from "./datas";

export default {
  name: "short-time",
  components: { ClassifyTitle, SectionTitle, TimeSelect },
  data() {
    return {
      ...datas,
      cancelRequests: [],
      isModeProduct: true
    };
  },
  computed: {},

  mounted() {
    this.getFcstServeTimes();
    this.getElementTimes();
  },

  beforeDestroy() {
    this.cancelAllRequest();
  },

  methods: {
    // 要素或时间改变时
    onChange() {
      const productElements = this.products.reduce(
        (curr, item) => curr.concat(item.elements),
        []
      );
      let curr = productElements.find(el => el.name === this.currActiveElement);

      let strTime = "";
      let forecastTime = "";
      let type = "";
      let patterns = null;
      let dataType = "";
      let classifyId = "";
      let startHourList = null;


      if (curr) {
        //客观产品要素
        dataType = "实况";
        classifyId = curr.parentId;
        if (this.isModeProduct) {
          patterns =
            this.currModeNavValue === "多模式"
              ? this.modeNavs.map(el => el.value)
              : [this.currModeNavValue];
        }

        if (curr.parentId === 'modeProduct') {
          startHourList = this.modeNavs.find(el => el.value === this.currModeNavValue).startHourList;
        }else {
          startHourList = curr.startHourList;
        }

        type = "objectives";

        if (this.fcstDate) {
          strTime = this.fcstDate
            .clone()
            .startOf("day")
            .add(+this.fcstHour, "hours")
            .format("YYYY-MM-DD HH:mm:ss");
        }
        // forecastTime = this.actDate
        //   .clone()
        //   .startOf("day")
        //   .add(+this.actHour, "hours")
        //   .format("YYYY-MM-DD HH:mm:ss");
      } else {
        //中分析产品(自动站客观分析)要素
        type = "relation";
        forecastTime = strTime = this.centerDate
          .clone()
          .startOf("day")
          .add(+this.centerHour, "hours")
          .add(+this.centerMinute, "minutes")
          .format("YYYY-MM-DD HH:mm:ss");
      }

      this.$emit("change", {
        type,
        isConcat: this.isConcat,
        strTime,
        startHourList,
        forecastTime,
        eleName: this.currActiveElement,
        patterns,
        dataType,
        classifyId
      });
    },

    // 预报服务条件改变时
    onServeChange() {
      const currFcstServe = this.fcstServes.find(el => el.active);
      if (currFcstServe) {
        let strTime = "";
        const startDate = moment(currFcstServe.currDate, "YYMMDDHHmm");
        if (startDate.isValid()) {
          strTime = startDate.format("YYYY-MM-DD HH:mm:ss");
        }
        let forecastTime = "";
        if (currFcstServe.id === "latent" && strTime) {
          forecastTime = startDate
            .clone()
            .add(+currFcstServe.currHour, "hours")
            .format("YYYY-MM-DD HH:mm:ss");
        } else {
          forecastTime = strTime;
        }
        let eleName = "";
        if (currFcstServe.id === "short") {
          eleName = currFcstServe.elements.find(
            el => el.id === currFcstServe.currElement
          ).eleName;
        } else {
          eleName = currFcstServe.eleName;
        }
        this.$emit("change", {
          type: "fcstServe",
          isHasActive: true,
          strTime,
          forecastTime,
          eleName
        });
      } else {
        this.$emit("change", {
          type: "fcstServe",
          isHasActive: false
        });
      }
    },

    // 取消或选中或切换预报服务
    onClickActiveServe(serve) {
      serve.active = !serve.active;
      this.fcstServes.forEach(el => {
        if (el !== serve) {
          el.active = false;
        }
      });
    },

    // 点击切换要素(所有)
    onClickElement(ele, parentId) {
      this.isModeProduct = parentId === "modeProduct";
      if (this.currActiveElement === ele.name) return;
      this.currActiveElement = ele.name;

      this.setElementTime();
      this.onChange();
    },

    // 切换要素时设置对应要素的时间（只针对客观产品）
    setElementTime() {
      const productElements = this.products.reduce(
        (curr, item) => curr.concat(item.elements),
        []
      );
      let curr = productElements.find(el => el.name === this.currActiveElement);
      if (curr) {
        // 客观产品
        let startDate = '';
        if (curr.parentId === "modeProduct") {
          // 模式产品
          const currModelNav = this.modeNavs.find(
            el => el.value === this.currModeNavValue
          );
          this.fcstHourList = currModelNav.startHourList;
          startDate = currModelNav.currStartDate;
        }else {
          this.fcstHourList = curr.startHourList;
          startDate = curr.currStartDate;
        }
        if (startDate) {
          this.fcstDate = moment(startDate, "YYMMDDHHmm");
          this.fcstHour = this.fcstDate.format("HH");
        } else {
          this.fcstDate = '';
          this.fcstHour = this.fcstHourList[0];
        }
      }
    },

    //多模式切换
    onClickModeNav(value) {
      this.currModeNavValue = value;
      this.setElementTime();
      this.onChange();
    },

    // 得到预报服务时间
    getFcstServeTimes() {
      const CancelToken = axios.CancelToken;
      axios
        .get("/proxy/10.20.67.111/zh/dataNew.json", {
          cancelToken: new CancelToken(c => {
            this.cancelRequests.push(c);
          })
        })
        .then(data => {
          const timeList = data.data.data;
          this.fcstServes.forEach(el => {
            const curr = timeList.find(item => item.name === el.dataName);
            if (curr && curr.times.length) {
              el.startDates = curr.times.slice(0, 30);
              el.currDate = curr.times[0];
            }
          });
          this.onServeChange();
        });
    },

    // 得到每个要素的时间
    getElementTimes() {
      const CancelToken = axios.CancelToken;
      axios
        .get("/proxy/10.20.67.111/zh/nowcastdata.json", {
          cancelToken: new CancelToken(c => {
            this.cancelRequests.push(c);
          })
        })
        .then(data => {
          const timeList = data.data.data;
          this.products.forEach(product => {
            product.elements.forEach(el => {
              if (el.parentId === "modeProduct") return;
              const curr = timeList.find(item => item.name === el.name);
              if (curr && curr.times.length) {
                el.currStartDate = curr.times[0];
              }
            });
          });
          // 模式产品
          this.modeNavs.forEach(el => {
            const curr = timeList.find(item => item.name === el.timeName);
            if (curr && curr.times.length) {
              const latestTime = curr.times[0];
              if (el.value === '多模式') {
                // 多模式取的是Grapes的时间，在这要做特殊处理
                // console.log(latestTime);
                const mTime = moment(latestTime, 'YYMMDDHHmm');
                const mTimeUnix = mTime.unix();
                // const hour = mTime.format('HH');

                // 生成由大到小的时间列表
                const unixList = [el.startHourList, el.startHourList].reduce((curr, item, i) => {
                  const date = mTime.clone().startOf('day').subtract(i, 'days');
                  const list = item.slice().reverse();
                  curr = curr.concat(list.map(h => {
                    return date.clone().add(+h, 'hours').unix();
                  }));
                  return curr;
                }, []);
                let currStartDate = unixList.find(u => mTimeUnix >= u);
                if (currStartDate) {
                  el.currStartDate = moment.unix(currStartDate).format('YYMMDDHHmm');
                }
                // console.log(el.currStartDate);

                // if(el.startHourList.includes(hour)) {
                //   el.currStartDate = latestTime;
                // }else if (hour > 20) {
                //   el.currStartDate = mTime.clone().startOf('day').add(20, 'hours').format('YYMMDDHHmm');
                // }else if (hour < 20) {
                //   el.currStartDate = mTime.clone().startOf('day').add(8, 'hours').format('YYMMDDHHmm');
                // }else if (hour < 8) {
                //   el.currStartDate = mTime.clone().startOf('day').subtract(1, 'days').add(20, 'hours').format('YYMMDDHHmm');
                // }
              }else {
                el.currStartDate = latestTime;
              } 
            }
          });
          this.setElementTime();
          this.onChange();
        });

      // 以一个要素的最新时间代替请求中分析产品(自动站客观分析)中所有要素的最新时间
      const body = {
        modeName: "qiangtianqi",
        eleName: "OBSanaly:FenXizidongzhanHB:华北:海平面气压、温度、风场",
        strTime: "",
        forecastTime: "",
        level: "",
        userDefinedParas: "",
        symbol: 1
      };
      const params = new URLSearchParams();
      for (const key in body) {
        params.append(key, body[key]);
      }
      axios
        .post("/proxy/10.20.67.111/PictureInfoForgetFilePath.action", params, {
          cancelToken: new CancelToken(c => {
            this.cancelRequests.push(c);
          })
        })
        .then(data => {
          if (!data.data.path) return;

          // [模式名字 要素名字  发布时间  预报时间 层次  文件路径]
          const [
            patternName,
            eleName,
            startTime,
            fcstTime,
            level,
            filePath
          ] = data.data.path.split(",");
          const latestTime = moment(startTime, "YYYY-MM-DD HH:mm:ss");
          this.centerDate = latestTime;
          this.centerHour = latestTime.format("HH");
          this.centerMinute = latestTime.format("mm");
        });
    },

    // 取消所有请求
    cancelAllRequest() {
      this.cancelRequests.forEach(el => el());
      this.cancelRequests = [];
    }
  }
};
