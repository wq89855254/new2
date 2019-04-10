<template>
    <div class="container">
        <div class="head_title">
            <div class="left_title">
                <img src="./imgs/history_search.png" alt="">
            </div>
            <div class="right_title">
                <ul class="product_list">
                    <li>产品类型</li>
                    <li class="filt" @click="onCheckSystem"><span> <img src="./imgs/filt.png" alt="" > 筛选</span></li>
                    <li class="selected">已选:{{filter[0]}}</li>
                </ul>
                 <ul class="date_list">
                    
                    <li class="area">
                        区域
                        <select name="" id="">
                            <option value="">全国</option>
                            <option value="">华北</option>
                            <option value="">东北</option>
                            <option value="">华东</option>
                            <option value="">华南</option>
                            <option value="">西南</option>
                            <option value="">西北</option>
                            <option value="">青藏</option>
                            <option value="">新疆</option>
                            <option value="">近海</option>

                        </select>
                    </li>
                </ul>
            </div>
            
        </div>
        <div class="centerWrap">
            <!-- 历史个例查询 -->
            <div class="history_search">
                <div class="weather_info_search">
                    <!-- 选择日期 -->
                    <div class="date_search">
                        <h2 class="w_title">
                            <img src="./imgs/a1.png" alt="">
                        </h2>
                        <div class="date_group">
                            <div class="begintime">
                                <label for="">开始时间</label>
                                <a-date-picker  @change="onBeginDate" size='small'/>
                               
                            </div>
                            <div class="endtime">
                                <label for="">结束时间</label>
                                <a-date-picker  @change="onEndDate" size='small'/>
                                
                            </div>
                        
                        </div>
                    </div>
                    <!-- 天气类型 -->
                    <div class="weather_type">
                        <h2 class="w_title">
                            <img src="./imgs/a2.png" alt="">
                        </h2>
                        <ul class="weatherType_list">
                           <a-checkbox-group :options="plainOptionsType" v-model="typeCheckedList" @change="onTypeChange" />
                        </ul>
                    </div>
                    <!-- 天气系统 -->
                    <div class="weather_system">
                        <h2 class="w_title">
                            <img src="./imgs/a3.png" alt="">
                            <a-checkbox
                                @change="onCheckAllChangeSys"
                                :checked="isCheckAllSystem"
                                > 全选
                            </a-checkbox>
                        </h2>
                        <div class="systemList">
                            <a-checkbox-group :options='weatherSystemOptions' v-model="systemCheckedList" @change="onSystemChange"/>
                            
                        </div>
                        
                    </div>
                    <!-- 选择地区 -->
                    <div class="region_check">
                        <h2 class="w_title">
                            <img src="./imgs/a4.png" alt=""> 
                            <a-checkbox
                                @change="onCheckAllChange"
                                :checked="checkAll"
                            >全选
                            </a-checkbox>
                        </h2>
                        <ul class="region_list">
                            <a-checkbox-group :options="plainOptions" v-model="checkedList" @change="onAreaChange" />
                        </ul>
                    </div>
                    <!-- 查询 -->
                    <div class="seach_info" @click="onSearch"> <img src="./imgs/search.png" alt=""> 查询</div>
                </div>

                <!-- 查询结果 -->
                <div class="weather_info_result">
                    <div class="result_title">
                        <div></div>
                        <h2>共有<span class="result_count">18</span>条查询结果</h2>
                        <span class="click_check">点击下列选择</span>    
                    </div>
                    <table class="table" cellspacing="0">
                        <thead>
                             <tr>
                                <th >序号</th>
                                <th class="begin_head">开始/结束</th>
                                <th class="type_head">天气类型/天气系统</th>
                                <th class="explain_head">说明</th>
                             </tr>
                        </thead>
                         <tbody v-for="(tbody,index) in tData" :key="index"
                                :class="{active:index+1==selected}"
                                @click.self ="onCheckTbody(tbody,tData)">
                            <tr>
                                <td class="center" rowspan="2" align='center'><span class="num">{{index+1}}</span></td>
                                <td class="beginDate">2018-12-30 14:00</td>
                                <td class="weatherType">冰雹</td>
                                <td class="explain" rowspan="2">全国范围</td>
                            </tr>
                            <tr>
                                <td class="endDate">2019-01-18 14:00</td>
                                <td class="weatherSystem">高气压/高压脊/气旋/切边线</td>
                            </tr>
                        </tbody>
                         
                    </table> 
                </div>
            </div>
            <!-- 地图展示 -->
            <div class="product_show">
                <div class="pre" @click="onChangeMap('pre')">
                    <img src="./imgs/prev.png" alt="">
                </div>
                <img v-for="(img,index) in showImgs" 
                    :src="img.url" alt="" 
                    :key="index"
                    v-show="img.id==selected"
                    >
                <div class="next" @click="onChangeMap('next')">
                    <img src="./imgs/next.png" alt="">
                </div>

            </div>

        </div>
        

        <!-- 遮罩 -->
        <div v-if="isShowSystem" class="shade"></div>
        <!-- 选择图片 -->
        <div v-if="isShowSystem" class="checkProduct">

            <ul class="productList">
                <li>
                    <h2 class="title">请从下列已存档产品中选择</h2>
                    <!-- <div class="level_cont" v-for="(tree,index) in treeData" :key="index">
                        <a-tree 
                            expand
                            :defaultExpandedKeys="['实况','监测','诊断','短临','短期']"
                            :treeData="tree"
                        />
                    </div> -->
                    <div class="level_cont">
                         <a-tree 
                            checkable
                            expand
                            :defaultExpandedKeys=defaultChecked
                            :treeData="treeData"
                            :defaultCheckedKeys=defaultChecked
                            @select='onSelect'
                            :selectedKeys="filter"
                        />
                            
                    
                    </div>
                   
                </li>
                <!-- <p class="jiantou">
                    <img src="./imgs/jiantou.png" alt="">
                </p>
                <li class="child_choose">


                    
                    <h2 class="title">选择子类</h2>
                    <ul>   
                        <li class="active">温度平流</li>
                        <li>涡度平流</li>
                        <li>散度</li>
                        <li>水汽通量散度</li>
                        <li>水汽通量大小</li>
                        <li>水汽通量U</li>
                        <li>水汽通量V</li>
                        <li>位势高度</li>
                        <li>湿位涡</li>
                        <li>湿位涡项1</li>
                        <li>湿位涡项2</li>
                        <li>垂直速度</li>
                        <li>位涡</li>
                        <li>比湿</li>
                        <li>相对湿度</li>
                        <li>全风速</li>
                        <li>温度</li>
                        <li>露点温度</li>
                        <li>露点温度差</li>
                        <li>位温</li>

                    </ul>
                </li>
                <p class="jiantou">
                    <img src="./imgs/jiantou.png" alt="">
                </p>
                <li class="picture_choose">
                    <h2 class="title">图片列表</h2>
                    <ul>
                        <li class="active">2019032208.png</li>
                        <li>2019032208.png</li>
                        <li>2019032208.png</li>
                        <li>2019032208.png</li>
                        <li>2019032208.png</li>
                        <li>2019032208.png</li>
                        <li>2019032208.png</li>
                        <li>2019032208.png</li>
                        <li>2019032208.png</li>
                        <li>2019032208.png</li>
                        <li>2019032208.png</li>
                        <li>2019032208.png</li>
                        <li>2019032208.png</li>

                    </ul>
                </li> -->

            </ul>
            <div class="btn_group">
                <span class="confirm" @click="onConfirm">确定</span>
                <span class="cancel" @click="onCancel">取消</span>
            </div>
            <div class="close" @click="onCancel">
                <img src="./imgs/close.png" alt="">
            </div>
        </div>
    </div>
</template>
<script src='./historySearch.js'>

</script>
<style src="./historySearch.styl" lang="stylus" scoped></style>



