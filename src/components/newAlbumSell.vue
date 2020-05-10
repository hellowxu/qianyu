<template>
  <!-- 新碟上架 -->
  <div id="newAlbumSell" class="allContent">
    <div>上新</div>
    <div class="titleStyle">
      <span>新碟上架</span>
      <img src="../assets/zuixintuichu.png" alt @click="show" />
    </div>
    <div id="contain">
      <!-- 循环体 -->
      <div id="itemStyle" v-for="item in newablum" :key="item.id">
        <img :src="item.blurPicUrl+'?param=250y250'" id="imgStyle" @click="getAlbumSongs(item.id)" />
        <span id="itemSongName">{{ item.name }}</span>
        <span id="singer">{{ item.artist.name }}</span>
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
    return { newablum: [] };
  },
  created() {
    this.getNewAlbum();
  },
  methods: {
    //新碟上架
    getNewAlbum() {
      axios.get("top/album?offset=0&limit=30").then(result => {
        if (result.data.code == 200) {
          this.newablum = result.data.albums;
        }
      });
    },
    show() {
      bus.$emit("openNewAlbumDet", {
        name: "新碟上架",
        url: "top/album"
      });
    },
    getAlbumSongs(id) {
      bus.$emit("contactNewAlbumSec", id);
    }
  }
};
</script>

