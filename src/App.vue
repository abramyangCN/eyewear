<template>
  <div id="app">
    <div class="herobanner">
      <img :class="herobannerClass" src="./assets/herobanner.png" />
    </div>
    <search />
  </div>
</template>

<script>
// import HeroBanner from "./components/HeroBanner.vue";
import Search from "./components/Search.vue";
import { setWechatConfig } from "./components/data/wechatJDK.js";

export default {
  name: "app",
  components: {
    Search
  },
  data() {
    return {
      herobannerBeforeSearch: "herobanner-before-search",
      herobannerAfterSearch: "herobanner-before-search herobanner-after-search",
      herobannerClass: "herobanner-before-search"
    };
  },
  mounted() {
    setWechatConfig();
  },
  methods: {
    searchOpenPicker() {
      this.herobannerClass = this.herobannerAfterSearch;
    },
    searchClosePicker() {
      this.herobannerClass = this.herobannerBeforeSearch;
    }
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
body,
html {
  width: 100%;
  height: 100%;
  /* font-size: 0.016vw; */
  overflow-x: hidden;
  background: #fff;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
}
.herobanner {
  /* height: calc(100% - 66.87vw); */
  margin-bottom: 1.5em;
}
.herobanner-before-search {
  display: block;
  width: auto;
  height: 73vh;
  margin-left: 50vw;
  transform: translate(-50%, 0);
  transition: all 0.3s ease 0.3s;
}
.herobanner-after-search {
  display: block;
  /* width: 100%; */
  height: 66.87vw;
  transform: scaleX(100%);
  transition: all 0.3s ease 0.3s;
}
</style>
