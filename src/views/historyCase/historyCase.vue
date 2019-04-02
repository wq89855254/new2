<template>
    <div class="container">
        <div class="head">
            <div></div>
            <div class="imgWrap">
                <img class="save_img" src="./imgs/historySave.png" alt="">
            </div>
            <div class="back" @click="$router.back()">
                <img src="./imgs/back.png" alt="">
                <span>返回上级</span>
            </div>
        </div>
        <div class="saveFile">
            <form class="form">
                <div class="data wraper">
                    <label for="">开始日期:</label>
                        <a-date-picker />
                    <label for="">结束日期:</label>
                        <a-date-picker />
                        
                </div>
                <div class="productType wraper">
                    <label for="">产品类型:</label>
                        <span class="choose" @click="isCheckProduct(true)">点击选择</span>
                </div>
                <div class="weatherType wraper">
                    <label for="">天气类型:</label>
                        <ul class="typeList">
                          
                            <a-checkbox-group :options="weatherTypeOptions" v-model="typeCheckedList" @change="onTypeChange" />
                            <a-checkbox :indeterminate="indeterminateType" @change="onCheckAllChange" :checked="isCheckAllType">
                                全选
                            </a-checkbox>
                        </ul>
                </div>
                <div class="weatherSystem wraper">
                    <label for="">天气系统:</label>
                        <ul class="systemList">
                            <a-checkbox-group :options='weatherSystemOptions' v-model="systemCheckedList" @change="onSystemChange"/>
                            <a-checkbox
                                :indeterminate="indeterminateSys"
                                @change="onCheckAllChangeSys"
                                :checked="isCheckAllSystem"
                                > 全选
                            </a-checkbox>


                            <!-- <li><input type="checkbox">高气压</li>
                            <li><input type="checkbox">低气压</li>
                            <li><input type="checkbox">高压脊</li>
                            <li><input type="checkbox">低压槽</li>
                            <li><input type="checkbox">气旋</li>
                            <li><input type="checkbox">反气旋</li>
                            <li><input type="checkbox">切变线</li>
                            <li><input type="checkbox">雷暴</li>
                            <li><input type="checkbox">雹暴</li>
                            <li><input type="checkbox">热带云团</li>
                            <li><input type="checkbox">冷槽</li>
                            <li><input type="checkbox">暖脊</li>
                            <li><input type="checkbox">龙卷</li>
                            <li><input type="checkbox">飑线</li>
                            <li @click="checkAllSystem"><input type="checkbox">全选</li> -->
                        </ul>
                </div>
                <div class="explain wraper">
                    <label for="">归档说明:</label>
                        <input type="text" placeholder="选填">
                </div>
            </form>
            <div class="save">
                存档
            </div>
        </div>
        <div class="historyFile">
            <div class="history_head">历史存档列表</div>
            <div class="tb">
                <a-table
                    class="table"
                    :columns="columns"
                    :dataSource="historyData"
                    :pagination="pagination"
                    :loading="loading"
                />
            </div>
            
            <!-- <table class="table">
                <thead>
                     <tr>
                        <th class="center">序列</th>
                        <th class="center">开始时间</th>
                        <th class="center">结束时间</th>
                        <th class="center">产品类型</th>
                        <th>天气类型</th>
                        <th>天气系统</th>
                        <th>说明</th>
                        <th>保存时间</th>
                     </tr>
                </thead>
                 <tbody>
                      <tr>
                            <td class="num center">1</td>
                            <td class="beginDate center">2019-01-15 14:00</td>
                            <td class="endDate center">2019-01-18 14:00</td>
                            <td class="lookDetail center"><span>查看详情</span></td>
                            <td class="weatherType">冰雹/大风/强降水</td>
                            <td class="weatherSystem">高气压/高压脊/气旋/切边线</td>
                            <td class="explain">无</td>
                            <td class="saveDate">2019-01-25 12：04</td>
                      </tr>
                </tbody>
            </table>  -->
        </div>
        <!-- <div class="pages">
             <a-pagination showQuickJumper :defaultCurrent="2" :total="20" />
            <span class="prePage"> < </span>
            <span class="nextPage"> > </span>
            前往<input class="toPage" value=1>页
        </div> -->
        <!-- 遮罩 -->
        <div class="shade" v-if="isCheckShow"></div>
        <!-- 选择产品类型 -->
        <div class="checkProduct" v-if="isCheckShow">

            <div class="title">请选择产品类型</div>
            <ul class="productList">
                <li v-for="(info,index) in treeData" :key="index">
                    <!-- 一级 -->
                    <div class="first_level">
                        <img @click="onExpand" src="./imgs/jian.png" alt=""> <span class='product_type'>{{info.title}}</span><img @click="check(info)" :src="info.checked?checkImg:emptBlockImg" alt="">
                        <!-- 二级 -->
                        <div v-if="info.children" class="second_level" v-for="(erji,index) in info.children" :key="index">
                            <div>
                                <img src="./imgs/jian.png" alt=""><span class='product_type'>{{erji.title}}</span><img @click="check(erji)" :src="info.checked || erji.checked?checkImg:emptBlockImg" alt="">
                            </div>
                           
                            <!-- 三级 -->
                            <div v-if="erji.children"  class="three_level" v-for="(sanji,index) in erji.children" :key="index">
                                <div>
                                    <img src="./imgs/jian.png" alt=""><span class='product_type'>{{sanji.title}}</span><img @click="check(sanji)" :src="erji.checked || sanji.checked?checkImg:emptBlockImg" alt="">
                                </div>
                               
                            </div>
                        </div>
                    </div>
                    S
                </li>
                
            </ul>
            <div class="btn_group">
                <span class="confirm" @click="confirmProduct">确定</span>
                <span class="cancel" @click="isCheckProduct(false)">取消</span>
            </div>
            <div class="close" @click="isCheckProduct(false)">
                <img src="./imgs/close.png" alt="">
            </div>
        </div>
    </div>
    
</template>

<script src="./historyCase.js"></script>

<style src="./historyCase.styl" lang="stylus" scoped>
    
     
      
