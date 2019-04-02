export default{
    data(){
        return{
            headerData: [{
                name: '分类强对流气候特征 (1981-2010)',
                list: ['子集', '子集', '子集', '子集', '子集'],
               
                show: false
            }, {
                name: '历年强对流过程统计 (2010-)',
                list: ['子集', '子集', '子集', '子集', '子集'],
                
                show: false
            }, {
                name: '历年逐月监测预报 (2009-)',
                list: ['2009', '2010', '2011', '2012', '2013'],
                
                show: true
            }, {
                name: '历年逐月及汛期累积分类强对流监测图 (2014-)',
                list: ['子集', '子集', '子集', '子集', '子集'],
               
                show: false
            }, {
                name: '典型个例分析简化版 (2015-)',
                list: ['子集', '子集', '子集', '子集', '子集'],
               
                show: false
            },{
                name: '其它',
                list: ['子集', '子集', '子集', '子集', '子集'],
              
                show: false
            }]
        }

    },

    methods:{
        isOpen(ind,item){
            this.headerData.forEach(i => {
                // 判断如果数据中的headerData[i]的show属性不等于当前数据的show属性那么headerData[i]等于false
                if (i.show !== this.headerData[ind].show) {
                    i.show = false;
                };
            });
            // 取反(true或false)
            item.show = !item.show;
        },
       
    }
        
}