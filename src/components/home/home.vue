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
    <!-- <recommendList ref="songList"></recommendList> -->
  </div>
</template>

<script>
import recommend from '../recommend/recommend'
import ranking from '../ranking/ranking'
import search from '../search/search'
// import recommendList from '../songList/recommendList'
import BScroll from 'better-scroll'

export default {
  name: 'home',
  data () {
    return {
      selected: 'recommend'
    }
  },
  components: {
    recommend,
    ranking,
    search
    // recommendList
  },
  mounted (){
    this.initScroll();
  },
  methods:{
    initScroll(){
      this.myscroll = new BScroll('.tabContainer',{click:true});
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
      position :absolute
      top:0.9rem
      left:0
      height:.8rem
      width:100%
      z-index:1
      .mint-tab-item.is-selected
        border-bottom: 2px solid $mainColor
        padding:.24rem 0
        margin-bottom:0
        .mint-tab-item-label
          color:$mainColor
          font-size:.32rem
      .mint-tab-item
        padding:.24rem 0
        .mint-tab-item-label
          font-size:.32rem
          color:$grayColor
    .mint-tab-container
      height:100%
      .mint-tab-container-wrap
        height:100%
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='stylus'>
.homePage
    position :relative
    padding-top:1.7rem
    height:100%
    box-sizing:border-box
    .container
      height:100%
      .header
        position: absolute
        top:0
        left:0
        height:.9rem
        width:100%
        background:$mainColor
        z-index:1
        img
          height:.5rem
          width:1.5rem
          margin:.2rem 0 0 .3rem
          display:block
      .nav
        height:100%
        overflow:hidden
        box-sizing:border-box
        .tabContainer
          height:100%
</style>
