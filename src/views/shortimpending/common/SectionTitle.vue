<template>
  <div class="section-title">
    <slot></slot>
  </div>
</template>
<style lang="scss" scoped>
.section-title {
  color: #fff;
  text-shadow: 0.5px 0.866px 5px rgba(3, 34, 128, 0.7);
  background: url(../../../assets/images/section-title.jpg) no-repeat;
  padding-left: 18px;
  margin-top: 5px;
}
</style>
<script>
export default {
  name: "section-title"
};
</script>
