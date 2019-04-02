<template>
  <condition-layout title="层次">
    <div class="box">
      <div>
        <a-select
          v-model="currLevel"
          size="small"
          style="width: 80px;"
          :disabled="!currLevel"
          @change="onLevelChange()"
        >
          <a-select-option v-for="val of levelList" :value="val" :key="val">{{val}}</a-select-option>
        </a-select>
      </div>
      <div>
        <tool-btn icon="top" :disabled="!currLevel" @click="onTuningLevel(-1)" style="margin-right: 5px;"></tool-btn>
        <tool-btn icon="bottom" :disabled="!currLevel" @click="onTuningLevel(1)"></tool-btn>
      </div>
    </div>
  </condition-layout>
</template>
<script src="./LevelSelect.js"></script>
<style src="./LevelSelect.scss" lang="scss" scoped></style>