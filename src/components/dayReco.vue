<template>
  <transition
    enter-active-class="animated flipInX"
    leave-active-class="animated flipOutX"
  >
    <!-- 每日推荐(需要登录) -->
    <div id="dayReco" class="allContent" v-if="isGetDayReco">
      <div>为您推荐</div>
      <div class="titleStyle">
        <span>每日推荐</span>
        <img src="../assets/tuijiangequ.png" @click="showit" alt />
      </div>
      <!-- 主体内容 -->
      <div id="contain">
        <!-- 循环体 -->
        <div id="itemStyle" v-for="(item, idx) in dayRecoList" :key="idx">
          <img
            :src="item.album.picUrl + '?param=250y250'"
            id="imgStyle"
            @click="play(item.id)"
          />
          <span id="itemSongName">{{ item.name }}</span>
          <span id="singer">{{ item.artists[0].name }}</span>
        </div>
      </div>
    </div>
  </transition>
</template>
<style lang="less" scoped>
</style>
<script>
import axios from "axios";
import bus from "../eventBus.js";
export default {
  data() {
    return {
      dayRecoList: [],
      isGetDayReco: false
    };
  },
  created() {
    this.getDayReco();
  },
  methods: {
    //每日推荐(登录)
    getDayReco() {
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
          url: "recommend/songs",
          withCredentials: true //关键
        }).then(function(res) {
          var temp = res.data.recommend;
          temp.forEach(ele => {
            that.dayRecoList.push(ele);
          });
        });
      });
    },
    play(id) {
      this.$emit("func", id);
    },
    showit() {
      bus.$emit("opendayRecoDet");
    }
  }
};
</script>

