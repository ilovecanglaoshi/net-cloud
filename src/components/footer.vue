<template>
  <div class="footerWrapper">
    <div class="progressBar"></div>
    <div class="content">
      <div class="leftWrapper" style="height:100%">
        <div class="left" v-if="type">
          <div class="icon">
            <img :src="info.al.picUrl" alt="">
          </div>
          <div class="info">
            <div class="line1">
              <div class="songName">
                <span class="name">{{info.name}}</span>
                <div class="alias" v-if="info.alia.length">{{(info.alia[0])}}</div>
              </div>
              <div class="author"> - {{info.ar[0].name}}</div>
            </div>
            <div class="line2">
              <span>00:00</span>
              /
              <span>{{timeCalc(info.dt)}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="middle">
        <div class="collection">
          <i class="iconfont icon-aixin"></i>
        </div>
        <div class="toLeft">
          <i class="iconfont icon-diyiyeshouyeshangyishou"></i>
        </div>
        <div class="play">
          <i class="iconfont icon-zanting2x" v-if="isPlaying" @click="pause"></i>
          <i class="iconfont icon-zanting1" v-else @click="play"></i>
        </div>
        <div class="toRight">
          <i class="iconfont icon-zuihouyiyemoyexiayishou"></i>
        </div>
        <div class="share">
          <i class="iconfont icon-fenxiang"></i>
        </div>
      </div>
      <div class="right">
        <div class="musicEffect">
          <i class="iconfont icon-jingyu" style="font-size:20px;color:black"></i>
        </div>
        <div class="cycle">
          <i class="iconfont icon-liebiaoxunhuan" style="font-size:20px;color:#505050"></i>
        </div>
        <div class="nowPlay">
          <i class="iconfont icon-icon-test" style="font-size:23px;color:#505050"></i>
        </div>
        <div class="lyric">
          <i class="iconfont icon-geci24" style="font-size:25px;color:#505050"></i>
        </div>
        <div class="vol">
          <i class="iconfont icon-shengyin" style="font-size:18px;color:#505050"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name:'Footer',
  data() {
    return {
      // isPlay:false
    }
  },
  methods:{
     timeCalc(time ){
      const min = Math.floor(time / 1000 / 60)
      const sec = Math.floor(time / 1000 ) % 60
      return (min < 10 ? '0' + min : min) + ':' + (sec< 10 ?'0' + sec : sec)
    },
    pause() {
      this.$store.commit('modulePLayingSongInfo/updateStatus', false)
    },
    play() {
      this.$store.commit('modulePLayingSongInfo/updateStatus', true)
    }
  },
  computed:{
    ...mapState('modulePLayingSongInfo',['isPlaying', 'type', 'info']),
    // isPlay() {
    //   return this.$store.state.modulePLayingSongInfo.isPlaying
    // }
  }
}
</script>

<style lang='scss' scoped>
  .footerWrapper{
    height: 60px;
    width: 100%;
    background-color: white;
    position: fixed;
    bottom: 0;
     &::-webkit-scrollbar{
         display:none
    }
    left: 0;
    .progressBar{
      height: 2px;
      // width: ;
      background-color: #d33b31;
    }
    .content{
      padding: 0 20px 0 10px;
      @include flex(row, space-between, center);
      width: 100%;
      .leftWrapper{
        flex:1;
        @include flex(row, space-between, center);
      }
      .left{
        // width: 100%;
        @include flex(row, flex-start, center);
        .icon{
          width: 40px;
          height: 40px;
          border-radius: 4px;
          margin-right: 6px;
          overflow: hidden;
          img{
            width: 100%;
            height: 100%;
          }
        }
        .info{
          height: 40px;
          @include flex(column, space-between, flex-start);
          .line1{
             @include flex(row, flex-start, center);
             .songName{
               @include flex(row, flex-start, center);
               font-size: 13px;
              // width: 2.15rem;
               .name{
                // @include no-wrap(1.1rem);
                
               }
               .alias{
                 color: #868686;
               }
             }
             .author{
               color: #868686;
             }
          }
          
          .line2{
            font-size: 12px;
            color: #868686;
          }
        }
      }
      .middle{
        flex:1;
        // width: 2.4rem;
        margin: auto;
        @include flex(row, center, center);
        .toLeft,.toRight{
          color: #d33b31;
          i{
            font-size: 30px;
          }
        }
        .toLeft{
          margin-left: 28px;
        }
        .toRight{
          margin-right: 28px;
        }
        .collection i, .share i{
          font-size: 18px;
        }
        .play{
          margin: 0 18px;
         i{
            color: #d33b31;
            font-size: 40px;
         }
        }
      }
      .right{
        flex:1;
        @include flex(row, flex-end, center);
        div:not(:last-child){
          margin-right:15px
        }
      }
    }
  }
</style>