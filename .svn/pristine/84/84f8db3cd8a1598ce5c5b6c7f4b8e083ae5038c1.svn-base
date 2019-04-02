<template>
  <section class="maps">
    <ul class="btn-group">
      <li
        @click="isVoice = !isVoice"
        :class="{'no-voice':!isVoice}"
        :title="isVoice ? '关闭' : '打开'"
      ></li>
      <li class="split-line"></li>
      <li @click="splitScreenNumber = 1" :class="{active: splitScreenNumber === 1}" title="一分屏"></li>
      <li @click="splitScreenNumber = 2" :class="{active: splitScreenNumber === 2}" title="二分屏"></li>
      <li @click="splitScreenNumber = 4" :class="{active: splitScreenNumber === 4}" title="四分屏"></li>
      <li @click="isSync = !isSync" :class="{async: !isSync}" :title="isSync ? '分屏同步' : '分屏异步'"></li>
      <li class="split-line"></li>
      <li @click="isFullScreenshot = !isFullScreenshot" title="全屏截屏"></li>
      <li @click="isAreaScreenshot = !isAreaScreenshot" title="区域截屏"></li>
    </ul>
    <div class="base-layer">
      <div
        class="icon active"
        :style="{'background-image': 'url('+ require('../../../assets/images/synthesis/icon-'+ currSplitScreen.currBaseLayerId +'.png') +')'}"
        @click="isShowBaseLayerPanel = !isShowBaseLayerPanel"
      ></div>
      <transition name="fade1">
        <div class="bl-panel" v-show="isShowBaseLayerPanel">
          <ul class="bl-list">
            <li
              @click="currSplitScreen.currBaseLayerId !== item.id && select_base_layer(item.id)"
              class="icon"
              :class="{active: currSplitScreen.currBaseLayerId === item.id}"
              v-for="item of currSplitScreen.baseLayerList"
              :key="item.id"
              :style="{'background-image': 'url('+ require('../../../assets/images/synthesis/icon-'+ item.id +'.png') +')'}"
            ></li>
          </ul>
          <ul class="bl-ele-list">
            <li @click="onClickSelectLayerElement(item)" v-for="item of currSplitScreen.layerElementList" :key="item.id">
              <a-switch size="small" :checked="item.checked"/>
              <span>{{item.name}}</span>
            </li>
          </ul>
          <div class="border-right-empty">
            <span></span>
          </div>
        </div>
      </transition>
    </div>
    <div
      :class="['map-group', {'split-screen-2': splitScreenNumber === 2, 'split-screen-4': splitScreenNumber === 4}]"
    >
      <div
        v-for="(mapId, i) of mapIds"
        :id="'parent_' + mapId"
        :key="mapId"
        :class="{active: currMapId === mapId, 'my-first-control': splitScreenNumber === 1}"
        @click="onClickSwitchSplitScreen(i + 1)"
        @transitionend="onSplitScreenEnd"
      >
        <div class="map" :id="mapId"></div>
      </div>
    </div>
  </section>
</template>

<script src="./Maps.js"></script>
<style src="./Maps.scss" lang="scss" scoped></style>
