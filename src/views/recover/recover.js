// 表头信息
const columns = [{
    title: '序列',
    dataIndex: 'num',
    key: 'num',
    slots: { title: 'customTitle' },
    scopedSlots: { customRender: 'name' },
  }, {
    title: '起报时间',
    dataIndex: 'reportDate',
    key: 'beginDate',
  }, {
    title: '产品类型',
    dataIndex: 'productType',
    key: 'productType',
  }, {
    title: '恢复时间',
    key: 'recoverDate',
    dataIndex: 'recoverDate',
    scopedSlots: { customRender: 'tags' },
  }]
  
  
  const historyData = [
    {
        key: '1',
        num: '1',
        reportDate:'2019-01-15 14:00',
        productType:'EC/NCEP',
        recoverDate:'2019-01-25 12:04'
    },
    {
        key: '2',
        num: '2',
        reportDate:'2019-01-15 14:00',
        productType:'EC',
        recoverDate:'2019-01-25 12:04'
    },
    {
        key: '3',
        num: '3',
        reportDate:'2019-01-15 14:00',
        productType:'EC/NCEP',
        recoverDate:'2019-01-25 12:04'
    },
    {
        key: '4',
        num: '4',
        reportDate:'2019-01-15 14:00',
        productType:'NCEP',
        recoverDate:'2019-01-25 12:04'
    },
    {
        key: '5',
        num: '5',
        reportDate:'2019-01-15 14:00',
        productType:'NCEP',
        recoverDate:'2019-01-25 12:04'
    },
    {
        key: '6',
        num: '6',
        reportDate:'2019-01-15 14:00',
        productType:'NCEP',
        recoverDate:'2019-01-25 12:04'
    },
    {
        key: '7',
        num: '7',
        reportDate:'2019-01-15 14:00',
        productType:'NCEP',
        recoverDate:'2019-01-25 12:04'
    },
    
  
  ]
export default{
    data() {
        return {
          checkEc:false,
          checkNc:false,
          item:{},
          columns,
          historyData,
          pagination: {
            pageSize: 10,//每页显示的条数
            showQuickJumper:true,  //快速选择
            total:historyData.length
          },
          loading: false,
        }
      },
    methods:{
      changekEc(){
        this.checkEc = !this.checkEc
      },
      changeNc(){
        this.checkNc = !this.checkNc
      }
    }
    
    
}