<template>
    <div class="player">
        <div class="play">
            <div class="logo" :class="isPlay ? 'rotate' : 'noRotate'">
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
            <div class="iconfont" :class="isPlay?'icon-bofang':'icon-bofang1'" @click="changePlay()"></div>
            <div class="iconfont icon-liebiao" @click="showSongs()"></div>
            <audio id="audio" ref="audio" :src="singing.audioSrc" @ended="playNext()" @timeupdate="changeLyric()"></audio>
        </div>
        <transition name="fade">
            <div class="songList" v-show="showList">
                <div class="content">
                    <div class="close">
                        <font>播放列表</font>
                    </div>
                    <ul>
                        <li v-for="(song,index) in songs" :key="index">
                            <p class="index">{{index + 1}}</p>
                            <img :src="song.img" alt="">                            
                            <p class="title" @click="playIndex({index})" :class="{active:song.id == singing.id}">{{song.title}} - {{song.singer}}</p>
                            <p class="delete" @click="deleteSongs()"></p>
                        </li>
                    </ul>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import { Toast } from 'mint-ui'
import { Indicator } from 'mint-ui'
import { mapState , mapActions, mapMutations, mapGetters} from 'vuex'
import BScroll from 'better-scroll'
export default {
  name: 'player',
  data () {
      return {
          showList:false
      }
  },
  computed: {
      ...mapState('player',{
          songs: state => state.songs,
          singing: state => state.singing,
          isPlay: state => state.isPlay
      })
  },
  watch:{
      isPlay(now,last){
          this.$nextTick(()=>{
            this.isPlay ? this.$refs.audio.play() : this.$refs.audio.pause();
          })
      },
      singing(last,old){
          // 加载播放地址或歌词
          if(last.audioSrc == '' || last.lyric == ''){
              this.getAudioSrc();
              this.getLyric();              
          }
          clearTimeout(this.timer);
          this.timer = setTimeout(()=>{
              this.$refs.audio.play();
          },1000)
      }
  },
  mounted (){
        this.initScroll();
  },
  methods:{
      ...mapMutations('player',[
          'changePlay',
          'playIndex',
          'playNext'
      ]),
      ...mapActions('player',[
          'getLyric',
          'getAudioSrc'
      ]),
      // 改变歌词
      changeLyric(){
            if(!this.isPlay){
                this.$refs.lyrics.innerHTML = this.singing.singer
                return;
            }
            let lyrics = this.singing.lyric;
            if (lyrics.length == 0){
                this.$refs.lyrics.innerHTML = '暂无歌词!';
                return
            }
            let currentTime = this.$refs.audio ? this.$refs.audio.currentTime * 1000 : 0;
            for(let i =0;i<lyrics.length;i++){
                if(lyrics[i].time >= currentTime){
                    this.$refs.lyrics.innerHTML = (lyrics[i-1]) ? lyrics[i-1].text : '';
                    break;
                }
            }
      },
      // 加载播放列表
      showSongs(){
        this.showList = !this.showList;
        this.$nextTick(() => {
            this.showList&&this.myscroll.refresh();
        })
      },
      initScroll(){
        this.myscroll = new BScroll('.songList',{click:true});
        this.$nextTick(()=>{
            if(!this.myscroll){
                this.myscroll = new BScroll('.songList',{click:true})
            }else{
                this.myscroll.refresh();
            }
        })
      }
    }

}
</script>

<style scoped lang="stylus">
@keyframes rotate {
    0%{
        transform:rotate(0deg)
    }
    100%{
        transform:rotate(360deg)
    }
}
.player
    width:100%
    height:1rem
    box-shadow: 0px -1px 0 0 $mainColor
    position:fixed
    bottom:0
    left:0
    .play
        width:100%
        height:100%
        background:#fff
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
        .rotate
            animation:rotate 12s linear infinite
        .noRotate
            animation:rotate 12s linear infinite
            animation-play-state: paused
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
    .fade-enter-active,.fade-leave-active  
        transition: all .5s
    .fade-enter,.fade-leave-to
        transform: translateY(100%)
    .songList
        position:absolute
        top:-4rem
        left:0
        height:4rem
        width:100%
        background-color:rgba(0,0,0,.8)
        color:#fff
        z-index:-1
        box-shadow: 0px -1px 0 0 $mainColor
        overflow:hidden
        .content
            width:100
            .close
                margin:0 auto
                text-align:center
                font-size:.3rem
                line-height:.6rem
                font
                    color:$mainColor
                    font-weight:bold
            ul li
                line-height:.8rem
                font-size:.28rem
                // box-shadow: 0px -1px 0 0 $mainColor
                display:-webkit-box
                img
                    width:.6rem
                    height:.6rem
                    margin:.1rem .2rem .1rem 0
                .index
                    width:.8rem
                    display: -webkit-box
                    -webkit-box-pack: center
                    -webkit-box-align: center
                .title
                    -webkit-flex:1
                    flex:1
                .active
                    color:$mainColor
</style>
