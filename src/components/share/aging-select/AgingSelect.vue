<template>
  <condition-layout title="时效">
    <div class="aging-select">
      <a-button
        type="primary"
        shape="circle"
        icon="left"
        style="margin-right: 5px;"
        size="small"
        @click="onTuningTime(-1)"
      ></a-button>
      <div id="box" class="box" @selectstart.prevent>
        <ul class="scroll-box">
          <li @click="onClick(aging)" v-for="aging of agingList" :key="aging" :class="{active: currAging === aging}">{{aging}}</li>
        </ul>
      </div>
      <a-button
        type="primary"
        shape="circle"
        icon="right"
        style="margin-left: 5px;"
        size="small"
        @click="onTuningTime(1)"
      ></a-button>
    </div>
  </condition-layout>
</template>
<script src="./AgingSelect.js"></script>
<style src="./AgingSelect.scss" lang="scss" scoped></style>