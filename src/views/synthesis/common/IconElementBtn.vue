<template>
  <div class="icon-element-btn" :class="{checked: checked}" @click="$emit('click', $event)">
    <img v-if="icon" :src="require('../../../assets/images/synthesis/el-'+ icon +'.png')" alt>
    <span>
      <slot></slot>
    </span>
  </div>
</template>
<style lang="scss" scoped>
.icon-element-btn {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  height: 24px;
  border: 1px solid #5fa0ec;
  background-color: #65a3ec;
  border-radius: 12px;
  color: #fff;
  font-size: 12px;
  padding: 0 12px;
  margin-right: 5px;
  transition: all 0.3s;
  cursor: pointer;
  > img {
    margin-right: 3px;
  }
  &:hover {
    background-color: #72b3ff;
    border-color: #6fb1fe;
  }
  &.checked {
    border-color: #e9474d;
    text-shadow: 0 0 2px rgb(113, 0, 10);
    background-image: linear-gradient(
      0deg,
      rgb(236, 35, 51) 0%,
      rgb(214, 4, 23) 26%,
      rgb(217, 18, 33) 51%,
      rgb(231, 53, 64) 75%,
      rgb(250, 163, 165) 100%
    );
  }
}
</style>
<script>
export default {
  name: "icon-element-btn",
  props: {
    checked: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: ""
    }
  }
};
</script>
