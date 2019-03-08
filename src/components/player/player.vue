<template>
    <div class="player">
        <div class="logo">
            <img :src="singing.img" alt="">        
        </div>
        <div class="lyric">
            <div class="title"></div>
        </div>
        <div class="iconfont" :class="isPlay?'icon-bofang':'icon-bofang1'"></div>
        <div class="iconfont icon-liebiao"></div>
        <!-- <audio :src="singing.audioSrc" autoplay></audio> -->
    </div>
</template>

<script>
import { Toast } from 'mint-ui'
import { Indicator } from 'mint-ui'
import { mapState , mapActions} from 'vuex'
export default {
  name: 'player',
  data () {
      return {
      }
  },
  computed: {
      ...mapState('player',{
          songs: state => state.songs,
          singing: state => state.singing,
          isPlay: state => state.isPlay
      })
  },
  mounted (){
  },
  methods:{
  }

}
</script>

<style scoped lang="stylus">
.player
    width:100%
    height:1rem
    box-shadow: 0px -0.5px 0 0 $grayColor
    position:fixed
    bottom:0
    left:0
    display:-webkit-box
    -webkit-box-align:center
    -webkit-box-orient: horizontal
    .logo,.iconfont
        width:.7rem
        height:.7rem
        margin:0 .2rem
    .logo
        border-radius:.35rem
        overflow:hidden
        img
            width:100%
            height:100%
    .iconfont
        color:$mainColor
        font-size:.5rem
        display:-webkit-box
        -webkit-box-align:center
        -webkit-box-pack:center
    .lyric
        -webkit-box-flex:1
        -moz-box-flex:1
        height:.7rem
</style>
