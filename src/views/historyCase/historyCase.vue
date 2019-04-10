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
                        <a-date-picker @change="onBeginData"/>
                    <label for="">结束日期:</label>
                        <a-date-picker @change="onEndData"/>
                        
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
                        </ul>
                </div>
                <div class="explain wraper">
                    <label for="">归档说明:</label>
                        <input type="text" placeholder="选填" v-model="saveData.expain">
                </div>
            </form>
            <!-- <div class="save">
                存档
            </div> -->
            <div class="saveWrap">
                <a-button class="save" @click="onSave">存档</a-button>
            </div>
        </div>
        <div class="historyFile">
            <div class="history_head">历史存档列表</div>
            <div class="tb">
                <a-table
                    class="table"
                    :dataSource="historyDataArr"
                    :pagination="pagination"
                    :loading="loading"
                >
                    <a-table-column 
                        title="序列"
                        dataIndex="num"
                        key="num"
                    />
                       
                    <a-table-column
                        title="开始时间"
                        dataIndex="beginDate"
                        key="beginDate"
                    />
                    <a-table-column
                        title="结束时间"
                        dataIndex="endDate"
                        key="endDate"
                    />
                    <a-table-column
                        title="产品类型"
                        dataIndex="tags"
                        key="peoductType"
                        
                    >
                        <template slot-scope="tags">
                            <span>
                                <a-tag @click="handelClick" v-for="tag in tags" color="blue" :key="tag">{{tag}}</a-tag>
                            </span>
                        </template>
                    </a-table-column>
                    <a-table-column
                        title="天气类型"
                        dataIndex="weatherType"
                        key="weatherType"
                    />
                    <a-table-column
                        title="天气系统"
                        dataIndex="weatherSystem"
                        key="weatherSystem"
                    />
                   <a-table-column
                        title="说明"
                        dataIndex="explain"
                        key="explain"
                    />
                   <a-table-column
                        title="保存时间"
                        dataIndex="saveDate"
                        key="saveDate"
                    />
                </a-table>
            </div>
            
        </div>
        
        <!-- 遮罩 -->
        <div class="shade" v-if="isCheckShow"></div>
        <!-- 选择产品类型 -->
        <div class="checkProduct" v-if="isCheckShow">

            <div class="title">请选择产品类型</div>
            <ul class="productList">
                <li :class="{confirm:isHideCheck}" v-for="(tree,index) in treeData" :key="index">
                    <a-tree 
                        checkable
                        expand
                        :disabled='disabled'
                        :defaultExpandedKeys="['实况','监测','诊断','短临','短期']"
                        :treeData="tree"
                        v-model="checkedKeys[index]"
                    />
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
    
     
      
