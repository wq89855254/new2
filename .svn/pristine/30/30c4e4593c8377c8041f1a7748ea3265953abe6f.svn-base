<template>
  <router-view/>
</template>

<style lang="scss">
body {
  font-family: "Microsoft YaHei", "Chinese Quote", -apple-system,
    BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB",
    "Helvetica Neue", Helvetica, Arial, sans-serif, "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol" !important;
}
ol,
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

::-webkit-scrollbar {
  width: 5px;
}
::-webkit-scrollbar-track {
  background: #fff;
  // background: #efefef;
}
::-webkit-scrollbar-thumb {
  background: #b3d0ee;
}

// 强天气 tabs
.parent-deep /deep/ .qtq-tabs.ant-tabs {
  &
    > .ant-tabs-bar
    > .ant-tabs-nav-container
    > .ant-tabs-nav-wrap
    > .ant-tabs-nav-scroll {
    display: flex;
    justify-content: center;
  }
  &.ant-tabs-card .ant-tabs-card-bar .ant-tabs-nav-container {
    height: 30px;
    margin-bottom: 0;
  }
  &.ant-tabs-card .ant-tabs-card-bar .ant-tabs-tab {
    font-family: "Microsoft YaHei", "Chinese Quote", -apple-system,
      BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB",
      "Helvetica Neue", Helvetica, Arial, sans-serif, "Apple Color Emoji",
      "Segoe UI Emoji", "Segoe UI Symbol";
    color: #4d5054;
    font-size: 13px;
    padding-bottom: 0;
    height: 30px;
    line-height: 30px;
    border: 1px solid #7fafe6;
    border-bottom: 1px solid transparent !important;
    background-color: #accefc;
    background-image: linear-gradient(
      180deg,
      #accefc 52%,
      #99c4ff 53%,
      #b9d5fa 89%
    );
    margin: 0 3px;
    padding: 0 22px;
    &:hover {
      border-color: #5d97d6;
      background-color: #b0d1ff;
      background-image: linear-gradient(
        180deg,
        #b0d1ff 52%,
        #8cbcfd 53%,
        #abc9f3 89%
      );
    }
  }
  &.ant-tabs-card .ant-tabs-card-bar .ant-tabs-tab-active,
  &.ant-tabs-card .ant-tabs-card-bar .ant-tabs-tab-active:hover {
    color: #303030;
    background-color: #fff;
    background-image: none;
    border-color: #437dbb;
  }
  & > .ant-tabs-bar {
    background-color: #a3c9f8;
    background-image: linear-gradient(180deg, #a3c9f8 25%, #5a96d4 100%);
    padding-top: 5px;
    border-bottom: none;
    border-radius: 5px 5px 0 0;
    margin-bottom: 0;
  }
}

// 强天气 a-radio-group
.qtq-a-radio-group {
  border-radius: 4px;
  box-shadow: 0px 1px 4px rgba(135, 151, 169, 0.4);
}
.qtq-a-radio-group /deep/ {
  .ant-radio-button-wrapper {
    height: 30px;
    line-height: 28px;
    font-size: 13px;
    border-color: #ccc;
    color: #797d84;
    font-family: Arial, "Microsoft YaHei", "Chinese Quote", -apple-system,
      BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB",
      "Helvetica Neue", Helvetica, sans-serif, "Apple Color Emoji",
      "Segoe UI Emoji", "Segoe UI Symbol";
  }
  .ant-radio-button-wrapper:first-child {
    border-left: 1px solid #ccc;
  }
  .ant-radio-button-wrapper:not(:first-child)::before {
    background-color: #ccc;
  }
  .ant-radio-button-wrapper-checked {
    border-color: #1174ff;
    color: #003980;
  }
  .ant-radio-button-wrapper-checked:first-child {
    border-color: #1174ff;
  }
}

.map-marker,
.map-checked-marker {
  // color: red;
  width: 8px !important;
  height: 8px !important;
  margin-top: -4px !important;
  margin-left: -4px !important;
  border-radius: 50% !important;
  background-color: #080;
  // box-shadow: 0 0 3px #080;
}
.map-checked-marker {
  background-color: red;
  // box-shadow: 0 0 3px red;
}

.my-first-control {
  .leaflet-right {
    right: -5px;
  }
  .leaflet-top {
    top: 40px;
  }
}

// marker集群样式
.my-marker-cluster-marker {
  font-size: 16px;
  font-weight: 600;
}
.my-marker-cluster {
  border-radius: 50%;
  background-color: #41ea41;
  > div {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    font-weight: 600;
  }
}

.my-marker-cluster-yellow {
  border-radius: 50%;
  background-color: yellow;
  background-repeat: no-repeat;
  background-position: center;
}
.my-marker-yellow {
  position: relative;
  border-radius: 50%;
  background-repeat: no-repeat;
  background-position: center;
  > div {
    position: absolute;
    top: 40px;
    left: 0px;
    line-height: 20px;
    text-align: center;
    font-weight: 600;
    font-size: 16px;
  }
}
.icon-fbzz {
  background-image: url(./assets/images/synthesis/maker_icon_thunderstormTracking.png);
}
.icon-bbzs {
  background-image: url(./assets/images/synthesis/marker_icon_hail.png);
}

.my-marker-ani {
  > div {
    color: red;
    animation: my-marker-ani 0.5s infinite alternate;
  }
}
@keyframes my-marker-ani {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.2);
  }
}
.my-marker-cluster-popup {
  width: 500px;
  height: 144px;
  > ul > li {
    overflow: hidden;
    padding: 10px 0;
    > div {
      float: left;
      width: 50%;
    }
  }
}

.my-marker-signle-yellow {
  // width: 50px;
  // height: 50px;
  border-radius: 50%;
  background-color: yellow;
}
</style>
