<template>
    <div class="ranking">
        <div v-for="(rank,index) in rankList" :key="index" class="rank">
            <div class="pictrue">
                <img v-lazy="rank.picUrl" alt="">
                <span class="listen"></span>
                <span class="listenCount">{{rank.listenCount}}</span>
            </div>
            <div class="songs">
                <div class="title">{{rank.topTitle}}</div>
                <ul class="songList">
                    <li v-for="(song,index) in rank.songList" :key="index">
                        {{index+1}}   {{song.songname}} - {{song.singername}}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import api from '../../api/api'
import {get,post} from '../../http/http'
export default {
  name: 'ranking',
  data(){
      return {
          rankList:[]
      }
  },
  created(){
      // 请求排行榜list
      get(api.getRanking.url,{params:api.getRanking.params}).then( res => {
          this.rankList = res.data.data.topList;
      }).catch( error => {
          console.log(error);
      })
  },
  mounted(){
      
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
        .songs
            -webkit-flex:1
            flex:1
            overflow:hidden
            margin-left:.2rem
            .title
                font-size:.33rem
                line-height:.33rem
            .songList
                width:100%
                height:1.67rem
                overflow:hidden
                display:-webkit-box
                -webkit-line-clamp:3
                -webkit-box-orient: vertical
                li
                    white-space: nowrap
                    text-overflow: ellipsis                      
                    overflow:hidden
                    font-size:.25rem
</style>
