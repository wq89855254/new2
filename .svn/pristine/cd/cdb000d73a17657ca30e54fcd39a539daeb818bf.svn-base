<template>
  <div>
    <time-select
      dateTitle="时间"
      hourTitle
      :date.sync="date"
      :hour.sync="hour"
      :hourList="hourList"
      @change="onChange"
    ></time-select>
    <div v-for="fcst of fcsts" :key="fcst.id">
      <section-title>{{fcst.name}}</section-title>
      <ul class="element-list">
        <li v-for="element of fcst.elements" :key="element.name">
          <a-radio name="element" value="element.name" :checked="element.id === currElementId" @click="onClickElement(element.id)">
            <span class="name">{{element.name}}</span>
          </a-radio>
        </li>
      </ul>
    </div>
  </div>
</template>

<style src="./Fcst.scss" lang="scss" scoped></style>
<script src="./Fcst.js"></script>

