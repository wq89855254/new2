import * as moment from "moment";
import * as axios from "axios";
import ShortTime from "./short-time/ShortTime.vue";
import datas from "./short-time/datas.js";
import Near from "./near/Near.vue";
import Sounding from "./sounding/Sounding.vue";
import Fcst from "./fcst/Fcst.vue";
import { ToolBtn } from "../../components/base";
import _ from "lodash";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapGetters, mapMutations } = createNamespacedHelpers(
  "synthesis"
);
import {
  WholeAgingSelect,
  LevelSelect,
  AreaSelect,
  ImgShow,
  RelevanceAgingSelect
} from "../../components/share";

export default {
  name: "shortimpending",
  components: {
    ShortTime,
    Near,
    Sounding,
    Fcst,
    WholeAgingSelect,
    LevelSelect,
    AreaSelect,
    ImgShow,
    RelevanceAgingSelect,
    ToolBtn
  },
  data() {
    return {
      // activeIndex:null,
      areaList: [
        {
          label: "全国",
          value: "全国",
          disabled: false
        },
        {
          label: "华北",
          value: "华北",
          disabled: false
        },
        {
          label: "东北",
          value: "东北",
          disabled: false
        },
        {
          label: "华东",
          value: "华东",
          disabled: false
        },
        {
          label: "华南",
          value: "华南",
          disabled: false
        },
        {
          label: "西南",
          value: "西南",
          disabled: false
        },
        {
          label: "西北",
          value: "西北",
          disabled: false
        },
        {
          label: "青藏",
          value: "青藏",
          disabled: false
        },
        {
          label: "新疆",
          value: "新疆",
          disabled: false
        },
        {
          label: "近海",
          value: "近海",
          disabled: false
        }
      ],
      tabs: [
        {
          id: "shortTime",
          typeName: "短时",
          // 该处时效是没有用的，在这只是为了占位，避免ImgShow组件报错
          aging: "001",
          agingList: ["001", "002", "003"]
        },
        {
          id: "near",
          typeName: "临近",
          aging: "060",
          agingList: ["060", "090", "120"]
        },
        {
          id: "sounding",
          typeName: "探空",
          agings: [
            {
              // 该处时效是没有用的，在这只是为了占位，避免ImgShow组件报错
              type: "act",
              aging: "000",
              agingList: [
                "000",
                "003",
                "006",
                "009",
                "012",
                "015",
                "018",
                "021",
                "024",
                "027",
                "030",
                "033",
                "036",
                "039",
                "042",
                "045",
                "048"
              ]
            },
            {
              type: "fcst",
              aging: "000",
              agingList: [
                "000",
                "003",
                "006",
                "009",
                "012",
                "015",
                "018",
                "021",
                "024",
                "027",
                "030",
                "033",
                "036",
                "039",
                "042",
                "045",
                "048"
              ]
            },
            {
              type: "fy4",
              aging: "006",
              agingList: ["006", "007", "008", "009", "010", "011", "012"]
            }
          ]
        },
        {
          id: "fcst",
          typeName: "客观预报",
          agings: [
            {
              type: "objectives",
              aging: "001",
              agingList: [
                "001",
                "002",
                "003",
                "004",
                "005",
                "006",
                "007",
                "008",
                "009",
                "010",
                "011",
                "012",
                "013",
                "014",
                "015",
                "016",
                "017",
                "018",
                "019",
                "020",
                "021",
                "022",
                "023",
                "024",
                "025",
                "026",
                "027",
                "028",
                "029",
                "030"
              ]
            },
            {
              type: "manyMode",
              aging: "006",
              agingList: [
                "006",
                "007",
                "008",
                "009",
                "010",
                "011",
                "012",
                "013",
                "014",
                "015",
                "016",
                "017",
                "018",
                "019",
                "020",
                "021"
              ]
            }
          ]
        }
      ],
      currTabId: "shortTime",
      startTime: moment().format("YYYY-MM-DD HH"),
      area: "全国",
      activeClose:false,

      // 主图片的路径 和 覆盖图片的路径
      mainImgPaths: [""],
      coverImgPaths: [],

      //用于存储用户操作后产生的数据
      shortTimeServe: null,
      shortTimeElement: null,
      near: null,
      sounding: null,
      fcst: null,

      // 关联时间轴相关
      concatList: [],
      noConcatList: [],
      concatTime: "",
      noConcatTime: "",
      memoryActTime: "",
      memoryFcstTime: "",
      objectiveActTime: null, //客观产品实况时间
      objectiveFcst: {
        agingLength: 23,
        hourList: [],
        fcstTime: moment()
      },
      // 禁用关系时间轴
      isDisabledRelevance: false,

      // 用于取消ajax请求
      cancelMainRequests: [],
      cancelCoverRequests: [],
      activeIndex: null,
      currDate: null,
      currHour: "01",
      hourList: datas.actHourList,
      dieSwitch: false,
      currMinute: "00",
      zoomSw: false,
      minuteList: ["00", "30"]
      // interval: '24h',
    };
  },
  computed: {
    ...mapState(["zoomSwitch","zoomUrl"]),
    currTabAging() {
      const currTabAging = this.tabs.find(el => el.id === this.currTabId);
      if (this.currTabId === "fcst") {
        if (this.fcst)
          return currTabAging.agings.find(el => el.type === this.fcst.type);
        return null;
      } else if (this.currTabId === "sounding") {
        if (this.sounding)
          return currTabAging.agings.find(el => el.type === this.sounding.type);
        return null;
      }
      return currTabAging;
    },
    fy4Aging() {
      return this.tabs
        .find(el => el.id === "sounding")
        .agings.find(el => el.type === "fy4").aging;
    }
  },
  watch: {
    mainImgPaths(){
      this.updata_zoomUrl(this.mainImgPaths[0])
    },
    area(){
      // alert()
      this.onAreaChange()
    }
  },
  created() {
    // requestDatas函数可能在300毫秒多次调用以请求不同的数据，所以在这儿要将节流函数分开
    this.debouncedRequestMainDatas = _.debounce(this.requestDatas, 300);
    this.debouncedRequestCoverDatas = _.debounce(this.requestDatas, 300);
    this.debouncedGetSoundingImgPath = _.debounce(this.getSoundingImgPath, 300);
  },
  mounted() {
    let actTime = moment();
    if (actTime.minutes() < 30) {
      actTime.subtract(1, "hours");
    }
    this.objectiveActTime = actTime.startOf("hour");
  },




  beforeDestroy() {
    this.cancelAllRequest();
  },

  methods: {
    ...mapMutations(["updata_zoomSwitch","updata_zoomUrl"]),
    show_zoom(){
      this.updata_zoomSwitch(true)
      this.updata_zoomUrl(this.mainImgPaths[0])
	},
    zoom(src) {
      document.querySelector(".zoomImg").innerHTML = "";
      this.zoomSw = true;
      let img = new Image();
      img.style.height = "100%";
      img.style.width = "100%";
      img.src = src[0];
      document.querySelector(".zoomImg").appendChild(img);

    },
    close(){
      this.updata_zoomSwitch(false)
    },
    // zoom(src){
    //   document.querySelector('.zoomImg').innerHTML=''
    //   this.zoomSw=true;
    //   let img=new Image();
    //   img.style.height='100%';
    //   // img.style.width='100%';
    //   img.src=src[0]
    //   document.querySelector('.zoomImg').appendChild(img)
    // },
    select(i) {
      this.activeClose=!this.activeClose
      if (this.activeIndex == i) {
        if(!this.activeClose){
          this.activeIndex = null;
          this.dieSwitch = false;
          // console.log(this.datas)
          // alert(options[0].contents[0].hour)
          this.currHour = datas.actHour;
          this.loginzt = false;
          this.coverImgPaths=[]
          this.activeClose=false
        }
      } else {
        // let value=JSON.parse(JSON.stringify(options[0].contents[0].date))
        this.currHour = moment(this.shortTimeElement.forecastTime).format('HH')
        // console.log(this.shortTimeElement)
        this.currDate = moment(this.shortTimeElement.forecastTime);
        if (i === 1) {
          this.loginzt = true;
          this.dieFn(moment(this.currDate).format("YYYY-MM-DD HH:00:00"));
        } else {
          // this.login_switch=true
          this.loginFn(
            moment(this.currDate).format(`YYYY-MM-DD HH:${this.currMinute}:00`)
          );
          this.loginzt = false;
        }
        this.activeIndex = i;
      }
    },
    changDate(i) {
      const time = moment(this.currDate.format("YYYYMMDD"), "YYYYMMDD").add(
        this.currHour,
        "hours"
      );
      if (i === 1) {
        time.add(1, "hours");
      } else {
        time.subtract(1, "hours");
      }
      this.currDate = time;
      this.currHour = time.format("HH");
      if (this.activeIndex == 2) {
        this.loginFn(moment(this.currDate).format("YYYY-MM-DD HH:mm:ss"));
      } else if (this.activeIndex == 1) {
        this.dieFn(moment(this.currDate).format("YYYY-MM-DD HH:mm:ss"));
      }
      // this.$emit('dieFn',this.interval,moment(this.currDate).format('YYYY-MM-DD HH:mm:ss'))
    },
    changeHour() {
      if (this.activeIndex == 1) {
        this.dieFn(
          moment(moment(this.currDate).format("YYYY-MM-DD 00:00:00"))
            .add(this.currHour, "hour")
            .format("YYYY-MM-DD HH:00:00")
        );
      } else {
        this.loginFn(
          moment(moment(this.currDate).format("YYYY-MM-DD 00:00:00"))
            .add(this.currMinute, "minute")
            .add(this.currHour, "hour")
            .format("YYYY-MM-DD HH:mm:00")
        );
      }
    },
    dieFn(date) {
      // console.log(date)
      // document.querySelector('.imgDie').innerHTML = ''
      this.coverImgPaths=[]

      // console.log(interval, date)
      if (date) {
        this.dieSwitch = true;
        let data = {
          modeName: "qiangtianqi",
          eleName: `OBSoverlay:实况叠加:01h:${this.area}`,
          forecastTime: date,
          level: "",
          userDefinedParas: "",
          strTime: date,
          symbol: 1
        };
        const params = new URLSearchParams();
        for (const key in data) {
          params.append(key, data[key]);
        }
        axios.post(`/proxy/10.20.67.111/PictureInfoForgetFilePath.action`, params).then(res => {
          // console.log(res.data.path.split(','))
          if(res.data.path){
            this.coverImgPaths.push(`http://10.20.67.111/getPic.action2?ppath=${res.data.path.split(',')[5]}`)
            // let img = new Image()
            // img.src = `http://10.20.67.111/getPic.action2?ppath=${res.data.path.split(',')[5]}`
            // img.style.cssText = 'width:100%;height:100%;'
            // // this.dieImgSrc=`http://10.20.67.111/getPic.action2?ppath=\\${res.data.path.split(',')[5]}`
            // img.onload = () => {
            //   document.querySelector('.imgDie').appendChild(img)
            // }
            // img.onerror = () => {
            //   img.src = require('../../assets/images/404.png')
            //   document.querySelector('.imgDie').appendChild(img)
            // }
          }
        })

      } else {
        this.dieSwitch = false;
      }
    },
    loginFn(date) {
      // if (this.loginzt) {

      this.coverImgPaths=[]

        if (date) {
          this.dieSwitch = true
          let data = {
            'modeName': 'qiangtianqi',
            'eleName': `OBSoverlay:雷达叠加:${this.area}`,
            'forecastTime': date,
            'level': '',
            'userDefinedParas': '',
            'strTime': date,
            'symbol': 1
          }
          const params = new URLSearchParams();
          for (const key in data) {
            params.append(key, data[key]);
          }
          axios.post(`/proxy/10.20.67.111/PictureInfoForgetFilePath.action`, params).then(res => {
            // console.log(res.data.path.split(','))
            this.coverImgPaths.push(`http://10.20.67.111/getPic.action2?ppath=${res.data.path.split(',')[5]}`)
            // let img = new Image()
            // img.src = `http://10.20.67.111/getPic.action2?ppath=${res.data.path.split(',')[5]}`
            // img.style.cssText = 'width:100%;height:100%;'
            // // this.dieImgSrc=`http://10.20.67.111/getPic.action2?ppath=\\${res.data.path.split(',')[5]}`
            // img.onload = () => {
            //   document.querySelector('.imgDie').appendChild(img)
            // }
            // img.onerror = () => {
            //   img.src = require('../../assets/images/404.png')
            //   document.querySelector('.imgDie').appendChild(img)
            // }
          })
        }
      // } else {
      //   if (interval && date) {
      //     this.login_data = {
      //       interval, date
      //     }
      //     this.login_switch = true
      //   } else {
      //     this.dieSwitch = false
      //     this.login_switch = false
      //   }
      // }
    },
    // 时间轴时间改变时
    onWholeAgingChange() {
      this.gatherParams();
    },

    // 关联时间轴时间改变时
    onRelevanceAgingChange(e) {
      // console.log(e);
      if (this.shortTimeElement.type === "objectives") {
        this.shortTimeElement.dataType = e.isFcst ? "预报" : "实况";
        this.shortTimeElement.forecastTime = e.time;
        this.gatherParams();
      }
    },

    // 短时_客观产品_实况和模式时间选择
    onObjectiveTimeSelect(item) {
      let fcstTime = "",
        startTime = "";
      const objActTime = this.objectiveActTime,
        objFcstTime = this.objectiveFcst.fcstTime;
      if (objActTime && objActTime.isValid()) {
        fcstTime = objActTime.format("YYYY-MM-DD HH:mm:ss");
      }
      if (objFcstTime && objFcstTime.isValid()) {
        startTime = objFcstTime.format("YYYY-MM-DD HH:mm:ss");
      }

      if (this.shortTimeElement.type === "objectives") {
        this.shortTimeElement.dataType = item.isFcst ? "预报" : "实况";
        this.shortTimeElement.forecastTime = fcstTime;
        this.shortTimeElement.strTime = startTime;
        this.gatherParams();
      }
    },

    // 切换tab时
    onTabsChange() {
      if (this.currTabId === "shortTime") {
        this.gatherParams("fcstServe");
      } else {
        this.mainImgPaths = [""];
        this.coverImgPaths = [];
      }
      this.gatherParams();
    },

    // 区域改变时
    onAreaChange() {
      if (this.shortTimeElement.type === "relation") {
        this.gatherParams();
      }
    },

    // 切换图片
    onSwitchImg(sign) {
      if (this.currTabId === "shortTime") {
        if (sign === "left") {
          this.$refs.relevanceAgingSelect.tuningTime(-1);
        } else if (sign === "right") {
          this.$refs.relevanceAgingSelect.tuningTime(1);
        }
      } else {
        if (sign === "left") {
          this.$refs.wholeAgingSelect.onTuningAging(-1);
        } else if (sign === "right") {
          this.$refs.wholeAgingSelect.onTuningAging(1);
        }
      }
    },

    // 用户操作短时tab触发的事件(data.type有三个值：'relation': '中分析产品(自动站客观分析)', 'objectives': '客观产品', 'fcstServe': '预报服务')
    onShortTimeChange(data) {
      this.isDisabledRelevance = data.type === "relation";
      // 更新关联时间轴上的时间
      if (data.type === "objectives") {
        let agingLength = 23;
        //多模式的时候时效长度为23
        if (Array.isArray(data.patterns) && data.patterns.length === 1) {
          const name = data.patterns[0];
          const nameAgingHash = {
            Grapes: 30,
            广东: 36,
            上海: 72,
            上海3KM: 24,
            北京: 36,
            北京3KM: 24,
            广州: 36,
            广州3KM: 12
          };
          agingLength = nameAgingHash[name];
        }

        // console.log("------");
        // console.log(data);

        this.objectiveFcst = {
          agingLength,
          startHourList: data.startHourList,
          fcstTime: moment(data.strTime, "YYYY-MM-DD HH:mm:ss")
        };

        // // console.log(agingLength);
        // const latestActTime = moment(data.forecastTime, "YYYY-MM-DD HH:mm:ss");
        // const latestFcstTime = moment(data.strTime, "YYYY-MM-DD HH:mm:ss");

        // const fcstConcatList = new Array(agingLength).fill(0).map((el, i) => {
        //   const currTime = latestActTime.clone().add(i + 1, "hours");
        //   return {
        //     name: currTime.format("HH"),
        //     time: currTime.format("YYYY-MM-DD HH:mm:ss"),
        //     isFcst: true,
        //     active: false
        //   };
        // });
        // const isHasFcstTime = latestFcstTime.isValid();
        // const fcstNoConcatList = new Array(agingLength).fill(0).map((el, i) => {
        //   if (isHasFcstTime) {
        //     const currTime = latestFcstTime.clone().add(i + 1, "hours");
        //     return {
        //       name: "+" + (i + 1),
        //       time: currTime.format("YYYY-MM-DD HH:mm:ss"),
        //       isFcst: true,
        //       active: false
        //     };
        //   }
        //   return {
        //     name: "+" + (i + 1),
        //     time: "",
        //     isFcst: true,
        //     active: false
        //   };
        // });
        // this.concatList = [
        //   ...this.getActTimeList(latestActTime),
        //   ...fcstConcatList
        // ];
        // this.noConcatList = [
        //   ...this.getActTimeList(latestActTime),
        //   ...fcstNoConcatList
        // ];

        // console.log(this.concatList);
        // console.log(this.noConcatList);

        // 因为data.forecastTime中的时间始终是初始时间，所以在这需要获取当前关联时间轴上选中的时间，以及
        // 还要同时更新data.dataType
        // const currActiveItem = data.isConcat
        //   ? this.concatList.find(el => el.active)
        //   : this.noConcatList.find(el => el.active);
        // data.forecastTime = currActiveItem.time;
        // data.dataType = currActiveItem.isFcst ? "预报" : "实况";
      }

      // 存储用户操作后的结果
      if (data.type === "fcstServe") {
        this.shortTimeServe = data;
      } else {
        this.shortTimeElement = data;
        // console.log(this.shortTimeElement);
      }

      // 将用户操作结果转化为请求接口的参数
      this.gatherParams(data.type);
    },

    onNearChange(data) {
      this.near = data;
      this.gatherParams();
    },
    onFcstChange(data) {
      this.fcst = data;
      this.gatherParams();
    },
    onSoundingChange(data) {
      this.sounding = data;
      this.gatherParams();
    },

    // 得到实况时间列表
    getActTimeList(date) {
      return new Array(3)
        .fill(0)
        .map((el, i) => {
          const currTime = date.clone().subtract(i, "hours");
          return {
            name: currTime.format("HH"),
            time: currTime.format("YYYY-MM-DD HH:mm:ss"),
            isFcst: false,
            active: i === 0
          };
        })
        .reverse();
    },

    // 将用户操作结果转化为请求接口的参数
    gatherParams(sign) {
      // 主图列表，覆盖图列表
      let mainParams = [],
        coverParams = [];
      switch (this.currTabId) {
        case "shortTime":
          // 预报服务
          if (sign === "fcstServe") {
            if (this.shortTimeServe.isHasActive) {
              const { strTime, forecastTime, eleName } = this.shortTimeServe;
              coverParams = [
                {
                  modeName: "qiangtianqi",
                  level: "",
                  userDefinedParas: "",
                  strTime,
                  forecastTime,
                  eleName
                }
              ];
            } else {
              this.coverImgPaths = [];
            }
            break;
          }

          // 客观产品
          let startTime = "";
          const objFcstTime = this.objectiveFcst.fcstTime;
          if (objFcstTime.isValid()) {
            startTime = objFcstTime.format("YYYY-MM-DD HH:mm:ss");
          }
          if (this.shortTimeElement.type === "objectives") {
            this.shortTimeElement.strTime = startTime;
          }
          const {
            eleName,
            forecastTime,
            patterns,
            strTime,
            type,
            dataType,
            classifyId
          } = this.shortTimeElement;

          if (type === "relation") {
            mainParams = [
              {
                modeName: "qiangtianqi",
                eleName:
                  "OBSanaly:FenXizidongzhanHB:" + this.area + ":" + eleName,
                strTime,
                forecastTime,
                level: "",
                userDefinedParas: "",
                symbol: "1"
              }
            ];
          } else if (type === "objectives") {
            if (patterns) {
              mainParams = patterns.map(pt => {
                return {
                  modeName: "qiangtianqi",
                  eleName:
                    "shortandnowcastforecast:shorttimeforecast:" +
                    dataType +
                    ":" +
                    (dataType === "实况" ? eleName : eleName + "四面图:" + pt),
                  strTime: dataType === "实况" ? forecastTime : strTime,
                  forecastTime,
                  level: "",
                  userDefinedParas: "",
                  symbol: "1"
                };
              });
            } else {
              mainParams = [
                {
                  modeName: "qiangtianqi",
                  eleName:
                    "shortandnowcastforecast:shorttimeforecast:" +
                    dataType +
                    ":" +
                    eleName +
                    (classifyId === "analyze" ? ":" + this.area : ""),
                  strTime: dataType === "实况" ? forecastTime : strTime,
                  forecastTime,
                  level: "",
                  userDefinedParas: "",
                  symbol: "1"
                }
              ];
            }
          }
          break;
        case "near":
          if (!this.near) break;
          this.startTime = this.near.startTime.format("YYYY-MM-DD HH");
          mainParams = [
            {
              modeName: "qiangtianqi",
              eleName:
                "shortandnowcastforecast:shorttimeforecast:预报:" +
                this.near.elementName +
                ":" +
                this.area,
              strTime: this.near.startTime.format("YYYY-MM-DD HH:mm:ss"),
              forecastTime: this.near.startTime
                .clone()
                .add(+this.currTabAging.aging, "hours")
                .format("YYYY-MM-DD HH:mm:ss"),
              level: "",
              userDefinedParas: "",
              symbol: "1"
            }
          ];
          break;
        case "sounding":
          if (!this.sounding) break;
          this.startTime = this.sounding.startTime.format("YYYY-MM-DD HH");
          const sdType = this.sounding.type;

          let paths = "http://10.20.67.111/getPic.action2?ppath=";
          if (sdType === "act") {
            paths += `\\\\10.20.90.82\\operation\\SWPCImage\\ShortTime\\TlnP\\OBS\\TlnP_${
              this.sounding.id
            }_${this.sounding.startTime.format("YYYYMMDDHH")}.png`;
          } else if (sdType === "fcst") {
            if (this.sounding.showType === "NCEP") {
              paths += `\\\\10.20.90.82\\operation\\SWPCImage\\ShortTime\\TlnP\\Forecast\\NCEP\\Sketch\\NCEP_TlnP_${
                this.sounding.id
              }_${this.sounding.startTime.format("YYYYMMDDHH")}_${
                this.currTabAging.aging
              }.png`;
            } else if (this.sounding.showType === "List") {
              paths += `\\\\10.20.90.82\\operation\\SWPCImage\\ShortTime\\TlnP\\Forecast\\NCEP\\List\\NCEP_TlnP_List_${
                this.sounding.id
              }_${this.sounding.startTime.format("YYYYMMDDHH")}_000_048.png`;
            }
          } else if (sdType === "fy4") {
            paths += `D:\\operation\\FY4OBS\\TlnP_${
              this.sounding.id
            }_${this.sounding.startTime.format("YYYYMMDDHH")}_${
              this.currTabAging.aging
            }.png`;
          }
          this.debouncedGetSoundingImgPath(paths);
          return; //退出函数

        case "fcst":
          if (!this.fcst) break;
          this.startTime = this.fcst.startTime.format("YYYY-MM-DD HH");
          mainParams = [
            {
              modeName: "qiangtianqi",
              eleName: this.fcst.eleName,
              strTime: this.fcst.startTime.format("YYYY-MM-DD HH:mm:ss"),
              forecastTime: this.fcst.startTime
                .clone()
                .add(+this.currTabAging.aging, "hours")
                .format("YYYY-MM-DD HH:mm:ss"),
              level: "",
              userDefinedParas: "",
              symbol: "1"
            }
          ];
          break;
      }

      if (mainParams.length) {
        this.debouncedRequestMainDatas("main", mainParams);
      }
      if (coverParams.length) {
        this.debouncedRequestCoverDatas("cover", coverParams);
      }
    },

    // 得到探空图片路径
    getSoundingImgPath(paths) {
      this.mainImgPaths = [paths];
    },
    // 请求数据
    requestDatas(type, params) {
      this.cancelAllRequest(type);
      const CancelToken = axios.CancelToken;

      const allRequestList = params.map(param => {
        const body = new URLSearchParams();
        for (const key in param) {
          body.append(key, param[key]);
        }
        return axios.post(
          "/proxy/10.20.67.111/PictureInfoForgetFilePath.action",
          body,
          {
            cancelToken: new CancelToken(c => {
              if (type === "main") {
                this.cancelMainRequests.push(c);
              } else if (type === "cover") {
                this.cancelCoverRequests.push(c);
              }
            })
          }
        );
      });

      axios.all(allRequestList).then(datas => {
        const imgSrcs = datas.map(data => {
          if (!data.data.path) return "";
          // [模式名字 要素名字  发布时间  预报时间 层次  文件路径]
          const [
            patternName,
            eleName,
            startTime,
            fcstTime,
            level,
            filePath
          ] = data.data.path.split(",");
          return "http://10.20.67.111/getPic.action2?ppath=" + filePath;
        });

        if (type === "main") {
          this.mainImgPaths = imgSrcs;
        } else if (type === "cover") {
          this.coverImgPaths = imgSrcs;
        }
      });
    },
    // 取消所有请求
    cancelAllRequest(type) {
      if (type === "main" && this.cancelMainRequests.length) {
        this.cancelMainRequests.forEach(el => el());
        this.cancelMainRequests = [];
      }
      if (type === "cover" && this.cancelCoverRequests.length) {
        this.cancelCoverRequests.forEach(el => el());
        this.cancelCoverRequests = [];
      }
    },
    // 更新时效
    updateAging() {
      if (this.currTabId === "shortTime") return;
      const currTabAging = this.tabs.find(tab => tab.id === this.currTabId);
    }
  }
};
