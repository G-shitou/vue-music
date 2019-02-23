<template>
    <transition name="move">
        <div class="songList" v-show="showFlag">
            <!-- 歌单头部 -->
            <div class="header" :style="{backgroundImage: 'url(' + recommendList.logo + ')'}">
                <div class="content">
                    <div class="introduce">

                    </div>
                    <div class="playButton"></div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import { mapState , mapActions} from 'vuex'
export default {
  name: 'songList',
  data () {
      return {
        showFlag:false
      }
  },
  computed: {
    ...mapState({
      recommendList: state => state.recommendList
    })
  },
  methods:{
    show () {
        this.showFlag = true;
        console.log(this.recommendList);
    }
  }
}
</script>

<style scoped lang="stylus">
.move-enter
    transform: translateX(100%)
.move-enter-active,.move-leave-active
    transition: all .3s linear
.move-leave
    transform:translateX(0)

.songList
    position:fixed
    top:0
    left:0
    width:100%
    height:100%
    z-index:10
    background:#fff
    overflow :hidden
    .header
        height:250px
        width:100%
        background-size:cover
        filter: blur(36px)
        transform:scale(1.1) translateZ(0)
        overflow :hidden
        .content
            height:250px
            width:100%
            background-color:rgba(0,0,0,.5)
            overflow :hidden
</style>
