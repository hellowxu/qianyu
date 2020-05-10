<template>
    <div id="app" @scroll="scrollAnimate">
        <!-- 注册页面 -->
        <loginsecond></loginsecond>
        <exit></exit>
        <!-- 空白遮罩 -->
        <div id="mask" @click="show"></div>
        <div id="outer">
            <!-- 播放器 -->
            <!-- <audio id="myAudio" ref="myAudio" preload="true" loop="false"></audio> -->
            <myAudio ref="myAudio" :msg="songLrc"></myAudio>

            <!-- 顶部栏 -->
            <span id="allTop">主 页</span>
            <div id="topbar">
                <div id="topIcon">
                    <img src="./assets/deleteuser.png" alt @click="exitpage" />
                    <img src="./assets/sousuo.png" alt @click="openSearchPage" />
                </div>
            </div>

            <!-- 登录按钮(退出登录未做) -->
            <div class="login">
                <div class="login-notice" @click="isLogin && login()">
                    <img src="./assets/yonghu.png" alt id="login-userPic" />
                    <div id="login-userName">听说登录后歌曲更好听哦!</div>
                </div>
                <input
                    type="text"
                    id="phone"
                    v-model="phone"
                    placeholder="在这里填上电话号 ღゝ◡╹)ノ♡"
                    style="display:none"
                />
                <input
                    type="password"
                    id="password"
                    v-model="password"
                    placeholder="在这里输入密码哦 ♬╭(╯ε╰)╮"
                    @keyup.enter="submitInfo"
                    style="display:none"
                />
                <div id="login-button" @click="submitInfo" style="display:none">登录</div>
            </div>

            <!-- 功能按钮 -->
            <div class="top-button">
                <!-- 点击收藏之后,会加入到此列表 -->
                <div class="t-b-item" id="tb-1" @click="openMyStorePage">
                    <span>我的收藏</span>
                    <img src="./assets/gengduo.png" alt />
                </div>
                <!-- 会保存最近播放的歌曲 -->
                <div class="t-b-item" id="tb-1" @click="openLatestPage">
                    <span>最近播放</span>
                    <img src="./assets/gengduo.png" alt />
                </div>
                <!-- 点击对应栏目,该栏目歌曲会进入列表 -->
                <div class="t-b-item" id="tb-1" @click="openWaitToPlayList">
                    <span>播放列表</span>
                    <img src="./assets/gengduo.png" alt />
                </div>
                <!-- 获取所有新歌 -->
                <div class="t-b-item" id="tb-1" @click="opennewSongTransmit">
                    <span>新歌速递</span>
                    <img src="./assets/gengduo.png" alt />
                </div>
            </div>
            <!-- 每日推荐 -->
            <dayReco ref="dayreco" @func="play"></dayReco>
            <!-- 推荐歌单 -->
            <recoLists ref="recolists"></recoLists>
            <!-- 新歌推荐 -->
            <newSongReco ref="newsongreco" @func="play"></newSongReco>
            <!-- 最新专辑 -->
            <newAlbum></newAlbum>
            <!-- 新歌排行榜 -->
            <newSonglist @func="play"></newSonglist>
            <!-- 热歌榜 -->
            <theRankOfNewSong @func="play"></theRankOfNewSong>
            <!-- UK排行榜周榜 -->
            <ukRank @func="play"></ukRank>
            <!-- 美国Billboard周榜 -->
            <billboard @func="play"></billboard>
            <!-- 热门歌单 -->
            <recoListHot></recoListHot>

            <!-- 新碟上架 -->
            <newAlbumSell></newAlbumSell>
            <!--新歌精选-->
            <newSongPickDet></newSongPickDet>
            <!--推荐歌单-->
            <recoSonglistDet></recoSonglistDet>
            <!--每日推荐-->
            <dayReco></dayReco>

            <!-- 搜索组件 -->
            <searchIndex></searchIndex>
            <!-- 最新专辑二级页面 -->
            <newAlbumSec></newAlbumSec>\
            <!-- 最新专辑详情页面 -->
            <newAlbumDet ref="nabd"></newAlbumDet>
            <!-- 热门歌单详情页面 -->
            <HotsonglistDet></HotsonglistDet>
            <!-- 新歌排行榜 -->
            <newSongRankDet></newSongRankDet>
            <!-- 功能按钮页面 -->
            <sharePage ref="sharepage"></sharePage>
            <!-- 热门歌单二级页面 -->
            <hotSongListSec></hotSongListSec>
            <!-- 每日推荐二级页面 -->
            <dayRecoDet></dayRecoDet>
            <!-- 搜索界面 -->
            <searchIndex ref="searchpage"></searchIndex>
            <!-- 我的收藏 -->
            <myStoreSec></myStoreSec>
            <!-- 播放列表 -->
            <waitToPlayList ref="waittoplay"></waitToPlayList>
        </div>
        <!-- 底部栏 -->
        <div id="mainplay" @scroll="mainplayEvent">
            <div class="content">
                <!-- 800 -->
                <div class="bottom-flex">
                    <img src="./assets/yinyuex2.png" id="pic" @click="show" />
                    <!-- <img alt="" id="pic" @click='show'> -->
                    <div id="information">
                        <div id="songName">
                            <span>未在播放</span>
                        </div>
                        <span id="playStyle">♬ 扬声器</span>
                    </div>

                    <div class="playState">
                        <div class="burger2 menu" @click="changePlayState">
                            <div class="icon"></div>
                        </div>
                        <div class="next" @click="getNextSong">
                            <div id="u-l1" class="m-line"></div>
                            <div id="u-l2" class="m-line"></div>
                            <div id="u-l3" class="m-line"></div>
                        </div>
                    </div>
                </div>

                <!-- 控制条 -->
                <div id="control" @click="movePoint">
                    <div id="fill"></div>
                    <div id="point"></div>
                    <span id="start">00:00</span>
                    <span id="end">00:00</span>
                </div>
                <div id="maxSongName">
                    <span>未在播放</span>
                </div>
                <div id="maxSingerName">
                    <span>未知</span>
                </div>
                <!-- 暂停播放栏 -->
                <div class="bigState">
                    <!-- 上一曲 -->
                    <div class="pre" @click="getPreSong">
                        <div id="m-l1" class="m-line"></div>
                        <div id="m-l2" class="m-line"></div>
                        <div id="m-l3" class="m-line"></div>
                    </div>
                    <!-- //开始暂停 -->
                    <div class="burger2 menu" @click="changePlayState">
                        <div class="icon"></div>
                    </div>
                    <!-- 下一曲 -->
                    <div class="next next1" @click="getNextSongSmall">
                        <div id="u-l11" class="m-line"></div>
                        <div id="u-l21" class="m-line"></div>
                        <div id="u-l31" class="m-line"></div>
                    </div>
                </div>
                <!-- 音量条/剩余区-->
                <div id="restAera">
                    <div class="volumeControl">
                        <img src="./assets/yinliang.png" alt />
                        <div class="vc-outline" @click="skipTime">
                            <div class="vc-fill"></div>
                            <div class="vc-point"></div>
                        </div>
                        <img src="./assets/yinliangbig.png" alt />
                    </div>
                    <ul class="lrcList">
                        <li v-for="item in songLrc">{{ item.c }}</li>
                        <!-- <li>123123123</li> -->
                    </ul>
                </div>

                <!-- 评论区 -->
                <review ref="rev"></review>
            </div>
        </div>
    </div>
