<template>
  <div>
    <div class="recommendWrapper">
      <recommendCarousel :width='7.4' :height='2' :list='bannerList'></recommendCarousel>
    </div>
  </div>
</template>

<script>
import recommendCarousel from '../../../components/recommend-carousel/index.vue'
import {getBanner} from '@/api/findMusic-personalRecommend'
export default {
    name:"PersonalRecommend",
    components:{
      recommendCarousel
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
    display: flex;
    // align-items: center;
    justify-content: center;
  }
</style>