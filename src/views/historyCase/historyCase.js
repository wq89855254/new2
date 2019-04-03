// 表头信息
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
    key: 'peoductType',
    dataIndex: 'peoductType',
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
  
  
  const historyData = [{
    key: '1',
    num: '1',
    beginDate: '2019-01-15 14:00',
    endDate: '2019-01-18 14:00',
    peoductType: '查看类型',
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
    peoductType: '查看类型',
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
    peoductType: '查看类型',
    weatherType: '冰雹/大风/强降水',
    weatherSystem:'高气压/高压脊/气旋/切变线',
    explain:'无',
    saveDate:'2019-01-18 14:00'
  },
  ]
  // 树节点信息
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
          key: 'PUP拼图',
        },{
          title: 'SWAN拼图',
          key: 'SWAN拼图',
        },{
          title: '雷达特征量',
          key: '雷达特征量',
        }]
      }],
    }],[{
      title: '实况2',
      key: '实况2',
      children: [{
        title: '强天气2',
        key: '实况2-强天气2',
      }]
    }],[{
      title: '实况3',
      key: '实况3',
      children: [{
        title: '强天气3',
        key: '实况3-强天气3',
      }]
    }],[{
      title: '实况4',
      key: '实况4',
      children: [{
        title: '强天气2',
        key: '实况4-强天气2',
      }]
    }],[{
      title: '实况5',
      key: '实况5',
      children: [{
        title: '强天气2',
        key: '实况5-强天气2',
      }]
    }]
    
    
  
]

import checkImg from './imgs/check.png'
import emptBlockImg from './imgs/emptBlock.png'

const weatherTypeOptions = ['冰雹','大风','雾霾','强降水','雷暴大风']
const weatherSystemOptions = ['高气压','低气压','高压脊','低压槽','气旋','反气旋','切变线','雷暴','热带云团','冷槽','暖脊','龙卷','飑线']

export default{
    data() {
        return {
          //img
          checkImg,
          emptBlockImg,

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
          isChecked:false,

          // 自动展开父节点
          autoExpandParent:true,
          expandedKeys:['实况-雷达拼图'],
          cKeys:[10,20],

          //全选
          weatherTypeOptions,
          weatherSystemOptions,

          typeCheckedList:[],
          systemCheckedList:[],

          isCheckAllType:false,
          isCheckAllSystem:false,
          indeterminateType:false,
          indeterminateSys:false

        }
      },
    methods:{
      isCheckProduct(isCheckShow){
        this.isCheckShow = isCheckShow
      },
      confirmProduct(){
        this.isCheckShow = false
      },
      
    
      onTypeChange(typeCheckedList){
        this.indeterminateType = !!typeCheckedList.length && (typeCheckedList.length < weatherTypeOptions.length)
        this.isCheckAllType = typeCheckedList.length === weatherTypeOptions.length
      },
      onSystemChange(systemCheckedList){
        this.indeterminateSys = !!systemCheckedList.length && (systemCheckedList.length < weatherSystemOptions.length)
        this.isCheckAllSystem = systemCheckedList.length === weatherSystemOptions.length
      },
      onCheckAllChange (e) {
        Object.assign(this, {
          typeCheckedList: e.target.checked ? weatherTypeOptions : [],
          isCheckAllType: e.target.checked,
        })
      },
      onCheckAllChangeSys (e) {
        Object.assign(this, {
          systemCheckedList: e.target.checked ? weatherSystemOptions : [],
          isCheckAllSystem: e.target.checked,
        })
      },
      
      //树形控件
     
      onExpand(expandedKeys,info){
        console.log('onExpand', expandedKeys)
        this.expandedKeys = expandedKeys
        this.autoExpandParent = false
      },
      onCheck(checkedKeys){
        this.cKeys.push(checkedKeys)
        console.log(...this.cKeys)

      },


      check(info){
        if(info.children){
          check(info.children)
         
        }else{

          if(typeof info.checked === 'undefined'){
        
            this.$set(info,'checked',true)
          }else{
            info.checked = !info.checked
          }
          
        }
        
        
      }
      

    },

    // watch:{
    //   checkedKeys(){
    //     console.log(this.checkedKeys)
    //   }
    // }
    
}