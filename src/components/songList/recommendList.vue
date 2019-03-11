<template>
    <div class="wrap">
        <div class="songList">
            <!-- 歌单头部 -->
            <div class="header">
                <img :src="recommendList.logo" alt="" class="bglogo">
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
                        <a href="javascriptl:;" @click="playAll()">播放全部</a>
                    </div>
                </div>
            </div>
            <!-- 歌曲列表 -->
            <div class="recommendList">
                <div class="songList">
                    <li class="song" v-for="(song,index) in recommendList.songlist" :key="song.songid" @click.stop="changeSong({id:song.songid})">
                        <div class="index">
                            <div class="num"> {{ index+1 }} </div>
                            <div class="sort"></div>
                        </div>
                        <div class="name">
                            <div class="title" :class='{alive:song.songname == singing.title}'>{{song.songname}}</div>
                            <div class="singer" :class='{alive:song.songname == singing.title}'><font>{{getSinger(song.singer)}} ·</font>{{song.albumname}}</div>
                        </div>
                    </li>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Toast } from 'mint-ui'
import { Indicator } from 'mint-ui'
import BScroll from 'better-scroll'
import { mapState , mapActions} from 'vuex'
export default {
  name: 'recommendList',
  data () {
      return {
      }
  },
  computed: {
    ...mapState('recommendList',{
      recommendList: state => state.recommendList
    }),
    ...mapState('player',{
        singing: state => state.singing
    }),
    getSinger:function(){
        return (arr) => {
            if(arr.length === 1){
                return arr[0].name
            }
            var singer = '';
            arr.forEach((value,index,arr) => {
                singer += value.name + '/'
            });
            return singer.substr(0,singer.length-1)
        }
    }
  },
  mounted (){
      this.initScroll()
  },
  methods:{
        initScroll(){
            this.myscroll = new BScroll('.wrap',{click:true});
            this.$nextTick(()=>{
                if(!this.myscroll){
                    this.myscroll = new BScroll('.wrap',{click:true})
                }else{
                    this.myscroll.refresh();
                }
            })
        },
        ...mapActions('recommendList',[
            'getRecommendSong'
        ]),
        changeSong(obj){
            Indicator.open({
                text: '加载中...',
                spinnerType: 'fading-circle'
            });
            this.getRecommendSong(obj).then( res => {
                Indicator.close();
            }).catch( error => {
                Indicator.close();
                Toast({
                    message: '加载失败,网络错误!',
                    position: 'center',
                    duration: 5000
                });
            })
        },
        playAll(){
            Toast({
                message: '暂未开发!',
                position: 'center',
                duration: 5000
            });
        }
    }
}
</script>

<style scoped lang="stylus">
.wrap
    width:100%
    height:100%
    overflow:hidden
    .songList
        position:relative
        width:100%
        overflow :hidden
        .header
            position:relative
            height:5.08rem
            width:100%
            overflow :hidden
            img.bglogo
                position:absolute
                top:0
                left:0
                z-index:-1 
                width: 100%
                height: 100%
                object-fit: cover
                -webkit-transform: scale(1.1) translateZ(0)
                -webkit-filter: blur(.72rem)
            .content
                position:relative
                height:100%
                width:100%
                z-index:5
                background-color:rgba(0,0,0,.5)
                overflow :hidden
                .introduce
                    display:-o-box
                    display:-moz-box
                    display:-webkit-box
                    height:3.4rem
                    width:100%
                    padding:.9rem .3rem 0
                    -webkit-box-pack:center
                    -webkit-box-align:center               
                    .logo
                        position:relative
                        width:2.5rem
                        margin-right:.3rem
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
                            margin-top:.16rem
                .playButton,.playButton a
                    display:-webkit-box
                    -webkit-box-pack:center
                    -webkit-box-align:center
                .playButton
                    height:1.68rem
                    a
                        height:.8rem
                        width:3.4rem
                        overflow: hidden
                        text-align: center
                        font-size: .3rem
                        color: #fff
                        border-radius: .4rem
                        background: $mainColor
                        &:before
                            content:''
                            display:block
                            width:0px
                            height:0px
                            margin-right:.1rem
                            border-top:.14rem solid transparent
                            border-bottom:.14rem solid transparent
                            border-left:.22rem solid #fff
        .recommendList
            width:100%
            height:auto
            .songList
                width:100%
                .song
                    width:100%
                    height:1.24rem
                    overflow:hidden
                    display:-webkit-box
                    .index
                        color:$mainColor
                        display: -webkit-box
                        -webkit-box-orient: vertical
                        -webkit-box-pack: center
                        -webkit-box-align: center
                        width: .9rem
                        font-size:.3rem
                        .sort
                            height:.36rem
                    .name
                        -webkit-box-flex:1
                        color:$redColor
                        display: -webkit-box
                        -webkit-box-orient: vertical
                        -webkit-box-pack:center                 
                        width: .36rem
                        font-size:.33rem
                        .title
                            color:#000
                            white-space: nowrap
                            text-overflow: ellipsis                      
                            overflow:hidden
                        .singer
                            margin-top:.1rem
                            height:.36rem
                            font-size:.25rem
                            color:$grayColor
                            white-space: nowrap
                            text-overflow: ellipsis                      
                            overflow:hidden                    
                            font
                                margin-right:.16rem
                        .alive
                            color:$mainColor
</style>