</template>

<style lang="less">
* {
    margin: 0;
    padding: 0;
}

#app {
    overflow: scroll;
    width: 100%;
    height: 900px;
    background-color: #fff;
    box-sizing: border-box;
}
#outer {
    transition: all 0.5s;
    background-color: rgb(35, 38, 44);
    padding: 10px;
    // height: 4000px;
    position: relative;
    overflow: scroll;
    z-index: 10;
    padding-bottom: 200px;
}

#allTop {
    /* display: block; */
    font-size: 40px;
    color: white;
    font-weight: 500;
    transition: all 1.5s;
    position: fixed;
    z-index: 50;
}
#topbar {
    width: 100%;
    height: 100px;
    position: fixed;
    top: 0;
    left: 0;
    box-sizing: border-box;
    padding: 10px;
    background-color: #222622;
    transition: all 1.5s;
    z-index: 10;
}
#topIcon {
    margin-top: 20px;
    float: right;
    transition: all 1.5s;
}

/* 50 */
#topIcon img {
    width: 30px;
    height: 30px;
    margin-left: 15px;
    transition: all 0.5s;
}
/* 登录 */
.login {
    width: 100%;
    height: 60px;
    /* height: 720px; */
    background-color: rgb(43, 46, 52);
    margin-top: 110px;
    margin-bottom: 10px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    align-content: space-between;
    /* justify-content: space-between; */
    box-sizing: border-box;
    padding: 10px;
    overflow: hidden;
}

.login-notice {
    width: 100%;
    height: 60px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}

#login-userPic {
    width: 40px;
    height: 40px;
    background-color: #fff;
    border-radius: 50%;
    margin-right: 10px;
}

#login-userName {
    /* width: 520px; */
    text-align: center;
    color: white;
    font-size: 18px;
    letter-spacing: 2px;
}

#phone,
#password {
    width: 100%;
    height: 50px;
    background-color: #fff;
    border-radius: 10px;
    margin-top: 20px;
    font-size: 18px;
    padding-left: 10px;
    box-sizing: border-box;
    letter-spacing: 2px;
    outline: none;
}

