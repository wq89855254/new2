import eleOption from "../synthesis/element-option";
import L from "leaflet";
import '../../assets/js/pather-src'
import moment from 'moment';

const namePlainOptions = ['机器学习','配料法','主观']
const prePlainOptions = ['雷暴','冰雹与雷暴大风','短时强降水','强对流']
const columns = [
    {
        title: '产品名称',
        dataIndex: 'proName',
        sorter: (a, b) => a.proName.length - b.proName.length,
    },
    {
        title:'预报对象',
        dataIndex: 'typeName',
        sorter: (a, b) => a.typeName.length - b.typeName.length,

    },
    {
        title:'岗位或姓名',
        dataIndex: 'person',
        sorter: (a, b) => a.person.length - b.person.length,

    },
    {
        title:'TS',
        dataIndex: 'TS',

    },
    {
        title:'空报率',
        dataIndex: 'emptyRate',

    },
    {
        title:'漏报率',
        dataIndex: 'failRate',

    }
]
const tableData = [{
    key: '1',
    proName: '主观',
    typeName:'雷暴',
    person:'副首席',
    TS: '0.29',
    emptyRate: '0.64',
    failRate:'0.39'
  }, {
    key: '2',
    proName: '主观',
    typeName:'雷暴',
    person:'主班',
    TS: '0.29',
    emptyRate: '0.64',
    failRate:'0.39'
  },{
    key: '3',
    proName: '主观',
    typeName:'冰雹与雷暴大风',
    person:'副首席',
    TS: '0.29',
    emptyRate: '0.64',
    failRate:'0.39'
  },{
    key: '4',
    proName: '主观',
    typeName:'冰雹与雷暴大风',
    person:'副首席',
    TS: '0.29',
    emptyRate: '0.64',
    failRate:'0.39'
  },{
    key: '5',
    proName: '主观',
    typeName:'冰雹与雷暴大风',
    person:'副首席',
    TS: '0.29',
    emptyRate: '0.64',
    failRate:'0.39'
  },{
    key: '6',
    proName: '主观',
    typeName:'冰雹与雷暴大风',
    person:'副首席',
    TS: '0.29',
    emptyRate: '0.64',
    failRate:'0.39'
  },];

var patherLayerHanldeFunc;
var url = 'http://10.20.67.111:80/MapCache/googleMap/gis/mixed/Map_x={x}y={y}zoom={z}.png'


export default{
    data(){
        return {
            // 产品名称多选数据
            namePlainOptions,
            nameCheckedList:['主观'],
            isNameCheckAll:false,
            // 主班时效数据
            // 如果主观不勾选，则为空
            aging:1,
            // 预报对象数据
            prePlainOptions,
            preCheckedList:[],
            isPreCheckAll:false,
            // table数据
            columns,
            tableData,
            // 日期选择数据
            beginDate:'0',
            endDate:'1',
            map1:{},
            patherLayer:{},

        }
    },
    mounted(){
        this.map1 = L.map('map', {
            center: [37.17782559332976, 107.314453125],
            zoom: 5,
            minZoom: 4,
            maxZoom: 13,
            attributionControl: false,
            zoomControl: false
          });
          L.tileLayer(url, {
            maxZoom: 18,

        }).addTo(this.map1);

       

        this.patherLayer = new L.Pather({
            smoothFactor: 1,
            strokeWidth: 5,
            pathWidth: 5,
            pathOpacity: 1,
            mode: L.Pather.MODE.VIEW
          }).addTo(this.map1);
          let that = this
          this.patherLayer.on('edited', function (polyline) {
            if (patherLayerEditHandleFunc) {
              patherLayerEditHandleFunc(polyline);
            }
          });
          this.patherLayer.on('created', function (event) {
            if (that.patherLayer.getShape() == 'polygon') {
              event.latLngs.push(event.latLngs[0]);
            }
    
            // if (drawInitFlag == true) {
            //   //画在地图上再次点击不删除画的东西
            //   //patherLayer.removeBeforPath();
            // }
    
            // drawInitFlag = true;
            let latLngs = event.latLngs.map(function (latLng) {
              //return [latLng.lng, latLng.lat];
              return latLng.lng + ' ' + latLng.lat;
            }).join(' ') || 'Voila!';
            //console.log("pather created: " + latLngs);
            if (that.hail || that.rain) {
              that.levelSwitch = true
              that.latlngs = latLngs
              that.selectLevel = () => {
                patherLayerHanldeFunc(that.latlngs, event)
                that.levelSwitch = false
              }
            } else {
              if (patherLayerHanldeFunc) {
                patherLayerHanldeFunc(latLngs, event);
              } else {
                window.open("./Make_Warning/index.html", "_blank");
                //= window.open("./Make_Warning/index.html");
              }
            }
          });

        //   this.patherLayer.setShape('polygon');
          this.patherLayer.setMode(L.Pather.MODE.CREATE);
          patherLayerHanldeFunc = function (lnglats, event) {
            event.polyline.myData = {
              id: 'chanpin',
              data: {
                type: 1,
                lnglats: lnglats,
                value: "00000",
                lineWidth: 3
              }
            };
          };
  
    },
    methods:{
        // 产品名称多选框选择的回调
        nameCheckChange(nameCheckedList){
            this.isNameCheckAll = nameCheckedList.length === namePlainOptions.length
        },
        checkAllName(e){
            Object.assign(this, {
                nameCheckedList: e.target.checked ? namePlainOptions : [],
                isNameCheckAll: e.target.checked,
            })
        },
        //预报对象多选框选择的回调
        preCheckChange(preCheckedList){
            this.isPreCheckAll = preCheckedList.length === prePlainOptions.length
        },
        checkAllPre(e){
            Object.assign(this, {
                preCheckedList: e.target.checked ? prePlainOptions : [],
                isPreCheckAll: e.target.checked,
            })
        },
        // 日期选择的回调
        onBeginDate(value,mode){
            this.beginDate = mode
            console.log(mode)
            // console.log(moment(mode).format('YYYY-MM-DD'))
        },
        onEndDate(value,mode){
            this.endDate = mode

        },
        onRadioChange(e){
            console.log(e)
        }
    },
    watch:{
        nameCheckedList(v){
            console.log(v)
        },
        aging(v){
            console.log(v)
           
        },
        preCheckedList(v){
            console.log(v)
        }
    },
    computed:{
        dateSame(){
            return this.beginDate===this.endDate
        }
    }

}