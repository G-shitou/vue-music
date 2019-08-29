<template>
    <div class="header">
        <img :src="logo" alt="" class="bglogo">
        <div class="content">
            <div class="introduce">
                <div class="logo">
                    <img :src="logo" alt="">
                </div>
                <div class="title">
                    <p class="big"> {{ dissname }}</p>
                    <p class="small"> {{ nickname }}</p>
                    <p class="num" v-show='visitnum?true:false'> 播放量：{{ visitnum }}</p>
                    <p class="num" v-show='updateTime?true:false'>{{ updateTime }}  更新</p>
                </div>
            </div>
            <div class="playButton">
                <a href="javascriptl:;" @click="playAll()">播放全部</a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'listTop',
    props:{ 
        logo:'',
        dissname:'',
        nickname:'',
        visitnum:'',
        updateTime:''
    },
    mounted (){
    },
    methods:{
        playAll(){
            this.$emit('childPlayall');
        }
    }
}
</script>

<style scoped lang="stylus">
.header
    position:relative
    height:5.08rem
    width:100%
    overflow :hidden
    img.bglogo
        position:absolute
        top:0
        left:0
        z-index:-1 
        width: 100%
        height: 100%
        object-fit: cover
        -webkit-transform: scale(1.1) translateZ(0)
        -webkit-filter: blur(.72rem)
    .content
        position:relative
        height:100%
        width:100%
        z-index:5
        background-color:rgba(0,0,0,.5)
        overflow :hidden
        .introduce
            display:-o-box
            display:-moz-box
            display:-webkit-box
            height:3.4rem
            width:100%
            padding:.9rem .3rem 0
            -webkit-box-pack:center
            -webkit-box-align:center               
            .logo
                position:relative
                width:2.5rem
                margin-right:.3rem
                img
                    width:100%
                    height:100%
            .title
                -webkit-box-flex:1
                -moz-box-flex:1
                color:#fff
                position:relative
                p
                    display: -webkit-box
                    /*! autoprefixer: off */
                    -webkit-box-orient: vertical
                    /* autoprefixer: on */
                    -webkit-line-clamp: 1
                    overflow:hidden
                    color:$wihteColor
                .big
                    font-size:.37rem
                    -webkit-line-clamp: 2                        
                .small,.num
                    font-size:.25rem
                    margin-top:.16rem
        .playButton,.playButton a
            display:-webkit-box
            -webkit-box-pack:center
            -webkit-box-align:center
        .playButton
            height:1.68rem
            a
                height:.8rem
                width:3.4rem
                overflow: hidden
                text-align: center
                font-size: .3rem
                color: #fff
                border-radius: .4rem
                background: $mainColor
                &:before
                    content:''
                    display:block
                    width:0px
                    height:0px
                    margin-right:.1rem
                    border-top:.14rem solid transparent
                    border-bottom:.14rem solid transparent
                    border-left:.22rem solid #fff
</style>