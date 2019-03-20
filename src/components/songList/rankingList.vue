<template>
    <div class="wrap">
        <div class="songList">
            <!-- 歌单头部 -->
            <list-top :logo='rank.topinfo.pic_album' :dissname='rank.topinfo.ListName' :nickname='initsubtitle()' :updateTime='rank.update_time' @childPlayall='playAll()'></list-top>
            <!-- 歌曲列表 -->
            <div class="totalNum">排行榜  共{{rank.total_song_num}}首</div>
            <list-content :songlist='rank.songlist' :sort='true'></list-content>
        </div>
    </div>
</template>

<script>
import { Toast } from 'mint-ui'
import { Indicator } from 'mint-ui'
import BScroll from 'better-scroll'
import { mapState , mapMutations ,mapActions, mapGetters} from 'vuex'
import listTop from '../common/listTop'
import listContent from '../common/listContent'
export default {
  name: 'rankingList',
  data () {
      return {
          rankSongs:[]
      }
  },
  components:{
      listTop,
      listContent
  },
  computed: {
    ...mapState('ranking',{
        rank: state => state.rank
    }),
    ...mapGetters('ranking',[
        'initsubtitle',
    ])
  },
  watch:{
      rank:{
            // 解决初次加载不触发监听bug
            immediate:true,
            handler(){
                this.rankSongs.length = 0;
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
            }
        }
  },
  mounted (){
        this.initScroll();
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
            'playList'
        ]),
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
        .totalNum
            line-height:1rem
            font-size:.3rem
            color:$grayColor
            margin-left:.4rem
</style>
