<template>
  <!--最新专辑-->
  <transition
    enter-active-class="animated slideInRight"
    leave-active-class="animated slideOutRight"
  >
    <div id="app" v-if="show">
      <div class="j-frameStyle">
        <!--顶部栏-->
        <div class="header">
          <span class="j-header" @click="hideIt"></span>
          <div class="j-header-li">
            <h1 class="j-newestpush" ref="title" v-text="name"></h1>
            <img src="../assets/sousuo.png" class="j-search" />
          </div>
        </div>
        <div class="manage-list">
          <div
            class="manage-li"
            v-for="item in list"
            :key="item.picId"
            @click="enterNewAlbumSec(item.id)"
          >
            <img :src="item.blurPicUrl+'?param=100y100'" alt />
            <span class="albumname">{{item.name}}</span>
            <span class="singername">{{item.artists[0].name}}</span>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import animate from "animate.css";
import axios from "axios";
import bus from "../eventBus.js";

export default {
  data() {
    return {
      list: [],
      show: false,
      name: ""
    };
  },
  created() {
    bus.$on("openNewAlbumDet", obj => {
      this.$parent.shrinkFont();
      this.getnewAlbum(obj.url);
      this.name = obj.name;
      this.show = true;
    });
  },

  methods: {
    getnewAlbum(url) {
      axios.get(url).then(result => {
        this.list = result.data.albums;
      });
    },
    hideIt() {
      this.show = false;
      this.$parent.zommFont();
    },
    enterNewAlbumSec(id) {
      bus.$emit("enternewalbumsec", id);
      this.$store.state.flag = true;
    }
  }
};
</script>

<style scoped>
* {
  padding: 0px;
  margin: 0px;
}
#app {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 11;
  background-color: #222622;
}
.header {
  position: fixed;
  top: 0;
  left: 0;
  background-color: #222622;
  width: 100%;
  padding: 10px;
}

.j-frameStyle {
  width: 100%;
  /* height: 100%; */
  background-color: #222622;
  box-sizing: border-box;
  padding: 10px;
  padding-bottom: 220px;
  /* position: relative; */
  padding-top: 80px;
  padding-right: 16px;
}

.j-newestpush {
  color: white;
}

.j-header {
  display: inline-block;
  width: 46px;
  height: 20px;
  text-align: right;
  border: 1px solid white;
  border-radius: 20px;
  background-color: white;
  color: black;
  position: relative;
  font-size: 14px;
  padding-right: 8px;
}

.j-header-li {
  padding-top: 10px;
}

.j-header::after {
  content: "";
  border: 5px solid transparent;
  border-right-color: black;
  position: absolute;
  top: 5px;
  left: 0px;
  padding-left: 4px;
}

.j-search {
  width: 40px;
  height: 40px;
  position: absolute;
  float: right;
  top: 49px;
  right: 30px;
}

.manage-list {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  overflow: scroll;
}
.manage-li {
  width: 106px;
  margin-bottom: 8px;
}
.manage-li:first-child {
  margin-top: 25px;
}
.manage-li:nth-child(2) {
  margin-top: 25px;
}
.manage-li:nth-child(3) {
  margin-top: 25px;
}
.manage-li img {
  width: 100%;
  height: 100px;
  border-radius: 10px;
}
.albumname {
  display: inline-block;
  width: 100px;
  height: 18px;
  overflow: hidden;
  font-size: 16px;
  color: white;
  text-align: center;
}
.singername {
  display: inline-block;
  width: 100px;
  overflow: hidden;
  height: 14px;
  font-size: 12px;
  color: white;
  text-align: center;
}
</style>
