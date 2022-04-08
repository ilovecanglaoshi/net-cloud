<template>
  <div>
    <div class="recommendWrapper">
      <recommendCarousel :width='7.4' :height='2' :list='bannerList'></recommendCarousel>
      <recommendSongList></recommendSongList>
    </div>
  </div>
</template>

<script>
import recommendSongList from '@/components/find-personal-recommend/recommend-song-list.vue'
import recommendCarousel from '@/components/find-personal-recommend/recommend-carousel/index.vue'
import {getBanner} from '@/api/findMusic-personalRecommend'
export default {
    name:"PersonalRecommend",
    components:{
      recommendCarousel,
      recommendSongList
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
  .recommendWrapper{
    overflow-y: scroll;
    display: flex;
    // align-items: center;
    overflow-x: hidden;
    flex-direction: column;
    justify-content: center;
  }
</style>