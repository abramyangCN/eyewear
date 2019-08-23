<template>
  <div :class="searchClass">
    <img src="../assets/logo.png" class="logo" alt />
    <div class="search-outercontainer">
      <transition name="fade">
        <div class="search-container" v-show="displayStatus == 1">
          <div class="search-bar" @click="openPicker()">
            查看销售门店
            <img src="../assets/search.png" class="search-btn" alt />
          </div>
        </div>
      </transition>
      <transition name="fade">
        <div class="search-container" v-show="(displayStatus == 2)">
          <div class="search-box">
            门店信息
            <img src="../assets/close.png" @click="closePicker()" class="search-btn" alt />
          </div>
          <div class="picker">
            <v-distpicker type="mobile" @selected="onSelected"></v-distpicker>
          </div>
        </div>
      </transition>
      <transition name="fade">
        <div class="search-container" v-show="displayStatus == 3">
          <div class="search-box search-bar">
            {{store}}
            <img src="../assets/close.png" @click="closePicker()" class="search-btn" alt />
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import VDistpicker from "./VDistpicker.vue";

export default {
  name: "Search",
  components: {
    VDistpicker
  },
  data() {
    return {
      displayStatus: true,
      searchClass: "search",
      store: "门店信息"
    };
  },
  methods: {
    openPicker() {
      this.$parent.searchOpenPicker();
      this.displayStatus = 2;
      this.searchClass = "search search-before";
    },
    closePicker() {
      this.$parent.searchClosePicker();
      this.displayStatus = 1;
      this.searchClass = "search";
    },
    onSelected(data) {
      this.store = data.area.value;
      this.displayStatus = 3;
    }
  }
};
</script>

<style>
.search-before {
  height: calc(100% - 66.87vw);
}
.search {
  overflow: hidden;
}
.logo {
  display: block;
  margin: 8.27vw auto;
  width: 70.4%;
}
.search-bar {
  position: relative;
  width: 90.8%;
  margin: 0 auto;
  font-size: 1rem;
  line-height: 2.93;
  text-align: center;
  border: #000 2px solid;
  color: #000;
}
.search-btn {
  position: absolute;
  right: 0;
  top: 0;
  height: 60%;
  transform: translate(-40%, 30%);
}
.search-box {
  position: relative;
  width: 90.8vw;
  margin: 0 auto;
  font-size: 1rem;
  line-height: 2.93;
  text-align: center;
  color: #000;
}
.search-outercontainer {
  position: relative;
}
.search-container {
  width: 100%;
}
.fade-enter-active {
  transition: opacity 0.3s ease 0.3s;
}
.fade-leave-active {
  transition: opacity 0.3s ease 0.3s;
  position: absolute;
  top: 0;
  left: 0;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.show-enter-active {
  transition: opacity 0.3s ease 0.3s;
}
.show-enter, .show-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.picker .distpicker-address-wrapper .address-header ul li.active {
  border-bottom: #cf152d solid 3px;
  color: #cf152d;
}
.picker .distpicker-address-wrapper .address-header ul li {
  color: #000;
}
.picker .distpicker-address-wrapper .address-container ul li {
  color: #58595b;
}
.picker .distpicker-address-wrapper .address-container ul li.active {
  color: #000;
  font-weight: 500;
}
.address-container {
  height: calc(100vh - 113vw);
  overflow-y: auto;
}
</style>