#login-button {
    background-color: #e86459;
    width: 100%;
    height: 50px;
    border-radius: 10px;
    color: white;
    font-size: 20px;
    text-align: center;
    line-height: 50px;
    letter-spacing: 15px;
    margin-top: 20px;
}

/* 功能按钮 */
.top-button {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-bottom: 30px;
    /* margin-top: 40px; */
}

.top-button div {
    width: 172px;
    height: 50px;
    background-color: rgb(43, 46, 52);
    margin-top: 10px;
    border-radius: 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding-left: 15px;
    padding-right: 5px;
}

.t-b-item span {
    color: white;
    font-size: 18px;
    letter-spacing: 2px;
}

.t-b-item img {
    width: 25px;
    height: 25px;
}

#mask {
    width: 100%;
    height: 900px;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 20;
    background-color: rgba(0, 0, 0);
    opacity: 0;
    display: none;
}

#mainplay {
    width: 100%;
    height: 100px;
    position: fixed;
    bottom: 0;
    left: 0;
    background-color: rgb(27, 31, 37);
    /* filter: blur(10px); */
    box-shadow: 0 -10px 20px rgba(255, 255, 255, 0.2);
    border-radius: 40px 40px 0 0;
    box-sizing: border-box;
    padding: 25px;

    overflow: hidden;
    z-index: 30;
}
.bottom-flex {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
}
// #pic {
//     width: 60px;
//     height: 60px;
//     /* background-color: rgba(0, 0, 0, 0.3); */
//     background-color: #fff;
//     display: block;
//     border-radius: 10px;
//     z-index: 2;
// }
.bottom-flex > img {
    width: 60px;
    height: 60px;
    /* background-color: rgba(0, 0, 0, 0.3); */
    background-color: #fff;
    display: block;
    border-radius: 10px;
    z-index: 2;
    transition: all 0.5s;
}
.newPic {
    width: 325px !important;
    height: 325px !important;
    // /* background-color: rgba(0, 0, 0, 0.3); */
    background-color: #fff;
    display: block;
    border-radius: 10px;
    z-index: 2;
}
#information {
    width: 150px;
    color: white;
    font-size: 22px;
    margin-left: 15px;
    margin-right: 15px;
    font-weight: 200;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 60px;
    overflow: hidden;
}
#songName {
    display: inline-block;
    width: 150px;
    height: 30px;
    overflow: hidden;
    letter-spacing: 2px;
}

#playStyle {
    font-size: 14px;
    color: #e86459;
    font-weight: 400;
    width: 150px;
    overflow: hidden;
    letter-spacing: 1px;
}
.playState {
    overflow: hidden;
    display: flex;
    width: 100px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
}
.next {
    width: 35px;
    height: 30px;
    /* background-color: black; */
    margin-left: 5px;
    position: relative;
    overflow: hidden;
}

.m-line {
    width: 25px;
    height: 7px;
    background-color: rgb(223, 138, 130);
    position: absolute;
    border-radius: 3px;
}
#u-l1 {
    left: 0px;
    top: 0px;
}

#u-l2 {
    width: 25px;
    left: 10px;
    top: 10px;
}

#u-l3 {
    left: 0px;
    top: 20px;
}
/* 按钮样式 */
.menu {
    width: 40px;
    height: 40px;
    position: relative;
    transition-duration: 1s;
    display: inline-block;
    margin: 0px;
    cursor: pointer;
}

.icon {
    height: 7px;
    width: 40px;
    top: 15px;
    background-color: #f8ffe9;
    border-radius: 10px;
    position: absolute;
    transition-duration: 0.5s;
}

.icon:before {
    left: 0;
    position: absolute;
    top: -12px;
    height: 7px;
    width: 40px;
    background-color: #f8ffe9;
    content: "";
    border-radius: 10px;
    transition-duration: 0.5s;
}

.icon:after {
    left: 0;
    position: absolute;
    top: 12px;
    height: 7px;
    width: 40px;
    background-color: #f8ffe9;
    content: "";
    border-radius: 10px;
    transition-duration: 0.5s;
}

.burger2.open .icon {
    transition-duration: 0.1s;
    transition-delay: 0.5s;
    background: transparent;
}

.burger2.open .icon:before {
    transition: top 0.5s, transform 0.5s 0.5s;
    top: 0px;
    transform: rotateZ(-45deg);
}

.burger2.open .icon:after {
    transition: top 0.4s, transform 0.5s 0.5s;
    top: 0px;
    transform: rotateZ(45deg);
}

.burger3.open .icon {
    background: transparent;
}

.burger3.open .icon:before {
    transition: transform 0.5s;
    transform: rotateZ(45deg) translate(15px, 20px);
}

