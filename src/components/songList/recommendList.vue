<template>
    <div class="wrap">
        <div class="songList">
            <!-- 歌单头部 -->
            <list-top :logo='recommendList.logo' :dissname='recommendList.dissname' :nickname='recommendList.nickname' :visitnum='recommendList.visitnum' @childPlayall='playAll()'></list-top>
            <!-- 歌曲列表 -->
            <list-content :songlist='recommendList.songlist' :sort='false'></list-content>
        </div>
    </div>
</template>

<script>
import BScroll from 'better-scroll'
import { mapState , mapMutations } from 'vuex'
import listTop from '../common/listTop'
import listContent from '../common/listContent'
export default {
  name: 'recommendList',
  data () {
      return {
      }
  },
  components:{
      listTop,
      listContent
  },
  computed: {
    ...mapState('recommendList',{
      recommendList: state => state.recommendList
    }),
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
        ...mapMutations('player',[
            'playList'
        ]),
        playAll(){
            let songs = this.recommendList.songlist;
            this.playList({songs});
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
</style>
