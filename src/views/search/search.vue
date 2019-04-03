<template>
    <div class="container">
        <div class="center_wrap">
            <div class="search">
                <h2 class='search_title'>检验结果查询</h2>
                <div class="search_date">
                    <h2 class="img_wrap">时间段</h2>
                    <div class="begin_date">
                        <label for="">开始日期</label>
                        <a-date-picker  />
                    </div>
                    <div class="end_date">
                        <label for="">结束日期</label>
                        <a-date-picker  />
                    </div>
                    
                </div>
                <div class="search_product">
                    <h2 class="img_wrap">产品名称
                        <a-checkbox @change="checkAllName" :checked="isNameCheckAll">
                            全选
                        </a-checkbox>
                    </h2>
                    <a-checkbox-group :options="namePlainOptions" v-model="nameCheckedList"  @change="nameCheckChange"/>
                </div>
                <div class="search_prediction">
                    <h2 class="img_wrap">预报对象
                        <a-checkbox @change="checkAllPre" :checked="isPreCheckAll">
                            全选
                        </a-checkbox>
                        
                    </h2>
                    <a-checkbox-group :options="prePlainOptions" v-model="preCheckedList"  @change="preCheckChange"/>
                    
                </div>
                <div class="search_area">
                    <h2 class="img_wrap">区域
                        <div></div>
                    </h2>
                </div>
                <span class="search_btn">查询</span>
                
            </div>
            <div class="result">
                <h2 class="result_title">2010-2019检验结果</h2>
                <div class="table_wrap">
                    <a-table :columns="columns" :dataSource="tableData" />

                </div>
            </div>
        </div>
    </div>
</template>

<style src='./search.styl' lang="stylus" >
    
</style>


<script src='./search.js'>

</script>


