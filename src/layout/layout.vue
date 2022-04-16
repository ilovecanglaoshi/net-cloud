<template>
    <div class="default-layout">
       <Nav></Nav>
        <div class="content d-flex">
        <Side></Side>
        <div class="rightContent">
            <!-- <router-view></router-view> -->
            <slot></slot>
        </div>
        </div>
    </div>
</template>

<script>
import Side from '@/components/side'
import Nav from "@/components/nav"
// import Footer from "@/components/footer"
export default {
    name: "DefaultLayout",
    components:{
        Nav,
        Side
        // Footer
    }
}
</script>

<style scoped lang='scss'>
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
</style>