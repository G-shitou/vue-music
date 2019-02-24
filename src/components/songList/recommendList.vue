<template>
    <div class="songList">
        <!-- 歌单头部 -->
        <div class="header">
            <div class="content">
                <div class="introduce">
                    <div class="logo">
                        <img :src="recommendList.logo" alt="">
                    </div>
                    <div class="title">
                        <p class="big"> {{ recommendList.dissname }}</p>
                        <p class="small"> {{ recommendList.nickname }}</p>
                        <p class="num"> 播放量：{{ recommendList.visitnum }}</p>
                    </div>
                </div>
                <div class="playButton">
                    <a href="javascriptl:;">播放全部</a>
                </div>
            </div>
            <img :src="recommendList.logo" alt="" class="bglogo">
        </div>
        <!-- 歌曲列表 -->
        <div class="recommendList">
            <div class="songList">
                <div v-for="(song,index) in recommendList.songlist" :key="song.songid">
                    {{index}}<p class="songname">{{song.songname}}</p>
                    <p class="singer"> {{song.albumname}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState , mapActions} from 'vuex'
export default {
  name: 'songList',
  data () {
      return {
      }
  },
  computed: {
    ...mapState({
      recommendList: state => state.recommendList
    })
  },
  methods:{
  }
}
</script>

<style scoped lang="stylus">
.songList
    position:relative
    width:100%
    background:#fff
    overflow :hidden
    .header
        position:relative
        height:254px
        width:100%
        overflow :hidden
        z-index:1
        img.bglogo
            position:absolute
            top:0
            left:0
            z-index:2 
            width: 100%
            height: 100%
            object-fit: cover
            -webkit-transform: scale(1.1) translateZ(0)
            -webkit-filter: blur(36px)
        .content
            position:relative
            height:100%
            width:100%
            z-index:3
            background-color:rgba(0,0,0,.5)
            overflow :hidden
            .introduce
                display:-o-box
                display:-moz-box
                display:-webkit-box
                height:170px
                width:100%
                padding:45px 15px 0
                -webkit-box-pack:center
                -webkit-box-align:center                
                .logo
                    position:relative
                    width:125px
                    margin-right:15px
                    img
                        width:100%
                        height:100%
                .title
                    -webkit-box-flex:1
                    -moz-box-flex:1
                    color:#fff
                    position:relative
                    p
                        display: -webkit-box
                        -webkit-box-orient: vertical
                        -webkit-line-clamp: 1
                        overflow:hidden
                        color:$wihteColor
                    .big
                        font-size:.37rem
                        -webkit-line-clamp: 2                        
                    .small,.num
                        font-size:.25rem
                        margin-top:8px
            .playButton,.playButton a
                display:-webkit-box
                -webkit-box-pack:center
                -webkit-box-align:center
            .playButton
                height:84px
                a
                    height:40px
                    width:170px
                    overflow: hidden
                    text-align: center
                    font-size: .3rem
                    color: #fff
                    border-radius: 20px
                    background: $mainColor
                    &:before
                        content:''
                        display:block
                        width:0px
                        height:0px
                        margin-right:5px
                        border-top:7px solid transparent
                        border-bottom:7px solid transparent
                        border-left:11px solid #fff
    .recommendList
        width:100%
        height:auto
</style>
