<template>
  <condition-layout title="时效">
    <div class="box">
      <div class="times">
        <time-select
          class="ojb-time-top"
          dateTitle="实况"
          hourTitle
          :disabled="isDisabled"
          :date.sync="actDate"
          :hour.sync="actHour"
          :hourList="actHourList"
          @change="onChange('act')"
        ></time-select>
        <time-select
          class="ojb-time-top"
          dateTitle="模式"
          hourTitle
          :disabled="isDisabled"
          :date.sync="fcstDate"
          :hour.sync="fcstHour"
          :hourList="fcst.startHourList"
          @change="onChange('fcst')"
        ></time-select>
      </div>
      <div class="axiss">

        <div>
          <div class="icon concat-icon" :class="{disabled: isDisabled}" @click="onConcat(true)">已关联</div>
          <div class="icon no-concat-icon" :class="{disabled: isDisabled}" @click="onConcat(false)">未关联</div>
        </div>

        <div class="switch-btns">
          <div class="mb-3">
            <tool-btn
              @click="tuningTime(-1)"
              :disabled="!isConcat || isFirstIndex || isDisabled"
              icon="left"
              style="margin-right:5px;"
            ></tool-btn>
            <tool-btn
              @click="tuningTime(1)"
              :disabled="!isConcat || isLastIndex || isDisabled"
              icon="right"
              style="margin-right:5px;"
            ></tool-btn>
          </div>
          <div>
            <tool-btn
              @click="tuningTime(-1)"
              :disabled="isConcat || isFirstIndex || isDisabled"
              icon="left"
              style="margin-right:5px;"
            ></tool-btn>
            <tool-btn
              @click="tuningTime(1)"
              :disabled="isConcat || isLastIndex || isDisabled"
              icon="right"
              style="margin-right:5px;"
            ></tool-btn>
          </div>
        </div>

        <div
          @click="onSwitchPage(-1)"
          class="left-btn"
          :class="{'btn-disabled': isFirstPageIndex || isDisabled}"
        ></div>

        <div ref="listBox" class="list-box">
          <ul class="list mb-3" :class="{disabled: !isConcat || isDisabled}">
            <li
              @click="!isConcat || onClickSwitch(item)"
              v-for="(item, index) of currConcatList"
              :key="index"
              :class="{actual: !item.isFcst, active: item.active}"
              :title="!isConcat ? '' : item.time"
            >{{item.name}}</li>
          </ul>
          <ul class="list" :class="{disabled: isConcat || isDisabled}">
            <li
              @click="isConcat || onClickSwitch(item)"
              v-for="(item, index) of currNoConcatList"
              :key="index"
              :class="{actual: !item.isFcst, active: item.active}"
              :title="isConcat ? '' : item.time"
            >{{item.name}}</li>
          </ul>
        </div>

        <div
          ref="rightBtn"
          @click="onSwitchPage(1)"
          class="right-btn"
          :class="{'btn-disabled': isLastPageIndex || isDisabled}"
        ></div>



        <!-- <div class="concat" :class="{disabled: !isConcat || isDisabled}">
          <div class="icon cp" @click="onConcat(true)">已关联</div>
          <tool-btn
            @click="tuningTime(-1)"
            :disabled="!isConcat || isFirstIndex || isDisabled"
            icon="left"
            style="margin-right:5px;"
          ></tool-btn>
          <tool-btn
            @click="tuningTime(1)"
            :disabled="!isConcat || isLastIndex || isDisabled"
            icon="right"
            style="margin-right:5px;"
          ></tool-btn>
          <div
            @click="onSwitchPage(-1)"
            class="left-btn pr-b-12"
            :class="{'btn-disabled': isFirstPageIndex || isDisabled}"
          ></div>
          <ul class="list">
            <li
              @click="!isConcat || onClickSwitch(item)"
              v-for="(item, index) of currConcatList"
              :key="index"
              :class="{actual: !item.isFcst, active: item.active}"
              :title="!isConcat ? '' : item.time"
            >{{item.name}}</li>
          </ul>
          <div
            @click="onSwitchPage(1)"
            class="right-btn pr-b-12"
            :class="{'btn-disabled': isLastPageIndex || isDisabled}"
          ></div>
        </div>
        <div class="no-concat" :class="{disabled: isConcat || isDisabled}">
          <div class="icon cp" @click="onConcat(false)">未关联</div>
          <tool-btn
            @click="tuningTime(-1)"
            :disabled="isConcat || isFirstIndex || isDisabled"
            icon="left"
            style="margin-right:5px;"
          ></tool-btn>
          <tool-btn
            @click="tuningTime(1)"
            :disabled="isConcat || isLastIndex || isDisabled"
            icon="right"
            style="margin-right:5px;"
          ></tool-btn>
          <div class="left-btn hidden"></div>
          <ul class="list">
            <li
              @click="isConcat || onClickSwitch(item)"
              v-for="(item, index) of currNoConcatList"
              :key="index"
              :class="{actual: !item.isFcst, active: item.active}"
              :title="isConcat ? '' : item.time"
            >{{item.name}}</li>
          </ul>
          <div class="right-btn hidden"></div>
        </div> -->
      </div>
    </div>
  </condition-layout>
</template>
<script src="./RelevanceAgingSelect.js"></script>
<style src="./RelevanceAgingSelect.scss" lang="scss" scoped></style>