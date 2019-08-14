<template>
    <div class="home">
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
        <player></player>   
    </div>
</template>
<script>
import home from '../home/home'
import player from '../player/player'
export default {
    name: 'index',
    data () {
        return {
        
        }
    },
    components: {
        home,
        player
    },
    mounted (){
    
    },
    methods:{
        
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='stylus'>
    .home
        width:100%
        height:100%
        padding-bottom:1rem
</style>