<template>
  <div>
    <classify-title>预报服务</classify-title>
    <ul class="fcst-serve">
      <li v-for="serve of fcstServes" :key="serve.id">
        <a-checkbox
          @click="onClickActiveServe(serve)"
          :checked="serve.active"
          @change="onServeChange"
          style="width:100px;"
        >{{serve.name}}</a-checkbox>
        <a-select
          v-model="serve.currDate"
          style="width: 120px"
          @change="onServeChange"
          size="small"
        >
          <a-select-option v-for="date of serve.startDates" :value="date" :key="date">{{date}}</a-select-option>
        </a-select>

        <a-select
          v-if="serve.id === 'latent'"
          v-model="serve.currHour"
          style="width: 60px; margin-left:5px;"
          @change="onServeChange"
          size="small"
        >
          <a-select-option v-for="hour of serve.startHours" :value="hour" :key="hour">{{hour}}</a-select-option>
        </a-select>

        <a-select
          v-if="serve.id === 'short'"
          v-model="serve.currElement"
          style="width: 80px; margin-left:5px;"
          @change="onServeChange"
          size="small"
        >
          <a-select-option
            v-for="element of serve.elements"
            :value="element.id"
            :key="element.name"
          >{{element.name}}</a-select-option>
        </a-select>
      </li>
    </ul>

    <classify-title>客观产品</classify-title>
    <!-- <div class="time-box">
      <a-checkbox @click="isConcat = !isConcat" :checked="isConcat" @change="onChange">关联</a-checkbox>
      <div>
        <time-select
          class="ojb-time-top"
          dateTitle="实况"
          hourTitle
          :date.sync="actDate"
          :hour.sync="actHour"
          :hourList="actHourList"
          @change="onChange"
        ></time-select>
        <time-select
          class="ojb-time-bottom"
          dateTitle="模式"
          hourTitle
          :date.sync="fcstDate"
          :hour.sync="fcstHour"
          :hourList="fcstHourList"
          @change="onChange"
        ></time-select>
      </div>
    </div>-->

    <div v-for="product of products" :key="product.id">
      <section-title>{{product.name}}</section-title>
      <div v-if="product.id === 'modeProduct'" class="mode-product-layout">
        <ul class="list">
          <li
            @click="currModeNavValue === item.value || onClickModeNav(item.value)"
            :class="{active: currModeNavValue === item.value}"
            v-for="item of modeNavs"
            :key="item.value"
          >{{item.name}}</li>
        </ul>
        <!-- <div
          @click="currModeNavValue === '多模式' || onClickModeNav('多模式')"
          :class="{active: currModeNavValue === '多模式'}"
          class="center"
        >多模式</div>-->
      </div>
      <ul class="element-list">
        <li v-for="element of product.elements" :key="element.name">
          <a-radio
            :disabled="(element.name === '红外云图' || element.name === '水汽云图') && currModeNavValue !== 'Grapes'"
            name="element"
            :value="element.name"
            :checked="currActiveElement === element.name"
            @click="onClickElement(element, product.id)"
          >
            <span class="name">{{element.name}}</span>
          </a-radio>
        </li>
      </ul>
    </div>

    <classify-title>中分析产品(自动站客观分析)</classify-title>
    <time-select
      class="ojb-time-top"
      dateTitle="实况"
      hourTitle
      isBtnBoth
      isShowMinute
      :date.sync="centerDate"
      :hour.sync="centerHour"
      :minute.sync="centerMinute"
      :hourList="centerHourList"
      :minuteList="centerMinuteList"
      @change="onChange"
    ></time-select>
    <ul class="element-list">
      <li v-for="element of analyzeProducts" :key="element.name">
        <a-radio
          name="element"
          value="element.name"
          :checked="currActiveElement === element.name"
          @click="onClickElement(element)"
        >
          <span class="name">{{element.name}}</span>
        </a-radio>
      </li>
    </ul>
  </div>
</template>

<style src="./ShortTime.scss" lang="scss" scoped></style>
<script src="./ShortTime.js"></script>

