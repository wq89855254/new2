<template>
    <div class="container">
        <div class="center_wrap">
            <div class="search">
                <h2 class='search_title'><img src="./imgs/title.png" alt=""></h2>
                <div class="search_date">
                    <h2 class="img_wrap"><img src="./imgs/1.png" alt=""></h2>
                    <div class="begin_date">
                        <label for="">开始日期</label>
                        <a-date-picker  @change='onBeginDate'/>
                    </div>
                    <div class="end_date">
                        <label for="">结束日期</label>
                        <a-date-picker  @change='onEndDate'/>
                    </div>
                    
                </div>
                <div class="search_product">
                    <h2 class="img_wrap pro_name"><img src="./imgs/2.png" alt="">
                        <a-checkbox @change="checkAllName" :checked="isNameCheckAll">
                            全选
                        </a-checkbox>
                    </h2>
                    <div class="checkbox">
                        <a-checkbox-group  :options="namePlainOptions" v-model="nameCheckedList"  @change="nameCheckChange"/>
                    </div>
                    <div class="timeliness">
                        <span>主班时效</span>
                        <div class="triangle"></div>
                        <a-radio-group v-model="aging" :value='aging' :disabled="!Array.prototype.includes.call(nameCheckedList,'主观')">
                            <a-radio :value="1" >06</a-radio>
                            <a-radio :value="2" >12</a-radio>
                            <a-radio :value="3" >18</a-radio>
                            <a-radio :value="4" >24</a-radio>
                            <a-radio :value="5" >08.012</a-radio>
                            <a-radio :value="6" >08.024</a-radio>
                            <a-radio :value="7" >20.012</a-radio>
                            <a-radio :value="8" >20.024</a-radio>
                        </a-radio-group>
                    </div>
                </div>
                <div class="search_prediction">
                    <h2 class="img_wrap"><img src="./imgs/3.png" alt="">
                        <a-checkbox @change="checkAllPre" :checked="isPreCheckAll">
                            全选
                        </a-checkbox>
                        
                    </h2>
                    <a-checkbox-group :options="prePlainOptions" v-model="preCheckedList"  @change="preCheckChange"/>
                    
                </div>
                <div class="search_area">
                    <h2 class="img_wrap"><img src="./imgs/4.png" alt=""></h2>
                    <div id="map"></div>

                </div>
                <span class="search_btn"><img src="./imgs/search.png" alt=""> 查询</span>
                
            </div>
            <div class="result">
                <h2 class="result_title">2010-2019检验结果</h2>
                <div class="table_wrap">
                    <a-table :columns="columns" 
                        :dataSource="tableData" 
                        bordered 
                        :pagination=false
                    />
                </div>
                <div class="imgWrap" v-if="dateSame">
                    <img src="./imgs/fangda.jpg" alt="">
                </div>
            </div>
        </div>
    </div>
</template>

<style src='./search.styl' lang="stylus" scoped>
    
</style>


<script src='./search.js'>

</script>


