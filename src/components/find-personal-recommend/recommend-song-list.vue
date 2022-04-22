<template>
  <div class="recommendSongListWrapper">
    <div class="label">
      <span>推荐歌单</span>
      <i class="iconfont icon-jiantou_liebiaoxiangyou_o"></i>
    </div>
    <div class="wrapper" >
      <div class="listWrapper">
        <div class="dayRecommend" @click="goDayRecommend">
          <div class="dayRecommendPic">
            <div class="mask">根据您的音乐口味生成每日更新</div>
            <div class="btn">
              <i class="iconfont icon-bofang" ></i>
            </div>
            <div class="canlender">
              <i class="iconfont icon-rili"></i>
            </div>
            <div class="date">{{12}}</div>
          </div>
          
          <div class="title">每日歌曲推荐</div>
        </div>
        <div class="recommendItem" v-for="item in recommendList" :key="item.id" >
          <div
            class="picWrap"
            :style="{ backgroundImage: 'url(' + item.picUrl + ')' }"
          >
            <div class="btn">
              <i class="iconfont icon-bofang" ></i>
            </div>
          </div>
          <div class="title">{{ item.name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getRecommendSongList } from '@/api/findMusic-personalRecommend'
export default {
  name: '',
  data() {
    return {
      recommendList: [],
    }
  },
  created() {
    this.getRecommendSongList()
  },
  methods: {
    async getRecommendSongList() {
      try {
        const result = await getRecommendSongList()
        this.recommendList = result.result
        console.log(result)
      } catch (error) {
        console.log(error)
      }
    },
    goDayRecommend() {
      this.$router.push('/songlist/dayRecommend/dayRecommend')
    }
  },
}
</script>

<style lang="scss" scoped>

.recommendSongListWrapper {
  margin-top: 25px;
  // padding: 0 .3rem;
  // display: flex;
  // flex-direction: column;
  // align-items: center;
  // justify-content: center;
  .label {
    color: #333;
    font-size: 18px;
    // font-weight: bold;
    margin: auto;
    @include flex(row, flex-start, center);
    margin-bottom: 15px;
    width: 7.4rem;
    max-width: 1040px;

    span {
      margin-right: -8px;
    }
    i {
      font-size: 40px;
    }
  }
  .wrapper{
    width: 7.4rem;
    max-width: 1040px;
    margin: auto;
  }
  .listWrapper {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    //   justify-content: space-between;
    .dayRecommend {
      margin-right: 17px;
      width: 1.33rem;
      max-width: 193px;
      // @include flex(row, center, center);
      .dayRecommendPic {
        position: relative;
        height: 1.33rem;
        max-height: 193px;
        border-radius: 10px;
        // border: 1px solid red;
        margin-bottom: 6px;
        overflow: hidden;
        @include flex(row, center, center);
        background-color: #000000;
        .btn {
          display: none;
          position: absolute;
          bottom: 8px;
          @extend .pauseBtn;
          right: 12px;
          border-radius: 50%;
          i {
            @include btn_1(0.7);
          }
        }
        &:hover {
          cursor: pointer;
          .mask {
            display: block;
          }
          .btn {
            display: block;
          }
        }
        .canlender{
         i{
            color: white;
          // font-weight: bold;
          font-size: 100px;
         }
        }
        .date{
          color: white;
          font-size: 30px;
          position: absolute;
          top: 45%;
        }
      }
       
      .title {
        color: #575757;
        font-size: 12px;
        &:hover {
          cursor: pointer;
          color: #333;
        }
      }
      .mask {
        height: 0.5rem;
        background-color: rgba($color: #000000, $alpha: 0.4);
        color: white;
        font-size: 12px;
        position: absolute;
        top: 0;
        width: 100%;
        padding: 8px;
        display: none;
      }
    }
    .recommendItem {
      margin-right: 17px;
      margin-bottom: 43px;
      // min-width: 133px;
      // max-width: 193px;
      width: 1.33rem;
        max-width: 193px;
      // width: 19%;
      // height: 40%;
      .picWrap {
         
        // height: 19%;
        
        position: relative;
        height: 1.33rem;
        max-height: 193px;
        
        border-radius: 10px;
        // border: 1px solid red;
        margin-bottom: 6px;
        position: relative;
        background-size: 100% 100%;
        .btn {
          display: none;
          position: absolute;
          @extend .pauseBtn;
          border-radius: 50%;
          bottom: 8px;
          right: 12px;
          i {
             @include btn_1(0.7);
          }
        }
        &:hover {
          cursor: pointer;
          .btn {
            display: block;
          }
        }
      }
      .title {
        color: #575757;
        font-size: 12px;
        width: 1.33rem;
        max-width: 193px;
        @include multiEllipsis;
        &:hover {
          cursor: pointer;
          color: #333;
        }
      }
    }
    .recommendItem:nth-child(5),.recommendItem:nth-child(10){
      margin-right: 0;
    }
    .recommendItem:nth-child(n+6) {
      margin-bottom: 0;
    }
  }
}
</style>
