<template>
  <button
    @click="$emit('click', $event)"
    class="tool-btn"
    :disabled="disabled"
    :class="[{'not-allowed': disabled}, type]"
  >
    <img :src="require('../../assets/images/toolBtn/'+ iconName +'.png')">
  </button>
</template>

<script>
export default {
  name: "tool-btn",
  props: {
    icon: {
      type: String,
      default: "reset"
    },
    type: {
      type: String,
      default: "blue"
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    iconName() {
      return this.type === 'blue' ? (this.disabled ? this.icon + '_disabled' : this.icon) : this.icon;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.tool-btn {
  width: 20px;
  height: 20px;
  border: 1px solid rgb(48, 133, 220);
  border-radius: 2px;
  outline: none;
  margin: 0;
  padding: 0;
  background-image: linear-gradient(
    0deg,
    rgb(56, 143, 230) 0%,
    rgb(114, 183, 254) 79%
  );
  overflow: hidden;
  cursor: pointer;
  transition: all 0.5s;
  > img {
    width: 16px;
    height: 16px;
    display: block;
    // margin-top: 1px;
    margin-left: 1px;
  }
  &:hover {
    border-color: #5fabf2;
    background-image: linear-gradient(
      0deg,
      rgb(91, 174, 255) 0%,
      rgb(162, 210, 255) 100%
    );
  }
}

.tool-btn.time {
  border-color: #9ac6ed;
  background-image:linear-gradient( 0deg, #bae0ff   0%, #e3f0f9 100%);
  &:hover {
    border-color: #a2d3ff;
    background-image: linear-gradient( 0deg, #d4eafd  0%, #ecf7ff  100%);
  }
}



.not-allowed,
.not-allowed:hover {
  cursor: not-allowed;
  background-image: none;
  border-color: #d7d7d7;
  background-color: #d7d7d7;
}
</style>

