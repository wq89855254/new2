import * as moment from "moment";
import * as axios from "axios";
import _ from 'lodash';
import {
  DateSelect,
  LevelSelect,
  AreaSelect,
  WholeAgingSelect,
  TimeSelect,
  AgingSelect,
  ImgShow,
  SideBar
} from "../../components/share";
import { ToolBtn } from '../../components/base';
import options from "../../assets/config/shorttime_config";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapGetters, mapMutations } = createNamespacedHelpers(
  "synthesis"
);

export default {
  name: "Shorttime",
  components: { DateSelect, LevelSelect, AreaSelect, WholeAgingSelect, TimeSelect, AgingSelect, ImgShow,SideBar,ToolBtn },
  data: function() {
    return {

      // 该引用存储短期所有配置
      options,

      cancelRequests: [],
      activeIndex:null,
      currDate: null,
      zoomSw:false,
      currHour: '02',
      hourList: ['02', '05', '08', '11', '14', '17', '20', '23'],
      interval: '24h',

      area: "全国",
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

      // 当前选中的预报类型
      currFcstName: "多模式预报",

      // 该引用当前选中的要素配置
      currEleOption: null,

      // 该引用当前预报配置
      currFcstOption: null,

      // 该引用含有当前起报时间以及当前选中要素的id
      currTypeOption: null,

      // 当前选中路径下的所有要素id的列表
      currEleIdList: [],

      // 图片地址
      imgPaths: [],
      coverPaths:[],
      dieSwitch:false,
      activeClose:false,
    };
  },
  watch:{
    imgPaths(){
      this.updata_zoomUrl(this.imgPaths[0])
    },
    area(){
      this.onConditionChange()
    }
  },
  computed: {
    ...mapState(["zoomSwitch","zoomUrl"]),
    // 当前起报时间
    startTime() {
      if (this.currTypeOption && moment.isMoment(this.currTypeOption.date)) {
        return this.currTypeOption.date.format('YYYY-MM-DD') + ' ' + this.currTypeOption.hour;
      }
      return '';
    },
    currEleIdListLength() {
      return this.currEleIdList.length;
    }
  },
  created() {
    this.debouncedFindCondition = _.debounce(this.findCondition, 300);
  },
  mounted() {
    this.findCondition();
  },

  beforeDestroy() {
    this.cancelAllRequest();
  },

  methods: {
    moment,
    ...mapMutations(["updata_zoomSwitch","updata_zoomUrl"]),
    close(){
      this.updata_zoomSwitch(false)
    },
    highChange(val){
      this.currEleOption.activeLevel=val
      this.onConditionChange()
    },
    select(i) {
      this.activeClose=!this.activeClose
      if (this.activeIndex == i) {
        if(!this.activeClose){
          this.activeIndex = null
          this.dieSwitch=false
          // alert(options[0].contents[0].hour)
          this.currHour=options[0].contents[0].hour
          this.loginzt=false
          this.coverPaths=[]
          this.activeClose=false
        }
        
      } else {
        // let value=JSON.parse(JSON.stringify(options[0].contents[0].date))
        this.currHour=options[0].contents[0].hour
        this.currDate = moment(JSON.parse(JSON.stringify(options[0].contents[0].date)))
        if (i == 1) {
          this.loginzt=true
          this.dieFn(this.interval, moment(this.currDate).add(this.currHour,'hour').format('YYYY-MM-DD HH:mm:ss'))
        } else {
          this.loginFn(this.interval,moment(this.currDate).add(this.currHour,'hour').format('YYYY-MM-DD HH:mm:ss'))
          // this.login_switch=true
          this.loginzt=false
        }
        this.activeIndex = i
      }
    },
    changDate(i) {
      const time = moment(this.currDate.format('YYYYMMDD 00:00:00'), 'YYYYMMDD HH:mm:ss').add(this.currHour, 'hours');
      if (i === 1) {
        time.add(parseInt(this.activeIndex==1?this.interval:1), 'hours');
      } else {
        time.subtract(parseInt(this.activeIndex==1?this.interval:1), 'hours');
      }
      this.currDate = time;
      this.currHour = time.format('HH');
      if (this.activeIndex == 2) {
        this.loginFn(this.interval, moment(this.currDate).format('YYYY-MM-DD HH:mm:ss'))
      } else if (this.activeIndex == 1) {
        this.dieFn(this.interval, moment(this.currDate).format('YYYY-MM-DD HH:mm:ss'))
      }
      // this.$emit('dieFn',this.interval,moment(this.currDate).format('YYYY-MM-DD HH:mm:ss'))
    },
    changeHour() {
      if(this.activeIndex==1){
        this.dieFn(this.interval, moment(this.currDate).format('YYYY-MM-DD HH:mm:ss'))
      }else{
        this.loginFn(this.interval, moment(this.currDate).add(this.currHour,'hour').format('YYYY-MM-DD HH:mm:ss'))
      }
      
    },
    dieFn(interval, date) {
      // console.log(interval)
      this.coverPaths=[]
      // document.querySelector('.imgDie').innerHTML = ''
      // console.log(interval, date)
      if (interval && date) {
        this.dieSwitch = true
        let data = {
          'modeName': 'qiangtianqi',
          'eleName': `OBSoverlay:实况叠加:${interval}`,
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
          this.coverPaths.push(`http://10.20.67.111/getPic.action2?ppath=${res.data.path.split(',')[5]}`)
        })
      } else {
        this.dieSwitch = false
      }

    },
    loginFn(interval, date) {
      // if (this.loginzt) {
      this.coverPaths=[]
      // document.querySelector('.imgDie').innerHTML = ''
        // console.log(interval, date)
        if (interval && date) {
          this.dieSwitch = true
          let data = {
            'modeName': 'qiangtianqi',
            'eleName': `forecastoverlay:预报`,
            'forecastTime': moment(date,'YYYY-MM-DD HH:mm:ss').add(parseInt(this.interval),'hour').format('YYYY-MM-DD HH:mm:ss'),
            'level': '',
            'userDefinedParas': '',
            'strTime': date,
            'symbol': 2
          }
          const params = new URLSearchParams();
          for (const key in data) {
            params.append(key, data[key]);
          }
          axios.post(`/proxy/10.20.67.111/PictureInfoForgetFilePath.action`, params).then(res => {
            // console.log(res.data.path.split(','))
            this.coverPaths.push(`http://10.20.67.111/getPic.action2?ppath=${res.data.path.split(',')[5]}`)
          })
        }

    },
    // 键盘事件监听
    onKeyup(event) {
      const { code } = event;
      if (code === 'ArrowLeft') {
        this.$refs.wholeAgingSelect[0].onTuningAging(-1);
      }else if (code === 'ArrowRight') {
        this.$refs.wholeAgingSelect[0].onTuningAging(1);
      }else if (code === 'ArrowUp' || code === 'ArrowDown') {

        let activeElementId = '';
        const isProb = this.currFcstName === '概率预报';
        if (isProb) {
          activeElementId = this.options.find(el => el .fcstName === this.currFcstName).activeElementId;
        }else {
          activeElementId = this.currTypeOption.activeElementId;
        }
        const currIndex = this.currEleIdList.findIndex(id => id === activeElementId);
        if (currIndex === -1) return;
        let nextIndex = currIndex + (code === 'ArrowUp' ? -1 : 1);
        if (nextIndex <= 0) {
          nextIndex = this.currEleIdListLength - 1;
        }else if (nextIndex >= this.currEleIdListLength) {
          nextIndex = 0;
        }

        const nextActiveElementId = this.currEleIdList[nextIndex];
        if (isProb) {
          this.options.find(el => el .fcstName === this.currFcstName).activeElementId = nextActiveElementId;
        }else {
          this.currTypeOption.activeElementId = nextActiveElementId;
        }

        this.debouncedFindCondition();
      }
    },

    // 图片切换事件
    onSwitchImg(sign) {
      if (sign === 'left') {
        this.$refs.wholeAgingSelect[0].onTuningAging(-1);
      }else if (sign === 'right') {
        this.$refs.wholeAgingSelect[0].onTuningAging(1);
      }else if (sign === 'top') {
        this.$refs.levelSelect.onTuningLevel(1);
      }else if (sign === 'bottom') {
        this.$refs.levelSelect.onTuningLevel(-1);
      }
    },

    // 条件改变时
    onConditionChange() {
      this.debouncedFindCondition();
    },

    //点击要素时
    onClickElement(curr, itemId) {
      if (curr.activeElementId === itemId) return;
      curr.activeElementId = itemId;
      this.debouncedFindCondition();
    },

    // 点击条件时
    onClickCondition(curr, itemName) {
      if (curr.activeConditionName === itemName) return;
      curr.activeConditionName = itemName;
      this.debouncedFindCondition();
    },

    // 寻找选中的条件
    findCondition() {
      const currFcst = this.options.find(
        el => el.fcstName === this.currFcstName
      );
      this.currfcst = currFcst;
      // console.log(currFcst);
      const id = currFcst.id;

      this.currFcstOption = currFcst;

      // 多模式预报
      if (id === "manyPattern") {
        const currContent = currFcst.contents.find(
          el => el.typeName === currFcst.activeTypeName
        );
        currContent.contents.forEach(content => {
          content.sections.forEach(section => {
            section.items.forEach(el => {
              if (el.id === currContent.activeElementId) {
                this.currEleOption = el;
                this.currTypeOption = currContent;
                this.currEleIdList = content.sections.reduce((curr, el) => {
                  return curr.concat(el.items.map(el => el.id));
                }, []);
                // console.log(this.currEleIdList);
                // console.log(currContent.typeName);
                // console.log(currContent.date);
                // console.log(currContent.hour);
                // console.log(el.name);
                // console.log(el);

                // body处理
                let strTime = '';
                if (currContent.date) {
                  strTime = currContent.date.format('YYYY-MM-DD') + ' ' + currContent.hour + ':00:00';
                }
                let forecastTime = '';
                if (strTime) {
                  forecastTime = moment(strTime, 'YYYY-MM-DD HH:mm:ss').add(+currFcst.aging, 'hours').format('YYYY-MM-DD HH:mm:ss');
                }
                const eleName = ['forecast', this.area, currContent.name, el.name].join(':');
                const body = {
                  modeName: 'qiangtianqi',
                  eleName,
                  forecastTime,
                  level: el.activeLevel,
                  userDefinedParas: '',
                  strTime
                }
                // 有起报时间 与 无起报时间(即第一次请求)
                if (strTime) {
                  if (currContent.isStability === true) {  //当稳定性为true
                    this.requestStabilityImgPath(body, currContent);
                  }else {
                    this.requestImgPath(body);
                  }
                }else {
                  this.requestImgPath(body, currContent, currFcst);
                }

              }
            });
          });
        });
      } else if (id === "gather") {  //集合预报
        const currContent = currFcst.contents.find(
          el => el.typeName === currFcst.activeTypeName
        );

        const mss = [];
        currContent.conditions.forEach(el => {
          mss.push(el.activeConditionName);
        });

        currContent.elementContents.forEach(elementContent => {
          elementContent.sections.forEach(section => {
            section.elements.forEach(el => {
              if (el.id === currContent.activeElementId) {
                this.currEleOption = el;
                this.currTypeOption = currContent;
                this.currEleIdList = elementContent.sections.reduce((curr, el) => {
                  return curr.concat(el.elements.map(el => el.id));
                }, []);
                // console.log(this.currEleIdList);
                // console.log(currContent.typeName);
                // console.log(currContent.date);
                // console.log(currContent.hour);
                // console.log(el.name);

                // body处理
                let strTime = '';
                if (currContent.date) {
                  strTime = currContent.date.format('YYYY-MM-DD') + ' ' + currContent.hour + ':00:00';
                }
                let forecastTime = '';
                if (strTime) {
                  forecastTime = moment(strTime, 'YYYY-MM-DD HH:mm:ss').add(+currFcst.aging, 'hours').format('YYYY-MM-DD HH:mm:ss');
                }

                const eleName = ['集合预报', currContent.name, el.name, mss.join(',')].join(':');
                const body = {
                  modeName: 'qiangtianqi',
                  eleName,
                  forecastTime,
                  level: el.activeLevel,
                  userDefinedParas: '',
                  strTime
                }

                // 有起报时间 与 无起报时间
                if (strTime) {
                  this.requestImgPath(body);
                }else {
                  this.requestImgPath(body, currContent, currFcst);
                }
                
              }
            });
          });
        });

      } else if (id === "prob") {  //概率预报

        currFcst.contents.forEach(content => {
          content.elements.forEach(el => {
            if (el.id === currFcst.activeElementId) {
              this.currEleOption = el;
              this.currTypeOption = content;
              this.currEleIdList = content.elements.map(el => el.id);
              // console.log(this.currEleIdList);
              // console.log(content.date);
              // console.log(content.hour);
              // console.log(el.name);

              // body处理
              let strTime = '';
              if (content.date) {
                strTime = content.date.format('YYYY-MM-DD') + ' ' + content.hour + ':00:00';
              }
              let forecastTime = '';
              if (strTime) {
                forecastTime = moment(strTime, 'YYYY-MM-DD HH:mm:ss').add(+currFcst.aging, 'hours').format('YYYY-MM-DD HH:mm:ss');
              }
              const eleName = ['概率预报:NCEP', el.name + content.eleNameSuffix, content.activeHour + 'h'].join(':');
              const body = {
                modeName: 'qiangtianqi',
                eleName,
                forecastTime,
                level: el.activeLevel,
                userDefinedParas: '',
                strTime
              }

              // 有起报时间 与 无起报时间
              if (strTime) {
                this.requestImgPath(body);
              }else {
                this.requestImgPath(body, content, currFcst);
              }
            }
          });
        });

      }

    },

    // 请求图片路径(只针对稳定性)
    requestStabilityImgPath(body, citeObj) {
      
      // 取消之前的所有未完成的请求
      this.cancelAllRequest();

      // 存储取消时的token
      const CancelToken = axios.CancelToken;

      // 请求处理
      const h = citeObj.hourList;
      const agingInterval = citeObj.hourList.length > 1 ? Math.abs(h[1] - h[0]) : 24;
      const startTime = moment(body.strTime, 'YYYY-MM-DD HH:mm:ss');
      const requestList = new Array(4).fill(0).map((el, i) => {
        const strTime = startTime.clone().subtract(agingInterval * i, 'hours').format('YYYY-MM-DD HH:mm:ss');
        const currBody = {...body, strTime};
        const params = new URLSearchParams();
        for (const key in currBody) {
          params.append(key, currBody[key]);
        }
        return axios.post("/proxy/10.20.67.111/PictureInfoForgetFilePath.action", params, {
          cancelToken: new CancelToken(c => {
            this.cancelRequests.push(c);
          })
        });
      });

      // 请求数据
      axios.all(requestList).then(datas => {
        this.imgPaths = datas.map(data => {
          if (!data.data.path) return '';
          const path = data.data.path.split(',').pop();
          if (path) {
            return 'http://10.20.67.111/getPic.action2?ppath=' + path;
          }
          return '';
        });
      })

    },


    // 请求图片路径
    requestImgPath(body, timeCiteObj, agingCiteObj) {

      // 取消之前的所有未完成的请求
      this.cancelAllRequest();

      // 存储取消时的token
      const CancelToken = axios.CancelToken;

      // 参数转换
      const params = new URLSearchParams();
      for (const key in body) {
        params.append(key, body[key]);
      }

      // 请求数据
      axios.post("/proxy/10.20.67.111/PictureInfoForgetFilePath.action", params, {
        cancelToken: new CancelToken(c => {
          this.cancelRequests.push(c);
        })
      }).then(data => {

        if (!data.data.path) {
          this.imgPaths = [''];
          return;
        }

        // [模式名字 要素名字  发布时间  预报时间 层次  文件路径]
        const [patternName, eleName, startTime, fcstTime, level, filePath] = data.data.path.split(',');

        // 第一次请求数据 && 有文件路径返回时
        if (timeCiteObj && filePath) {
          const startT = moment(startTime, 'YYYY-MM-DD HH:mm:ss');
          const fcstT = moment(fcstTime, 'YYYY-MM-DD HH:mm:ss');
          const startStamp = startT.unix();
          const fcstStamp = fcstT.unix();
          const aging = this.formatAging((fcstStamp - startStamp) / 60 / 60);
          agingCiteObj.aging = aging;
          timeCiteObj.date = startT.clone().startOf('day');
          timeCiteObj.hour = startT.format('HH');
          this.currEleOption.activeLevel = level;
        }
        this.imgPaths = ['http://10.20.67.111/getPic.action2?ppath=' + filePath];
      })
    },

    // 格式化时效
    formatAging(val) {
      val += '';
      const leng = val.length;
      if (leng === 1) return '00' + val;
      if (leng === 2) return '0' + val;
      return val;
    },

    // 取消所有请求
    cancelAllRequest() {
      if (this.cancelRequests.length) {
        this.cancelRequests.forEach(el => el());
        this.cancelRequests = [];
      }
    },
  }


};
