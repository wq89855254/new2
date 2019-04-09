// 历史存档表头信息
const columns = [{
    title: '序列',
    dataIndex: 'num',
    key: 'num',
    slots: { title: 'customTitle' },
    scopedSlots: { customRender: 'name' },
  }, {
    title: '开始时间',
    dataIndex: 'beginDate',
    key: 'beginDate',
  }, {
    title: '结束时间',
    dataIndex: 'endDate',
    key: 'endDate',
  }, {
    title: '产品类型',
    key: 'tags',
    dataIndex: 'tags',
    slots: { title: 'tags' },
    scopedSlots: { customRender: 'tags' },
  }, {
    title: '天气类型',
    key: 'weatherType',
    dataIndex: 'weatherType',
    scopedSlots: { customRender: 'action' },
  }, {
    title: '天气系统',
    dataIndex:'weatherSystem',
    key: 'weatherSystem',
    scopedSlots: { customRender: 'action' },
  }, {
    title: '说明',
    dataIndex:'explain',
    key: 'explain',
    scopedSlots: { customRender: 'action' },
  }, {
    title: '保存时间',
    dataIndex:'saveDate',
    key: 'saveDate',
    scopedSlots: { customRender: 'action' },
  }]
  
// 历史存档表格内容信息
const historyData = [{
    key: '1',
    num: '1',
    beginDate: '2019-01-15 14:00',
    endDate: '2019-01-18 14:00',
    
    tags:['查看详情'],
    weatherType: '冰雹/大风/强降水',
    weatherSystem:'高气压/高压脊/气旋/切变线',
    explain:'无',
    saveDate:'2019-01-18 14:00'
  },
  {
    key: '2',
    num: '2',
    beginDate: '2019-01-15 14:00',
    endDate: '2019-01-18 14:00',
    tags: ['查看详情'],
    weatherType: '冰雹/大风/强降水',
    weatherSystem:'高气压/高压脊/气旋/切变线',
    explain:'无',
    saveDate:'2019-01-18 14:00'
  },
  {
    key: '3',
    num: '3',
    beginDate: '2019-01-15 14:00',
    endDate: '2019-01-18 14:00',
    tags: ['查看详情'],
    weatherType: '冰雹/大风/强降水',
    weatherSystem:'高气压/高压脊/气旋/切变线',
    explain:'无',
    saveDate:'2019-01-18 14:00'
  },
  ]
  // 产品类型树节点信息
const treeData = [
    [{
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
    }],
    
    [
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
    ],
    [
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
    ],
    [
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
    ],
    [
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
    
    
    
  
]
// 天气类型
const weatherTypeOptions = ['冰雹','大风','雾霾','强降水','雷暴大风']
// 天气系统
const weatherSystemOptions = ['高气压','低气压','高压脊','低压槽','气旋','反气旋','切变线','雷暴','热带云团','冷槽','暖脊','龙卷','飑线']

export default{
    
    data() {
        return {
          isCheckShow:false,
          isConfirmShow:false,
          columns,
          historyData,
          pagination: {
            pageSize: 2,//每页显示的条数
            showQuickJumper:true,  //快速选择
            total:historyData.length
          },
          loading: false,

          // 树节点信息
          treeData,
          isExpand:false,
          disabled:false,
          checkedKeys:[['实况-强天气'],['监测-强天气','监测-卫星-时间累积次数'],[],[],[]],
          


          //天气类型/系统全选
          weatherTypeOptions,
          weatherSystemOptions,

          typeCheckedList:[],
          systemCheckedList:[],

          isCheckAllType:false,
          isCheckAllSystem:false,
          indeterminateType:false,
          indeterminateSys:false,
          
          // 是否点击确定
          isConfirm:false
        }
      },
    methods:{
      ccc(a,node){
        console.log(a,node.halfCheckedKeys)
      },
      // 产品类型显示隐藏
      isCheckProduct(isCheckShow){
        this.isCheckShow = isCheckShow
        this.isConfirm = false
        this.disabled = false
      },
      // 点击确定
      confirmProduct(){
        // this.isCheckShow = false
        this.isConfirm = true
        this.disabled = true
        
       
      },
      //
      
      // 天气类型多选变化
      onTypeChange(typeCheckedList){
        this.indeterminateType = !!typeCheckedList.length && (typeCheckedList.length < weatherTypeOptions.length)
        this.isCheckAllType = typeCheckedList.length === weatherTypeOptions.length
      },
      // 天气系统多选变化
      onSystemChange(systemCheckedList){
        this.indeterminateSys = !!systemCheckedList.length && (systemCheckedList.length < weatherSystemOptions.length)
        this.isCheckAllSystem = systemCheckedList.length === weatherSystemOptions.length
      },
      // 天气类型全选
      onCheckAllChange (e) {
        Object.assign(this, {
          typeCheckedList: e.target.checked ? weatherTypeOptions : [],
          isCheckAllType: e.target.checked,
        })
      },
      // 天气系统全选
      onCheckAllChangeSys (e) {
        Object.assign(this, {
          systemCheckedList: e.target.checked ? weatherSystemOptions : [],
          isCheckAllSystem: e.target.checked,
        })
      },

      // 表格详情点击
      handelClick(e){
        this.isCheckShow = true
        this.isConfirm = false
        this.disabled = true
      },
      

      // check(info){
      //   if(info.children){
      //     check(info.children)
         
      //   }else{

      //     if(typeof info.checked === 'undefined'){
        
      //       this.$set(info,'checked',true)
      //     }else{
      //       info.checked = !info.checked
      //     }
          
      //   }
        
        
      // }
      

    },

    watch:{
      checkedKeys(val){
        console.log(val)
        // console.log(Array.prototype.concat.apply([], val))

      }
    }
    
}