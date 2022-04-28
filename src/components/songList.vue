<template>
  <DefaultLayout>
    <div class="listWrapper">
    <!--滚动一定距离的帘幕-->
    <div class="top" v-if="isShowHead">
      <div class="title">标题</div>
      <div class="btn">
        <div class="play">
          <i class="iconfont icon-zantingbofang"></i>
        </div>
        <div class="newSongList">
          <i class="iconfont icon-xinjianwenjianjia"></i>
        </div>
        <div class="share" v-if="!$route.path.includes('dayRecommend')">
          <i class="iconfont icon-fenxiang1"></i>
        </div>
        <div class="download" v-if="!$route.path.includes('dayRecommend')">
          <i class="iconfont icon-xiazai"></i>
        </div>
      </div>
    </div>
    <!--每日推荐-->
    <div class="type_1_head" v-if="$route.path.includes('dayRecommend')">
      <div class="line1">
        <div class="canlender">
          <i class="iconfont icon-rili"></i>
          <div class="date">11</div>
        </div>
        <div class="info">
          <div class="title">每日歌曲推荐</div>
          <div class="des">根据你的音乐口味生成，每天6:00更新</div>
        </div>
      </div>
      <div class="line2">
        <div class="playAll">
          <div class="left">
            <i class="iconfont icon-bofang_o"></i>
            播放全部
          </div>
          <div class="right">
            <i class="iconfont icon-jia"></i>
          </div>
        </div>
        <div class="collection">
          <i class="iconfont icon-xinjianwenjianjia"></i>
          <span>收藏全部</span>
        </div>
      </div>
    </div>
    <!--榜单-->
    <div class="type_2_head"></div>
    <!--歌单-->
    <div class="type_2_head"></div>
    <!--主播电台-->
    <div class="type_2_head"></div>
    <div class="contentWrapper">
      <div class="tab" v-if="!$route.path.includes('dayRecommend')">
        <div>歌曲列表</div>
        <div>评论</div>
        <div>收藏者</div>
      </div>
      <div class="content">
        <div class="head">
          <div class="wrapper">
            <div class="musicTitle">
              <span>音乐标题</span>
              <!-- <div class="sort" v-if="titleSort === 0">
              <i></i>
            </div>
            <div class="sort" v-if="titleSort === 1">
              <span>升序</span>
              <i></i>
            </div>
            <div class="sort" v-if="titleSort === 2">
              <span>降序</span>
              <i></i>
            </div> -->
            </div>
            <div class="songer">
              <span>歌手</span>
              <!-- <div class="sort" v-if="songgerSort === 0">
                <i></i>
                </div>
                <div class="sort" v-if="songgerSort === 1">
                <span>升序</span>
                <i></i>
                </div>
                <div class="sort" v-if="songgerSort === 2">
                <span>降序</span>
                <i></i>
                </div> -->
            </div>
            <div class="album">
              <span>专辑</span>
              <!-- <div class="sort" v-if="albumSort === 0">
                <i></i>
                </div>
                <div class="sort" v-if="albumSort === 1">
                <span>升序</span>
                <i></i>
                </div>
                <div class="sort" v-if="albumSort === 2">
                <span>降序</span>
                <i></i>
                </div> -->
            </div>
            <div class="time">
              <span>时长</span>
              <!-- <div class="sort" v-if="timeSort === 0">
                <i></i>
                </div>
                <div class="sort" v-if="timeSort === 1">
                <span>升序</span>
                <i></i>
                </div>
                <div class="sort" v-if="timeSort === 2">
                <span>降序</span>
                <i></i>
                </div> -->
            </div>
          </div>
        </div>
        <div class="songList" v-for="(item, index) in songList" :key="index" :class="index % 2 == 0 ? 'odd' : 'even'" v-on:dblclick="playMusic(item)">
          <div class="songlistWrapper">
            <div class="otherInfo">
              <div class="numWrap" v-if="$store.state.modulePLayingSongInfo.info.id === item.id">
                <div class="num" v-if="$store.state.modulePLayingSongInfo.isPlaying">
                  <i class="iconfont icon-yinlianglabashengyin" style="color:#d33b31"></i>
                </div>
                <div class="num" v-else>
                  <i class="iconfont icon-jingyin1" style="color:#d33b31"></i>
                </div>
              </div>
             
              <div class="num" v-else>{{ numFormat(index) }}</div>
              <div class="collection">
                <i class="iconfont icon-aixin"></i>
                <!-- <i class="iconfont icon-aixin"></i> -->
              </div>
              <div class="download">
                <i class="iconfont icon-xiazai"></i>
              </div>
            </div>
            <div class="wrapper" >
              <div class="musicTitle">
                <span>{{item.name}}</span>
                <div class="isSQ" >SQ</div>
                <div class="mv" v-if="item.mv">
                  <i class="iconfont icon-bofang2"></i>
                </div>
                <div class="menu" @click="menuSelf(item)">
                  <i class="iconfont icon-shenglvehao"></i>
                </div>
              </div>
              <div class="songer" >
                <span @click.stop="goSongerPage(item)">{{item.ar[0].name}}</span>
              </div>
              <div class="album" >
                <span @click.stop="goAlbumpage(item)">{{item.al.name}}</span>
              </div>
              <div class="time">
                <span>{{timeCalc(item.dt)}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </DefaultLayout>
</template>

<script>
// const ipcRenderer = window.require('electron').ipcRenderer
// 暂时没做登录 日推用历史推送记录
// 大致思路：
// 
import {Howl,Howler} from 'howler'
import {getMusicUrl} from '@/api/common'
import {getDayRecommendSongList} from '@/api/findMusic-personalRecommend'
import { mapState } from 'vuex'
export default {
  name: 'SongList',
  data() {
    return {
      isShowHead: false,
      activeIndex: 0,

      songList: [],
      titleSort: 0,
      songerSort: 0,
      albumSort: 0,
      timeSort: 0,
      playOptions:{
        src:[],
        loop:false,
        volume:0,
        autoplay:false
      },
      sound:null,
    }
  },
  created() {
    this.getSongList()
  },
  mounted() {
    
  },  
  computed:{
    ...mapState('modulePLayingSongInfo',['isPlaying', 'type', 'info']),
  },  
  methods: {
    async playMusic(item) {
      if(this.isPlaying && this.info.id === item.id) return;
      Howler.unload()
      this.$store.commit('modulePLayingSongInfo/updatePLaying', {
        type:'dayRecommend',
        info:{
          name: item.name,
          id:item.id,
          ar: item.ar,
          alia:item.alia,
          fee:item.fee,
          mv:item.mv,
          dt:item.dt,
          al:item.al
        }
      })

      const url = await getMusicUrl(item.id)
      this.sound = new Howl({
        src:[url.data[0].url],
        loop:true,
        autoplay:true,
        volume:0.5,
      })
      this.sound.play()
    },

    // 跳转歌手详情页
    goSongerPage(item) {
      console.log(item,'跳转歌手详情页');
    },
    goAlbumpage(item) {
      console.log(item, '跳转专辑详情页');
    },
    async getSongList() {
      if(this.$route.path.includes('dayRecommend')) {
        const result = await getDayRecommendSongList()
        console.log(result, 'result');
        this.songList = result.data.dailySongs
      }
    },
    menuSelf() {

    },
    timeCalc(time ){
      const min = Math.floor(time / 1000 / 60)
      const sec = Math.floor(time / 1000 ) % 60
      return (min < 10 ? '0' + min : min) + ':' + (sec< 10 ?'0' + sec : sec)
    },
    numFormat(index) {
      return index < 9 ? `0${index + 1}` : index + 1
    },
  },
}
</script>

<style lang="scss" scoped>
.top {
  background-color: white;
  width: 100%;
  height: 80px;
  padding: 10px 30px;
  position: fixed;
  top: 50px;
  &::-webkit-scrollbar {
    display: none;
  }
  @include flex(column, space-between, flex-start);
  .title {
    color: #000;
    // font-weight: bold;
    font-size: 22px;
  }
  border-bottom: 1px solid #e8e8e8;
  .btn {
    @include flex(row, flex-start, center);
    i {
      color: #ababab;
      font-size: 22px;
    }
    div {
      margin-right: 30px;
    }
    .play i {
      color: rgba($color: #d33b31, $alpha: 0.9);
    }
  }
}
.type_1_head {
  height: 165px;
  background-color: white;
  border-bottom: 1px solid #e8e8e8;
  padding: 5px 30px 10px;
  .line1 {
    @include flex(row, flex-start, flex-start);
    .canlender {
      position: relative;
      margin-right: 25px;
      @include flex(row, center, center);
      i {
        font-size: 80px;
        color: #d33b31;
        // font-weight: bold;
      }
      .date {
        position: absolute;
        color: #d33b31;
        font-size: 24px;
        top: 45%;
        font-weight: bold;
      }
    }
    .info {
      padding-top: 10px;
      .title {
        font-size: 20px;
        margin-bottom: 4px;
      }
      .des {
        color: #909090;
      }
    }
  }
  .line2 {
    margin-top: 30px;
    display: flex;
    padding-left: 8px;
    .playAll {
      margin-right: 10px;
      @include flex(row, flex-start, center);
      .left {
        width: 105px;
        height: 30px;
        background-color: #e9473c;
        color: white;
        @include flex(row, center, center);
        border-top-left-radius: 15px;
        border-bottom-left-radius: 15px;
        i {
          color: white;
          font-size: 24px;
        }
      }
      .right {
        width: 35px;
        height: 30px;
        background-color: #d63c32;
        // border-left: 0.5px solid white;
        @include flex(row, center, center);
        border-top-right-radius: 15px;
        border-bottom-right-radius: 15px;
        i {
          color: white;
          font-size: 20px;
        }
      }
    }
    .collection {
      width: 107px;
      height: 30px;
      border: 1px solid #e8e8e8;
      @include flex(row, center, center);
      border-radius: 15px;
      i {
        font-size: 20px;
        margin-right: 4px;
      }
      span {
        color: #9b9b9b;
        font-size: 13px;
      }
      &:hover {
        background-color: #f4f4f4;
      }
    }
  }
}
.contentWrapper {
  width: 100%;
  padding-bottom: 90px;
  .content {
    width: 100%;
    .head {
      padding-left: 115px;
      box-sizing: border-box;
      height: 35px;
      width: 100%;
      div {
        padding-left: 4px;
      }
      .wrapper {
        width: 100%;
        @include flex(row, flex-start, center);
        .musicTitle {
          line-height: 35px;
          width: 41.7%;
          // height: 35px;
          color: #959595;
          font-size: 12px;
          &:hover {
            background-color: #f4f4f5;
            cursor: pointer;
          }
        }
        .songer {
          // height: 35px;
          line-height: 35px;
          width: 20%;
          color: #959595;
          font-size: 12px;
          &:hover {
            background-color: #f4f4f5;
          }
        }
        .album {
          // height: 35px;
          line-height: 35px;
          width: 27.3%;
          color: #959595;
          font-size: 12px;
          &:hover {
            background-color: #f4f4f5;
          }
        }
        .time {
          // height: 35px;
          line-height: 35px;
          width: 11%;
          color: #959595;
          font-size: 12px;
          &:hover {
            background-color: #f4f4f5;
          }
        }
      }
    }
    .songList {
      width: 100%;
      height: 35px;
      // @include flex(row, flex-start, center);
      .songlistWrapper{
        width: 100%;
        @include flex(row, flex-start, center);
         &:hover {
          background-color: #f4f4f5;
        }
        .otherInfo {
          width: 115px!important;
            padding-left: 20px;
          //   box-sizing: border-box;
          color: #b1b1b1;
            &:hover{
            background-color: #f4f4f5;

          }
          @include flex(row, flex-start, center);
          font-size: 12px;
          .num {
            margin-right: 24px;
            width: 15px;
          }
          .collection {
            margin-right: 14px;
            &:hover {
              color: #777;
            }
          }
          .download:hover {
            color: #777;
          }
        }
      .wrapper {
        width: calc(100% - 115px);
        height: 35px;
        @include flex(row, flex-start, center);
         .menu{
           display: none;
           i{
             font-size: 20px;
             
           }
          }
        &:hover{
          background-color: #f4f4f5;
          .menu{
            display: block;
            i{
             color: #9b9b9b;
             &:hover{
               color: #4f4f4f;
             }
            }
          }
        }
        .musicTitle {
          color: #4f4f4f;
          width: 41.7%;
          padding-left: 8px;
          @include flex(row, flex-start, center);
          .isSQ{
            width: 18px;
            height: 12px;
            border: 1px solid #f7672e;
            font-size: 9px;
            color: #f7672e;
            text-align: center;
            line-height: 10px;
            border-radius: 3px;
            margin: 0 4px;

          }
          .mv {
            // padding-top: 2px;
            i{
              font-size: 18px;
            color: #d85952;
            
          }
          }
          
         

        }
        .songer {
          width: 20%;
          padding-left: 6px;
           &:hover{
            cursor: pointer;
            color: #737373;
          }
        
        }
        .album {
          width: 27.3%;
          padding-left: 6px;
           @include multiEllipsis(1);
          &:hover{
            cursor: pointer;
            color: #737373;
          }
        }
        .time {
          width: 10%;
          padding-left: 6px;
          color: #d8d8d9;
          // padding-left: 5px;
        }
        .songer,
        .album {
          color: #adadad;
        }
      }
      }
      
      
      
    }
    .odd {
        background-color: #fbfbfb;
      }
      .even {
        background-color: white;
      }
  }
}
</style>
