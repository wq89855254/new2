<template>
  <span class="element-btn" :class="{checked: checked}" @click="$emit('click', $event)">
    <slot></slot>
  </span>
</template>
<style lang="scss" scoped>
.element-btn {
  position: relative;
  display: inline-block;
  height: 25px;
  line-height: 23px;
  border-radius: 4px;
  border: 1px solid #d3e3f5;
  font-size: 12px;
  color: #696969;
  padding: 0 7px 0 19px;
  transition: all 0.1s;
  background-image: linear-gradient(
    0deg,
    rgb(225, 236, 250) 1%,
    rgb(222, 232, 244) 47%,
    rgb(235, 244, 255) 81%,
    rgb(242, 247, 253) 100%
  );
  margin-right: 5px;
  cursor: pointer;
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 7px;
    width: 7px;
    height: 100%;
    background: url(../../../assets/images/synthesis/btn-jt.png) no-repeat left
      center;
  }

  &:hover {
    background-image: linear-gradient(
      0deg,
      #e5f2ff 1%,
      rgb(223, 233, 245) 47%,
      rgb(240, 247, 256) 81%,
      rgb(242, 247, 253) 100%
    );
    border-color: #d2e4fb;
  }
  &.checked {
    color: #fff;
    text-shadow: 0 0 2px rgb(113, 0, 10);
    background-image: linear-gradient(
      0deg,
      #207cea 0%,
      #0569d6 26%,
      #0f55d8 51%,
      #3a90e8 75%,
      #9acaf9 100%
    );
    border-color: #0343ab;
  }
}
</style>
<script>
export default {
  name: "element-btn",
  props: {
    checked: {
      type: Boolean,
      default: false
    }
  }
};
</script>
