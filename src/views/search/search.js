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
var url = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiYmlua29sIiwiYSI6ImNqdTJjcGg0bDA4ZWczeWxzY3M0N3YzZnIifQ.aemye-xFza6C0zXqXLLkqA'
export default{
    data(){
        return {
            // 产品名称多选数据
            namePlainOptions,
            nameCheckedList:[],
            isNameCheckAll:false,
            // 预报对象对选数据
            prePlainOptions,
            preCheckedList:[],
            isPreCheckAll:false,
            // table数据
            columns,
            tableData,
            // 日期选择数据
            beginDate:'0',
            endDate:'1'

        }
    },
    mounted(){
        var leafletMap = L.map('map').setView([41, 123], 5);
        L.tileLayer(url, {
            maxZoom: 18,
            id: 'mapbox.streets'
        }).addTo(leafletMap);
        //增加一个marker ，地图上的标记，并绑定了一个popup，默认打开
        L.marker([41, 123]).addTo(leafletMap)
                .bindPopup("<b>Hello world!</b><br />I am a popup.").openPopup();
        //增加一个圈，设置圆心、半径、样式
        L.circle([41, 123], 500, {
                color: 'red',
                fillColor: '#f03',
                fillOpacity: 0.5
        }).addTo(leafletMap).bindPopup("I am a circle.");
        //增加多边形
        L.polygon([
                [41, 123],
                [39, 121],
                [41, 126]
        ]).addTo(leafletMap).bindPopup("I am a polygon.");
        //为点击地图的事件 增加popup
        var popup = L.popup();
        function onMapClick(e) {
                popup
                        .setLatLng(e.latlng)
                        .setContent("You clicked the map at " + e.latlng.toString())
                        .openOn(leafletMap);
        }
        leafletMap.on('click', onMapClick)
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
        },
        onEndDate(value,mode){
            this.endDate = mode

        }
    },
    computed:{
        dateSame(){
            return this.beginDate===this.endDate
        }
    }

}