.burger3.open .icon:after {
    transition: transform 0.5s;
    transform: rotateZ(-405deg) translate(15px, -20px);
}

/* 按钮结束 */

#control {
    width: 325px;
    background-color: white;
    height: 5px;
    margin: 25px auto;
    border-radius: 5px;
    position: relative;
}
#fill {
    width: 0px;
    background-color: #e86459;
    height: 5px;
    border-radius: 5px;
    position: absolute;
    left: 0;
    top: 0;
}

#point {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: white;
    position: absolute;
    left: 0;
    top: -7px;
}

#start {
    position: absolute;
    top: 15px;
    left: 0;
    color: white;
    font-size: 18px;
    letter-spacing: 1px;
}

#end {
    position: absolute;
    right: 0;
    top: 15px;
    color: white;
    font-size: 18px;
    letter-spacing: 2px;
}
#maxSongName {
    font-size: 28px;
    /* color: #E86459; */
    color: white;
    font-weight: 400;
    width: 100%;
    height: 42px;
    text-align: center;
    margin: 100px auto;
    margin-top: 60px;
    margin-bottom: 0;
    overflow: hidden;
    letter-spacing: 2px;
}

#maxSingerName {
    font-size: 18px;
    color: #e86459;
    /* color: white; */
    font-weight: 400;
    width: 100%;
    height: 30px;
    text-align: center;
    margin: 25px auto;
    overflow: hidden;
    letter-spacing: 1px;
}

.bigState {
    width: 100%;
    height: 75px;
    /* background-color: pink; */
    position: relative;
    margin-bottom: 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
}
@keyframes bg-color {
    0% {
        background-color: #fff;
    }

    10% {
        background-color: #e86459;
    }

    20% {
        background-color: #fff;
    }

    30% {
        background-color: #e86459;
    }

    40% {
        background-color: #fff;
    }

    50% {
        background-color: #e86459;
    }

    60% {
        background-color: #fff;
    }

    70% {
        background-color: #e86459;
    }

    80% {
        background-color: #fff;
    }

    90% {
        background-color: #e86459;
    }
}
.pre {
    width: 40px;
    height: 30px;
    /* background-color: black; */
    // margin: 50px auto;
    position: relative;
    overflow: hidden;
}

#m-l1 {
    left: 7px;
    top: 0px;
}

#m-l2 {
    width: 25px;
    left: 0px;
    top: 10px;
}

#m-l3 {
    left: 7px;
    top: 20px;
}
#u-l11 {
    left: 0px;
    top: 0px;
}

#u-l21 {
    width: 25px;
    left: 10px;
    top: 10px;
}

#u-l31 {
    left: 0px;
    top: 20px;
}
/* 播放页底部音量部分 */
#restAera {
    width: 100%;
    height: 90px;
    /* border: 1px solid white; */
}

.volumeControl {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
}

.volumeControl img {
    width: 30px;
    height: 30px;
}

.vc-outline {
    width: 325px;
    height: 3px;
    background-color: #fff;
    margin-right: 30px;
    position: relative;
}

.vc-fill {
    width: 100%;
    height: 100%;
    background-color: #92d148;
}

.vc-point {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: #fff;
    position: absolute;
    top: -5px;
    left: 100%;
}

/* 歌词 */
.lrcList {
    display: block;
    list-style: none;
    width: 100%;
    margin-top: 10px;
    height: 40px;
    /* background-color: red; */
    /* font-family: 'Cambria Math'; */
    overflow: scroll;
}

.lrcList li {
    width: 100%;
    color: white;
    font-size: 18px;
    text-align: center;
    height: 40px;
    font-weight: 300;
    letter-spacing: 1px;
    line-height: 40px;
    overflow: hidden;
    /* background-color: green; */
    /* margin-top: 20px; */
}
</style>

