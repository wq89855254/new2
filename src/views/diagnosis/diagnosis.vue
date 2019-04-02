<template>
  <div
    ref="box"
    v-if="options.length"
    class="diagnosis"
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
    <div class="login" v-if="login_switch">
      <div class="login_box">
        <div class="title">
          请先登录
        </div>
            <div class="userName">
                <i></i>
                <input type="text" name="" id="" placeholder="请输入用户名" v-model="user">
            </div>
            <div class="passWord">                <i></i>
                <input type="password" name="" id="" placeholder="请输入密码" v-model="pass"></div>
            <div class="btn">
                <button @click="loginF(1)">登录</button><button @click="loginF(0)">取消</button>
            </div>
        </div>
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
          <!-- 多模式预报 -->
          <!-- 
            fcst.contents.find(el => el.typeName === fcst.activeTypeName)的对象路径： options[index].contents[index]
          -->
          <div class="fcst" v-if="fcst.id === 'FenXiDiMian'">
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

            <!-- <a-tabs class="class-tabs">
              <a-tab-pane
                v-for="content of fcst.contents.find(el => el.typeName === fcst.activeTypeName).contents"
                :tab="content.tabName"
                :key="content.tabName"
            >-->
            <div style="height: calc(100vh - 174px); overflow: auto; margin-top:10px;">
              <div
                v-for="section of fcst.contents.find(el => el.typeName === fcst.activeTypeName).contents[0].sections"
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
            <!-- </a-tab-pane>
            </a-tabs>-->
          </div>

          <!-- 集合预报 -->
          <div class="fcst" v-else-if="fcst.id === 'FenXiGaokong'">
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
            <!-- <div class="levelSelsct">
              <div>
                <span style="color:#40598b;padding-right:5px;">等高面</span>
                <a-select
                  :defaultValue="fcst.contents[0].glevel"
                  v-model="fcst.contents[0].glevel"
                  style="width: 90px"
                  size="small"
                  @change="onConditionChange"
                  :disabled="fcst.contents[0].gSwitch"
                >
                  <a-select-option
                    :value="content"
                    v-for="content of fcst.contents[0].glevelList"
                    :key="content"
                  >{{content}}</a-select-option>
                </a-select>
              </div>
              <div>
                <span style="color:#40598b;padding-right:5px;">等熵面</span>
                <a-select
                  :defaultValue="fcst.contents[0].slevel"
                  v-model="fcst.contents[0].slevel"
                  style="width: 90px"
                  size="small"
                  @change="onConditionChange"
                  :disabled="fcst.contents[0].sSwitch"
                >
                  <a-select-option
                    :value="content"
                    v-for="content of fcst.contents[0].slevelList"
                    :key="content"
                  >{{content}}</a-select-option>
                </a-select>
              </div>
            </div>-->
            <div style="height: calc(100vh - 164px); overflow: auto;">
              <div
                v-for="section of fcst.contents.find(el => el.typeName === fcst.activeTypeName).contents[0].sections"
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

          <!-- 概率预报 -->
          <div class="fcst" v-if="fcst.id === 'FenXiZiDongZhan'">
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

            <!-- <a-tabs class="class-tabs">
              <a-tab-pane
                v-for="content of fcst.contents.find(el => el.typeName === fcst.activeTypeName).contents"
                :tab="content.tabName"
                :key="content.tabName"
            >-->
            <div style="height: calc(100vh - 164px); overflow: auto; margin-top:10px;">
              <div
                v-for="section of fcst.contents.find(el => el.typeName === fcst.activeTypeName).contents[0].sections"
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
            <!-- </a-tab-pane>
            </a-tabs>-->
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
        <tool-btn icon="timeLeft" type="time" style="margin-left: 5px;" @click='changDate(-1)'  v-if="activeIndex==1"></tool-btn>
        <a-select style="width:60px" size="small" v-model="currHour" @change="changeHour">
          <a-select-option :value="item" v-for="item in hourList" :key="item" >{{item}}</a-select-option>
        </a-select>
        <tool-btn icon="timeRight" type="time"  @click='changDate(1)' v-if="activeIndex==1"></tool-btn>
      </div>
      <div class="bottom" v-if="loginzt">
        <span>累计时间</span>
        <a-radio-group v-model="interval" @change="changeHour">
          <a-radio value='3h'>3h</a-radio>
          <a-radio value='6h'>6h</a-radio>
          <a-radio value='12h'>12h</a-radio>
          <a-radio value='21h'>21h</a-radio>
          <a-radio value='24h'>24h</a-radio>
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



      <div class="select">
        <div class="select_list" v-if="img_active">
          <p>等高面</p>
          <ul v-if="options[1].contents[0].activeElementId.substr(4)>6">{{options[1].contents[0].activeElementId.substr(4)}}
            <li v-for="item in options[1].contents[0].glevelList"  :class="options[1].contents[0].glevel==item?'active':''" @click="highChange(item)" :key="item">{{item}}</li>
          </ul>
        </div>
        <div class="select_list" v-if="img_active">
          <p>等压面</p>
          <ul>
            <li v-for="item in options[1].contents[0].slevelList" :key="item"  :class="options[1].contents[0].slevel==item?'active':''" @click="preChange(item)">{{item}}</li>
          </ul>
          <!-- <a-radio-group name="radioGroup" v-model="options[1].contents[0].slevel">
            <a-radio
              v-for="item in options[1].contents[0].slevelList"
              :key="item"
              :value="item"
            >{{item}}</a-radio>
          </a-radio-group> -->
        </div>
      </div>
      <!-- <div class="top-control"> -->
      <!-- <template v-for="fcst of options">
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
      </template>-->
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
      <!-- </div> -->

      <div class="img-content"  @click="show_zoom">
        <img-show
          v-if="currFcstOption"
          :srcs="imgPaths"
          :coverSrcs="coverPaths"
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
.diagnosis .ant-tabs-tab {
  padding: 0 38px !important;
}
</style>

<script src="./diagnosis.js"></script>
<style src="./diagnosis.scss" lang="scss" scoped></style>

