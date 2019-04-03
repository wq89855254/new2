const namePlainOptions = ['主观','机器学习','配料法']
const prePlainOptions = ['雷暴','冰雹与雷暴大风','强对流','短时强降水']
const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        sorter: (a, b) => a.name.length - b.name.length,
        onFilter: (value, record) => record.name.indexOf(value) === 0,
    },
    {
        title:'Age',
        dataIndex: 'age',
    },
    {
        title:'Address',
        dataIndex: 'address',

    }
]
const tableData = [{
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  }, {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  }, {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  }, {
    key: '4',
    name: 'Jim Red',
    age: 32,
    address: 'London No. 2 Lake Park',
  }];
export default{
    data(){
        return {
            namePlainOptions,
            nameCheckedList:[],
            isNameCheckAll:false,

            prePlainOptions,
            preCheckedList:[],
            isPreCheckAll:false,

            columns,
            tableData,
        }
    },
    methods:{
        nameCheckChange(nameCheckedList){
            this.isNameCheckAll = nameCheckedList.length === namePlainOptions.length
        },
        checkAllName(e){
            Object.assign(this, {
                nameCheckedList: e.target.checked ? namePlainOptions : [],
                isNameCheckAll: e.target.checked,
            })
        },

        preCheckChange(preCheckedList){
            this.isPreCheckAll = preCheckedList.length === prePlainOptions.length
        },
        checkAllPre(e){
            Object.assign(this, {
                preCheckedList: e.target.checked ? prePlainOptions : [],
                isPreCheckAll: e.target.checked,
            })
        }
    }

}