<script>
import bus from "./eventBus.js";
import $ from "jquery";
import axios from "axios";
import newSonglist from "./components/newSongList.vue";
import myAudio from "./components/myaudio.vue";
import newAlbum from "./components/newAlbum.vue";
import recoListHot from "./components/recoListHot.vue";
import newAlbumSec from "./views/newAlbumSec.vue";
import newAlbumSell from "./components/newAlbumSell.vue";
import dayReco from "./components/dayReco.vue";
import recoLists from "./components/recoLists.vue";
import newSongReco from "./components/newSongReco.vue";
import review from "./components/review.vue";
import HotsonglistDet from "./views/HotsonglistDet.vue";
import newAlbumDet from "./views/newAlbumDet.vue";
import newSongRankDet from "./views/newSongRankDet.vue";
import sharePage from "./components/sharePage.vue";
import hotSongListSec from "./views/hotSongListSec.vue";
import newSongPickDet from "./views/newSongPickDet.vue";
import recoSonglistDet from "./views/recoSonglistDet.vue";
import dayRecoDet from "./views/dayRecoDet.vue";
import searchIndex from "./components/search/seachIndex.vue";
import latestSearch from "./components/search/latestSearch.vue";
import searchSecond from "./components/search/searchSecond.vue";
import myStoreSec from "./views/myStoreSec.vue";
import waitToPlayList from "./views/waitToPlayList.vue";
import theRankOfNewSong from "./components/theRankOfNewSong.vue";
import ukRank from "./components/ukRank.vue";
import billboard from "./components/billboard.vue";
import loginsecond from "./components/loginsecond.vue";
import exit from "./components/exitLoginPage.vue";
export default {
    data() {
        return {
            // 登录电话密码
            phone: "",
            password: "",
            //登录成功后点击不再展开
            isLogin: true,
            //控制底部栏
            flag: true,
            //歌词对象
            songLrc: [],
            //歌词处理前存储数组
            oLRC: [],
            //音量条
            vc_width: "",
            //1 登录 0未登录
            state: 0,
            //判断当前要播放哪个列表:1最近播放 2播放列表
            list: 1
        };
    },
    components: {
        myAudio,
        dayReco,
        recoLists,
        newSongReco,
        newSonglist,
        newAlbum,
        recoListHot,
        review,
        newAlbumSell,
        newAlbumSec,
        newAlbumDet,
        HotsonglistDet,
        newAlbumDet,
        newSongRankDet,
        sharePage,
        hotSongListSec,
        newSongPickDet,
        recoSonglistDet,
        dayRecoDet,
        searchIndex,
        latestSearch,
        searchSecond,
        myStoreSec,
        waitToPlayList,
        theRankOfNewSong,
        ukRank,
        billboard,
        loginsecond,
        exit
    },
    mounted() {
        this.vc_width = $(".vc-outline").width();
    },
    methods: {
        //首页滚动动画
        scrollAnimate() {
            if ($("#app").scrollTop() >= $("#topbar").height()) {
                $("#topbar").css({
                    height: "70px"
                });
                $("#allTop").css({
                    "font-size": "30px"
                });
                $("#topIcon").css({
                    "margin-top": "10px"
                });
                $("#topIcon img").css({
                    width: "25px",
                    height: "25px"
                });
            } else {
                $("#topbar").css({
                    height: "80px"
                });
                $("#allTop").css({
                    "font-size": "40px"
                });
                $("#topIcon img").css({
                    width: "30px",
                    height: "30px"
                });
            }
        },
        //登录展开动画
        login() {
            $(".login").animate(
                {
                    height: "330"
                },
                500
            );
            $("#phone").css({
                display: "block"
            });
            $("#password").css({
                display: "block"
            });
            $("#login-button").css({
                display: "block"
            });
        },
        //登录验证
        submitInfo() {
            //提交数据,登陆成功,执行动画,并解绑click的事件
            //登陆失败,提醒登录失败,保持不变
            //(存session,暂未做)
            var that = this;
            axios({
                method: "get",
                url:
                    "login/cellphone?phone=" +
                    that.phone +
                    "&password=" +
                    that.password,
                withCredentials: true
            })
                .then(result => {
                    if (result.data.code == 200) {
                        this.myInfo = result.data.profile;
                        $("#login-userPic").attr("src", this.myInfo.avatarUrl);
                        $("#login-userName").text(
                            that.hello() + this.myInfo.nickname
                        );
                        $(".login").animate(
                            {
                                height: "60"
                            },
                            500
                        );
                        $("#phone").css({
                            display: "none"
                        });
                        $("#password").css({
                            display: "none"
                        });
                        $("#login-button").css({
                            display: "none"
                        });
                        //不可再点击登录事件
                        that.isLogin = !that.isLogin;
                        //登录成功后显示和渲染每日推荐列表
                        that.$refs.dayreco.getDayReco();
                        that.$refs.dayreco.isGetDayReco = true;
                        // 登录成功后显示和渲染推荐歌单列表
                        that.$refs.recolists.getRecoLists();
                        that.$refs.recolists.isGetDayReco = true;
                        //登陆成功显示新歌精选列表
                        that.$refs.newsongreco.getNewSongList();
                        that.$refs.newsongreco.isGetNewSongRecoList = true;
                        that.state = 1;
                    }
                })
                .catch(function(error) {
                    if (error.response.status == 502) {
                        $("#login-userName").text("密码错误哦!!!");
                    } else if (error.response.status == 400) {
                        $("#login-userName").text("账号或密码错误哦!!!");
                    }
                });
        },
        //提示语转化函数
        hello() {
            var dt = new Date();
            var hh = dt.getHours();
            if (hh > 4 && hh <= 11) {
                return "早上好, ";
            } else if (hh > 11 && hh <= 13) {
                return "中午好, ";
            } else if (hh > 13 && hh <= 16) {
                return "下午好, ";
            } else if (hh > 16 && hh <= 19) {
                return "傍晚好, ";
            } else if (hh > 19 && hh <= 24) {
                return "晚上好, ";
            } else if ((hh > 0) & (hh <= 4)) {
                return "凌晨啦,多休息呀,";
            }
        },
        //底部栏动画
        show() {
            if (this.flag) {
                $("#pic").toggleClass("newPic");
                $("#information").animate(
                    {
                        width: "0"
                    },
                    500
                );
                $(".playState").animate(
                    {
                        width: "0"
                    },
                    500
                );
                $("#mainplay")
                    .stop(true, true)
                    .animate(
                        {
                            height: "750px"
                        },
                        500,
                        function() {
                            $(this).css({
                                overflow: "scroll"
                            });
                        }
                    );
                $("#mask")
                    .css("display", "block")
                    .animate(
                        {
                            opacity: "0.5"
                        },
                        500
                    );

                // $("#pic")
                //     .stop(true, true)
                //     .animate(
                //         {
                //             width: "325px",
                //             height: "325px"
                //         },
                //         3500
                //     );
                $("#outer").css({
                    transform: "scale(0.9,0.995)",
                    "border-radius": "40px 40px 0 0"
                });
                $("#topbar").css({
                    "border-radius": "40px 40px 0 0"
                });
                this.flag = !this.flag;
            } else {
                $("#mainplay").animate(
                    {
                        scrollTop: "0"
                    },
                    500,
                    function() {
                        $("#mask").animate(
                            {
                                opacity: "0"
                            },
                            500,
                            function() {
                                $(this).css("display", "none");
                            }
                        );
                        $("#pic").toggleClass("newPic");
                        $("#mainplay").animate(
                            {
                                height: "100px"
                            },
                            500,
                            function() {
                                $(this).css({
                                    overflow: "hidden"
                                });
                                $("#playState").animate(
                                    {
                                        width: "25vw"
                                    },
                                    500
                                );
                            }
                        );
                        this.ishidden = !this.ishidden;
                        $(".playState").animate(
                            {
                                width: "100px"
                            },
                            500
                        );

                        // $("#pic").animate(
                        //     {
                        //         width: "60px",
                        //         height: "60px"
                        //     },
                        //     500
                        // );
                        $("#information").animate(
                            {
                                width: "150px"
                            },
                            500
                        );
                        $("#topbar").css({
                            transform: "none",
                            "border-radius": "0"
                        });
                        $("#outer").css({
                            transform: "none",
                            "border-radius": "0"
                        });
                    }
                );

                this.flag = !this.flag;
            }
            //根据是否在播放歌曲,显示评论区
            if ($("#pic").attr("src") == "/static/img/音乐x2.a7876aae.png") {
                $(".review").css("display", "none");
            } else {
                $(".review").css("display", "block");
            }
        },
        //播放暂停
        changePlayState() {
            $(".burger2").toggleClass("open");
            if (this.$refs.myAudio.ispaused == false) {
                this.$refs.myAudio.clickToStop();
                this.$refs.myAudio.ispaused = true;
                //暂停渐变
                this.stopchangePointColor();
            } else {
                this.$refs.myAudio.clickToPlay();
                this.$refs.myAudio.ispaused = false;
                //开始渐变
                this.changePointColor();
            }
        },
        //下一曲
        getNextSong() {
            $("#u-l2")
                .stop(true, false)
                .animate(
                    {
                        left: "40px"
                    },
                    function() {
                        $("#u-l2")
                            .css({
                                left: "-25px"
                            })
                            .stop(true, false)
                            .animate({
                                left: "10px"
                            });
                    }
                );
            $("#u-l1")
                .stop(true, false)
                .animate(
                    {
                        top: "20px"
                    },
                    function() {
                        $("#u-l1").css({
                            top: "0px"
                        });
                    }
                );
            $("#u-l3")
                .stop(true, false)
                .animate(
                    {
                        top: "0px"
                    },
                    function() {
                        $("#u-l3").css({
                            top: "20px"
                        });
                    }
                );
            // myAudio.currentTime = myAudio.duration;
            if (this.list == 1) {
                this.$refs.sharepage.nextSong();
            } else {
                this.$refs.waittoplay.nextSong();
            }
        },
        //歌曲播放
        play(id) {
            Promise.all([this.getLrcInfo(id)]).then(res => {
                this.$refs.myAudio.audioPlay(
                    "https://music.163.com/song/media/outer/url?id=" +
                        id +
                        ".mp3"
                );
                //圆点渐变
                this.changePointColor();
                this.getPicInfo(id);
            });
            // ..获取评论
            this.$refs.rev.getGoodReview(id);
            this.$refs.rev.getNewReview(id);
        },

        //获取并处理歌词
        getLrcInfo(id) {
            var that = this;
            axios.get("/lyric?id=" + id).then(result => {
                if (result.data.lrc.lyric) {
                    var temp = result.data.lrc.lyric;
                    that.createLrcObj(temp);
                    that.songLrc.splice(0, that.songLrc.length);
                    that.oLRC.forEach(ele => {
                        if (ele != NaN) {
                            that.songLrc.push(ele);
                        }
                    });
                    that.oLRC.splice(0, that.oLRC.length);
                }
            });
        },

        //歌曲图片信息
        getPicInfo(id) {
            var that = this;
            axios.get("song/detail?ids=" + id).then(result => {
                //摄制播放器图片名称
                $("#pic").attr("src", "");
                $("#pic").attr(
                    "src",
                    result.data.songs[0].al.picUrl + "?param=325y325"
                );
                $("#songName span").text(result.data.songs[0].name);
                //标题滚动
                that.FBmove("songName");
                $("#maxSongName span").text(result.data.songs[0].name);
                that.FBmove("maxSongName");
                $("#maxSingerName span").text(
                    result.data.songs[0].ar[0].name +
                        "-" +
                        result.data.songs[0].al.name
                );
                that.FBmove("maxSingerName");
                //添加到最近播放列表
                var obj = {
                    id: result.data.songs[0].id,
                    alname: result.data.songs[0].al.name,
                    picUrl: result.data.songs[0].al.picUrl,
                    singer: result.data.songs[0].ar[0].name,
                    name: result.data.songs[0].name
                };
                var re = that.$refs.sharepage.latestPlayedList.findIndex(
                    ele => {
                        return ele.id == obj.id;
                    }
                );
                if (re == -1) {
                    that.$refs.sharepage.latestPlayedList.unshift(obj);
                } else {
                    var newPlay = that.latestPlayedList.splice(re, 1);
                    that.$refs.sharepage.latestPlayedList.unshift(obj);
                }
                // 位置不对(待做!!!!!!!!!!!!!!)
                // $('.lplp-totalNumber').text(that.latestPlayedList.length + '首歌')
            });
        },

        // 播放点的背景渐变
        changePointColor() {
            $("#point").css({
                animation: "bg-color 10s infinite"
            });
        },
        stopchangePointColor() {
            $("#point").css({
                animation: "none"
            });
        },
        //进度条拖动
        movePoint(event) {
            var e = event;
            var offset = e.offsetX;
            var skipRate = offset / $("#control").width();
            this.$refs.myAudio.audioMovePoint(skipRate);
        },

        //歌词处理函数
        createLrcObj(lrc) {
            if (lrc.length == 0) return;
            var lrcs = lrc.split("\n"); //用回车拆分成数组
            for (var i in lrcs) {
                //遍历歌词数组
                lrcs[i] = lrcs[i].replace(/(^\s*)|(\s*$)/g, ""); //去除前后空格
                var t = lrcs[i].substring(
                    lrcs[i].indexOf("[") + 1,
                    lrcs[i].indexOf("]")
                ); //取[]间的内容
                var c = lrcs[i].substring(lrcs[i].indexOf("]") + 1);
                var s = t.split(":"); //分离:前后文字
                var time = Number(s[0]) * 60 + parseInt(s[1]);
                var content = c;
                var obj = {
                    t: time,
                    c: content
                };
                this.oLRC.push(obj);
            }
        },
        //歌名无缝滚动函数
        FBmove(id) {
            $("#" + id).css({
                "white-space": "nowrap",
                overflow: "hidden"
            });
            var rest = $("#" + id + " span").width() - $("#" + id).width();
            if (rest > 0) {
                setTimeout(function() {
                    $("#" + id).animate(
                        {
                            scrollLeft: rest
                        },
                        7000,
                        function() {
                            setTimeout(function() {
                                $("#" + id).animate(
                                    {
                                        scrollLeft: 0
                                    },
                                    7000
                                );
                            }, 2000);
                        }
                    );
                }, 1000);
                setInterval(function() {
                    $("#" + id).animate(
                        {
                            scrollLeft: rest
                        },
                        7000,
                        function() {
                            setTimeout(function() {
                                $("#" + id).animate(
                                    {
                                        scrollLeft: 0
                                    },
                                    7000
                                );
                            }, 2000);
                        }
                    );
                }, 21000);
            }
        },
        //歌曲跳时
        skipTime(event) {
            var offset = event.offsetX;
            var Vskip = offset / this.vc_width;
            this.$refs.myAudio.setVolume(Vskip);
            $(".vc-fill").animate({
                width: offset
            });
            $(".vc-point").animate({
                left: offset
            });
        },
        // 打开最新专辑详情页面
        openNewAlbumDet() {
            this.$refs.nabd.show = true;
        },
        //打开新歌排行榜的详情页面
        opennewSongRankDet() {
            this.$refs.nabd.show = true;
        },

        getPreSong() {
            if (this.list == 1) {
                this.$refs.sharepage.preSong();
            } else {
                this.$refs.waittoplay.nextSong();
            }
            $("#m-l2")
                .stop(true, false)
                .animate(
                    {
                        left: "-25px"
                    },
                    function() {
                        $("#m-l2")
                            .css({
                                left: "40px"
                            })
                            .stop(true, false)
                            .animate({
                                left: "0"
                            });
                    }
                );
            $("#m-l1")
                .stop(true, false)
                .animate(
                    {
                        top: "20px"
                    },
                    function() {
                        $("#m-l1").css({
                            top: "0px"
                        });
                    }
                );
            $("#m-l3")
                .stop(true, false)
                .animate(
                    {
                        top: "0px"
                    },
                    function() {
                        $("#m-l3").css({
                            top: "20px"
                        });
                    }
                );
        },
        getNextSongSmall() {
            if (this.list == 1) {
                this.$refs.sharepage.nextSong();
            } else {
                this.$refs.waittoplay.nextSong();
            }
            $("#u-l21")
                .stop(true, false)
                .animate(
                    {
                        left: "40px"
                    },
                    function() {
                        $("#u-l21")
                            .css({
                                left: "-25px"
                            })
                            .stop(true, false)
                            .animate({
                                left: "10px"
                            });
                    }
                );
            $("#u-l11")
                .stop(true, false)
                .animate(
                    {
                        top: "20px"
                    },
                    function() {
                        $("#u-l11").css({
                            top: "0px"
                        });
                    }
                );
            $("#u-l31")
                .stop(true, false)
                .animate(
                    {
                        top: "0px"
                    },
                    function() {
                        $("#u-l31").css({
                            top: "20px"
                        });
                    }
                );
        },

        //控制主页字体动画
        shrinkFont() {
            $("#allTop").css({
                "font-size": "10px",
                color: "black",
                top: "12px",
                "margin-left": "20px"
            });
        },
        zommFont() {
            $("#allTop").css({
                "font-size": "40px",
                color: "white",
                top: "10px",
                "margin-left": "10px"
            });
        },
        //打开功能按钮页面
        openLatestPage() {
            bus.$emit("openLatestPage", {
                name: "最近播放",
                list: "LPL"
            });
        },

        //打开搜索界面
        openSearchPage() {
            this.$refs.searchpage.showSearchPage = true;
            this.shrinkFont();
        },
        //打开上部新歌速递页面
        opennewSongTransmit() {
            bus.$emit("openNewSongsTransmit", {
                name: "新歌速递",
                url: "/top/song?type=0"
            });
        },
        //评论
        mainplayEvent() {
            if ($("#mainplay").scrollTop() > 900) {
                this.$refs.rev.$refs.com.isdisplay = true;
            } else if ($("#mainplay").scrollTop() < 900) {
                this.$refs.rev.$refs.com.isdisplay = false;
            }
        },
        openMyStorePage() {
            bus.$emit("openMyStore");
        },
        openWaitToPlayList() {
            bus.$emit("openWaitToPlayList");
        },
        closeReco() {
            var that = this;
            //登录成功后显示和渲染每日推荐列表
            // that.$refs.dayreco.getDayReco();
            that.$refs.dayreco.isGetDayReco = false;
            // 登录成功后显示和渲染推荐歌单列表
            // that.$refs.recolists.getRecoLists();
            that.$refs.recolists.isGetDayReco = false;
            //登陆成功显示新歌精选列表
            // that.$refs.newsongreco.getNewSongList();
            that.$refs.newsongreco.isGetNewSongRecoList = false;
            that.state = 0;
            $("#login-userPic").attr("src", require("./assets/用户.png"));
            $("#login-userName").text("听说登录后歌曲更好听哦!");
            that.isLogin = !that.isLogin;
        },
        exitpage() {
            if (this.state == 1) {
                bus.$emit("openexitloginpage");
            } else {
                bus.$emit("openloginPage");
            }
            // bus.$emit("openexitloginpage");
        },
        boom(e) {
            console.log(e);
            $("#app").append(
                // <img src="./assets/picture/emoji_7@2x.png"/>
                '<div class="boomPic" style="position:absolute;z-index:100000;background-image:url(require("./assets/picture/emoji_7@2x.png"));width:10px;height:10px"></div>'
            );
            $(".boomPic").css({
                left: e.clientX + "px",
                top: e.clientY + "px"
            });
        }
    }
};
</script>
