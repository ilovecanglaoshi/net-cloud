<template>
  <div class="navWrapper d-flex">
    <div class="left bg-black_11">
      <div class="arrow d-flex">
        <div class="toleft mr-10" @click="goBack($route.path)">
          <i
            class="iconfont icon-jiantou_liebiaoxiangzuo_o "
            style="font-size: 35px;"
            :class="$routerHistory.canBack($route.path)?'red':'text-black_6'"
          ></i>
        </div>
        <div class="toright" @click="goForward($route.path)">
          <i
            class="iconfont icon-jiantou_liebiaoxiangyou_o "
            style="font-size: 35px;"
            :class="$routerHistory.canForward($route.path)?'red':'text-black_6'"
          ></i>
        </div>
      </div>
    </div>
    <div class="right bg-black_12">
      <div class="find" v-if="isActive('/findMusic')">
        <div :class="activeIndex == 0 ? 'active' : ''" @click="activeIndex = 0">
          个性推荐
        </div>
        <div :class="activeIndex == 1 ? 'active' : ''" @click="activeIndex = 1">
          歌单
        </div>
        <div :class="activeIndex == 2 ? 'active' : ''" @click="activeIndex = 2">
          主播电台
        </div>
        <div :class="activeIndex == 3 ? 'active' : ''" @click="activeIndex = 3">
          排行榜
        </div>
        <div :class="activeIndex == 4 ? 'active' : ''" @click="activeIndex = 4">
          歌手
        </div>
        <div :class="activeIndex == 5 ? 'active' : ''" @click="activeIndex = 5">
          最新音乐
        </div>
      </div>
      <div class="personalfm" v-if="isActive('/personalFm')"></div>
      <div class="dayRecommend" v-if="isActive('/songlist')"></div>
      <div class="video" v-if="isActive('/video')">
        视频 / mv
      </div>
      <div class="friends" v-if="isActive('/friends')">
        动态 / 发布动态
      </div>
       <div class="pretty" v-if="isActive('/prettyCommon')">
        精彩评论
      </div>
      <div class="set d-flex">
        <div class="search">
          <div class="searchIcon">
            <i class="iconfont icon-sousuo"></i>
          </div>
          <input type="text" placeholder="搜索" />
        </div>
        <div class="setting">
          <i class="iconfont icon-shezhi fs-9"></i>
        </div>
        <div class="info">
          <i class="iconfont icon-youjian1 fs-9"></i>
        </div>
        <div class="skin">
          <i class="iconfont icon-icon-pifu fs-9"></i>
        </div>
        <div class="min">
          <i class="iconfont icon-lib-chuangkouhua fs-9"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import History from '@/utils/history'
export default {
  name: 'Nav',
  data() {
    return {
      activeIndex: 0,
    }
  },
  watch:{
    activeIndex() {
      if(!this.$route.path.startsWith('/find')) return;
      switch (this.activeIndex) {
        case 0:
          this.$router.push('/findMusic/personalRecommend')
          break;
        case 1:
          this.$router.push('/findMusic/songList')
          break;
        case 2:
          this.$router.push('/findMusic/hostRadio')
          break;
        case 3:
          this.$router.push('/findMusic/rank')
          break;
        case 4:
          this.$router.push('/findMusic/singer')
          break;
        case 5:
          this.$router.push('/findMusic/newMusic')
          break;
        default:
          break;
      }
    },
    '$route.path':{
      handler(newVal) {
        if(newVal == '/findMusic/personalRecommend') {
          this.activeIndex = 0
        }
        if(newVal == '/findMusic/songList') {
          this.activeIndex = 1
        }
        if(newVal == '/findMusic/hostRadio') {
          this.activeIndex = 2
        }
        if(newVal == '/findMusic/rank') {
          this.activeIndex = 3
        }
        if(newVal == '/findMusic/singer') {
          this.activeIndex = 4
        }
        if(newVal == '/findMusic/newMusic') {
          this.activeIndex = 5
        }
      }
    }
  },
  created() {
    this.activeIndex = 0
    console.log(this.$route)
  },
  computed: {
    // isFindMusic() {
    //   return this.$route.path.startsWith('/findMusic')
    // }
  },
  methods: {
    goBack() {
      console.log(History._history, 'History._historyHistory._history');
      // this.$router.back()
      this.$router.goBack()
    },
    goForward() {
      console.log(History._history, 'History._historyHistory._history');
      // history.forward()
      this.$router.goForward()
      // console.log(this.$route);
      // this.$router.go(1);
    },
    isActive(path) {
      return this.$route.path.startsWith(path)
    },
  },
}
</script>

<style lang="scss" scoped>
.navWrapper {
  height: 50px;
  position: fixed;
  z-index: 9;
  top: 0;
  // background-color: red;
  width: 100%;
  /* 设置标题栏可以拖拽 */
  -webkit-app-region: drag;
  .left {
    width: 200px;
    position: relative;
    .arrow {
      position: absolute;
      right: 1px;
      bottom: 8px;
      .toleft,
      .toright {
        width: 30px;
        height: 30px;
        @include flex(row, center, center) // text-align: center;
          // line-height: 22px;;;
      }
      .toleft:hover,
      .toright:hover {
        width: 30px;
        height: 30px;
        background-color: #e9e9e9;
        border-radius: 50%;
      }
    }
    .red{
      color: red;
    }
  }
  .right {
    flex: 1;
    padding: 0 18px 0 32px;
    position: relative;
    @include flex(row, space-between, center);
    > div:nth-child(1) {
      flex: 1;
      // margin-right: 20px;
    }
    .find {
      @include flex(row, flex-start, center);

      font-size: 14px;
      div {
        margin-right: 28px;
        color: #898989;
        &:hover {
          color: #000;
          font-weight: bold;
        }
      }
      .active {
        color: #000;
        font-weight: bold;
      }
    }
    .set {
      // position: ;
      @include flex(row, center, center);
      color: #585858;
      .search {
        width: 150px;
        height: 27px;
        border-radius: 20px;
        background-color: #ececec;
        @include flex(row, flex-start, center);
        padding-left: 6px;
        input {
          width: calc(100% - 30px);
          outline: none;
          border: none;
          background-color: #ececec;
        }
        input::placeholder {
          color: #cbcbcb;
        }
      }
      .setting,
      .skin,
      .info {
        width: 25px;
        height: 25px;
      }
      .setting:hover,
      .skin:hover,
      .info:hover {
        width: 25px;
        height: 25px;
        background-color: #e9e9e9;
        border-radius: 50%;
      }
      > div {
        margin-right: 16px;
        @include flex(row, center, center);
      }
      div:last-child {
        margin-right: 0;
      }
    }
  }
}
</style>
