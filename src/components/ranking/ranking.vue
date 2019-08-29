<template>
    <div class="ranking">
        <div v-for="(rank,index) in rankList" :key="index" v-show="rank.topTitle == '巅峰榜·MV' ? false : true" class="rank" @click="goSongList(rank.id)">
            <div class="pictrue">
                <img :src="rank.picUrl" alt="">
                <span class="iconfont icon-listen"></span>
                <span class="listenCount">{{initCount(rank.listenCount)}}</span>
            </div>
            <div class="songs">
                <div class="title">{{rank.topTitle}}</div>
                <ul class="songList">
                    <li v-for="(song,index) in rank.songList" :key="index">
                        <font class="index"> {{ index+1 }} </font>
                        <font class="name"> {{ song.songname }} </font>
                        <font class="singer"> - {{song.singername}}</font>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import api from '../../api/api'
import {get,post} from '../../http/http'
import { Toast } from 'mint-ui'
import { Indicator } from 'mint-ui'
import { mapState , mapActions} from 'vuex'
export default {
  name: 'ranking',
  data(){
      return {
          
      }
  },
  computed:{
      ...mapState('ranking',{
          rankList: state => state.rankList
      }),
      initCount: () => (count) => {
          return (Math.round(parseInt(count) / 100) / 100) + '万';
      }
  },
  created(){
      this.getRanking();
  },
  methods:{
        ...mapActions('ranking',[
            'getRanking',
            'getTopList'
        ]),
        goSongList (id) {
            Indicator.open({
                text: '加载中...',
                spinnerType: 'fading-circle'
            });
            this.getTopList(id).then( () => {
                // 请求数据成功后,打开歌单
                Indicator.close();
                this.$router.push('rankingList')
            }).catch( () => {
                Indicator.close();
                Toast({
                    message: '加载失败,网络错误!',
                    position: 'center',
                    duration: 5000
                });
            });
        }
    }
}
</script>
<style scoped lang="stylus">
.ranking
    width:100%
    padding:.2rem .2rem 0
    background:$grayBackground
    .rank
        width:100%
        display:-webkit-box
        -webkit-line-clamp: 1
        height:2rem
        box-sizing:border-box
        margin-bottom:.2rem
        overflow:hidden
        background:#fff
        .pictrue
            position:relative
            width:2rem
            height:100%
            img
                width:100%
                height:100%
            .iconfont,.listenCount
                position:absolute
                bottom:.05rem
                left:.1rem
                color:#fff
                z-index:1
            .listenCount
                left:.4rem
                font-size:.25rem
        .songs
            -webkit-flex:1
            flex:1
            overflow:hidden
            margin-left:.2rem
            .title
                font-size:.3rem
                line-height:.7rem
            .songList
                width:100%
                height:1.3rem
                overflow:hidden
                display:-webkit-box
                -webkit-line-clamp:3
                /*! autoprefixer: off */
                -webkit-box-orient: vertical
                /* autoprefixer: on */
                li
                    white-space: nowrap
                    text-overflow: ellipsis                      
                    overflow:hidden
                    font-size:.25rem
                    line-height:.43333rem
                    .index,.singer
                        color:$grayColor
                    .index
                        margin-right:.1rem
</style>
