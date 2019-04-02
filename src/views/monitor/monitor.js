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
import { createNamespacedHelpers } from "vuex";
const { mapState, mapGetters, mapMutations } = createNamespacedHelpers(
  "synthesis"
);
import options from "../../assets/config/monitor_config";


export default {
  name: "Monitor",
  components: { DateSelect, LevelSelect, AreaSelect, WholeAgingSelect, TimeSelect, AgingSelect, ImgShow,SideBar },
  data: function () {
    return {

      // 该引用存储短期所有配置
      options,

      cancelRequests: [],

      area: "全国",

      // 当前选中的预报类型
      currFcstName: "强对流",

      // 该引用当前选中的要素配置
      currEleOption: null,

      // 该引用当前预报配置
      currFcstOption: null,

      // 该引用含有当前起报时间以及当前选中要素的id
      currTypeOption: null,
      warningSwitch:false,
      // 当前选中路径下的所有要素id的列表
      currEleIdList: [],

      // 图片地址
      imgPaths: [],
      // qwSwitch:false,
      img_active:false,
      zoomSw:false,
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
      ]
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
    this.$set(this.options[4].contents[0],'startDate',moment())
    this.$set(this.options[4].contents[0],'endDate',moment())
    this.findCondition();
  },

  beforeDestroy() {
    this.cancelAllRequest();
  },
  watch:{
    imgPaths(){
      this.updata_zoomUrl(this.imgPaths[0])
    },
    area(){
      this.onConditionChange()
    }
  },
  methods: {
    moment,
    warningFn(){
      this.warningSwitch=!this.warningSwitch
    },
    highChange(val){
      options[5].contents[0].high=val
      this.onConditionChange()
    },
    preChange(val){
      options[5].contents[0].pressure=val
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
      // alert()
      const currFcst = this.options.find(
        el => el.fcstName === this.currFcstName
      );
      this.currfcst = currFcst;
      // console.log(currFcst);
      const id = currFcst.id;

      this.currFcstOption = currFcst;

      // 多模式预报
      if (id === "OBSConvection") {
        const currContent = currFcst.contents.find(
          el => el.typeName === currFcst.activeTypeName
        );
        // currContent.contents.forEach(content => {
        currContent.sections.forEach(section => {
          section.items.forEach(el => {
            if (el.id === currContent.activeElementId) {
              this.currEleOption = el;
              this.currTypeOption = currContent;
              this.currEleIdList = currContent.sections.reduce((curr, el) => {
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
              let name = el.name
              if (name.indexOf('人工站') != -1 || name.indexOf('无质控') != -1) {
                name = name.substr(0, name.indexOf('('))
              } else if (name.indexOf('(') != -1) {
                name = name.substr(0, name.length - 1)
                name = name.split('(').join('_')
              }
              const eleName = [currContent.id, name, this.area, currFcst.date].join(':');
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

      } else if (id === "OBSAws") {  //集合预报
        const currContent = currFcst.contents.find(
          el => el.typeName === currFcst.activeTypeName
        );
        // currContent.contents.forEach(content => {
        currContent.sections.forEach(section => {
          section.items.forEach(el => {
            if (el.id === currContent.activeElementId) {
              this.currEleOption = el;
              this.currTypeOption = currContent;
              this.currEleIdList = currContent.sections.reduce((curr, el) => {
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
              let name = el.name
              if (name.indexOf('(') != -1) {
                name = name.substr(0, name.indexOf('('))
              }
              let arr = []
              if (name == '降水量') {
                arr.push(currFcst.date)
                this.$set(currContent, 'dateSwitch', false)
              } else {
                this.$set(currContent, 'dateSwitch', true)
              }
              const eleName = [currContent.id, name, this.area, ...arr].join(':');
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

      } else if (id === "OBSLight") {  //概率预报

        const currContent = currFcst.contents.find(
          el => el.typeName === currFcst.activeTypeName
        );
        // currContent.contents.forEach(content => {
        currContent.sections.forEach(section => {
          section.items.forEach(el => {
            if (el.id === currContent.activeElementId) {
              this.currEleOption = el;
              this.currTypeOption = currContent;
              this.currEleIdList = currContent.sections.reduce((curr, el) => {
                return curr.concat(el.items.map(el => el.id));
              }, []);
              // console.log(this.currEleIdList);
              // console.log(currContent.typeName);
              // console.log(currContent.date);
              // console.log(currContent.hour);
              // console.log(el.name);
              // console.log(el);

              // body处理
              let name = el.name
              let arr = []
              console.log(name.indexOf('滑动'))
              if (name.indexOf('滑动') == -1) {
                arr.push(currFcst.date)
                this.$set(currContent, 'dateSwitch', false)
                this.$set(currContent, 'minuteSwitch', false)
              } else {
                this.$set(currContent, 'minuteSwitch', true)
                this.$set(currContent, 'dateSwitch', true)
              }
              let strTime = '';
              let minute='00'
              if(currContent.minSwitch){
                minute=currContent.minute
              }
              // console.log(minute,currContent.minuteSwitch)
              if (currContent.date) {
                strTime = currContent.date.format('YYYY-MM-DD') + ' ' + currContent.hour + `:${minute}:00`;
              }
              let forecastTime = '';
              if (strTime) {
                forecastTime = moment(strTime, 'YYYY-MM-DD HH:mm:ss').add(+currFcst.aging, 'hours').format('YYYY-MM-DD HH:mm:ss');
              }
              const eleName = [currContent.id, name, this.area, ...arr].join(':');
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

      } else if (id === 'OBSSatellite') {
        const currContent = currFcst.contents.find(
          el => el.typeName === currFcst.activeTypeName
        );
        // currContent.contents.forEach(content => {
        currContent.sections.forEach(section => {
          section.items.forEach(el => {
            if (el.id === currContent.activeElementId) {
              this.currEleOption = el;
              this.currTypeOption = currContent;
              this.currEleIdList = currContent.sections.reduce((curr, el) => {
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
              let name = el.name
              let arr = []
              // console.log(name.indexOf('滑动'))
              if (name.indexOf('基于红外') != -1) {
                arr.push(currFcst.date)
                this.$set(currContent, 'dateSwitch', false)
                // this.$set(currContent, 'minSwitch', false)
              } else {
                // this.$set(currContent, 'minSwitch', true)
                this.$set(currContent, 'dateSwitch', true)
              }
              const eleName = [currContent.id, name,...arr].join(':');
              const body = {
                modeName: 'qiangtianqi',
                eleName,
                forecastTime,
                level: el.activeLevel,
                userDefinedParas: '',
                strTime,
                symbol:1
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
      }else if(id==='OBSRadar'){
        const currContent = currFcst.contents.find(
          el => el.typeName === currFcst.activeTypeName
        );
        // currContent.contents.forEach(content => {
        currContent.sections.forEach(section => {
          section.items.forEach(el => {
            if (el.id === currContent.activeElementId) {
              this.currEleOption = el;
              this.currTypeOption = currContent;
              this.currEleIdList = currContent.sections.reduce((curr, el) => {
                return curr.concat(el.items.map(el => el.id));
              }, []);
              // console.log(this.currEleIdList);
              // console.log(currContent.typeName);
              // console.log(currContent.date);
              // console.log(currContent.hour);
              // console.log(el.name);
              // console.log(el);

              // body处理
             
              
              let name = el.name
              let arr = []
              if(name.indexOf('拼图')!=-1){
                name=this.area+name
                this.$set(currContent,'minuteSwitch',true)
                this.$set(currContent,'dateSwitch',true)
              }else{
                arr.push(currFcst.date)
                this.$set(currContent,'minuteSwitch',false)
                this.$set(currContent,'dateSwitch',false)
              }
              let strTime = '';
              let minute='00'
              if(currContent.minuteSwitch){
                minute=currContent.minute
              }
              // console.log(minute,currContent.minuteSwitch)
              if (currContent.date) {
                strTime = currContent.date.format('YYYY-MM-DD') + ' ' + currContent.hour + `:${minute}:00`;
              }
              let forecastTime = '';
              if (strTime) {
                forecastTime = moment(strTime, 'YYYY-MM-DD HH:mm:ss').add(+currFcst.aging, 'hours').format('YYYY-MM-DD HH:mm:ss');
              }
                            // console.log(name.indexOf('滑动'))
              // if (name.indexOf('红外') != -1) {
              //   arr.push(currFcst.date)
              //   this.$set(currContent, 'dateSwitch', false)
              //   // this.$set(currContent, 'minSwitch', false)
              // } else {
              //   // this.$set(currContent, 'minSwitch', true)
              //   this.$set(currContent, 'dateSwitch', true)
              // }
              const eleName = [currContent.id, name,...arr].join(':');
              const body = {
                modeName: 'qiangtianqi',
                eleName,
                forecastTime,
                level: el.activeLevel,
                userDefinedParas: '',
                strTime,
                symbol:1
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
      }else if(id==='windprofileMosaic'){
        const currContent = currFcst.contents.find(
          el => el.typeName === currFcst.activeTypeName
        );
        // currContent.contents.forEach(content => {
        currContent.sections.forEach(section => {
          section.items.forEach(el => {
            if (el.id === currContent.activeElementId) {
              this.currEleOption = el;
              this.currTypeOption = currContent;
              this.currEleIdList = currContent.sections.reduce((curr, el) => {
                return curr.concat(el.items.map(el => el.id));
              }, []);
              // body处理
              let name = currContent.name
              let arr = []
              if(el.name==='风场'){
                currContent.tabSwitch=false
                currContent.minuteSwitch=true
                arr.push(currContent.high)
              }else{
                currContent.tabSwitch=true
                arr.push(currContent.pressure)
                currContent.minuteSwitch=false
                name='comp'
                currContent.date=''
              }
              let strTime = '';
              let minute='00'
              if(currContent.minuteSwitch){
                minute=currContent.minute
              }
              // console.log(minute,currContent.minuteSwitch)
              if (currContent.date) {
                strTime = currContent.date.format('YYYY-MM-DD') + ' ' + currContent.hour + `:${minute}:00`;
              }
              let forecastTime = '';
              if (strTime) {
                forecastTime = moment(strTime, 'YYYY-MM-DD HH:mm:ss').add(+currFcst.aging, 'hours').format('YYYY-MM-DD HH:mm:ss');
              }

              const eleName = [currContent.id, name,...arr].join(':');
              const body = {
                modeName: 'qiangtianqi',
                eleName,
                forecastTime,
                level: el.activeLevel,
                userDefinedParas: '',
                strTime,
                symbol:1
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
          timeCiteObj.minute=startT.format('mm')
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
    get_gif(){
      // console.log(this.options[4].contents[0].startDate.format('YYYYMMDD'))
      let obj=this.options[4].contents[0]
      let url=`http://10.20.67.111/PictureInfoFordown.action?start= ${moment(obj.startDate).format(`YYYYMMDD${obj.startHour}${obj.startMinute}`)} &end= ${moment(obj.endDate).format(`YYYYMMDD${obj.endHour}${obj.endMinute}`)} &area= ${obj.areaid} &jiangetime= ${obj.interval} &donghuasd= ${obj.speed}&chinaRegion= ${obj.areaid}`
      // console.log(url)
      window.open(url,'_blank')
    },
  }


};
