const plainOptions = [
    '全国','华北','东北','华东','华南','西南','西北','青藏','新疆','近海'
]
const plainOptionsType = [
    '冰雹','大风','雾霾','强降水','雷暴大风'
]
const tData = [{id:'1',isTbodyCheck:true},{id:'2'},{id:'3'},{id:'4'}]

const showImgs = [{url:require('./imgs/map1.png'),id:'1'},{url:require('./imgs/001.png'),id:'2'},{url:require('./imgs/002.png'),id:'3'},{url:require('./imgs/003.png'),id:'4'}]
export default{
    data(){
        return {
            // 天气类型多选
            plainOptionsType,
            typeCheckedList:[],
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
            selected:'1'
        }   
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

        }
        
    },
    watch:{
        checkedList(){
            this.searchData.local=[...this.checkedList]
            
        },
       
       
    },
    
}