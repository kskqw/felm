<template>

  <div id="app">

    <keep-alive>

      <router-view v-if='$route.meta.keepAlive'></router-view>

    </keep-alive>

    <router-view v-if='!$route.meta.keepAlive'></router-view>

  </div>

</template>



<style scoped>

@import'/css/ico.css';

@import'/css/style.css';

</style>

 