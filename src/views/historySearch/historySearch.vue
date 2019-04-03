<template>
    <div class="container">
        <div class="head_title">
            <div class="left_title">
                <img src="./imgs/history_search.png" alt="">
            </div>
            <div class="right_title">
                <ul class="product_list">
                    <li>产品类型</li>
                    <li class="filt"><span> <img src="./imgs/filt.png" alt=""> 筛选</span></li>
                    <li class="selected">已选:短期-多模式-NCEP-会商</li>
                </ul>
                 <ul class="date_list">
                    <li>1小时</li>
                    <li>5分钟</li>
                    <li class="area">
                        区域
                        <select name="" id="">
                            <option value="">全国</option>
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
                                <a-date-picker size='small'/>
                                <!-- <select name="" id="">
                                    <option value="">16</option>
                                </select> -->
                            </div>
                            <div class="endtime">
                                <label for="">结束时间</label>
                                <a-date-picker size='small'/>
                                <!-- <select name="" id="">
                                    <option value="">18</option>
                                </select> -->
                            </div>
                        
                        </div>
                    </div>
                    <!-- 天气类型 -->
                    <div class="weather_type">
                        <h2 class="w_title">
                            <img src="./imgs/a2.png" alt="">
                        </h2>
                        <ul class="weatherType_list">
                            <li @change="cg">
                                <a-checkbox value='冰雹'>冰雹</a-checkbox>   
                            </li>
                            <li>
                                <a-checkbox value='大风'>大风</a-checkbox>   
                            </li>
                            <li>
                                <a-checkbox value='雾霾'>雾霾</a-checkbox>   
                            </li>
                            <li>
                                <a-checkbox value='强降水'>强降水</a-checkbox>   
                            </li>
                            <li>
                                <a-checkbox value='雷暴大风'>雷暴大风</a-checkbox>   
                            </li>
                        </ul>
                    </div>
                    <!-- 天气系统 -->
                    <div class="weather_system">
                        <h2 class="w_title">
                            <img src="./imgs/a3.png" alt="">
                        </h2>
                        <div class="check">点击选择</div>
                        
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
                            <a-checkbox-group :options="plainOptions" v-model="checkedList" @change="onChange" />
                        </ul>
                    </div>
                    <!-- 查询 -->
                    <div class="seach_info"> <img src="" alt=""> 查询</div>
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
                         <tbody >
                            <tr>
                                <td class="center" rowspan="2" align='center'><span class="num">1</span></td>
                                <td class="beginDate">2018-12-30 14:00</td>
                                <td class="weatherType">冰雹</td>
                                <td class="explain" rowspan="2">全国范围</td>
                            </tr>
                            <tr>
                                <td class="endDate">2019-01-18 14:00</td>
                                <td class="weatherSystem">高气压/高压脊/气旋/切边线</td>
                            </tr>
                        </tbody>
                         <tbody >
                            <tr>
                                <td class="center" rowspan="2" align='center'><span class="num">2</span></td>
                                <td class="beginDate">2018-12-30 14:00</td>
                                <td class="weatherType">冰雹</td>
                                <td class="explain" rowspan="2">全国范围</td>
                            </tr>
                            <tr>
                                <td class="endDate">2019-01-18 14:00</td>
                                <td class="weatherSystem">高气压/高压脊/气旋/切边线</td>
                            </tr>
                        </tbody>
                        <tbody class="active">
                            <tr>
                                <td class="center" rowspan="2" align='center'><span class="num">3</span></td>
                                <td class="beginDate">2018-12-30 14:00</td>
                                <td class="weatherType">冰雹</td>
                                <td class="explain" rowspan="2">全国范围</td>
                            </tr>
                            <tr>
                                <td class="endDate">2019-01-18 14:00</td>
                                <td class="weatherSystem">高气压/高压脊/气旋/切边线</td>
                            </tr>
                        </tbody>
                        <tbody class="active">
                            <tr>
                                <td class="center" rowspan="2" align='center'><span class="num">3</span></td>
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
                <div class="product_title"></div>
                <div class="map_show">
                    <img src="./imgs/map1.png" alt="">
                </div>
            </div>

        </div>
        

        <!-- 遮罩 -->
        <div class="shade"></div>
        <!-- 选择图片 -->
        <div class="checkProduct">

            <ul class="productList">
                <li>
                    <h2 class="title">请从下列已存档产品中选择</h2>
                    <div class="level_cont">
                        <!-- 一级 -->
                        <div class="first_level">
                            <img src="./imgs/jian.png" alt=""> <span class='product_type'>诊断</span>
                            <!-- 二级 -->
                            <div class="second_level">
                                <div  class="three_level">
                                    <img src="./imgs/jian.png" alt=""><span class='product_type'>高空</span>
                                    <!-- 三级 -->
                                    <div>
                                        <img src="./imgs/jian.png" alt=""><span class='product_type'>无层次</span><img src="./imgs/circle_blank.png" alt="">
                                    </div>
                                    <div>
                                        <img src="./imgs/jian.png" alt=""><span class='product_type'>等高面</span><img src="./imgs/circle_active.png" alt="">
                                    </div>
                                    <div>
                                        <img src="./imgs/jian.png" alt=""><span class='product_type'>等熵面</span><img src="./imgs/circle_blank.png" alt="">
                                    </div>
                                </div>
                                <div class="three_level">
                                    <img src="./imgs/jian.png" alt="" ><span class='product_type'>自动站</span>
                                    <!-- 三级 -->
                                    <div>
                                        <img src="./imgs/jian.png" alt="" ><span class='product_type'>站点</span><img src="./imgs/circle_blank.png" alt="">
                                    </div>
                                    <div>
                                        <img src="./imgs/jian.png" alt="" ><span class='product_type'>非站点</span><img src="./imgs/circle_blank.png" alt="">
                                    </div>
                                    
                                </div>
                                
                            </div>
                        </div>
                    </div>

                    <div class="level_cont">
                        <!-- 一级 -->
                        <div class="first_level">
                            <img src="./imgs/jian.png" alt=""> <span class='product_type'>短临</span>
                            <!-- 二级 -->
                            <div class="second_level">
                                <div  class="three_level">
                                    <img src="./imgs/jian.png" alt=""><span class='product_type'>客观预报</span>
                                    <!-- 三级 -->
                                    <div>
                                        <img src="./imgs/jian.png" alt=""><span class='product_type'>客观预报</span><img src="./imgs/circle_blank.png" alt="">
                                    </div>
                                    <div>
                                        <img src="./imgs/jian.png" alt=""><span class='product_type'>多模式集成</span><img src="./imgs/circle_blank.png" alt="">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="level_cont">
                        <!-- 一级 -->
                        <div class="first_level">
                            <img src="./imgs/jian.png" alt=""> <span class='product_type'>短期</span>
                            <!-- 二级 -->
                            <div class="second_level">
                                <div  class="three_level">
                                    <img src="./imgs/jian.png" alt=""><span class='product_type'>多模式预报</span>
                                    <!-- 三级 -->
                                    <div class="four_level">
                                        <img src="./imgs/jian.png" alt=""><span class='product_type'>NCEP</span>
                                        <!-- 四级 -->
                                        <div class="five_level">
                                            <img src="./imgs/jian.png" alt=""><span class='product_type'>综合图</span>
                                            <!-- 五级 -->
                                            <div>
                                                <img src="./imgs/jian.png" alt=""><span class='product_type'>会商</span><img src="./imgs/circle_blank.png" alt="">

                                            </div>
                                            <div>
                                                <img src="./imgs/jian.png" alt=""><span class='product_type'>通用</span><img src="./imgs/circle_blank.png" alt="">

                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>

                    
                   
                </li>
                <li class="jiantou">
                    <img src="./imgs/jiantou.png" alt="">
                </li>
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
                <li class="jiantou">
                    <img src="./imgs/jiantou.png" alt="">
                </li>
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
                </li>

            </ul>
            <div class="btn_group">
                <span class="confirm">确定</span>
                <span class="cancel">取消</span>
            </div>
            <div class="close">
                <img src="./imgs/close.png" alt="">
            </div>
        </div>
    </div>
</template>
<script src='./historySearch.js'>

</script>
<style src="./historySearch.styl" lang="stylus" scoped></style>



