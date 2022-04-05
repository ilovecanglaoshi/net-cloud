<template>
  <div>私人fm</div>
</template>

<script>
import {getBanner} from '@/api/test'
export default {
    name:'PersonalFM',
    created() {
      console.log('请求前');
      this.getBanner()
    },
    methods:{
      async getBanner() {
        const result = await getBanner()
        console.log(result, 'result');
      }
    }
}
</script>

<style>

</style>