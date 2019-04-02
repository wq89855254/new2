<template>
    <div class="container">
        <div class="head">
            <div></div>
            <div class="imgWrap">
                <img class="save_img" src="./imgs/huifu.png" alt="">
            </div>
            <div class="back" @click="$router.back()">
                <img src="./imgs/back.png" alt="">
                <span>返回上级</span>
            </div>
        </div>

        <div class="center_wrap">
            <!-- 数据恢复 -->
            <div class="date_recover">
                <div class="date_choose">
                    <div class="p_date">
                        <label for="">起报日期</label>
                        <a-date-picker />
                    </div>
                    <div class="p_type">
                        <label for="">产品类型</label>
                        <span :class="{active:checkEc}">
                            <a-checkbox  @change='changekEc' >EC</a-checkbox>
                        </span>
                        <span :class="{active:checkNc}">
                            <a-checkbox @change='changeNc'>NCEP</a-checkbox>
                        </span>
                    </div>
                </div>
                <div class="recover">
                    <img src="./imgs/recover.png" alt="">
                    恢复
                </div>
            </div>
            <div class="date_history">
                <h2>数据恢复历史</h2>
                 <a-table :columns="columns"
                    :dataSource="historyData"
                    :pagination="pagination"
                    :loading="loading"
                />
            </div>
        </div>
    </div>
</template>

<style src='./recover.styl' lang="stylus" scoped></style>

<script src='./recover.js'>

            

