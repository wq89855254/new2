<template>
  <span class="hour-btn" :class="{checked: checked}" @click="$emit('click', $event)">
    <slot></slot>
  </span>
</template>
<style lang="scss" scoped>
.hour-btn {
  display: inline-block;
  height: 20px;
  line-height: 20px;
  text-align: center;
  padding: 0 8px;
  margin-right: 5px;
  font-size: 13px;
  font-family: Arial;
  border-radius: 2px;
  background-color: #e1ecfa;
  transition: all 0.3s;
  cursor: pointer;
  &:hover {
    background-color: #e9f3ff;
  }
  &.checked {
      color: #fff;
      text-shadow: 0 0 2px rgb(113, 0, 10);
      background-image: linear-gradient( 0deg, rgb(236,35,51) 0%, rgb(214,4,23) 26%, rgb(217,18,33) 51%, rgb(231,53,64) 75%, rgb(250,163,165) 100%);
  }
}
</style>
<script>
export default {
  name: "hour-btn",
  props: {
    checked: {
      type: Boolean,
      default: false
    }
  }
};
</script>
