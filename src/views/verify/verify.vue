<template>
  <!-- <div style="height: 100%;">
    <img src="../../assets/images/module404.png" style="width: 100%; height: 100%;"/>
  </div>-->
  <div class="content">
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
          <input type="text" name id placeholder="请输入用户名" v-model="user">
        </div>
        <div class="passWord">
          <i></i>
          <input type="password" name id placeholder="请输入密码" v-model="pass">
        </div>
        <div class="btn">
          <button @click="loginF(1)">登录</button>
          <button @click="loginF(0)">取消</button>
        </div>
      </div>
    </div>
     <div
    ref="box"
    v-if="options.length"
    class="diagnosis"
    tabindex="0"
    v-focus
    @keyup.up.down.left.right="onKeyup"
  >
  <!-- <div class="zoomImg" :class="zoomSw?'zoomImg_active':''" @click="zoomSw=false"></div> -->
      <div class="left-content parent-deep">
          <div class="fcst" v-if="options[0].id === 'verify'">
            <template v-for="content of options[0].contents">
              <time-select
                v-if="content.typeName === options[0].activeTypeName"
                :key="content.id"
                :date.sync="content.date"
                :hour.sync="content.hour"
                :hourList="content.hourList"
                @change="onConditionChange"
              ></time-select>
            </template>
            <div class="dateSelect dateSelect1">
              <span>时间间隔</span>
              <a-radio-group @change="onConditionChange" v-model="options[0].date">
                <a-radio
                  :value="comment"
                  v-for="comment of options[0].dateList"
                  :key="comment"
                >{{comment}}</a-radio>
              </a-radio-group>
            </div>
            <div style="height: calc(100vh - 138px); overflow: auto; margin-top:10px;">
              <div
                v-for="section of options[0].contents[0].sections"
                :key="section.title"
              >
                <div class="list-section-title">{{ section.title }}</div>
                <ul class="element-list">
                  <li v-for="item in section.items" :key="item.name">
                    <a-radio
                      :name="options[0].contents.find(el => el.typeName === options[0].activeTypeName).typeName"
                      :value="item.name"
                      :checked="options[0].contents.find(el => el.typeName === options[0].activeTypeName).activeElementId === item.id"
                      @click="onClickElement(options[0].contents.find(el => el.typeName === options[0].activeTypeName), item.id)"
                    >
                      <span class="name">{{ item.name }}</span>
                    </a-radio>
                  </li>
                </ul>
              </div>
            </div>

          </div>
    </div>
  <div class="right-content">
    <div class="select">

        <!-- <div class="select_list">
          <p>等压面</p>
          <a-radio-group name="radioGroup" v-model="options[1].contents[0].slevel">
            <a-radio
              v-for="item in options[1].contents[0].slevelList"
              :key="item"
              :value="item"
            >{{item}}</a-radio>
          </a-radio-group>
        </div> -->
      </div>
      <div class="imgDie" :class="dieSwitch?'die_active':''">
        <!-- <img :src="dieImgSrc" alt=""> -->
      </div>
      <div class="img-content" :class="img_active?'img_active':''"  @click="show_zoom">
        <img-show
          v-if="currFcstOption"
          :srcs="imgPaths"
          :aging="currFcstOption.aging"
          :agingList="currFcstOption.agingList"
          :level="currEleOption.activeLevel"
          :levelList="currEleOption.levels"
          :control="false"
          @zoom='zoom'
          @switch="onSwitchImg"
        ></img-show>
      </div>
  </div>
  
  
  </div>
  </div>
</template>

<script src="./verify.js"></script>
<style src="./verify.scss" lang="scss" scoped></style>

