<template>
  <div class="time-sclect">
    <div style="padding-right:0;">
      <span>{{dateTitle}}</span>
      <a-date-picker
        v-model="currDate"
        @change="onChange('date')"
        size="small"
        style="width: 110px"
        :allowClear="false"
        :disabled="disabled"
      />
    </div>
    <tool-btn
      v-if="isBtnBoth"
      icon="timeLeft"
      type="time"
      style="margin-left: 5px;"
      :disabled="disabled"
      @click="onTuningTime(-1)"
    ></tool-btn>
    <div>
      <span>{{hourTitle}}</span>
      <a-select
        v-model="currHour"
        @change="onChange('hour')"
        size="small"
        style="width: 60px"
        :disabled="disabled"
      >
        <a-select-option v-for="hour of hourList" :value="hour" :key="hour">{{hour}}</a-select-option>
      </a-select>
    </div>
    <tool-btn
      v-if="!isBtnBoth"
      icon="timeLeft"
      type="time"
      style="margin-left: 5px;"
      :disabled="disabled"
      @click="onTuningTime(-1)"
    ></tool-btn>
    <tool-btn
      :disabled="disabled"
      icon="timeRight"
      type="time"
      style="margin-left: 3px;"
      @click="onTuningTime(1)"
    ></tool-btn>

    <a-select
      v-if="isShowMinute"
      v-model="currMinute"
      @change="onChange('minute')"
      size="small"
      :disabled="disabled"
      style="width: 60px; margin-left: 5px;"
    >
      <a-select-option v-for="minute of minuteList" :value="minute" :key="minute">{{minute}}</a-select-option>
    </a-select>
  </div>
</template>
<style>
</style>

<script src="./TimeSelect.js"></script>
<style src="./TimeSelect.scss" lang="scss" scoped></style>