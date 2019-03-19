<template>
    <div class="wrap">
        <div class="songList">
            <!-- 歌单头部 -->
            <div class="header">
                <img :src="rank.topinfo.pic_album" alt="" class="bglogo">
                <div class="content">
                    <div class="introduce">
                        <div class="logo">
                            <img :src="rank.topinfo.pic_album" alt="">
                        </div>
                        <div class="title">
                            <p class="big"> {{ rank.topinfo.ListName }}</p>
                            <p class="small"> {{ initsubtitle() }}</p>
                            <p class="num">{{ rank.update_time }}  更新</p>
                        </div>
                    </div>
                    <div class="playButton">
                        <a href="javascriptl:;" @click="playAll()">播放全部</a>
                    </div>
                </div>
            </div>
            <!-- 歌曲列表 -->
            <div class="totalNum">排行榜  共{{rank.total_song_num}}首</div>
            <div class="recommendList">
                <div class="songList">
                    <li class="song" v-for="(song,index) in rank.songlist" :key="song.data.songid" @click.stop="changeSong({song})">
                        <div class="index">
                            <div class="num" :class="index <=2 ? 'active' : ''"> {{ index+1 }} </div>
                            <div class="sort">
                                <span class="iconfont" :class='initIcon(index)'></span>
                                <span>{{initCount(index)}}</span>
                            </div>
                        </div>
                        <div class="name">
                            <div class="title" :class='{alive:song.data.songmid == singing.mid}'>{{song.data.songname}}</div>
                            <div class="singer" :class='{alive:song.data.songmid == singing.mid}'><font>{{getSinger(song.data.singer)}} ·</font>{{song.data.albumname}}</div>
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
import { mapState , mapMutations ,mapActions, mapGetters} from 'vuex'
export default {
  name: 'rankingList',
  data () {
      return {
          rankSongs:[]
      }
  },
  computed: {
    ...mapState('ranking',{
        rank: state => state.rank
    }),
    ...mapState('player',{
        singing: state => state.singing,
        songs: state => state.songs
    }),
    ...mapGetters('ranking',[
        'initsubtitle',
        'initCount',
        'initIcon'
    ]),
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
        this.initScroll();
        // 格式化songs,方便playAll的调用
        for(let i =0;i<this.rank.songlist.length;i++){
            this.rankSongs.push({
                songid:this.rank.songlist[i].data.songid,
                songmid:this.rank.songlist[i].data.songmid,
                singer:this.rank.songlist[i].data.singer,
                albummid:this.rank.songlist[i].data.albummid,
                songname:this.rank.songlist[i].data.songname,
                pay:this.rank.songlist[i].data.pay
            })
        };
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
        ...mapMutations('player',[
            'playIndex',
            'addSong',
            'playList'
        ]),
        changeSong(obj){
            let _song = obj.song.data;
            // 是否是付费歌曲
            if(_song.pay.payplay == 1){
                Toast({
                    message: '付费歌曲,暂不支持播放!',
                    position: 'center',
                    duration: 1000
                });
                return;
            }
            // 判断是否在播放列表里
            let isIn = false;
            for(let i=0;i<this.songs.length;i++){
                if(this.songs[i].id == _song.songid){
                    isIn = true;
                    this.playIndex({index:i})
                    break;
                }
            }
            if(!isIn){
                let song = {
                    id:_song.songid,
                    mid:_song.songmid,
                    singer:this.getSinger(_song.singer),
                    img:'https://y.gtimg.cn/music/photo_new/T002R300x300M000'+_song.albummid+'.jpg?max_age=2592000',
                    title:_song.songname,
                    audioSrc:'',
                    lyric:''
                };
                this.addSong({song});
            }
        },
        playAll(){
            this.playList({songs:this.rankSongs});
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
        .totalNum
            // height:1.24rem
            line-height:1rem
            font-size:.3rem
            color:$grayColor
            margin-left:.4rem
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
                        color:$grayColor
                        display: -webkit-box
                        -webkit-box-orient: vertical
                        -webkit-box-pack: center
                        -webkit-box-align: center
                        width: .9rem
                        font-size:.33rem
                        .num
                            font-size:.33rem
                            margin-top:.05rem
                        .active
                            color:$iconUp
                        .sort
                            height:.36rem
                            line-height:.36rem
                            margin-top:.1rem
                            display: -webkit-box
                            -webkit-box-pack: center
                            font-size:0
                            span
                                font-size:.1rem
                            .icon-up
                                color:$iconUp
                            .icon-down
                                color:$mainColor
                            .new
                                ~span
                                    color:$iconUp
                    .name
                        -webkit-box-flex:1
                        color:$redColor
                        display: -webkit-box
                        -webkit-box-orient: vertical
                        -webkit-box-pack:center
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
