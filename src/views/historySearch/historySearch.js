const plainOptions = [
    '全国','华北','东北','华东','华南','西南','西北','青藏','新疆','近海'
]
const plainOptionsType = [
    '冰雹','大风','雾霾','强降水','雷暴大风'
]
// 产品类型树节点信息
const  treeData = [
    {
      title: '实况',
      key: '实况',
      children: [{
        title: '强天气',
        key: '实况-强天气',
      }, {
        title: '云图',
        key: '实况-云图',
      }, {
        title: '自动站',
        key: '实况-自动站',
      }, {
        title: '雷达拼图',
        key: '实况-雷达拼图',
        children:[{
          title: 'PUP拼图',
          key: '实况-雷达拼图-PUP拼图',
        },{
          title: 'SWAN拼图',
          key: '实况-雷达拼图-SWAN拼图',
        },{
          title: '雷达特征量',
          key: '实况-雷达拼图-雷达特征量',
        }]
      }],
    },
    
    
      {
        title: '监测',
        key: '监测',
        children: [{
          title: '强天气',
          key: '监测-强天气',
        }, {
          title: '自动站',
          key: '监测-自动站',
        }, {
          title: '闪电',
          key: '监测-闪电',
        }, {
          title: '卫星',
          key: '监测-卫星',
          children:[{
            title: '时间累积次数',
            key: '监测-卫星-时间累积次数',
          },{
            title: '逐小时或30分',
            key: '监测-卫星-逐小时或30分',
          }]
        },{
          title: '雷达',
          key: '监测-雷达',
        }, {
          title: '风廓线',
          key: '监测-风廓线',
        }],
      }
    ,
    
      {
        title: '诊断',
        key: '诊断',
        children:[{
          title: '地面',
          key: '诊断-地面',
        },{
          title: '高空',
          key: '诊断-高空',
        },{
          title: '自动站',
          key: '诊断-自动站',
          children:[
            {
              title: '非站点',
              key: '诊断-自动站-非站点',
            },
            {
              title: '站点',
              key: '诊断-自动站-站点',
            }
          ]
        }]
      }
    ,
    
      {
        title: '短临',
        key: '短临',
        children:[{
          title: '短时',
          key: '短临-短时',
        },{
          title: '临近',
          key: '短临-临近',
        },{
          title: '探空',
          key: '短临-探空',
        },{
          title: '客观预报',
          key: '短临-客观预报',
          children:[
            {
              title: '客观预报',
              key: '短临-客观预报-客观预报',
            },
            {
              title: '多模式集成',
              key: '短临-客观预报-多模式集成',
            }
          ]
        }]
      }
    ,
    
      {
        title: '短期',
        key: '短期',
        children:[
          {
            title: '多模式预报',
            key: '短期-多模式预报',
            children:[
              {
                title: 'NCEP',
                key: '短期-多模式预报-NCEP',
                children:[
                  {
                    title: '综合图',
                    key: '短期-多模式预报-NCEP-综合图',
                    children:[
                      {
                        title: '会商',
                        key: '短期-多模式预报-NCEP-综合图-会商',
                      },
                      {
                        title: '通用',
                        key: '短期-多模式预报-NCEP-综合图-通用',
                      },
                      {
                        title: '短时强降水',
                        key: '短期-多模式预报-NCEP-综合图-短时强降水',
                      },
                      {
                        title: '冰雹雷暴大风',
                        key: '短期-多模式预报-NCEP-综合图-冰雹雷暴大风',
                      },
                      {
                        title: '冰雹',
                        key: '短期-多模式预报-NCEP-综合图-冰雹',
                      },
                      {
                        title: '雷暴大风',
                        key: '短期-多模式预报-NCEP-综合图-雷暴大风',
                      }
                    ]
                  },
                  {
                    title: '抬升',
                    key: '短期-多模式预报-NCEP-抬升',
                  },
                  {
                    title: '水汽',
                    key: '短期-多模式预报-NCEP-水汽',
                  },
                  {
                    title: '不稳定能量',
                    key: '短期-多模式预报-NCEP-不稳定能量',
                  }
                ]
              },
              { 
                title: 'EC',
                key: '短期-多模式预报-EC',
              },
              {
                title: 'grapes_GFS',
                key: '短期-多模式预报-grapes_GFS',
              },
              
            ]
          },
          {
            title: '集合预报',
            key: '短期-集合预报',
          },{
            title: '概率预报',
            key: '短期-概率预报',
          }
        ]
      
      }
    
    
]

