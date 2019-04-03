<template>
<div class="container">
    <div class="head">
        <div></div>
        <div class="imgWrap">
            <img class="save_img" src="./imgs/fileManage.png" alt="">
        </div>
        <div class="back" @click="$router.back()">
            <img src="./imgs/back.png" alt="">
            <span>返回上级</span>
        </div>
    </div>
    <div class="center_wrap">
        <!-- 手风琴 -->
        <div class="accordion">
            <a-collapse accordion v-model="activeKey" >
                <a-collapse-panel v-for="(header,index) in headerData" :header="header.name" :key="index+''" style="background:linear-gradient(to bottom,#ebf4fd,#cae0fb,#cadffe);color:#585d63;font-weight:bold;">
                    <a-tree
                        showLine
                        :defaultExpandedKeys="['0-0-0']"
                    >
                        <a-tree-node v-for="(list,index) in header.list" :key="index">
                            <span slot="title" style="color: #1890ff">{{list}}</span>
                            
                            <a-tree-node title="强对流监测月报-2004-监测最终版" key="0-0-0"></a-tree-node>
                            <a-tree-node title="强对流监测月报-2004-监测最终版" key="0-0-1"></a-tree-node>
                            <a-tree-node title="强对流监测月报-2004-监测最终版" key="0-0-2"></a-tree-node>
                            <a-tree-node title="强对流监测月报-2004-监测最终版" key="0-0-3"></a-tree-node>
                            <a-tree-node title="强对流监测月报-2004-监测最终版" key="0-0-4"></a-tree-node>
                            <a-tree-node title="强对流监测月报-2004-监测最终版" key="0-0-5"></a-tree-node>
                            
                            
                        </a-tree-node>
                    </a-tree>
                </a-collapse-panel>
                
            </a-collapse>
            
        </div>
        <!-- pdf -->
        <div class="pdf_show">
            <ul class="cat_list">
                <li>dis201903041614.pdf</li>
                <li>1/1</li>
                <li>
                    <span>icon1</span>
                    <span>icon2</span>
                    <span>icon3</span>
                </li>
            </ul>
            <div class="img_wrap">
                <img src="" alt="">
            </div>
            <div class="button_group">
                <div></div>
                <div class="amplifier">+</div>
                <div class="shrink">-</div>
            </div>
        </div>
    </div>
</div>
    
</template>
<style src='./filesManage.styl' lang='stylus' scoped>
    
</style>

<script src='./filesManage.js'></script>


