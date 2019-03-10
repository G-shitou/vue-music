<template>
    <div class="player">
        <div class="logo">
            <img :src="singing.img" alt="">        
        </div>
        <div class="lyric">
            <div class="title">{{singing.title}}</div>
            <div class="text">
                <div class="content" ref="lyrics">
                    <!-- <p v-for="(lyric,index) in singing.lyric" :key="index">{{lyric.text}}</p>     -->
                </div>
            </div>
        </div>
        <div class="iconfont" :class="isPlay?'icon-bofang':'icon-bofang1'"></div>
        <div class="iconfont icon-liebiao"></div>
        <audio ref="audio" :src="singing.audioSrc" autoplay @timeupdate="changeLyric()"></audio>
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
      changeLyric(){
          let currentTime = this.$refs.audio.currentTime * 1000;
          let lyrics = this.singing.lyric;
          for(let i =0;i<lyrics.length;i++){
              if(lyrics[i].time >= currentTime+300){
                  this.$refs.lyrics.innerHTML = (lyrics[i-1]) ? lyrics[i-1].text : '';
                  break;
              }
          }
      }
  }

}
</script>

<style scoped lang="stylus">
.player
    width:100%
    height:1rem
    box-shadow: 0px -1px 0 0 $mainColor
    position:fixed
    bottom:0
    left:0
    display:-webkit-box
    -webkit-box-align:center
    -webkit-box-orient: horizontal
    .logo,.iconfont
        width:.7rem
        height:.7rem
    .logo
        border-radius:.35rem
        overflow:hidden
        margin:0 .2rem        
        img
            width:100%
            height:100%
    .iconfont
        color:$mainColor
        margin-right:.2rem
        font-size:.5rem
        display:-webkit-box
        -webkit-box-align:center
        -webkit-box-pack:center
    .lyric
        -webkit-box-flex:1
        -moz-box-flex:1
        height:.7rem
        display:-webkit-box
        -webkit-box-orient:vertical
        overflow:hidden
        .title
            font-size:.3rem
            line-height:.4rem
            white-space: nowrap
            text-overflow: ellipsis
            overflow: hidden
            color:$mainColor
        .text
            overflow:hidden
            height:.31rem
            .content
                font-size:.24rem
                line-height:.31rem
                white-space: nowrap
                text-overflow: ellipsis
                overflow: hidden
                color:$grayColor
</style>
