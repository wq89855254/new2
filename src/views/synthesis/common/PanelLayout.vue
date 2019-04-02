<template>
  <section class="panel-layout">
    <div class="header-bg"></div>
    <header>{{title}}</header>
    <div class="close-btn" @click="$emit('close')"></div>
    <div class="content">
      <slot></slot>
    </div>
  </section>
</template>
<style lang="scss" scoped>
.panel-layout {
  position: relative;
  display: block;
  width: 400px;
  border-radius: 2px;
  border: 1px solid rgb(198, 207, 221);
  box-shadow: 0 0 6px rgb(171, 176, 191);
  padding-top: 25px;
  background-color: #fff;
  .header-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 25px;
    background: url(../../../assets/images/synthesis/panel-header-bg-2.jpg)
      repeat-x;
  }
  > header {
    position: absolute;
    top: 0;
    left: 0;
    width: 118px;
    height: 25px;
    line-height: 25px;
    padding-right: 36px;
    text-align: center;
    background: url(../../../assets/images/synthesis/panel-header-bg-1.jpg)
      no-repeat;
    color: #fff;
  }
  .close-btn {
    width: 20px;
    height: 20px;
    position: absolute;
    top: 2px;
    right: 5px;
    background: url(../../../assets/images/synthesis/panel-close.png) no-repeat;
    // transition: all 0.3s;
    cursor: pointer;
    &:hover {
      background-position-x: -20px;
    }
  }
  .content {
    height: 465px;
    padding: 20px;
    background: url(../../../assets/images/synthesis/panel-bottom-bg.png)
      no-repeat left bottom;
    background-size: 100%;
    overflow-x: hidden;
    overflow-y: auto;
  }
}
</style>
<script>
export default {
  name: "panel-layout",
  props: {
    title: {
      type: String,
      required: true
    }
  },
  data() {
    return {};
  }
};
</script>
