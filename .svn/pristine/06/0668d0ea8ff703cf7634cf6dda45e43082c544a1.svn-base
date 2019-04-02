<template>
  <condition-layout title="日期">
    <div style="padding-bottom: 5px">
      <span class="hint">起始日期:</span>
      <a-date-picker
        size="small"
        placeholder="请选择日期"
        v-model="currDate"
        style="width: 122px;"
        :allowClear="false"
        @change="onChange('date')"
      />
      <a-button
        v-if="!isShowHour"
        type="primary"
        shape="circle"
        icon="left"
        style="margin-left: 5px;"
        size="small"
        @click="onTuningTime(-1)"
      ></a-button>
      <a-button
        v-if="!isShowHour"
        type="primary"
        shape="circle"
        icon="right"
        style="margin-left: 2px;"
        size="small"
        @click="onTuningTime(1)"
      ></a-button>
    </div>

    <div v-if="isShowHour">
      <span class="hint">起始时间:</span>
      <a-select v-model="currHour" size="small" style="width: 60px;" @change="onChange('hour')">
        <a-select-option v-for="item in hourList" :value="item" :key="item">{{ item }}</a-select-option>
      </a-select>
      <a-select
        v-if="isShowMinute"
        v-model="currMinute"
        size="small"
        style="width: 60px; margin-left: 2px;"
        @change="onChange('minute')"
      >
        <a-select-option v-for="item in minuteList" :value="item" :key="item">{{ item }}</a-select-option>
      </a-select>

      <a-button
        type="primary"
        shape="circle"
        icon="left"
        style="margin-left: 5px;"
        size="small"
        @click="onTuningTime(-1)"
      ></a-button>
      <a-button
        type="primary"
        shape="circle"
        icon="right"
        style="margin-left: 2px;"
        size="small"
        @click="onTuningTime(1)"
      ></a-button>
    </div>
  </condition-layout>
</template>
<script src="./DateSelect.js"></script>
<style src="./DateSelect.scss" lang="scss" scoped></style>