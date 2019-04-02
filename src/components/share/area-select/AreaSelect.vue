<template>
  <condition-layout title="区域">
    <div class="box">
      <a-select
        v-model="currArea"
        size="small"
        style="width: 80px;"
        :disabled="false"
        @change="onAreaChange()"
      >
        <a-select-option
          v-for="item of areaList"
          :value="item.value"
          :key="item.value"
        >{{item.label}}</a-select-option>
      </a-select>
    </div>
  </condition-layout>
</template>
<script src="./AreaSelect.js"></script>
<style src="./AreaSelect.scss" lang="scss" scoped></style>