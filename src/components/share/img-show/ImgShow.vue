<template>
  <div class="img-show">
    <div :class="{'img-show-many': isManyPath, 'img-show-only': !isManyPath}">
      <div class="img-box" :style="imgWh" v-for="(src, index) of currSrcs" :key="index" @click="zoom">
        <img @error="onImgError(index)" :src="src">
        <img
          class="cover"
          v-for="(coverSrc, i) of currCoverSrcs"
          :key="i"
          @error="onCoverImgError(index)"
          :src="coverSrc"
        >
      </div>
    </div>
    <div v-if="isHasLevel" @click="onClickSwitch('top')" class="dir-btn top">
      <img src="../../../assets/images/dirBtn/top.png">
    </div>
    <div v-if="isHasLevel" @click="onClickSwitch('bottom')" class="dir-btn bottom">
      <img src="../../../assets/images/dirBtn/bottom.png">
    </div>
    <div @click="onClickSwitch('left')" class="dir-btn left" v-if="control">
      <img src="../../../assets/images/dirBtn/left.png">
    </div>
    <div @click="onClickSwitch('right')" class="dir-btn right" v-if="control">
      <img src="../../../assets/images/dirBtn/right.png">
    </div>
  </div>
</template>
<style src="./ImgShow.scss" lang="scss" scoped></style>
<script src="./ImgShow.js"></script>