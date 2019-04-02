<template>
  <div class="near">
    <div class="time-box">
      <span>时间</span>
      <a-date-picker
        v-model="currDate"
        @change="onChange('date')"
        size="small"
        style="width: 110px; margin-left:5px;"
        :allowClear="false"
      />
      <a-select
        v-model="currHour"
        style="width: 60px; margin-left:5px;"
        @change="onChange('hour')"
        size="small"
      >
        <a-select-option v-for="hour of hourList" :value="hour" :key="hour">{{hour}}</a-select-option>
      </a-select>

      <tool-btn icon="timeLeft" type="time" style="margin-left: 5px;" @click="onTuningTime(-1)"></tool-btn>
      <a-select
        v-model="currMinute"
        style="width: 60px; margin-left:5px;"
        @change="onChange('minute')"
        size="small"
      >
        <a-select-option v-for="minute of minuteList" :value="minute" :key="minute">{{minute}}</a-select-option>
      </a-select>
      <tool-btn icon="timeRight" type="time" style="margin-left: 5px;" @click="onTuningTime(1)"></tool-btn>
    </div>
  </div>
</template>

<style src="./TimeMinuteSelect.scss" lang="scss" scoped></style>
<script src="./TimeMinuteSelect.js"></script>

