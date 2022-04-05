<template>
    <div class="default-layout">
        <Nav></Nav>
        <slot />
        <Footer></Footer>
    </div>
</template>

<script>
import Nav from "@/components/nav"
import Footer from "@/components/footer"
export default {
    name: "DefaultLayout",
    components:{
        Nav,
        Footer
    }
}
</script>

<style scoped>
    .default-layout{
        height: 100%;
    }
     .homeWrap{
    display: flex;
  }
</style>