<template>
  <transition enter-active-class="animated flipInX" leave-active-class="animated flipOutX">
    <!-- 新歌推荐(需要登录) -->
    <div id="newSongReco" class="allContent" v-if="isGetNewSongRecoList">
      <div>为您推荐</div>
      <div class="titleStyle">
        <span>新歌精选</span>
        <img src="../assets/zuijintianjia.png" @click="showit" alt />
      </div>
      <!-- 主体内容 -->
      <div id="contain">
        <!-- 循环体 -->
        <div id="itemStyle" v-for="(item,idx) in newSongList" :key="idx">
          <img :src="item.song.album.picUrl+'?param=250y250'" id="imgStyle" @click="play(item.id)" />
          <span id="itemSongName">{{ item.name }}</span>
          <span id="singer">{{ item.song.artists[0].name }}</span>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import axios from "axios";
import bus from "../eventBus.js";
export default {
  data() {
    return {
      newSongList: [],
      isGetNewSongRecoList: false
    };
  },
  created() {
    this.getNewSongList();
  },
  methods: {
    //新歌推荐(登录)
    getNewSongList() {
      var that = this;
      //登录接口的用法!!!!!!!!!
      axios({
        url:
          "login/cellphone?phone=" +
          that.$parent.phone +
          "&password=" +
          that.$parent.password
      }).then(function(res) {
        axios({
          url: "personalized/newsong",
          withCredentials: true //关键
        }).then(function(res) {
          var temp = res.data.result;
          temp.forEach(ele => {
            that.newSongList.push(ele);
          });
        });
      });
    },
    play(id) {
      this.$emit("func", id);
    },
    showit() {
      bus.$emit("opennewSongPickDet");
    }
  }
};
</script>

