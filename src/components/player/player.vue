<template>
    <div class="player">
        <div class="logo"></div>
        <div class=""></div>
    </div>
</template>

<script>
import { Toast } from 'mint-ui'
import { Indicator } from 'mint-ui'
import { mapState , mapActions} from 'vuex'
export default {
  name: 'player',
  data () {
      return {
      }
  },
  computed: {
      ...mapState('player',{
          songs: state => state.songs,
          singing: state => state.singing,
          isPlay: state => state.isPlay
      })
  },
  mounted (){
  },
  methods:{
  }

}
</script>

<style scoped lang="stylus">
.player
    width:100%
    height:1rem
    position:fixed
    bottom:0
    left:0
    background:$grayColor
</style>
