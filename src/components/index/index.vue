<template>
  <div class="homePage">
    <div class="container">
      <header class="header">
        <img src="../../assets/img/logo.png" alt="">
      </header>
      <div class="nav">
        <!-- tab nav -->
        <mt-navbar v-model="selected">
          <mt-tab-item id="recommend">推荐</mt-tab-item>
          <mt-tab-item id="ranking">排行榜</mt-tab-item>
          <mt-tab-item id="search">搜索</mt-tab-item>
        </mt-navbar>

        <!-- tab-container -->
        <div class="tabContainer">
          <div class="content">
            <mt-tab-container v-model="selected">
              <mt-tab-container-item id="recommend">
                <recommend @showSongList="showSongList"></recommend>
              </mt-tab-container-item>
              <mt-tab-container-item id="ranking">
                <ranking></ranking>
              </mt-tab-container-item>
              <mt-tab-container-item id="search">
                <search></search>
              </mt-tab-container-item>
            </mt-tab-container>
          </div>
        </div>
      </div>
    </div>
    <recommendList ref="songList"></recommendList>
  </div>
</template>

<script>
import recommend from '../recommend/recommend'
import ranking from '../ranking/ranking'
import search from '../search/search'
import recommendList from '../songList/recommendList'
import BScroll from 'better-scroll'

export default {
  name: 'index',
  data () {
    return {
      selected: 'recommend'
    }
  },
  components: {
    recommend,
    ranking,
    search,
    recommendList
  },
  mounted (){
    this.initScroll();
  },
  methods:{
    initScroll(){
      let myscroll = new BScroll('.tabContainer');
      this.$nextTick(()=>{
        if(!this.myscroll){
          this.myscroll = new BScroll('.tabContainer',{click:true})
        }else{
          this.myscroll.refresh();
        }
      })
    },
    showSongList (){
      this.$refs.songList.show();
    }
  }
}
</script>

<!-- mint-ui 样式重置 -->
<style lang="stylus">
  .homePage
    .mint-navbar
      position :fixed
      top:45px
      left:0
      height:40px
      width:100%
      z-index:1
      .mint-tab-item.is-selected
        border-bottom: 2px solid $mainColor
        padding:12px 0
        margin-bottom:0
        .mint-tab-item-label
          color:$mainColor
          font-size:16px
      .mint-tab-item
        padding:12px 0
        .mint-tab-item-label
          font-size:16px
    .mint-tab-container
      height:100%
      .mint-tab-container-wrap
        height:100%
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='stylus'>
.homePage
    position :relative
    padding-top:45px
    height:100%
    box-sizing:border-box
    .container
      height:100%
      .header
        position:fixed
        top:0 
        left:0
        height:45px
        width:100%
        background:$mainColor
        z-index:1
        img
          height:25px
          width:90px
          margin:10px 0 0 15px
          display:block
      .nav
        position:relative
        height:100%
        overflow:hidden
        padding-top:40px
        box-sizing:border-box
        .tabContainer
          height:100%
</style>