// 天气系统
const weatherSystemOptions = ['高气压','低气压','高压脊','低压槽','反气旋','气旋','雷暴','冷槽','暖脊','龙卷','飑线','切变线','热带云团',]

const tData = [{id:'1',isTbodyCheck:true},{id:'2'},{id:'3'},{id:'4'}]

const showImgs = [{url:require('./imgs/map1.png'),id:'1'},{url:require('./imgs/001.png'),id:'2'},{url:require('./imgs/002.png'),id:'3'},{url:require('./imgs/003.png'),id:'4'}]

import {mapState} from 'vuex'
import * as axios from "axios";

export default{
    data(){
        return {
            //筛选的树节点信息
            treeData,
            
            // 天气类型多选
            plainOptionsType,
            typeCheckedList:[],
            // 天气系统全选
            weatherSystemOptions,
            systemCheckedList:[],
            isCheckAllSystem:false,
            // 选择地区多选
            plainOptions,
            checkedList:[],
            checkAll:false,
            // 是否显示选择系统部分
            isShowSystem:false,
            //用于查询的数据
            searchData:{
                beginDate:'',
                endDate:'',
                weatherSystem:[],
                local:[],
            },
            tData,
            // tbody是否选中
            isTbodyCheck:false,
            showImgs,
            selected:'1',
            // 筛选的数据
            filter:[],
        }   
    },
    mounted(){
      this.filter.push(this.defaultChecked[0])
    },
    methods:{
        // 日期变更
        onBeginDate(date,dateString){
            this.searchData.beginDate=dateString

        },
        onEndDate(date,dateString){
            this.searchData.endDate=dateString

        },

        // 天气类型多选变更
        onTypeChange(){
            this.searchData.weatherSystem=[...this.typeCheckedList]
        },
        // 天气系统多选变更
        onSystemChange(systemCheckedList){
            this.isCheckAllSystem = systemCheckedList.length === weatherSystemOptions.length
        },
        // 天气系统全选
        onCheckAllChangeSys (e) {
            Object.assign(this, {
            systemCheckedList: e.target.checked ? weatherSystemOptions : [],
            isCheckAllSystem: e.target.checked,
            })
        },
        // 选择地区多选变更
        onAreaChange (checkedList) {
            this.checkAll = checkedList.length === plainOptions.length
        },
        onCheckAllChange (e) {
            Object.assign(this, {
                checkedList: e.target.checked ? plainOptions : [],
                checkAll: e.target.checked,
            })
        },
        // 点击选择系统
        onCheckSystem(){
            this.isShowSystem = true
        },
        // 确定
        onConfirm(){
            this.isShowSystem = false
        },
        // 取消
        onCancel(){
            this.isShowSystem = false

        },
        // 选择tbody
        onCheckTbody(tbody){
            this.selected=tbody.id
        },
        //查询
        onSearch(){
            console.log(this.searchData)
        },
        // 向前/后切换图片
        onChangeMap(type){
            switch (type)
                {
                    // 向前翻页
                    case 'pre':
                    this.selected--
                    if(this.selected<1){
                        this.selected=showImgs.length
                    }
                    break
                    // 向后翻页
                    case 'next':
                    this.selected++
                    if(this.selected>showImgs.length){
                        this.selected=1
                    }
                }

        },
        //筛选
        onSelect(filter){
          this.filter=filter
          console.log(this.filter)
        }
        
    },
    computed:{
      ...mapState({
        defaultChecked:state=>state.historyCase.defaultChecked

      })
    },
    watch:{
        checkedList(){
            this.searchData.local=[...this.checkedList]
            
        },
       
       
    },
    
}