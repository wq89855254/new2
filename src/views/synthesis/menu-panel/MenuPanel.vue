<template>
  <section class="menu-panel">
    <div class="global-time">
      <div>
        <span class="title">总控</span>
        <a-date-picker
          :value="currSplitScreen.date"
          size="small"
          style="width: 120px; margin-right:10px;"
          :allowClear="false"
          @change="onZkDateChange"
        />
        <a-select
          :value="currSplitScreen.hour"
          style="width: 55px; margin-right:10px;"
          size="small"
          @change="onZkHourChange"
        >
          <a-select-option v-for="hour of zkHourList" :key="hour" :value="hour">{{hour}}</a-select-option>
        </a-select>
        <a-select
          :value="currSplitScreen.minute"
          style="width: 55px"
          size="small"
          @change="onZkMinuteChange"
        >
          <a-select-option v-for="minute of zkMinuteList" :key="minute" :value="minute">{{minute}}</a-select-option>
        </a-select>
      </div>
      <div class="btns">
        <div class="latest-btn" @click="debouncedReturnLatest">
          <i></i>
          <span>返回最新</span>
        </div>
        <div
          class="refresh-btn"
          :class="{active: currSplitScreen.isAutoRefresh}"
          @click="debouncedAutoRefresh"
        >
          <i></i>
          <span>自动刷新</span>
        </div>
      </div>
    </div>
    <ul class="menus">
      <li
        @click="onClickSwitchMenu(menu.id)"
        v-for="menu of menus"
        :key="menu.id"
        :class="{active: currMenuId === menu.id}"
      >
        <img :src="menu.imgSrc">
        <span>{{menu.name}}</span>
      </li>
    </ul>
    <div class="panels">
      <!-- :name="prevMenuId === currMenuId ? 'fademenu' : ''" -->
      <transition-group name="fademenu" mode="out-in">
        <!-- 预报预警 -->
        <div
          v-show="currMenuId === 'shortPeriodFcst' && isShowPanel"
          key="shortPeriodFcst"
          class="pa-top-left"
        >
          <panel-layout :title="currMenuName" @close="isShowPanel = false">
            <small-title class="mb-10">短期预报</small-title>
            <div class="flex-v-center">
              <a-date-picker
                :value="fcstWarning.shortTerm.date"
                size="small"
                style="width: 120px; margin-right:10px;"
                :allowClear="false"
                @change="onFwShortTermChange('date', $event)"
              />
              <a-select
                :value="fcstWarning.shortTerm.hour"
                style="width: 55px; margin-right:10px;"
                size="small"
                @change="onFwShortTermChange('hour', $event)"
              >
                <a-select-option
                  v-for="hour of fcstWarning.shortTerm.hourList"
                  :value="hour"
                  :key="hour"
                >{{hour}}</a-select-option>
              </a-select>
              <hour-btn
                v-for="ag of fcstWarning.shortTerm.agingList"
                :checked="ag === fcstWarning.shortTerm.aging"
                :key="ag"
                @click="onFwShortTermChange('aging', ag)"
              >{{ag}}h</hour-btn>
            </div>

            <small-title class="my-10">短时预报</small-title>
            <div class="flex-v-center">
              <icon-element-btn
                v-for="item of fcstWarning.shortTime.eleList"
                :icon="item.icon"
                :checked="item.checked"
                :key="item.id"
                @click="onFwShortTimeChange('eleList', item.id)"
              >{{item.name}}</icon-element-btn>
              <a-select
                :value="fcstWarning.shortTime.date"
                style="width: 130px;"
                size="small"
                @change="onFwShortTimeChange('date', $event)"
              >
                <a-select-option
                  v-for="d of fcstWarning.shortTime.timeList"
                  :value="d"
                  :key="d"
                >{{d}}</a-select-option>
              </a-select>
            </div>
            <small-title class="my-10">预警信号</small-title>

            <a-radio-group class="qtq-a-radio-group" :value="fcstWarning.currWarnId">
              <a-radio-button @click="fw_switch_warn_type('state')" value="state">国家级预警</a-radio-button>
              <a-radio-button @click="fw_switch_warn_type('province')" value="province">省级预警</a-radio-button>
            </a-radio-group>

            <!-- 国家级预警 -->
            <div v-show="fcstWarning.currWarnId === 'state'" class="mt-10 flex-v-center">
              <a-date-picker
                :value="fcstWarning.stateWarn.date"
                size="small"
                style="width: 120px; margin-right:10px;"
                :allowClear="false"
                @change="onFwWarnStateChange('date', $event)"
              />
              <a-select
                :value="fcstWarning.stateWarn.hour"
                style="width: 55px; margin-right:10px;"
                size="small"
                @change="onFwWarnStateChange('hour', $event)"
              >
                <a-select-option
                  v-for="hour of fcstWarning.stateWarn.hourList"
                  :value="hour"
                  :key="hour"
                >{{hour}}</a-select-option>
              </a-select>
              <hour-btn
                v-for="ag of fcstWarning.stateWarn.agingList"
                :checked="ag === fcstWarning.stateWarn.aging"
                :key="ag"
                @click="onFwWarnStateChange('aging', ag)"
              >{{ag}}h</hour-btn>
            </div>

            <!-- 省级预警 -->
            <div v-show="fcstWarning.currWarnId === 'province'">
              <div class="mt-10 flex-v-center">
                <a-date-picker
                  :value="fcstWarning.provinceWarn.date"
                  size="small"
                  style="width: 120px; margin-right:10px;"
                  :allowClear="false"
                  @change="onFwWarnProvinceChange('date', $event)"
                />
                <a-select
                  :value="fcstWarning.provinceWarn.hour"
                  style="width: 55px; margin-right:10px;"
                  size="small"
                  @change="onFwWarnProvinceChange('hour', $event)"
                >
                  <a-select-option
                    v-for="hour of fcstWarning.provinceWarn.hourList"
                    :value="hour"
                    :key="hour"
                  >{{hour}}</a-select-option>
                </a-select>
                <a-select
                  :value="fcstWarning.provinceWarn.minute"
                  style="width: 55px; margin-right:10px;"
                  size="small"
                  @change="onFwWarnProvinceChange('minute', $event)"
                >
                  <a-select-option
                    v-for="minute of fcstWarning.provinceWarn.minuteList"
                    :value="minute"
                    :key="minute"
                  >{{minute}}</a-select-option>
                </a-select>
              </div>
              <div class="mt-10 flex-v-center">
                <hour-btn
                  v-for="ag of fcstWarning.provinceWarn.agingList"
                  :checked="ag === fcstWarning.provinceWarn.aging"
                  :key="ag"
                  @click="onFwWarnProvinceChange('aging', ag)"
                >{{ag}}h</hour-btn>
              </div>
              <div class="mt-10 flex-v-center">
                <icon-element-btn
                  v-for="item of fcstWarning.provinceWarn.eleList"
                  :icon="item.icon"
                  :checked="item.checked"
                  :key="item.id"
                  @click="onFwWarnProvinceChange('eleList', item.id)"
                >{{item.name}}</icon-element-btn>
              </div>
            </div>
          </panel-layout>
        </div>

        <!-- 数值预报 -->
        <div
          v-show="currMenuId === 'numberFcst' && isShowPanel"
          key="numberFcst"
          class="pa-top-left"
        >
          <panel-layout :title="currMenuName" @close="isShowPanel = false">
            <a-radio-group class="qtq-a-radio-group" :value="currSplitScreen.currValueFcstId">
              <a-radio-button
                @click="vf_switch_tabs(item.id)"
                v-for="item of valueFcst"
                :value="item.id"
                :key="item.id"
              >{{item.name}}</a-radio-button>
            </a-radio-group>
            <div
              v-for="(item) of valueFcst"
              :key="item.id"
              v-show="item.id === currSplitScreen.currValueFcstId"
            >
              <div class="mt-10 flex-v-center">
                <a-date-picker
                  :value="item.date"
                  size="small"
                  style="width: 120px; margin-right:10px;"
                  :allowClear="false"
                  @change="onVfChange('date', $event)"
                />
                <a-select
                  :value="item.hour"
                  style="width: 55px; margin-right:10px;"
                  size="small"
                  @change="onVfChange('hour', $event)"
                >
                  <a-select-option v-for="hour of item.hourList" :value="hour" :key="hour">{{hour}}</a-select-option>
                </a-select>
              </div>
              <div class="mt-10">
                <hour-btn
                  @click="onVfChange('aging', aging)"
                  v-for="aging of item.agingList"
                  :value="aging"
                  :key="aging"
                  :checked="aging === item.aging"
                >{{aging}}</hour-btn>
              </div>
              <a-tabs class="class-tabs" :activeKey="item.typeEleId" @change="onVfTabsChange">
                <a-tab-pane
                  v-for="eleClass of item.typeEleList"
                  :tab="eleClass.name"
                  :key="eleClass.id"
                >
                  <small-title class="mb-10">无层次</small-title>
                  <div>
                    <element-btn
                      v-for="ele of eleClass.eleList.filter(el => el.type === '无层次')"
                      :checked="ele.checked"
                      :key="ele.id"
                      class="two-col-element"
                      @click="onVfChange('element', ele.id)"
                    >{{ele.name}}</element-btn>
                  </div>
                  <div class="mb-10 flex-v-center">
                    <small-title>高空</small-title>
                    <a-select
                      :value="eleClass.level"
                      style="width: 70px; margin-right:10px;margin-left:10px;"
                      size="small"
                      @change="onVfChange('level', $event)"
                    >
                      <a-select-option
                        v-for="level of eleClass.levelList"
                        :value="level"
                        :key="level"
                      >{{level}}</a-select-option>
                    </a-select>
                  </div>
                  <div>
                    <element-btn
                      v-for="ele of eleClass.eleList.filter(el => el.type === '高空')"
                      :checked="ele.checked"
                      :key="ele.id"
                      class="two-col-element"
                      @click="onVfChange('element', ele.id)"
                    >{{ele.name}}</element-btn>
                  </div>
                </a-tab-pane>

                <!-- <a-tab-pane tab="水汽" key="2">
                <small-title class="mb-10">无层次</small-title>
                <div>
                  <element-btn class="two-col-element">整层可降水</element-btn>
                  <element-btn class="two-col-element">6小时降水量</element-btn>
                  <element-btn class="two-col-element">6小时对流性降水量</element-btn>
                </div>
                <small-title class="mb-10">高度</small-title>
                <div>
                  <element-btn class="two-col-element">温度露点差</element-btn>
                  <a-select
                    defaultValue="500"
                    style="width: 70px; margin-right:10px;"
                    size="small"
                    @change="onFcstWarningHourChange"
                  >
                    <a-select-option value="500">500</a-select-option>
                    <a-select-option value="700">700</a-select-option>
                    <a-select-option value="850">850</a-select-option>
                    <a-select-option value="925">925</a-select-option>
                  </a-select>
                </div>
                </a-tab-pane>-->
              </a-tabs>
            </div>
          </panel-layout>
        </div>

        <!-- 强天气 -->
        <div
          v-show="currMenuId === 'severeWeather' && isShowPanel"
          key="severeWeather"
          class="pa-top-left"
        >
          <panel-layout :title="currMenuName" @close="isShowPanel = false">
            <!-- <time-select></time-select> -->
            <div class="hour-list">
              <hour-btn
                class="hour-btn"
                v-for="hour of severeWeather.hourList"
                :checked="severeWeather.currHour === hour"
                :key="hour"
                @click="onSwUpdateHour(hour)"
              >{{hour}}h</hour-btn>
            </div>
            <div class="element-List">
              <element-btn
                class="two-col-element"
                v-for="ele of severeWeather.hourEleList"
                :checked="ele.checked"
                :key="ele.id"
                @click="select_element(ele);get_latest_element_time(ele)"
              >{{ele.name}}</element-btn>
            </div>
            <div class="line"></div>
            <div v-for="ele of severeWeather.fy4EleList" :key="ele.id">
              <element-btn
                :checked="ele.checked"
                @click="select_element(ele);get_latest_element_time(ele)"
              >{{ele.name}}</element-btn>
              <div class="sw-select">
                <span>累计:</span>
                <a-select
                  :value="ele.currAcc"
                  style="width: 80px"
                  size="small"
                  @change="onSwUpdateElementCondition(ele, 'currAcc', $event)"
                >
                  <a-select-option
                    :value="acc.value"
                    v-for="acc of ele.accList"
                    :key="acc.value"
                  >{{acc.name}}</a-select-option>
                </a-select>
                <span>观测:</span>
                <a-select
                  :value="ele.currObserve"
                  style="width: 110px"
                  size="small"
                  @change="onSwUpdateElementCondition(ele, 'currObserve', $event)"
                >
                  <a-select-option
                    :value="observe.value"
                    v-for="observe of ele.observeList"
                    :key="observe.value"
                  >{{observe.name}}</a-select-option>
                </a-select>
              </div>
              <div class="line"></div>
            </div>
            <element-btn
              v-for="(ele, i) of severeWeather.traceEleList"
              :class="{'mt-10': i > 0}"
              :checked="ele.checked"
              :key="ele.id"
              @click="select_element(ele);get_latest_element_time(ele)"
            >{{ele.name}}</element-btn>
          </panel-layout>
        </div>

        <!-- 云图 -->
        <div
          v-show="currMenuId === 'cloudPicture' && isShowPanel"
          key="cloudPicture"
          class="pa-top-left"
        >
          <panel-layout :title="currMenuName" @close="isShowPanel = false">
            <a-radio-group
              class="qtq-a-radio-group"
              @change="onCpTabsChange"
              :value="cloudPicture.currTabName"
            >
              <a-radio-button
                v-for="tab of cloudPicture.tabList"
                :value="tab.name"
                :key="tab.typeId"
              >{{tab.name}}</a-radio-button>
            </a-radio-group>

            <div v-for="tab of cloudPicture.tabList" :key="tab.typeId">
              <!-- <transition name="slide" mode="out-in"> -->
              <div v-show="tab.typeId === 'cp_kh_satellite' && cloudPicture.currTabName === '葵花卫星'">
                <div v-for="(classify, i) of tab.classifyList" :key="classify.name">
                  <small-title :class="{'my-10': i == 0, 'mb-10': i > 0}">{{classify.name}}</small-title>
                  <element-btn
                    class="two-col-element"
                    v-for="ele of classify.eleList"
                    :checked="ele.checked"
                    :key="ele.id"
                    @click="select_element(ele);get_latest_element_time(ele)"
                  >{{ele.name}}</element-btn>
                </div>
              </div>
              <div
                v-show="tab.typeId === 'cp_fy_satellite' && cloudPicture.currTabName === 'FY卫星'"
                class="mt-10"
              >
                <element-btn
                  class="two-col-element"
                  v-for="ele of tab.eleList"
                  :checked="ele.checked"
                  :key="ele.id"
                  @click="select_element(ele);get_latest_element_time(ele)"
                >{{ele.name}}</element-btn>
              </div>
              <div
                v-show="tab.typeId === 'cp_fy4_satellite' && cloudPicture.currTabName === 'FY4卫星'"
                class="mt-10 of-hidden"
              >
                <div
                  :class="{'one-col-element-box': ele.currAging, 'two-col-element-box': !ele.currAging}"
                  v-for="ele of tab.eleList"
                  :key="ele.id"
                >
                  <element-btn
                    :class="{'one-element': ele.currAging, 'two-element': !ele.currAging}"
                    :checked="ele.checked"
                    @click="select_element(ele);get_latest_element_time(ele)"
                  >{{ele.name}}</element-btn>
                  <template v-if="ele.currAging">
                    <a-select
                      :value="ele.currAging"
                      style="width: 60px;margin-right:10px;"
                      size="small"
                      @change="onCpAgingChange(ele, $event)"
                    >
                      <a-select-option
                        :value="aging"
                        v-for="aging of ele.agingList"
                        :key="aging"
                      >{{aging}}</a-select-option>
                    </a-select>
                    <a-icon
                      @click="debouncedCpAdjustAging(ele, -1)"
                      class="pointer mr-10"
                      type="left"
                    />
                    <a-icon @click="debouncedCpAdjustAging(ele, 1)" class="pointer" type="right"/>
                  </template>
                </div>
              </div>
              <!-- </transition> -->
            </div>
          </panel-layout>
        </div>

        <!-- pup拼图 -->
        <!-- <div v-show="currMenuId === 'pup'" key="pup" class="pa-top-left">
        <panel-layout :title="currMenuName">
          <element-btn
            class="two-col-element"
            v-for="ele of pup.pupEleList"
            :checked="ele.checked"
            :key="ele.id"
            @click="select_element(ele);get_latest_element_time(ele)"
          >{{ele.name}}</element-btn>
        </panel-layout>
        </div>-->
        <!-- 自动站 -->
        <div v-show="currMenuId === 'station' && isShowPanel" key="station" class="pa-top-left">
          <panel-layout :title="currMenuName" @close="isShowPanel = false">
            <div class="hour-list">
              <hour-btn
                class="hour-btn"
                v-for="hour of station.hourList"
                :checked="station.currHour === hour"
                :key="hour"
                @click="onStUpdateHour(hour)"
              >{{hour}}h</hour-btn>
            </div>
            <div class="mt-10">
              <element-btn
                class="two-col-element mb-0"
                v-for="ele of station.hourEleList"
                :checked="ele.checked"
                :key="ele.id"
                @click="select_element(ele);get_latest_element_time(ele)"
              >{{ele.name}}</element-btn>
            </div>
            <div class="line"></div>
            <div>
              <element-btn
                class="two-col-element"
                v-for="ele of station.otherEleList"
                :checked="ele.checked"
                :key="ele.id"
                @click="select_element(ele);get_latest_element_time(ele)"
              >{{ele.name}}</element-btn>
            </div>
            <small-title class="mb-10">当前小时内自动站报警</small-title>
            <div class="one-col-element-box" v-for="ele of station.warnEleList" :key="ele.id">
              <element-btn
                class="one-element"
                :checked="ele.checked"
                @click="select_element(ele);get_latest_element_time(ele)"
              >{{ele.name}}</element-btn>
              <template v-if="ele.currThreshold">
                <a-select
                  :value="ele.currThreshold"
                  style="width: 60px;margin-right:10px;"
                  size="small"
                  @change="onStThresholdChange(ele, $event)"
                >
                  <a-select-option
                    :value="threshold"
                    v-for="threshold of ele.thresholdList"
                    :key="threshold"
                  >{{threshold}}</a-select-option>
                </a-select>
                <a-icon
                  @click="debouncedStAdjustThreshold(ele, -1)"
                  class="pointer mr-10"
                  type="left"
                />
                <a-icon @click="debouncedStAdjustThreshold(ele, 1)" class="pointer" type="right"/>
              </template>
            </div>
          </panel-layout>
        </div>

        <!-- 雷达拼图 -->
        <div v-show="currMenuId === 'swan' && isShowPanel" key="swan" class="pa-top-left">
          <panel-layout :title="currMenuName" @close="isShowPanel = false">
            <small-title class="mb-10">pup拼图</small-title>
            <element-btn
              class="two-col-element"
              v-for="ele of pup.pupEleList"
              :checked="ele.checked"
              :key="ele.id"
              @click="select_element(ele);get_latest_element_time(ele)"
            >{{ele.name}}</element-btn>

            <small-title class="mb-10">雷达特征量</small-title>
            <div class="mb-10">
              <icon-element-btn
                v-for="item of radarFeature"
                :icon="item.icon"
                :checked="item.checked"
                :key="item.id"
                @click="select_element(item);get_latest_element_time(item)"
              >{{item.name}}</icon-element-btn>
            </div>

            <small-title class="mb-10">SWAN拼图</small-title>
            <div>
              <element-btn
                class="two-col-element"
                v-for="ele of swan.eleList.filter(el => el.groupName === 'two_col')"
                :checked="ele.checked"
                :key="ele.id"
                @click="select_element(ele);get_latest_element_time(ele)"
              >{{ele.name}}</element-btn>
            </div>
            <div
              class="one-col-element-box"
              v-for="ele of swan.eleList.filter(el => el.groupName === 'level')"
              :key="ele.id"
            >
              <element-btn
                class="one-element"
                :checked="ele.checked"
                @click="select_element(ele);get_latest_element_time(ele)"
              >{{ele.name}}</element-btn>
              <template v-if="ele.currLevel">
                <span class="tj_name">层次</span>
                <a-select
                  :value="ele.currLevel"
                  style="width: 70px;margin-right:10px;"
                  size="small"
                  @change="onSnLevelChange(ele, $event)"
                >
                  <a-select-option
                    :value="level.value"
                    v-for="level of ele.levelList"
                    :key="level.value"
                  >{{level.name}}</a-select-option>
                </a-select>
                <a-icon @click="debouncedSnAdjustLvel(ele, -1)" class="pointer mr-10" type="left"/>
                <a-icon @click="debouncedSnAdjustLvel(ele, 1)" class="pointer" type="right"/>
              </template>
            </div>
            <div
              class="one-col-element-box"
              v-for="ele of swan.eleList.filter(el => el.groupName === 'aging')"
              :key="ele.id"
            >
              <element-btn
                class="one-element"
                :checked="ele.checked"
                @click="select_element(ele);get_latest_element_time(ele)"
              >{{ele.name}}</element-btn>
              <template v-if="ele.currAging">
                <span class="tj_name">时效</span>
                <a-select
                  :value="ele.currAging"
                  style="width: 70px;margin-right:10px;"
                  size="small"
                  @change="onSnAgingChange(ele, $event)"
                >
                  <a-select-option
                    :value="aging.value"
                    v-for="aging of ele.agingList"
                    :key="aging.value"
                  >{{aging.name}}</a-select-option>
                </a-select>
                <a-icon @click="debouncedSnAdjustAging(ele, -1)" class="pointer mr-10" type="left"/>
                <a-icon @click="debouncedSnAdjustAging(ele, 1)" class="pointer" type="right"/>
              </template>
            </div>
          </panel-layout>
        </div>

        <!-- 单站pup -->
        <div v-show="currMenuId === 'statonPup' && isShowPanel" key="statonPup" class="pa-top-left">
          <panel-layout :title="currMenuName" @close="isShowPanel = false">
            <div>
              <element-btn
                class="two-col-element"
                v-for="ele of stationPup.eleList"
                :checked="ele.checked"
                :key="ele.id"
                @click="!ele.checked && (stp_radio_element(ele.id),get_station_pup_latest_element_time())"
              >{{ele.name}}</element-btn>
            </div>
            <map-nav
              v-if="currMenuId === 'statonPup' && isShowPanel"
              ref="mapNav"
              style="height:270px;"
              v-model="stationPupStationId"
              :isSync="true"
              :list="stationPupMapData"
            ></map-nav>
          </panel-layout>
        </div>
      </transition-group>
    </div>
  </section>
</template>

<script src="./MenuPanel.js"></script>
<style src="./MenuPanel.scss" lang="scss" scoped></style>

