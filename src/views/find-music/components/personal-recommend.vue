<template>
  <div class="wrapper">
    <div class="recommendWrapper">
      <recommendCarousel :width='7.4' :height='2' :list='bannerList'></recommendCarousel>
      <recommendSongList></recommendSongList>
      <unique></unique>
      <newMusic></newMusic>
      <recommendMv></recommendMv>
    </div>
  </div>
</template>

<script>
import newMusic from '@/components/find-personal-recommend/newMusic'
import unique from '@/components/find-personal-recommend/unique.vue'
import recommendSongList from '@/components/find-personal-recommend/recommend-song-list.vue'
import recommendCarousel from '@/components/find-personal-recommend/recommend-carousel/index.vue'
import {getBanner} from '@/api/findMusic-personalRecommend'
import recommendMv from '@/components/find-personal-recommend/recommendMv'
export default {
    name:"PersonalRecommend",
    components:{
      recommendCarousel,
      recommendSongList,
      unique,
      newMusic,
      recommendMv
    },
    data(){
      return {
        bannerList:[]
      }
    },
    created() {
      this.getBanner()
    },
    methods:{
      // 获取banner
      async getBanner() {
        
        try {
          const result = await getBanner()
          this.bannerList = result.banners
          console.log(this.bannerList, 'this.bannerList');
        } catch (error) {
          console.log('banner获取失败');
        }
      }
    }
}
</script>

<style lang='scss' scoped>
.wrapper{
  padding-bottom: 100px;
  .recommendWrapper{
    overflow-y: scroll;
    display: flex;
    // align-items: center;
    overflow-x: hidden;
    flex-direction: column;
    justify-content: center;
  }
}
 
</style>