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
            <!-- <div v-for="(item,index) in headerData" :key=index>
                <h2 @click="isOpen(index,item)">
                    {{item.name}}
                    
                    <img :src="true?'./imgs/zhedie.png':'./imgs/open.png'" alt="">

                </h2>
                <transition name="draw">
                    <ul class="year_list"  v-show="item.show"> 
                        
                        <li  v-for="(list,index) in item.list" :key=index>
                            <span class="isChildOPen(item,index)">+</span>
                            {{list}}
                        </li>
                    </ul>
                </transition>
            </div> -->
           

            <a-tree
                showLine
                :defaultExpandedKeys="['0-0-0']"
                @select="onSelect"
            >
                <a-tree-node key="0-0">
                <span slot="title" style="color: #1890ff">parent 1</span>
                <a-tree-node title="parent 1-0" key="0-0-0">
                    <a-tree-node title="leaf" key="0-0-0-0" />
                    <a-tree-node title="leaf" key="0-0-0-1" />
                    <a-tree-node title="leaf" key="0-0-0-2" />
                </a-tree-node>
                <a-tree-node title="parent 1-1" key="0-0-1">
                    <a-tree-node title="leaf" key="0-0-1-0" />
                </a-tree-node>
                <a-tree-node title="parent 1-2" key="0-0-2">
                    <a-tree-node title="leaf" key="0-0-2-0" />
                    <a-tree-node title="leaf" key="0-0-2-1" />
                </a-tree-node>
                </a-tree-node>
            </a-tree>
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


