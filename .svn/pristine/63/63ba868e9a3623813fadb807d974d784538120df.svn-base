<template>
  <section class="time-select">
    <a-date-picker style="width:110px;" @change="onChange" size="small" :allowClear="false"/>
    <span class="split-line"></span>
    <a-select defaultValue="08" style="width: 54px" @change="onChange" size="small">
      <a-select-option value="08">08</a-select-option>
      <a-select-option value="20">20</a-select-option>
    </a-select>
    <span class="hint">时</span>
    <span class="split-line"></span>
    <a-select defaultValue="00" style="width: 54px" @change="onChange" size="small">
      <a-select-option value="00">00</a-select-option>
      <a-select-option value="10">10</a-select-option>
      <a-select-option value="20">20</a-select-option>
      <a-select-option value="30">30</a-select-option>
      <a-select-option value="40">40</a-select-option>
      <a-select-option value="50">50</a-select-option>
    </a-select>
    <span class="hint">分</span>
  </section>
</template>
<style lang="scss" scoped>
    .time-select {
        display: flex;
        align-items: center;
    }
    .split-line {
        display: inline-block;
        height: 20px;
        border-left: 1px dashed #ccc;
        margin: 0 7px;
    }
    .hint {
        display: inline-block;
        padding-left: 5px;
    }
</style>
<script>
export default {
  name: "time-select",

  methods: {
    onChange() {}
  }
};
</script>
