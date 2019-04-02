<template>
  <section class="layer-manage" :class="{fold: !isSpread}">
    <header class="header">
      <ul class="tabs">
        <li
          @click="currTabId = tab.id"
          :class="{active: currTabId === tab.id}"
          v-for="tab of tabs"
          :key="tab.id"
        >{{tab.name}}</li>
      </ul>
      <div class="clear-btn" @click="debouncedDeleteAllLayer"></div>
      <div class="fold-btn" @click="isSpread = false"></div>
    </header>
    <main class="content">
      <div
        v-if="currTabId === 'product' && currProductLayerList.length === 0"
        class="null-layer"
      >暂无图层</div>
      <div
        v-if="currTabId === 'warning' && currWarnLayerList.length === 0"
        class="null-layer"
      >暂无图层</div>
      <ul v-if="currTabId === 'product'">
        <li class="item" v-for="item of currProductLayerList" :key="item.id">
          <div class="info">
            <div class="control">
              <div class="title">
                <span :class="{hide: showHideLayerHash[item.id]}" @click="onHideShowLayer(item)"></span>
                {{item.name}}
              </div>
              <div class="time">{{item.showTime}}</div>
              <div class="btns">
                <span class="left-btn" @click="onTuningTime(1, item)"></span>
                <span class="right-btn" @click="onTuningTime(-1, item)"></span>
              </div>
            </div>
            <div class="legend-img" v-if="isHasLegend(item.id)">
              <img :src="require('../../../assets/images/legend/' + item.id + '.png')" alt>
            </div>
            <!-- <ul class="legend">
              <li v-for="n of 10" :key="n">{{n}}</li>
            </ul>-->
          </div>
          <div class="close" @click="onClickDeleteElement(item)"></div>
        </li>
      </ul>
      <ul v-else-if="currTabId === 'warning'">
        <li class="item" v-for="item of currWarnLayerList" :key="item.id">
          <div class="info">
            <div class="control">
              <div class="title">
                <span :class="{hide: showHideLayerHash[item.id]}" @click="onHideShowLayer(item)"></span>
                {{item.name}}
              </div>
              <div class="time">{{item.showTime}}</div>
              <div class="btns">
                <span class="left-btn" @click="onTuningTime(1, item)"></span>
                <span class="right-btn" @click="onTuningTime(-1, item)"></span>
              </div>
            </div>
            <div class="legend-img" v-if="isHasLegend(item.id)">
              <img :src="require('../../../assets/images/legend/' + item.id + '.png')" alt>
            </div>
            <!-- <ul class="legend">
              <li v-for="n of 10" :key="n">{{n}}</li>
            </ul>-->
          </div>
          <div class="close" @click="onClickDeleteElement(item)"></div>
        </li>
      </ul>
    </main>
    <transition name="fade">
      <div @click="isSpread = true" v-if="!isSpread" class="spread-btn"></div>
    </transition>
  </section>
</template>

<script src="./LayerManage.js"></script>
<style src="./LayerManage.scss" lang="scss" scoped></style>
