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
  SideBar,
  Login
} from "../../components/share";
import { ToolBtn } from '../../components/base';
import options from "../../assets/config/diagnosis_config";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapGetters, mapMutations } = createNamespacedHelpers(
  "synthesis"
)

export default {
  name: "Diagnosis",
  components: { DateSelect, LevelSelect, AreaSelect, WholeAgingSelect, TimeSelect, AgingSelect, ImgShow, SideBar, Login, ToolBtn },
  data: function () {
    return {
      dieSwitch: false,
      login_switch: false,
      // 该引用存储短期所有配置
      options,
      img_active: false,
      cancelRequests: [],
      loginzt: false,

      area: "全国",
      activeIndex: null,
      // 当前选中的预报类型
      currFcstName: "地面",

      // 该引用当前选中的要素配置
      currEleOption: null,

      // 该引用当前预报配置
      currFcstOption: null,

      // 该引用含有当前起报时间以及当前选中要素的id
      currTypeOption: null,

      // 当前选中路径下的所有要素id的列表
      currEleIdList: [],

      // 图片地址
      user:'',
      activeClose:false,
      pass:'',
      imgPaths: [],
      coverPaths:[],
      login_data: {},
      currDate: null,
      zoomSw:false,
      currHour: '02',
      hourList: ['02', '05', '08', '11', '14', '17', '20', '23'],
      interval: '24h'
    };
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
  watch:{
    imgPaths(){
      this.updata_zoomUrl(this.imgPaths[0])
    }
  },
  methods: {
    moment,
    preChange(val){
      options[1].contents[0].slevel=val
      this.onConditionChange()
    },
    highChange(val){
      options[1].contents[0].glevel=val
      this.onConditionChange()
    },
    ...mapMutations(["updata_zoomSwitch","updata_zoomUrl"]),
    show_zoom(){
      this.updata_zoomSwitch(true)
      this.updata_zoomUrl(this.imgPaths[0])
    },
    // ...mapMutations([
    //   "updata_zoomSwitch",
    // ]),
    close(){
      this.updata_zoomSwitch(false)
    },
    loginF(i){
      // console.log(i)
      if(i){
        if(this.user=='swpc'&&this.pass=='swpc'){
          this.loginFn(this.interval, moment(this.currDate).add(this.currHour,'hour').format('YYYY-MM-DD HH:mm:ss'))
          this.login_switch=false
        }else{
          alert('用户名或密码错误')
        }
      }else{
        this.login_switch=false
        this.activeIndex=null
      }
    },
    select(i) {
      this.activeClose=!this.activeClose
      if (this.activeIndex == i) {
        if(!this.activeClose){
          this.activeIndex = null
          this.dieSwitch=false
          this.dieFn()
          // alert(options[0].contents[0].hour)
          this.currHour=options[0].contents[0].hour
          this.loginzt=false
          this.activeClose=false
        }
      } else {
        // let value=JSON.parse(JSON.stringify(options[0].contents[0].date))
        this.currHour=options[0].contents[0].hour
        this.currDate = moment(JSON.parse(JSON.stringify(options[0].contents[0].date)))
        if (i === 1) {
          this.loginzt=true
          this.dieFn(this.interval, moment(this.currDate).add(this.currHour,'hour').format('YYYY-MM-DD HH:mm:ss'))
        } else {
          this.login_switch=true
          this.loginzt=false
        }
        this.activeIndex = i
      }
    },
    changDate(i) {
      const time = moment(this.currDate.format('YYYYMMDD 00:00:00'), 'YYYYMMDD HH:mm:ss').add(this.currHour, 'hours');
      // console.log( time)
      if (i === 1) {
        time.add(parseInt(this.loginzt?this.interval:1), 'hours');
      } else {
        time.subtract(parseInt(this.loginzt?this.interval:1), 'hours');
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
      // console.log(moment(this.currDate).format('YYYY-MM-DD HH:mm:ss'))
        this.dieFn(this.interval, moment(this.currDate).format('YYYY-MM-DD HH:mm:ss'))
      }else{
        this.loginFn(this.interval, moment(this.currDate).add(this.currHour,'hour').format('YYYY-MM-DD HH:mm:ss'))
      }
      
    },
    dieFn(interval, date) {
      // document.querySelector('.imgDie').innerHTML = ''
      this.coverPaths=[]
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
          this.coverPaths.push(`http://10.20.67.111/getPic.action2?ppath=${res.data.path.split(',')[5]}`)
          // console.log(res.data.path.split(','))
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
      } else {
        // alert
        this.coverPaths=[]
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
            'symbol':2
          }
          const params = new URLSearchParams();
          for (const key in data) {
            params.append(key, data[key]);
          }
          axios.post(`/proxy/10.20.67.111/PictureInfoForgetFilePath.action`, params).then(res => {
          this.coverPaths.push(`http://10.20.67.111/getPic.action2?ppath=${res.data.path.split(',')[5]}`)

            // console.log(res.data.path.split(','))
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
    loginResult(val) {
      this.loginzt = val
      this.login_switch = false
      if (val) {
        document.querySelector('.imgDie').innerHTML = ''
        // console.log(interval, date)
        if (this.login_data.interval && this.login_data.date) {
          this.dieSwitch = true
          let data = {
            'modeName': 'qiangtianqi',
            'eleName': `forecastoverlay:预报`,
            'forecastTime': this.login_data.date,
            'level': '',
            'userDefinedParas': '',
            'strTime': this.login_data.date,
            'symbol': 1
          }
          const params = new URLSearchParams();
          for (const key in data) {
            params.append(key, data[key]);
          }
          axios.post(`/proxy/10.20.67.111/PictureInfoForgetFilePath.action`, params).then(res => {
            // console.log(res.data.path.split(','))
            let img = new Image()
            img.src = `http://10.20.67.111/getPic.action2?ppath=${res.data.path.split(',')[5]}`
            img.style.cssText = 'width:100%;height:100%;'
            // this.dieImgSrc=`http://10.20.67.111/getPic.action2?ppath=\\${res.data.path.split(',')[5]}`
            img.onload = () => {
              document.querySelector('.imgDie').appendChild(img)
            }
            img.onerror = () => {
              img.src = require('../../assets/images/404.png')
              document.querySelector('.imgDie').appendChild(img)
            }
          })
        }
      }
    },
    // 键盘事件监听
    onKeyup(event) {
      const { code } = event;
      if (code === 'ArrowLeft') {
        this.$refs.wholeAgingSelect[0].onTuningAging(-1);
      } else if (code === 'ArrowRight') {
        this.$refs.wholeAgingSelect[0].onTuningAging(1);
      } else if (code === 'ArrowUp' || code === 'ArrowDown') {

        let activeElementId = '';
        const isProb = this.currFcstName === '概率预报';
        if (isProb) {
          activeElementId = this.options.find(el => el.fcstName === this.currFcstName).activeElementId;
        } else {
          activeElementId = this.currTypeOption.activeElementId;
        }
        const currIndex = this.currEleIdList.findIndex(id => id === activeElementId);
        if (currIndex === -1) return;
        let nextIndex = currIndex + (code === 'ArrowUp' ? -1 : 1);
        if (nextIndex <= 0) {
          nextIndex = this.currEleIdListLength - 1;
        } else if (nextIndex >= this.currEleIdListLength) {
          nextIndex = 0;
        }

        const nextActiveElementId = this.currEleIdList[nextIndex];
        if (isProb) {
          this.options.find(el => el.fcstName === this.currFcstName).activeElementId = nextActiveElementId;
        } else {
          this.currTypeOption.activeElementId = nextActiveElementId;
        }

        this.debouncedFindCondition();
      }
    },

    // 图片切换事件
    onSwitchImg(sign) {
      if (sign === 'left') {
        this.$refs.wholeAgingSelect[0].onTuningAging(-1);
      } else if (sign === 'right') {
        this.$refs.wholeAgingSelect[0].onTuningAging(1);
      } else if (sign === 'top') {
        this.$refs.levelSelect.onTuningLevel(1);
      } else if (sign === 'bottom') {
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
      if (id === "FenXiDiMian") {
        this.img_active = false
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
                const eleName = ['OBSanaly', currContent.id, el.name].join(':');
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
                  } else {
                    this.requestImgPath(body);
                  }
                } else {
                  this.requestImgPath(body, currContent, currFcst);
                }

              }
            });
          });
        });
      } else if (id === "FenXiGaokong") {  //集合预报
        this.img_active = true
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
                // console.log(currContent)
                // console.log(currContent.activeElementId.substr(5))
                if (currContent.activeElementId.substr(5) > 6 && currContent.activeElementId.substr(5) < 32) {
                  el.activeLevel = currContent.glevel
                  this.$set(currContent, 'gSwitch', false)
                  this.$set(currContent, 'sSwitch', true)
                } else if (currContent.activeElementId.substr(5) > 31) {
                  el.activeLevel = currContent.slevel
                  this.$set(currContent, 'gSwitch', true)
                  this.$set(currContent, 'sSwitch', false)
                } else {
                  el.activeLevel = ''
                  this.$set(currContent, 'gSwitch', true)
                  this.$set(currContent, 'sSwitch', true)
                }
                const eleName = ['OBSanaly', currContent.id, el.name].join(':');
                const body = {
                  modeName: 'qiangtianqi',
                  eleName,
                  forecastTime,
                  level: el.activeLevel,
                  // level:850,
                  userDefinedParas: '',
                  strTime
                }
                // 有起报时间 与 无起报时间(即第一次请求)
                if (strTime) {
                  if (currContent.isStability === true) {  //当稳定性为true
                    this.requestStabilityImgPath(body, currContent);
                  } else {
                    this.requestImgPath(body);
                  }
                } else {
                  this.requestImgPath(body, currContent, currFcst);
                }

              }
            });
          });
        });
      } else if (id === "FenXiZiDongZhan") {  //概率预报
        this.img_active = false
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
                const eleName = ['OBSanaly', currContent.id, el.name].join(':');
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
                  } else {
                    this.requestImgPath(body);
                  }
                } else {
                  this.requestImgPath(body, currContent, currFcst);
                }

              }
            });
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
        const currBody = { ...body, strTime };
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
