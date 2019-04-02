<template>
  <a-locale-provider :locale="locale">
    <div class="home">
      <!-- <div class="zoom" :class="zoomSwitch?'zoom_active':''">
        <a-icon type="close-circle" class="close" @click="close"/>
        <img :src="zoomUrl" alt="">
      </div> -->
      <header class="header">
        <img class="logo-bg" src="../../assets/images/header/logo.jpg" alt="强天气诊断分析平台" title="强天气诊断分析平台">
        <img class="right-bg" src="../../assets/images/header/right.jpg">
        <nav class="nav">
          <router-link
            class="menu-item"
            v-for="menu of menus"
            :key="menu.name"
            :to="menu.path"
            active-class="active"
            :class="[menu.id]"
          >
            <span>{{menu.name}}</span>
          </router-link>
        </nav>
      </header>
      <section class="content">
        <router-view/>
      </section>
    </div>
  </a-locale-provider>
</template>

<script src="./Home.js"></script>
<style src="./Home.scss" lang="scss" scoped></style>

