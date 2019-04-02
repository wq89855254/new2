<template>
  <div
    ref="box"
    v-if="options.length"
    class="monitor"
    tabindex="0"
    v-focus
    @keyup.up.down.left.right="onKeyup"
  >
 <div class="zoom" :class="zoomSwitch?'zoom_active':''">
        <a-icon type="close-circle" class="close" @click="close"/>
        <!-- <a href="javascrit:void(0);" class="left" @click="onSwitchImg('left')"></a>
        <a href="javascrit:void(0);" class="right"  @click="onSwitchImg('right')"></a> -->
        <img :src="zoomUrl" alt="">
      </div>
    <div class="left-content parent-deep">
      <a-tabs
        @click.native="$refs.box.focus()"
        @change="onConditionChange"
        v-model="currFcstName"
        type="card"
        class="qtq-tabs Ytab"
      >
        <a-tab-pane v-for="fcst of options" :tab="fcst.fcstName" :key="fcst.fcstName">
          <div class="fcst" v-if="fcst.id === 'OBSConvection'">
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
            <div class="dateSelect dateSelect1">
              <span>时间间隔</span>
              <a-radio-group @change="onConditionChange" v-model="fcst.date">
                <a-radio
                  :value="comment"
                  v-for="comment of fcst.dateList"
                  :key="comment"
                >{{comment}}</a-radio>
              </a-radio-group>
            </div>
            <div style="height: calc(100vh - 246px); overflow: auto; margin-top:10px;">
              <div
                v-for="section of fcst.contents.find(el => el.typeName === fcst.activeTypeName).sections"
                :key="section.title"
              >
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
          </div>
          <div class="fcst" v-if="fcst.id === 'OBSAws'">
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
            <div class="dateSelect dateSelect1">
              <span>时间间隔</span>
              <a-radio-group
                @change="onConditionChange"
                v-model="fcst.date"
                :disabled="fcst.contents[0].dateSwitch"
              >
                <a-radio
                  :value="comment"
                  v-for="comment of fcst.dateList"
                  :key="comment"
                >{{comment}}</a-radio>
              </a-radio-group>
            </div>
            <div style="height: calc(100vh - 226px); overflow: auto; margin-top:10px;">
              <div
                v-for="section of fcst.contents.find(el => el.typeName === fcst.activeTypeName).sections"
                :key="section.title"
              >
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
          </div>
          <div class="fcst" v-if="fcst.id === 'OBSLight'">
            <template v-for="content of fcst.contents">
              <time-select
                v-if="content.typeName === fcst.activeTypeName"
                :key="content.id"
                :date.sync="content.date"
                :hour.sync="content.hour"
                :hourList="content.hourList"
                :isShowMinute="content.minSwitch"
                :minuteList="content.minuteList"
                :minute.sync="content.minute"
                @change="onConditionChange"
              ></time-select>
            </template>
            <div class="dateSelect dateSelect1">
              <span>时间间隔</span>
              <a-radio-group
                @change="onConditionChange"
                v-model="fcst.date"
                :disabled="fcst.contents[0].dateSwitch"
              >
                <a-radio
                  :value="comment"
                  v-for="comment of fcst.dateList"
                  :key="comment"
                >{{comment}}</a-radio>
              </a-radio-group>
            </div>
            <div style="height: calc(100vh - 246px); overflow: auto; margin-top:10px;">
              <div
                v-for="section of fcst.contents.find(el => el.typeName === fcst.activeTypeName).sections"
                :key="section.title"
              >
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
          </div>
          <div class="fcst" v-if="fcst.id === 'OBSSatellite'">
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
            <div class="dateSelect dateSelect1">
              <span>时间间隔</span>
              <a-radio-group
                @change="onConditionChange"
                v-model="fcst.date"
                :disabled="fcst.contents[0].dateSwitch"
              >
                <a-radio
                  :value="comment"
                  v-for="comment of fcst.dateList"
                  :key="comment"
                >{{comment}}</a-radio>
              </a-radio-group>
            </div>
            <div style="height: calc(100vh - 224px); overflow: auto; margin-top:10px;">
              <div
                v-for="section of fcst.contents.find(el => el.typeName === fcst.activeTypeName).sections"
                :key="section.title"
              >
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
          </div>
          <div class="fcst" v-if="fcst.id === 'OBSRadar'">
            <template v-for="content of fcst.contents">
              <time-select
                v-if="content.typeName === fcst.activeTypeName"
                :key="content.id"
                :date.sync="content.date"
                :hour.sync="content.hour"
                :hourList="content.hourList"
                :isShowMinute="content.minuteSwitch"
                :minuteList="content.minuteList"
                :minute.sync="content.minute"
                @change="onConditionChange"
              ></time-select>
            </template>
            <div class="dateSelect dateSelect1">
              <span>时间间隔</span>

              <a-radio-group
                @change="onConditionChange"
                v-model="fcst.date"
                :disabled="fcst.contents[0].dateSwitch"
              >
                <a-radio
                  :value="comment"
                  v-for="comment of fcst.dateList"
                  :key="comment"
                >{{comment}}</a-radio>
              </a-radio-group>
            </div>
            <div style="height: calc(100vh - 226px); overflow: auto; margin-top:10px;">
              <div
                v-for="section of fcst.contents.find(el => el.typeName === fcst.activeTypeName).sections"
                :key="section.title"
              >
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
              <div class="animation">
                <p class="title">导出动画</p>
                <template v-for="content of fcst.contents">
                  <time-select
                    v-if="content.typeName === fcst.activeTypeName"
                    :key="content.id+1"
                    :date.sync="content.startDate"
                    :dateTitle="'开始时间'"
                    :hourTitle="''"
                    :hour.sync="content.startHour"
                    :hourList="content.hourList"
                    :isShowMinute="true"
                    :minuteList="content.minuteList"
                    :minute.sync="content.startMinute"
                  ></time-select>
                </template>
                <template v-for="content of fcst.contents">
                  <time-select
                    v-if="content.typeName === fcst.activeTypeName"
                    :key="content.id+2"
                    :dateTitle="'结束时间'"
                    :hourTitle="''"
                    :date.sync="content.endDate"
                    :hour.sync="content.endHour"
                    :hourList="content.hourList"
                    :isShowMinute="true"
                    :minuteList="content.minuteList"
                    :minute.sync="content.endMinute"
                  ></time-select>
                </template>
                <span>区域</span>
                <a-select style="width: 120px" v-model="fcst.contents[0].areaid" size="small">
                  <a-select-option
                    v-for="item in fcst.contents[0].areaList"
                    :value="item.id"
                    :key="item.name"
                  >{{item.name}}</a-select-option>
                </a-select>
                <div class="attr">
                  <span>间隔时间</span>
                  <a-select style="width: 90px" size="small" v-model="fcst.contents[0].interval">
                    <a-select-option value="1">6分钟</a-select-option>
                    <a-select-option value="2">12分钟</a-select-option>
                    <a-select-option value="3">30分钟</a-select-option>
                    <a-select-option value="4">60分钟</a-select-option>
                  </a-select>
                  <span>速度</span>
                  <a-select style="width: 90px" size="small" v-model="fcst.contents[0].speed">
                    <a-select-option value="1">0.1秒</a-select-option>
                    <a-select-option value="2">0.3秒</a-select-option>
                    <a-select-option value="3">0.5秒</a-select-option>
                    <a-select-option value="4">1秒</a-select-option>
                  </a-select>
                </div>
                <button class="getGif" @click="get_gif">确定</button>
              </div>
            </div>
          </div>
          <div class="fcst" v-if="fcst.id === 'windprofileMosaic'">
            <template v-for="content of fcst.contents">
              <time-select
                v-if="content.typeName === fcst.activeTypeName"
                :key="content.id"
                :date.sync="content.date"
                :hour.sync="content.hour"
                :hourList="content.hourList"
                :isShowMinute="content.minuteSwitch"
                :minute.sync="content.minute"
                :minuteList="content.minuteList"
                @change="onConditionChange"
              ></time-select>
            </template>
            <!-- <div class="dateSelect dateSelect1">
              <a-radio-group @change="onConditionChange" v-model="fcst.date">
                <a-radio
                  :value="comment"
                  v-for="comment of fcst.dateList"
                  :key="comment"
                >{{comment}}</a-radio>
              </a-radio-group>
            </div>-->
            <div class="select">
              <span>时间间隔：</span>
              <a-radio v-if="!fcst.contents[0].tabSwitch" checked>六分钟</a-radio>
              <a-radio v-if="fcst.contents[0].tabSwitch" checked>一小时</a-radio>
              <!-- <span v-if="!fcst.contents[0].tabSwitch">等高面</span>
              <a-select
                style="width:90px;"
                size="small"
                v-model="fcst.contents[0].high"
                @change="onConditionChange"
                v-if="!fcst.contents[0].tabSwitch"
              >
                <a-select-option v-for="item of fcst.contents[0].highList" :key="item">{{item}}</a-select-option>
              </a-select>
              <span v-if="fcst.contents[0].tabSwitch">等压面</span>
              <a-select
                style="width:90px;"
                size="small"
                v-model="fcst.contents[0].pressure"
                @change="onConditionChange"
                v-if="fcst.contents[0].tabSwitch"
              >
                <a-select-option v-for="item of fcst.contents[0].pressureList" :key="item">{{item}}</a-select-option>
              </a-select> -->
            </div>
            <div style="height: calc(100vh - 209px); overflow: auto; margin-top:10px;">
              <div
                v-for="section of fcst.contents.find(el => el.typeName === fcst.activeTypeName).sections"
                :key="section.title"
              >
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
          </div>
        </a-tab-pane>
      </a-tabs>
    </div>
    <div class="right-content">
      <div class="right_side">
        <div class="warning" @click="warningFn">
          <i :class="warningSwitch?'active':''"></i><span>警报</span>
        </div>
      </div>
      <!-- <side-bar :warning='true'></side-bar> -->
      <!-- <area-select :area.sync="area" @area-change="onConditionChange"></area-select> -->
      <div class="selects">
        <div class="select_list" v-if="currFcstName!='风廓线'&&currFcstName!='卫星'">
          <p>区域</p>
          <ul>
            <li v-for="item in areaList" :key="item.value" :class="area==item.value?'active':''" @click="area=item.value">{{item.value}}</li>
          </ul>
        </div>
        <div class="select_list" v-if="currFcstName==='风廓线'&&options[5].contents[0].activeElementId==='robs_1'">
          <p>等高面</p>
                    <ul>
            <li v-for="item in options[5].contents[0].highList"  :class="options[5].contents[0].high==item?'active':''" @click="highChange(item)" :key="item">{{item}}</li>
          </ul>
          <!-- <a-radio-group name="radioGroup" v-model="options[5].contents[0].high" @change="onConditionChange" >
            <a-radio v-for="item in options[5].contents[0].highList" :key="item" :value="item">{{item}}</a-radio>
          </a-radio-group> -->
        </div>
                <div class="select_list" v-if="currFcstName==='风廓线'&&options[5].contents[0].activeElementId==='robs_2'">
          <p>等压面</p>
                              <ul>
            <li v-for="item in options[5].contents[0].pressureList" :key="item"  :class="options[5].contents[0].pressure==item?'active':''" @click="preChange(item)">{{item}}</li>
          </ul>
          <!-- <a-radio-group name="radioGroup" v-model="options[5].contents[0].pressure" @change="onConditionChange" >
            <a-radio v-for="item in options[5].contents[0].pressureList" :key="item" :value="item">{{item}}</a-radio>
          </a-radio-group> -->
        </div>
      </div>
      <div class="img-content img_active"  @click="show_zoom">
        <img-show
          v-if="currFcstOption"
          :srcs="imgPaths"
          :aging="currFcstOption.aging"
          :agingList="currFcstOption.agingList"
          :level="currEleOption.activeLevel"
          :levelList="currEleOption.levels"
          :control="false"
          @switch="onSwitchImg"
        ></img-show>
      </div>
    </div>
  </div>
</template>
<style>
.monitor .tool-btn {
  display: none;
}
.monitor .ant-radio-group label{
    width: 43px !important;
    margin-right: 0;
}
span.ant-radio + *{
    padding-left: 0px !important;
    padding-right: 0px !important;
}
.monitor .sideBar_box .tool-btn{
  display: inline-block ;
}
.monitor .ant-tabs-tab {
  padding: 0 7px !important;
}
</style>

<script src="./monitor.js"></script>
<style src="./monitor.scss" lang="scss" scoped></style>

