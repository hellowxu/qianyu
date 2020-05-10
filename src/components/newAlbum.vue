<template>
  <!-- 最新专辑 -->
  <div id="newAlbum" class="allContent">
    <div>专辑</div>
    <div class="titleStyle">
      <span>最新专辑</span>
      <img src="../assets/default3.png" alt @click="showIt" />
    </div>
    <div id="contain">
      <!-- 循环体 -->
      <div id="itemStyle" v-for="item in latestAblum" :key="item.id">
        <img
          :src="item.picUrl + '?param=350y350'"
          id="imgStyleSP"
          @click="getAlbumSongs(item.id)"
        />
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>

</style>
<script>
import axios from "axios";
import bus from "../eventBus.js";
export default {
  data() {
    return {
      latestAblum: []
    };
  },
  created() {
    this.getLatestAlbum();
    bus.$on("enternewalbumsec", id => {
      this.getAlbumSongs(id);
    });
  },
  methods: {
    //最新专辑
    getLatestAlbum() {
      var that = this;
      axios({ url: "/album/newest", withCredentials: true }).then(function(
        result
      ) {
        that.latestAblum = result.data.albums;
      });
    },
    showIt() {
      bus.$emit("openNewAlbumDet", {
        name: "最新专辑",
        url: "album/newest"
      });
    },
    getAlbumSongs(id) {
      bus.$emit("contactNewAlbumSec", id);
    }
  }
};
</script>


