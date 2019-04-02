<template>
  <div class="near">
    <classify-title>NMC</classify-title>
    <time-minute-select
      :date.sync="date"
      :hour.sync="hour"
      :minute.sync="minute"
      :hourList="hourList"
      :minuteList="minuteList"
      @change="onChange"
    ></time-minute-select>

    <ul class="element-list" style="margin-top:5px;">
      <li v-for="element of elements" :key="element.name">
        <a-radio name="element" value="element.name" :checked="element.name === currActiveElementName" @click="onClickElement(element.name)">
          <span class="name">{{element.name}}</span>
        </a-radio>
      </li>
    </ul>
  </div>
</template>

<style src="./Near.scss" lang="scss" scoped></style>
<script src="./Near.js"></script>

