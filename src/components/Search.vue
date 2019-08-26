<template>
  <div :class="searchClass">
    <div class="logo">
      <img src="../assets/logo.png" class="logo" alt />
    </div>
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
          <div class="search-box search-bar" @click="openPicker()">
            {{store}}
            <img
              src="../assets/close.png"
              @click.stop="closePicker()"
              class="search-btn"
              alt
            />
          </div>
          <div class="book-date">
            <span>{{address}}</span>
            <span>8月31日开始预约</span>
          </div>
          <div id="qMapContainer" class="q-map-container"></div>
        </div>
      </transition>
    </div>
    <div class="q-map-label q-map-label-copy" id="qMapLabel">
      <div class="q-map-label-title">{{store}}</div>
      <div class="q-map-label-btn">导航</div>
    </div>
  </div>
</template>

<script>
import VDistpicker from "./VDistpicker.vue";
import markerIcon from "../assets/marker.png";
import { setTimeout } from "timers";

export default {
  name: "Search",
  components: {
    VDistpicker
  },
  data() {
    return {
      displayStatus: true,
      searchClass: "search",
      store: "门店信息",
      qMapPoint: {},
      address: ""
    };
  },
  mounted: function() {
    // this.initQMapApi();
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
      this.store = data.area.value[0];
      if (data.area.value.length > 1) {
        this.qMapPoint = data.area.value[1].split(",");
        this.address = data.area.value[2];
        if (this.qMapPoint.length == 2) this.displayStatus = 3;
      }
      this.initQMapApi();
    },
    initQMapApi() {
      document.getElementById("qMapContainer").innerHTML = "";
      this.qMap = {};
      this.marker = {};
      var _self = this;
      this.qMap = new qq.maps.Map(document.getElementById("qMapContainer"), {
        center: new qq.maps.LatLng(_self.qMapPoint[0], _self.qMapPoint[1]), // 地图的中心地理坐标
        zoom: 16, // 地图缩放级别
        mapTypeControl: false,
        scaleControl: false,
        // zoomControl: false,
        mapStyleId: "style1" // 该key绑定的style1对应于经典地图样式，若未绑定将弹出无权限提示窗
      });
      this.marker = new qq.maps.Marker({
        position: new qq.maps.LatLng(_self.qMapPoint[0], _self.qMapPoint[1]),
        map: this.qMap,
        icon: new qq.maps.MarkerImage(
          markerIcon,
          new qq.maps.Size(18, 26),
          new qq.maps.Point(0, 0),
          new qq.maps.Point(9, 26),
          new qq.maps.Size(18, 26)
        )
      });
      this.label = new qq.maps.Label({
        position: new qq.maps.LatLng(_self.qMapPoint[0], _self.qMapPoint[1]),
        map: this.qMap,
        offset: new qq.maps.Size(0, 0),
        content:
          '<div class="q-map-label"><div class="q-map-label-title">' +
          this.store +
          '</div><div class="q-map-label-btn">导航</div></div>'
      });
      this.label.setOptions({
        style: {
          "border-radius": "5px",
          margin: 0,
          padding: 0,
          border: "none",
          overflow: "hidden"
        },
        offset: new qq.maps.Size(
          -(document.getElementById("qMapLabel").offsetWidth / 2),
          -document.getElementById("qMapLabel").offsetHeight - 30
        )
      });
      setTimeout(() => {
        this.label.setOptions({
          style: {
            "border-radius": "5px",
            margin: 0,
            padding: 0,
            border: "none",
            overflow: "hidden"
          },
          offset: new qq.maps.Size(
            -(document.getElementById("qMapLabel").offsetWidth / 2),
            -document.getElementById("qMapLabel").offsetHeight - 30
          )
        });
        this.qMap.panBy(0, -document.getElementById("qMapLabel").offsetHeight);
      }, 100);
      qq.maps.event.addListener(this.label, "click", function() {
        alert("aaa");
      });
    }
  }
};
</script>

<style>
.search-before {
  /* height: calc(100% - 66.87vw); */
}
.search {
  /* position: fixed; */
  /* overflow: hidden; */
}
.logo {
  display: block;
  margin: 0 auto;
  margin-bottom: 1.5em;
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
  height: calc(100vh - 102vw);
  overflow-y: auto;
}
.book-date {
  position: relative;
  color: #58595b;
  font-size: 1rem;
  line-height: 1.2;
  text-align: center;
  width: 100%;
  margin: 1.28em auto;
}
.book-date span {
  display: inline-block;
  background: #fff;
  z-index: 2;
  padding: 0 1em;
  line-height: 2;
  border-bottom: #000 1px solid;
}
.book-date span:last-child {
  display: inline-block;
  background: #fff;
  z-index: 2;
  padding: 0 1em;
  line-height: 2;
  border-bottom: none;
}
/* .book-date:after {
  content: "";
  position: absolute;
  height: 1px;
  width: 74%;
  z-index: -1;
  top: 50%;
  left: 50%;
  margin-left: -37%;
  background: #58595b;
} */
.q-map-container {
  width: 90.8vw;
  margin: 0 auto;
  border: #f1f3f3 2px solid;
  height: 26vh;
}
.q-map-label {
  width: auto;
  height: auto;
}
.q-map-label-title,
.q-map-label-btn {
  display: inline-block;
  padding: 0.9em;
  font-size: 0.917rem;
  line-height: 1.6;
  color: #000;
}
.q-map-label-btn {
  display: inline-block;
  background-color: #cf152d;
  color: #fff;
}
.q-map-label-copy {
  position: absolute;
  z-index: -99;
  opacity: 0;
  top: 0;
}
</style>
