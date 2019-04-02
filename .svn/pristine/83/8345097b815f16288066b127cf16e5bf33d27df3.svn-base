<template>
  <div class="shortimpending">
    <!-- <div class="zoomImg" :class="zoomSw?'zoomImg_active':''" @click="zoomSw=false"></div> -->
    <div class="zoom" :class="zoomSwitch?'zoom_active':''">
      <a-icon type="close-circle" class="close" @click="close"/>
      <a href="javascrit:void(0);" class="left" @click="onSwitchImg('left')"></a>
      <a href="javascrit:void(0);" class="right"  @click="onSwitchImg('right')"></a>
      <img :src="zoomUrl" alt>
    </div>
    <div class="menus-section parent-deep">
      <a-tabs v-model="currTabId" @change="onTabsChange" type="card" class="qtq-tabs">
        <a-tab-pane v-for=" tab of tabs" :tab="tab.typeName" :key="tab.id">
          <div class="content">
            <short-time v-if="tab.id === 'shortTime'" @change="onShortTimeChange"></short-time>
            <near v-else-if="tab.id === 'near'" @change="onNearChange"></near>
            <sounding
              v-else-if="tab.id === 'sounding'"
              :fy4Aging="fy4Aging"
              @change="onSoundingChange"
            ></sounding>
            <fcst v-else-if="tab.id === 'fcst'" @change="onFcstChange"></fcst>
          </div>
        </a-tab-pane>
      </a-tabs>
    </div>
    <div class="top-section top-control">
      <relevance-aging-select
        v-if="currTabId === 'shortTime' && shortTimeElement"
        ref="relevanceAgingSelect"
        class="relevance-aging-select"
        :actTime.sync="objectiveActTime"
        :fcst.sync="objectiveFcst"
        :isDisabled="isDisabledRelevance"
        @change="onRelevanceAgingChange"
        @time-select="onObjectiveTimeSelect"
      ></relevance-aging-select>
      <whole-aging-select
        v-else-if="currTabId !== 'shortTime' && currTabAging"
        ref="wholeAgingSelect"
        class="whole-aging-select"
        :startTime="startTime"
        :aging1.sync="currTabAging.aging"
        :agingList="currTabAging.agingList"
        @aging-change="onWholeAgingChange"
      ></whole-aging-select>
      <!-- <level-select
        ref="levelSelect"
        :level.sync="level"
        :levelList="levelList"
        @level-change="onConditionChange"
      ></level-select>-->
      <!-- <area-select :area.sync="area" @area-change="onAreaChange"></area-select> -->
      <div class="selects">
        <div class="select_list">
          <p>区域</p>
          <ul>
            <li v-for="item in areaList" :key="item.value" :class="area==item.value?'active':''" @click="area=item.value">{{item.value}}</li>
          </ul>
          <!-- <a-radio-group name="radioGroup" v-model="area" @change="onAreaChange">
            <a-radio v-for="item in areaList" :key="item.value" :value="item.value">{{item.value}}</a-radio>
          </a-radio-group> -->
        </div>
      </div>
    </div>
     <div class="right_side">
        <div>
          <i :class="activeIndex==1?'active':''" @click="select(1)"></i>
          <span>实况</span>
        </div>
        <div>
          <i :class="activeIndex==2?'active':''" @click="select(2)"></i>
          <span>雷达</span>
        </div>
      </div>
      <div class="sideBar_box" v-if="activeIndex!=null&&activeClose">
        <a-icon type="close" class="icon" @click="activeClose=false" />
        <div class="top">
          <span>日期:</span>
          <a-date-picker size="small" style="width:110px" v-model="currDate" @change="changeHour"/>
          <tool-btn icon="timeLeft" type="time" style="margin-left: 5px;" @click="changDate(-1)"></tool-btn>
          <a-select style="width:60px" size="small" v-model="currHour" @change="changeHour">
            <a-select-option :value="item" v-for="item in hourList" :key="item">{{item}}</a-select-option>
          </a-select>
          <a-select
            style="width:60px"
            size="small"
            v-model="currMinute"
            @change="changeHour"
            v-if="activeIndex==2"
          >
            <a-select-option :value="item" v-for="item in minuteList" :key="item">{{item}}</a-select-option>
          </a-select>
          <tool-btn icon="timeRight" type="time" @click="changDate(1)"></tool-btn>
        </div>

      </div>
    <div class="img-section">
      <!-- <div class="imgDie" :class="dieSwitch?'die_active':''">
      </div>-->
     
      <img-show
        v-if="currTabAging"
        :srcs="mainImgPaths"
        :coverSrcs="coverImgPaths"
        :columnNumber="3"
        :aging="currTabAging.aging"
        :agingList="currTabAging.agingList"
        @switch="onSwitchImg"
      ></img-show>
    </div>
  </div>
</template>
<script src="./shortimpending.js"></script>
<style src="./shortimpending.scss" lang="scss" scoped></style>

