<template>
  <div id="app">
    <!-- <Nav></Nav>
    <div class="content d-flex">
      <Side></Side>
      <div class="rightContent">
        <router-view></router-view>
      </div>
    </div> -->
    <router-view></router-view>
  </div>
</template>
<script>
// import Nav from '@/components/nav'
// import Side from '@/components/side'
export default {
  name: 'app',
  components: {
    // Nav,
    // Side,
  },
  data() {
    return {}
  },
}
</script>
<style lang="scss">
html,
body,
#app {
  height: 100%;
  width: 100%;
   &::-webkit-scrollbar{
         display:none
    }
  box-sizing: border-box;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  .content{
    // margin-top: 50px;
    height: 100%;
    .rightContent{
      margin-left: 200px;
      padding-top: 50px;
      // margin-top: 50px;
      width: calc(100% - 200px);
    }
  }
}
</style>
