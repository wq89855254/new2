<template>
  <condition-layout title="时效">
    <div class="box">
      <div class="tool">
        <div>
          <span class="name">步进</span>
          <a-select v-model="currFilterVal" style="width: 70px" size="small" @change="onFilterChange">
            <a-select-option :value="3">03H</a-select-option>
            <a-select-option :value="6">06H</a-select-option>
            <a-select-option :value="12">12H</a-select-option>
            <a-select-option :value="24">24H</a-select-option>
          </a-select>
        </div>
        <div>
          <span class="name">时效</span>
          <tool-btn @click="onClickReset" icon="reset"></tool-btn>
          <tool-btn @click="onTuningAging(-1)" :disabled="isAgingStart" icon="left" style="margin: 0 5px;"></tool-btn>
          <tool-btn @click="onTuningAging(1)" :disabled="isAgingEnd" icon="right"></tool-btn>
        </div>
      </div>
      <div class="time">
        <div @click="onSwitchPage('left')" class="left-btn" :class="{'btn-disabled': isPageStart}"></div>
        <ul class="list" @selectstart.prevent>
          <li @click="onClick(item)" class="item" v-for="item of currPageList" :key="item.aging">
            <div @click="onClick(item)" :class="{circle: true, 'circle-loop': item.isDifferent, active: currAging === item.aging}"></div>
            <div @click="onClick(item)" class="aging">{{item.aging}}</div>
            <div @click="onClick(item)" class="date">{{item.time}}</div>
          </li>
        </ul>
        <div @click="onSwitchPage('right')" class="right-btn" :class="{'btn-disabled': isPageEnd}"></div>
      </div>
    </div>
  </condition-layout>
</template>
<script src="./WholeAgingSelect.js"></script>
<style src="./WholeAgingSelect.scss" lang="scss" scoped></style>