<template>
  <div class="condition-layout">
    <div class="title">{{title}}</div>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.condition-layout {
  position: relative;
  margin-bottom: 5px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 1px 4px rgba(135, 151, 169, 0.4);;
  .title {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 20px;
    display: flex;
    align-items: center;
    font-size: 13px;
    color: white;
    background-color: #a2c6f6;
    background-image: -webkit-gradient(
      linear,
      left top,
      left bottom,
      color-stop(0%, #99cbff),
      to(#3080d4)
    );
    border-radius: 4px 0 0 4px;
    line-height: 18px;
    text-align: center;
    text-shadow: 0.5px 0.866px 5px rgba(3, 34, 128, 0.7);
  }
  .content {
    flex: 1;
    min-height: 36px;
    padding-left: 20px;
  }
}
</style>
<script>
export default {
  name: "condition-layout",
  props: {
    title: {
      type: String,
      required: true
    }
  }
};
</script>

