<template>
    <div class="player">
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
        <div class="iconfont" :class="isPlay?'icon-bofang':'icon-bofang1'" @click="changePlaying()"></div>
        <div class="iconfont icon-liebiao" @click="showSongs()"></div>
        <audio id="audio" ref="audio" :src="singing.audioSrc" autoplay @timeupdate="changeLyric()"></audio>
        <div class="songList" v-show="showList">
            <div class="content">
                <div class="close">关闭</div>
                <ul>
                    <li v-for="(song,index) in songs" :key="song.songmid" @click="changeSinging(index)">

                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import { Toast } from 'mint-ui'
import { Indicator } from 'mint-ui'
import { mapState , mapActions, mapMutations} from 'vuex'
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
  mounted (){
        let audio = document.getElementById('audio');
        // 绑定监听歌曲是否结束监听
        let _this = this;
        audio.addEventListener('ended', function () {
            _this.changeSong();
        })
  },
  methods:{
      ...mapMutations('player',[
          'changePlay',
          'changeSong'
      ]),
      // 改变歌词
      changeLyric(){
            let lyrics = this.singing.lyric;
            if (lyrics.length == 0){
                this.$refs.lyrics.innerHTML = '暂无歌词!';
                return
            }
            let currentTime = this.$refs.audio ? this.$refs.audio.currentTime * 1000 : 0;
            for(let i =0;i<lyrics.length;i++){
                if(lyrics[i].time >= currentTime+300){
                    this.$refs.lyrics.innerHTML = (lyrics[i-1]) ? lyrics[i-1].text : '';
                    break;
                }
            }
      },
      // 暂停播放
      changePlaying(){
          // 改变播放状态
          this.changePlay();
          // 暂停或播放歌曲
          this.isPlay ? this.$refs.audio.play() : this.$refs.audio.pause();
      },
      // 加载播放列表
      showSongs(){
        this.showList = !this.showList;
        console.log(this.showList);
      },
      // 点击列表切换歌曲
      changeSinging(index){
          console.log(index);
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
</style>
