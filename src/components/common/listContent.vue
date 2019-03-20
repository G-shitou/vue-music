<template>
    <div class="listContent">
        <!-- 排行榜列表  表现有所不同，数据格式也不同 -->
        <div class="songList" v-if="sort">
            <li class="song" v-for="(song,index) in songlist" :key="song.data.songid" @click.stop="changeSong({song})">
                <div class="index">
                    <div class="num" :class="index <=2&&sort ? 'active' : ''"> {{ index+1 }} </div>
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
        <!-- 单纯的歌单或专辑列表 -->
        <div class="songList" v-else>
            <li class="song" v-for="(song,index) in songlist" :key="song.songid" @click.stop="changeSong({song})">
                <div class="index">
                    <div class="num maincolor"> {{ index+1 }} </div>
                    <div class="sort"></div>
                </div>
                <div class="name">
                    <div class="title" :class='{alive:song.songmid == singing.mid}'>{{song.songname}}</div>
                    <div class="singer" :class='{alive:song.songmid == singing.mid}'><font>{{getSinger(song.singer)}} ·</font>{{song.albumname}}</div>
                </div>
            </li>
        </div>
    </div>
</template>

<script>
import { Toast } from 'mint-ui'
import { mapState , mapMutations , mapGetters} from 'vuex'
export default {
  name: 'listContent',
  props:{
      songlist:Array,
      sort:false
  },
  computed: {
    ...mapState('player',{
        singing: state => state.singing,
        songs: state => state.songs
    }),
    ...mapGetters('ranking',[
        'initCount',
        'initIcon'
    ]),
    getSinger:() => (arr) => {
        if(arr.length === 1){
            return arr[0].name
        }
        var singer = '';
        arr.forEach((value,index,arr) => {
            singer += value.name + '/'
        });
        return singer.substr(0,singer.length-1)
    }
  },
  mounted (){
  },
  methods:{
        ...mapMutations('player',[
            'playIndex',
            'addSong'
        ]),
        changeSong(obj){
            // 处理排行榜和歌单数据格式不一致
            let _song = this.sort ? obj.song.data : obj.song;
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
        }
    }
}
</script>

<style scoped lang="stylus">
.listContent
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
                .maincolor
                    color:$mainColor
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
