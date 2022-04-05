export default{
    name:'ISFindMusic',
    computed:{
        isFindMusic() {
            return this.$route.path.startsWith('/findMusic')
        }
    }
}