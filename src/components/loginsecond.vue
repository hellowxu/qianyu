<template>
    <div>
        <!-- 注册页面(优先级最高,仅出现一次,可在设置中再次找到) -->
        <!-- 遮罩 -->
        <img class="registerMask" v-if="isRegisterDisplay" src="../assets/indexCatch.png" />

        <transition
            name="myRegister"
            enter-active-class="animated bounceInDown"
            leave-active-class="animated bounceOutRight"
        >
            <div class="register" v-if="isRegisterDisplay">
                <div class="registerNotice">先注册哟!</div>
                <input
                    type="text"
                    class="inputStyle"
                    v-model="phone"
                    placeholder="在这里填上电话号 ღゝ◡╹)ノ♡"
                />
                <input
                    type="text"
                    class="inputStyle"
                    v-model="username"
                    placeholder="起个好听的名字(︶.̮︶✽)"
                />
                <input
                    type="password"
                    class="inputStyle"
                    v-model="password"
                    placeholder="在这里输入密码哦 ♬╭(╯ε╰)╮"
                />
                <div class="getCaptcha">
                    <input type="text" v-model="captcha" placeholder="验证码写在这(⺣◡⺣)♡" />
                    <div @click="getCtcode" class="clickmetoget">点我获取</div>
                </div>
                <div class="submitRegister" @click="registerUser">注册</div>
                <div class="cancelRegister" @click="hideRegisterBox">
                    <img src="../assets/guanbi.png" alt />
                </div>
            </div>
        </transition>
    </div>
</template>

<style  scoped>
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
    /* filter: blur(30px);
  -webkit-filter: blur(30px); */
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
    font-size: 30px;
    text-align: center;
    line-height: 60px;
    padding-bottom: 30px;
    box-sizing: border-box;
    letter-spacing: 4px;
}
.inputStyle {
    width: 280px;
    height: 40px;
    background-color: rgb(243, 243, 243);
    border-radius: 10px;
    border: none;
    line-height: 40px;
    font-size: 14px;
    letter-spacing: 4px;
    padding-left: 20px;
    box-sizing: border-box;
    outline: none;
}
.getCaptcha {
    width: 280px;
    height: 40px;
    display: flex;
    flex-direction: row;
    border-radius: 10px;
    overflow: hidden;
    font-size: 14px;
    letter-spacing: 2px;
}
.getCaptcha input {
    width: 200px;
    height: 40px;
    border: none;
    font-size: 14px;
    letter-spacing: 2px;
    background-color: rgb(243, 243, 243);
    font-size: 14px;
    padding-left: 20px;
    box-sizing: border-box;
    outline: none;
}
.getCaptcha div {
    width: 100px;
    height: 100%;
    background-color: #e86459;
    text-align: center;
    line-height: 40px;
    font-size: 14px;
}
.submitRegister {
    width: 280px;
    height: 50px;
    background-color: #e86459;
    text-align: center;
    line-height: 50px;
    font-size: 20px;
    letter-spacing: 4px;
    border-radius: 10px;
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
export default {
    data() {
        return {
            isRegisterDisplay: false,
            phone: "",
            username: "",
            password: "",
            captcha: ""
        };
    },
    created() {
        bus.$on("openloginPage", () => {
            this.isRegisterDisplay = true;
            this.$nextTick(function() {
                $(".registerMask").css(
                    {
                        filter: "blur(10px)"
                    },
                    500
                );
            });
        });
    },
    mounted: function() {
        this.isRegisterDisplay = true;
        this.$nextTick(function() {
            $(".registerMask").css(
                {
                    filter: "blur(10px)"
                },
                500
            );
        });
    },
    methods: {
        hideRegisterBox() {
            this.isRegisterDisplay = false;
        },
        //注册按钮（待做）
        registerUser() {
            axios
                .get(
                    "register/cellphone?phone=" +
                        this.phone +
                        "&password=" +
                        this.password +
                        "&captcha=" +
                        this.captcha +
                        "&nickname=" +
                        this.username
                )
                .then(result => {
                    this.$parent.phone = this.phone;
                    this.$parent.password = this.password;
                    this.isRegisterDisplay = false;
                    this.$parent.login();
                })
                .catch(err => {
                    $(".registerNotice").text("注册失败了啊!!");
                });
        },
        //获取验证码
        getCtcode() {
            axios.get("captcha/sent?phone=" + this.phone).then(result => {
                $(".clickmetoget").css({
                    backgroundColor: "gray"
                });
                setTimeout(function() {
                    $(".clickmetoget").css({
                        backgroundColor: "#e86459"
                    });
                }, 60000);
                console.log(result.data);
            });
        }
    }
};
</script>

