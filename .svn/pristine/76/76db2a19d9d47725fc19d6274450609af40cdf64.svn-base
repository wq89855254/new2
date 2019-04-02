<template>
  <div
    ref="box"
    v-if="options.length"
    class="shorttime"
    tabindex="0"
    v-focus
    @keyup.up.down.left.right="onKeyup"
  >
    <div class="zoom" :class="zoomSwitch?'zoom_active':''">
      <a-icon type="close-circle" class="close" @click="close"/>
      <a href="javascrit:void(0);" class="left" @click="onSwitchImg('left')"></a>
      <a href="javascrit:void(0);" class="right" @click="onSwitchImg('right')"></a>
      <img :src="zoomUrl" alt>
    </div>
    <div class="left-content parent-deep">
      <a-tabs
        @click.native="$refs.box.focus()"
        @change="onConditionChange"
        v-model="currFcstName"
        type="card"
        class="qtq-tabs"
      >
        <a-tab-pane v-for="fcst of options" :tab="fcst.fcstName" :key="fcst.fcstName">
          <!-- 多模式预报 -->
          <!-- 
            fcst.contents.find(el => el.typeName === fcst.activeTypeName)的对象路径： options[index].contents[index]
          -->
          <div class="fcst" v-if="fcst.id === 'manyPattern'">
            <div class="type-item">
              <a-radio-group
                class="qtq-a-radio-group"
                @change="onConditionChange"
                v-model="fcst.activeTypeName"
              >
                <a-radio-button
                  v-for="content of fcst.contents"
                  :value="content.typeName"
                  :key="content.typeName"
                >{{content.typeName}}</a-radio-button>
              </a-radio-group>
              <div class="wd-switch">
                <a-checkbox
                  v-model="fcst.contents.find(el => el.typeName === fcst.activeTypeName).isStability"
                  @change="onConditionChange"
                >稳定性</a-checkbox>
              </div>
            </div>

            <template v-for="content of fcst.contents">
              <time-select
                v-if="content.typeName === fcst.activeTypeName"
                :key="content.id"
                :date.sync="content.date"
                :hour.sync="content.hour"
                :hourList="content.hourList"
                @change="onConditionChange"
              ></time-select>
            </template>

            <a-tabs class="class-tabs">
              <a-tab-pane
                v-for="content of fcst.contents.find(el => el.typeName === fcst.activeTypeName).contents"
                :tab="content.tabName"
                :key="content.tabName"
              >
                <div style="height: calc(100vh - 259px); overflow: auto;">
                  <div v-for="section of content.sections" :key="section.title">
                    <div class="list-section-title">{{ section.title }}</div>
                    <ul class="element-list">
                      <li v-for="item in section.items" :key="item.name">
                        <a-radio
                          :name="fcst.contents.find(el => el.typeName === fcst.activeTypeName).typeName"
                          :value="item.name"
                          :checked="fcst.contents.find(el => el.typeName === fcst.activeTypeName).activeElementId === item.id"
                          @click="onClickElement(fcst.contents.find(el => el.typeName === fcst.activeTypeName), item.id)"
                        >
                          <span class="name">{{ item.name }}</span>
                        </a-radio>
                      </li>
                    </ul>
                  </div>
                </div>
              </a-tab-pane>
            </a-tabs>
          </div>

          <!-- 集合预报 -->
          <div class="fcst" v-else-if="fcst.id === 'gather'">
            <div class="type-item">
              <a-radio-group
                class="qtq-a-radio-group"
                @change="onConditionChange"
                v-model="fcst.activeTypeName"
              >
                <a-radio-button
                  v-for="content of fcst.contents"
                  :value="content.typeName"
                  :key="content.typeName"
                >{{content.typeName}}</a-radio-button>
              </a-radio-group>
            </div>

            <template v-for="content of fcst.contents">
              <time-select
                v-if="content.typeName === fcst.activeTypeName"
                :key="content.id + '1'"
                :date.sync="content.date"
                :hour.sync="content.hour"
                :hourList="content.hourList"
                @change="onConditionChange"
              ></time-select>
            </template>

            <div style="height: calc(100vh - 190px); overflow: auto;">
              <div class="gather-radio-item" v-for="content of fcst.contents" :key="content.id">
                <div v-for="condition of content.conditions" :key="condition.cdName">
                  <div class="list-section-title">{{condition.cdName}}</div>
                  <ul class="gather-radio">
                    <li v-for="item in condition.items" :key="item.name">
                      <a-radio
                        :name="condition.cdName"
                        :value="item.name"
                        :checked="condition.activeConditionName === item.name"
                        @click="onClickCondition(condition, item.name)"
                      >
                        <span class="name">{{ item.name }}</span>
                      </a-radio>
                    </li>
                  </ul>
                </div>

                <a-tabs class="class-tabs">
                  <a-tab-pane
                    v-for="elementContent of content.elementContents"
                    :tab="elementContent.elementName"
                    :key="elementContent.elementName"
                  >
                    <div v-for="section of elementContent.sections" :key="section.sectionName">
                      <div class="list-section-title">{{ section.sectionName }}</div>
                      <ul class="element-list">
                        <li v-for="item in section.elements" :key="item.name">
                          <a-radio
                            :name="content.typeName"
                            :value="item.name"
                            :checked="content.activeElementId === item.id"
                            @click="onClickElement(content, item.id)"
                          >
                            <span class="name">{{ item.name }}</span>
                          </a-radio>
                        </li>
                      </ul>
                    </div>
                  </a-tab-pane>
                </a-tabs>
              </div>
            </div>
          </div>

          <!-- 概率预报 -->
          <div
            class="fcst"
            v-else-if="fcst.id === 'prob'"
            style="height: calc(100vh - 113px); overflow: auto;"
          >
            <div v-for="content of fcst.contents" :key="content.id">
              <div class="list-section-title">{{ content.typeName }}</div>
              <time-select
                dateTitle="起报"
                hourTitle
                :date.sync="content.date"
                :hour.sync="content.hour"
                :hourList="content.hourList"
                @change="onConditionChange"
                style="margin-top: 10px;"
              ></time-select>
              <div class="prob-hour-list">
                <span>预报时段:</span>
                <a-radio-group v-model="content.activeHour" @change="onConditionChange">
                  <a-radio v-for="hour of content.hourIntervals" :value="hour" :key="hour">{{hour}}H</a-radio>
                </a-radio-group>
              </div>
              <ul class="element-list">
                <li v-for="item in content.elements" :key="item.name">
                  <a-radio
                    :name="'prob'"
                    :value="item.name"
                    :checked="fcst.activeElementId === item.id"
                    @click="onClickElement(fcst, item.id)"
                  >
                    <span class="name">{{ item.name }}</span>
                  </a-radio>
                </li>
              </ul>
            </div>
          </div>
        </a-tab-pane>
      </a-tabs>
    </div>

    <div class="right-content">
      <div class="right_side">
        <div>
          <i :class="activeIndex==1?'active':''" @click="select(1)"></i>
          <span>实况</span>
        </div>
        <div>
          <i :class="activeIndex==2?'active':''" @click="select(2)"></i>
          <span>预报</span>
        </div>
      </div>
      <div class="sideBar_box" v-if="activeIndex!=null&&activeClose">
        <a-icon type="close" class="icon" @click="activeClose=false" />
        <div class="top">
          <span>日期:</span>
          <a-date-picker size="small" style="width:110px" v-model="currDate" @change="changeHour"/>
          <tool-btn
            icon="timeLeft"
            type="time"
            style="margin-left: 5px;"
            @click="changDate(-1)"
            v-if="activeIndex==1"
          ></tool-btn>
          <a-select style="width:60px" size="small" v-model="currHour" @change="changeHour">
            <a-select-option :value="item" v-for="item in hourList" :key="item">{{item}}</a-select-option>
          </a-select>
          <tool-btn icon="timeRight" type="time" @click="changDate(1)" v-if="activeIndex==1"></tool-btn>
        </div>
        <div class="bottom" v-if="loginzt">
          <span>累计时间</span>
          <a-radio-group v-model="interval" @change="changeHour">
            <a-radio value="3h">3h</a-radio>
            <a-radio value="6h">6h</a-radio>
            <a-radio value="12h">12h</a-radio>
            <a-radio value="21h">21h</a-radio>
            <a-radio value="24h">24h</a-radio>
          </a-radio-group>
        </div>
        <div class="bottom" v-if="!loginzt">
          <span>累计时间</span>
          <a-radio-group v-model="interval" @change="changeHour">
            <a-radio value="12h">12h</a-radio>
            <a-radio value="21h">21h</a-radio>
            <a-radio value="24h">24h</a-radio>
          </a-radio-group>
        </div>
      </div>
      <!-- <side-bar
      :situation='true'
      :radar='true'
      :hourList='options[0].contents[0].hourList'
      :hour='options[0].contents[0].hour'
      :date='options[0].contents[0].date'
      @dieFn='dieFn'
      ></side-bar>-->
      <div class="selects">
        <div class="select_list">
          <p>区域</p>
          <ul>
            <li
              v-for="item in areaList"
              :key="item.value"
              :class="area==item.value?'active':''"
              @click="area=item.value"
            >{{item.value}}</li>
          </ul>
        </div>
        <div class="select_list" v-if="currEleOption">
          <p>等高线</p>
          <ul>
            <li
              v-for="item in currEleOption.levels"
              :class="currEleOption.activeLevel==item?'active':''"
              @click="highChange(item)"
              :key="item"
            >{{item}}</li>
          </ul>
        </div>
      </div>
      <div class="top-control">
        <template v-for="fcst of options">
          <whole-aging-select
            ref="wholeAgingSelect"
            class="whole-aging-select"
            v-if="fcst.fcstName === currFcstName"
            :key="fcst.id"
            :startTime="startTime"
            :aging1.sync="fcst.aging"
            :agingList="fcst.agingList"
            @aging-change="onConditionChange"
          ></whole-aging-select>
        </template>

        <!-- <template v-for="fcst of options">
          <aging-select
            ref="agingSelect"
            class="aging-select"
            v-if="fcst.fcstName === currFcstName"
            :key="fcst.id"
            :aging.sync="fcst.aging"
            :agingList="fcst.agingList"
            @aging-change="onConditionChange"
          ></aging-select>
        </template>-->
        <!-- <level-select
          ref="levelSelect"
          v-if="currEleOption"
          :level.sync="currEleOption.activeLevel"
          :levelList="currEleOption.levels"
          @level-change="onConditionChange"
        ></level-select>-->
        <!-- <area-select :area.sync="area" @area-change="onConditionChange"></area-select> -->
      </div>
      <div class="imgDie" :class="dieSwitch?'die_active':''"></div>
      <div class="img-content">
        <img-show
          v-if="currFcstOption"
          :srcs="imgPaths"
          :aging="currFcstOption.aging"
          :agingList="currFcstOption.agingList"
          :level="currEleOption.activeLevel"
          :levelList="currEleOption.levels"
          :coverSrcs="coverPaths"
          @switch="onSwitchImg"
        ></img-show>
      </div>
    </div>
  </div>
</template>

<script src="./shorttime.js"></script>
<style src="./shorttime.scss" lang="scss" scoped></style>

