//退出登录
<template>
  <div>
    <!-- 遮罩 -->
    <img class="registerMask" src="../assets/indexCatch.png" v-if="isdisplay" />
    <transition
      name="myRegister"
      enter-active-class="animated bounceInDown"
      leave-active-class="animated bounceOutRight"
    >
      <div class="register" v-if="isdisplay">
        <div class="registerNotice">要退出吗(ಥ﹏ಥ)</div>
        <img :src="userPic" alt class="userPic" />
        <div class="name">{{ username }}</div>
        <div class="signature">{{ signature }}</div>
        <div class="exit" @click="exit">退出登录</div>
        <!-- <div class="userinfo">
          
                </div>-->
        <div class="cancelRegister">
          <img src="../assets/guanbi.png" alt @click="hide" />
        </div>
      </div>
    </transition>
  </div>
</template>

<style  scoped>
.exit {
  width: 280px;
  height: 50px;
  border-radius: 10px;
  background-color: #e86459;
  text-align: center;
  line-height: 50px;
}
.userPic {
  width: 70px;
  height: 70px;
  border-radius: 10px;
  background-color: red;
}
.name {
  font-size: 24px;
  color: black;
}
.signature {
  font-size: 18px;
  color: black;
}
* {
  margin: 0;
  padding: 0;
}
.registerMask {
  width: 100%;
  height: 1000px;
  position: fixed;
  left: 0px;
  top: 0px;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 49;
  animation: blurStyle 0.5s;
}

@keyframes blurStyle {
  0% {
    filter: blur(0px);
  }

  10% {
    filter: blur(2px);
  }

  20% {
    filter: blur(4px);
  }

  30% {
    filter: blur(6px);
  }

  40% {
    filter: blur(8px);
  }

  50% {
    filter: blur(10px);
  }

  60% {
    filter: blur(12px);
  }

  70% {
    filter: blur(14px);
  }

  80% {
    filter: blur(16px);
  }

  90% {
    filter: blur(18px);
  }

  100% {
    filter: blur(20px);
  }
}
.register {
  width: 300px;
  height: 400px;
  position: fixed;
  left: 38px;
  top: 80px;
  border-radius: 20px;
  background-color: #fff;
  z-index: 50;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
.registerNotice {
  width: 280px;
  height: 60px;
  color: #e86459;
  font-size: 24px;
  text-align: center;
  line-height: 60px;
  padding-bottom: 30px;
  box-sizing: border-box;
  letter-spacing: 4px;
}

.cancelRegister {
  position: absolute;
  left: 50%;
  top: -55px;
  transform: translateX(-20px);
  background-color: #fff;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}
.cancelRegister img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
</style>
<script>
import $ from "jquery";
import bus from "../eventBus.js";
import axios from "axios";
import { constants } from "crypto";
export default {
  data() {
    return {
      isdisplay: false,
      username: "",
      userPic: "",
      signature: ""
    };
  },
  created() {
    bus.$on("openexitloginpage", () => {
      this.isdisplay = true;
      this.$nextTick(function() {
        $(".registerMask").css(
          {
            filter: "blur(10px)"
          },
          500
        );
      });
      this.getinfo();
    });
  },
  methods: {
    hide() {
      this.isdisplay = false;
    },
    getinfo() {
      axios
        .get(
          "login/cellphone?phone=" +
            this.$parent.phone +
            "&password=" +
            this.$parent.password
        )
        .then(result => {
          // console.log(result.data);
          this.username = result.data.profile.nickname;
          this.userPic = result.data.profile.avatarUrl;
          this.signature = result.data.profile.signature;
        });
    },
    exit() {
      this.$parent.closeReco();
      this.isdisplay = false;
    }
  }
};
</script>

