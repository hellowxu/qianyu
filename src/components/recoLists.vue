<template>
  <transition enter-active-class="animated flipInX" leave-active-class="animated flipOutX">
    <!-- 推荐歌单(需要登录) -->
    <div id="recoLists" class="allContent" v-if="isGetDayReco">
      <div>为您精选</div>
      <div class="titleStyle">
        <span>推荐歌单</span>
        <img src="../assets/bofangliebiao.png" @click="showit" alt />
      </div>
      <div id="contain">
        <!-- 循环体 -->
        <div
          class="newSongListStyle"
          v-for="(item,idx) in recoLists"
          @click="getreco(item.id)"
          :key="idx"
        >
          <img :src="item.picUrl+'?param=830y830'" alt />
          <div class="newSongListStyleDisc">{{ item.name }}</div>
        </div>
      </div>
    </div>
  </transition>
</template>
<style lang="less" >
/* 新的歌单样式 */
.newSongListStyle {
  width: 320px;
  height: 320px;
  margin-right: 20px;
  position: relative;
  border-radius: 10px;
  /* overflow: hidden; */
}

.newSongListStyle img:first-child {
  width: 320px;
  height: 320px;
  border-radius: 10px;
}

.newSongListStyleDisc {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 320px;
  height: 85px;
  overflow: hidden;
  padding: 15px 15px;
  box-sizing: border-box;
  color: white;
  font-size: 20px;
  border-radius: 10px;
  /* filter: blur(10px); */
  /* background-color: linear-gradient(bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 1)); */
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 1));
}
</style>

<script>
import axios from "axios";
import bus from "../eventBus.js";
export default {
  data() {
    return {
      recoLists: [],
      isGetDayReco: false
    };
  },
  created() {
    bus.$on("enterrecosonglist", id => {
      this.getreco(id);
    });
  },
  methods: {
    //推荐歌单(登录)
    getRecoLists() {
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
          url: "/recommend/resource",
          withCredentials: true //关键
        }).then(function(res) {
          var temp = res.data.recommend;
          temp.forEach(ele => {
            that.recoLists.push(ele);
          });
        });
      });
      // console.log(that.recoLists);
    },
    getreco(id) {
      bus.$emit("contactHotList", id);
    },
    showit() {
      bus.$emit("openrecoSonglistDet");
    }
  }
};
</script>

