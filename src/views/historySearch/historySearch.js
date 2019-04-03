const plainOptions = [
    '全国','华北','东北','华东','华南','西南','西北','青藏','新疆','近海'
]
export default{
    data(){
        return {
            checkedList:[],
            checkAll:false,
            plainOptions
        }
    },
    methods:{
        onChange (checkedList) {
            this.checkAll = checkedList.length === plainOptions.length
        },
        onCheckAllChange (e) {
            Object.assign(this, {
                checkedList: e.target.checked ? plainOptions : [],
                checkAll: e.target.checked,
            })
        },
        cg(checkedValues){
            
            console.log(checkedValues)
        }
    }
}