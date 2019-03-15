<template>
  <div class="recommend">
    <div class="swipe">
      <mt-swipe :auto="4000">
        <mt-swipe-item v-for="port in slider" :key="port.id">
            <a :href="port.linkUrl">
                <img v-lazy="port.picUrl" alt="">
            </a>
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <div class="recommendForYou">
      <h6>为你推荐</h6>
      <div class="songSheets">
        <div v-for="songSheet in songSheets" :key="songSheet.cover" class="songSheet" @click.stop="goSongList(songSheet.content_id)">
          <div class="cover">
            <img v-lazy="songSheet.cover" alt="" class="coverImg">
            <div class="playIcon"></div>
          </div>
          <p class="title"> {{songSheet.title}} </p>
          <p class="playNum"> 播放量 <font>:</font> {{songSheet.listen_num}} </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
import { Indicator } from 'mint-ui'
import { mapState , mapActions} from 'vuex'
export default {
  name: "recommend",
  data() {
    return {
      
    };
  },
  computed: {
    ...mapState('recommend', {
      slider: state => state.slider,
      songSheets: state => state.songSheets
    })
  },
  created() {
    // 请求轮播区域数据
    this.getSlide();
    // 请求推荐的歌单数据
    this.getRecommends();
  },
  methods:{
    ...mapActions('recommend', [
      'getSlide',
      'getRecommends',
      'getRecommendList'
    ]),
    goSongList (id) {
      Indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
      });
      this.getRecommendList(id).then( () => {
          // 请求数据成功后,打开歌单
          Indicator.close();
          this.$router.push('recommendList')
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
};
</script>

<!-- mint-ui 轮播样式重置 -->
<style lang="stylus">
  .recommend
    .mint-swipe-indicators
      bottom:0
      .mint-swipe-indicator
        width:.12rem
        height:.12rem
        opacity:.4
      .mint-swipe-indicator.is-active
        opacity:1
</style>

<style scoped lang="stylus">
.recommend
  width: 100%
  .swipe
    width: 100%
    height: 3.2rem
    img
      width:100%
      height:100%
  .recommendForYou
    padding-top:.2rem
    h6
      font-size:.31rem
      color: #000;
      margin-bottom:.22rem
      margin-left:.2rem
      font-weight: normal
    .songSheets
      display:flex
      flex-wrap:wrap
      overflow :hidden
      .songSheet
        width:50%
        box-sizing :border-box
        .cover
          width:100%
          position:relative
          overflow:hidden
          img.coverImg
            width:100%
          .playIcon
            position:absolute
            bottom:.1rem
            right:.1rem
            width:.5rem
            height:.5rem
            background:url("../../assets/img/icon_sprite.png") 0 0
            background-size:100% 250%
        .title
          margin-top:.14rem
          font-size:.27rem
        .playNum
          font-size:.27rem
          color:$grayColor
          margin-bottom:.1rem
          font
            font-weight:bold
      .songSheet:nth-child(odd)
        padding:0 .1rem 0 .2rem
      .songSheet:nth-child(even)
        padding:0 .2rem 0 .1rem 
</style>
