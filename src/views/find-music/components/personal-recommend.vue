<template>
  <div>
    <div class="test"></div>
  </div>
</template>

<script>
import {getBanner} from '@/api/findMusic-personalRecommend'
export default {
    name:"PersonalRecommend",
    data(){
      return {
        bannerList:[]
      }
    },
    created() {
      // this.getBanner()
    },
    methods:{
      // 获取banner
      async getBanner() {
        try {
          const result = await getBanner()
          this.bannerList = result.banners
        } catch (error) {
          console.log('banner获取失败');
        }
      }
    }
}
</script>

<style lang='scss' scoped>
  .test{
    width: 1rem;
    height: 1rem;
    border: 1px solid red;
  }
</style>