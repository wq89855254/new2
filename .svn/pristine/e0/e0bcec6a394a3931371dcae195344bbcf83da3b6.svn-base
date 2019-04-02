<template>
  <div>
    <div class="header-radio">
      <div>
        <a-radio-group @change="onDataTypeChange" v-model="currDataType">
          <a-radio value="act">实况</a-radio>
          <a-radio value="fcst">预报</a-radio>
        </a-radio-group>
      </div>
      <div>
        <a-radio-group
          @change="onImgTypeChange"
          v-model="currImgType"
          :disabled="currDataType === '实况'"
        >
          <a-radio value="NCEP" :disabled="currDataType === 'act'">Tlnp图</a-radio>
          <a-radio value="List" :disabled="currDataType === 'act'">时序图</a-radio>
        </a-radio-group>
      </div>
    </div>

    <time-select
      v-show="currDataType === 'act'"
      dateTitle="时间"
      hourTitle
      :date.sync="actDate"
      :hour.sync="actHour"
      :hourList="actHourList"
      @change="onActTimeChange"
    ></time-select>

    <time-select
      v-show="currDataType === 'fcst' && currImgType === 'NCEP'"
      dateTitle="时间"
      hourTitle
      :date.sync="fcstNcepDate"
      :hour.sync="fcstNcepHour"
      :hourList="fcstNcepHourList"
      @change="onfcstTimeChange"
    ></time-select>

    <time-select
      v-show="currDataType === 'fcst' && currImgType === 'List'"
      dateTitle="时间"
      hourTitle
      :date.sync="fcstListDate"
      :hour.sync="fcstListHour"
      :hourList="fcstListHourList"
      @change="onfcstTimeChange"
    ></time-select>

    <div class="area" v-show="currDataType === 'act'">
      <span>省份</span>
      <a-select v-model="province" style="width: 114px" @change="onProvinceChange" size="small">
        <a-select-option v-for="(val, key) in stationInfo" :value="key" :key="key">{{key}}</a-select-option>
      </a-select>
      <span>站名</span>
      <a-select v-model="stationId" style="width: 160px" size="small">
        <a-select-option
          v-for="item in stationInfo[province]"
          :value="item.number"
          :key="item.number"
        >{{item.number + ' ' + item.name}}</a-select-option>
      </a-select>
    </div>

    <map-nav v-model="stationId" :list="currDataType === 'act' ? actPlaceList : fcstPlaceList"></map-nav>

    <classify-title>风云4探空</classify-title>

    <time-select
      dateTitle="时间"
      hourTitle
      :date.sync="fy4Date"
      :hour.sync="fy4Hour"
      :hourList="fy4HourList"
      @change="onFy4TimeChange"
    ></time-select>

    <map-nav v-model="fy4PlaceId" :list="fy4PlaceList" @change="onFy4PlaceChange"></map-nav>
  </div>
</template>

<style src="./Sounding.scss" lang="scss" scoped></style>
<script src="./Sounding.js"></script>

