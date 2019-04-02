<template>
  <div class="content">
    <div class="sideBar">
      <div v-if="radar">
        <i :class="activeIndex==0?'active':''" @click="select(0)"></i>
        <span>雷达</span>
      </div>
      <div v-if="situation">
        <i :class="activeIndex==1?'active':''" @click="select(1)"></i>
        <span>实况</span>
      </div>
      <div v-if="forecast">
        <i :class="activeIndex==2?'active':''" @click="select(2)"></i>
        <span>预报</span>
      </div>
      <div v-if="warning">
        <i :class="activeIndex==3?'active':''" @click="select(3)"></i>
        <span>报警</span>
      </div>
    </div>
    <div class="sideBar_box" v-if="box_switch">
      <div class="top">
        <span>日期:</span>
        <a-date-picker size="small" style="width:110px" v-model="currDate" @change="changeHour"/>
        <tool-btn icon="timeLeft" type="time" style="margin-left: 5px;" @click='changDate(-1)'></tool-btn>
        <a-select style="width:60px" size="small" v-model="currHour" @change="changeHour">
          <a-select-option :value="item" v-for="item in hourList" :key="item" >{{item}}</a-select-option>
        </a-select>
        <tool-btn icon="timeRight" type="time"  @click='changDate(1)'></tool-btn>
      </div>
      <div class="bottom">
        <span>累计时间</span>
        <a-radio-group v-model="interval" @change="changeHour">
          <a-radio value='3h'>3h</a-radio>
          <a-radio value='6h'>6h</a-radio>
          <a-radio value='12h'>12h</a-radio>
          <a-radio value='21h'>21h</a-radio>
          <a-radio value='24h'>24h</a-radio>
        </a-radio-group>
        
      </div>
    </div>
  </div>
</template>
<style>

</style>

<style src="./sideBar.scss" lang="scss" scoped></style>
<script src="./sideBar.js"></script>