<template>
    <div class='search'>
        <!-- 搜索区域 -->
        <div class='search_bar'>
            <form class='content' @submit.prevent="search()" action="javascript:return true">
                <i class='iconfont icon-research'></i>
                <input ref='search' v-model='w' @input.self.stop='inputChange()' @focus.self.stop='inputFocus()' @blur.self.stop='inputBlur()' class="search_input" type="search" autocomplete="off" autocorrect="off" placeholder="搜索歌曲、歌单、专辑、歌手">
                <i v-show='clear' class='clear' @click.self.stop='clearInput()'>×</i>
            </form>
            <p class='cancel' v-show='cancel' @click.self.stop='cancelClick()'>取消</p>
        </div>
        <!-- 搜索结果列表 -->
        <div class='search_result' v-show='showSearchResult'>
            <!-- 搜索的是歌曲 -->
            <ul v-if='searchResult.zhida&&searchResult.zhida.type==0'>
                <li v-for='(item,index) in searchResult.song.list' :key='index' class='song' @click.stop="changeSong({song:item})">
                    <div class='index'>{{index+1}}</div>
                    <div class='info'>
                        <p class='title' :class='{alive:item.songmid == singing.mid}'>{{item.songname}}</p>
                        <p class='singer' :class='{alive:item.songmid == singing.mid}'>{{getSinger(item.singer)}}</p>
                    </div>
                </li>
            </ul>
            <!-- 搜索的是歌手 -->
            <ul v-else-if="searchResult.zhida&&searchResult.zhida.type==2">
                <li class='singer' @click.stop='showPage(searchResult.zhida)'>
                    <div class='photo'>
                        <img :src='initIMG'>
                    </div>
                    <div class='info'>
                        <p class='name'>{{searchResult.zhida.singername}}</p>
                        <p class='num'><font>单曲 : </font> {{ searchResult.zhida.songnum }}  <font>专辑 : </font> {{ searchResult.zhida.albumnum }}</p>
                    </div>
                </li>
            </ul>
            <!-- 搜索的是专辑 -->
            <ul v-else-if='searchResult.zhida&&searchResult.zhida.type==3'>
                <li class='album' @click.stop='showPage(searchResult.zhida)'>
                    <div class='photo'>
                        <img :src='initIMG'>
                    </div>
                    <div class='info'>
                        <p class='title'>{{searchResult.zhida.albumname}}</p>
                        <p class='singer'>{{searchResult.zhida.singername}}</p>
                    </div>
                </li>
            </ul>
        </div>
        <!-- 热门搜索     根据cancel判断是否显示,只显示前7个加特殊推荐 -->
        <div class='hot_search' v-show='!cancel'>
            <p class='title'>热门搜索</p>
            <a :href="hotsearch.special_url" class='special'>{{hotsearch.special_key}}</a>
            <a href="javascript:;" v-for='(item,index) in hotsearch.hotkey.slice(0,9)' :key='index' @click='searchHot(item.k)'> {{ item.k }} </a>
        </div>
    </div>
</template>

<script>
import { Toast } from 'mint-ui'
import { Indicator } from 'mint-ui'
import api from '../../api/api'
import {get,post} from '../../http/http'
import { mapState , mapMutations , mapGetters} from 'vuex'
export default {
    name: 'search',
    data(){
        return{
            hotsearch:{
                special_url:'',
                special_key:'',
                hotkey:[]
            },
            w:'',
            clear:false,
            cancel:false,
            searchResult:{},
            showSearchResult:false
        }
    },
    created(){
        // 请求热门搜索
        get(api.getHotKey.url,{
            params:api.getHotKey.params
        }).then(res => {
            console.log(res.data.data);
            // type   0表示歌曲、2表示歌手、3表示专辑
            this.hotsearch = res.data.data;
        }).catch(error => {
            console.log(error);
        });
    },
    computed: {
        ...mapState('player',{
            singing: state => state.singing,
            songs: state => state.songs
        }),
        initIMG () {
            if(this.searchResult.zhida.singermid){
                return 'https://y.gtimg.cn/music/photo_new/T001R68x68M000' + this.searchResult.zhida.singermid + '.jpg';
            }else{
                return 'https://y.gtimg.cn/music/photo_new/T002R68x68M000' + this.searchResult.zhida.albummid + '.jpg';
            }
        },
        getSinger:() => (arr) => {
            if(arr.length === 1){
                return arr[0].name
            }
            var singer = '';
            arr.forEach((value,index,arr) => {
                singer += value.name + '/'
            });
            return singer.substr(0,singer.length-1)
        }
    },
    mounted(){

    },
    methods:{
        ...mapMutations('player',[
            'playIndex',
            'addSong'
        ]),
        // 搜索框输入时
        inputChange(){
            this.clear = this.w == '' ? false : true;
        },
        // 搜索框获取焦点
        inputFocus(){
            this.cancel = true;
        },
        // 点击取消
        cancelClick(){
            this.clear = false;
            this.w = '';
            this.$refs.search.blur();
            this.cancel = false;
            this.showSearchResult = false;
        },
        // 假如失去焦点时无内容，则cancel为false
        inputBlur(){
            this.cancel = this.w == '' ? false : true;
            this.showSearchResult = this.w == '' ? false :true;
        },
        // 点击叉号，清空input内容
        clearInput(){
            this.w = '';
            this.clear = false;
        },
        // 搜索关键字
        search(){
            Indicator.open({
                text: '加载中...',
                spinnerType: 'fading-circle'
            });
            this.cancel = true;
            let params = api.search.params;
            params.w = this.w;
            get(api.search.url,{
                params
            }).then(res => {
                Indicator.close();
                console.log(res.data.data);
                this.searchResult = res.data.data;
                this.showSearchResult = true;
            }).catch(error => {
                Indicator.close();
                Toast({
                    message: '加载失败,网络错误!',
                    position: 'center',
                    duration: 5000
                });
                console.log(error);
            });
        },
        // 点击热门搜索
        searchHot(w){
            this.w = w;
            this.search();
        },
        // 点击歌曲播放
        changeSong(obj){
            let _song = obj.song;
            // 是否是付费歌曲
            if(_song.pay.payplay == 1){
                Toast({
                    message: '付费歌曲,暂不支持播放!',
                    position: 'center',
                    duration: 1000
                });
                return;
            }
            // 判断是否在播放列表里
            let isIn = false;
            for(let i=0;i<this.songs.length;i++){
                if(this.songs[i].id == _song.songid){
                    isIn = true;
                    this.playIndex({index:i})
                    break;
                }
            }
            if(!isIn){
                let song = {
                    id:_song.songid,
                    mid:_song.songmid,
                    singer:this.getSinger(_song.singer),
                    img:'https://y.gtimg.cn/music/photo_new/T002R300x300M000'+_song.albummid+'.jpg?max_age=2592000',
                    title:_song.songname,
                    audioSrc:'',
                    lyric:''
                };
                this.addSong({song});
            }
        },
        // 点击搜索后的歌手或专辑
        showPage(obj){
            Toast({
                message: '歌手和专辑暂未开发,仅支持搜索歌曲播放!',
                position: 'center',
                duration: 1000
            });
        }
    }
}
</script>
<style scoped lang="stylus">
.search
    width:100%
    height:auto
    .search_bar
        width:100%
        padding:.2rem
        height:1rem
        display:-webkit-box
        -webkit-box-align:center
        background:$grayBackground
        .content
            position:relative
            -webkit-box-flex:1
            height:100%
            font-size:0
            background:#fff
            padding-left:.8rem
            padding-right:.8rem
            border-radius:.1rem
            .iconfont
                position:absolute
                left:0
                top:0
                width:.4rem
                line-height:.6rem
                font-size:.35rem
                margin:0 .2rem
            .clear
                position:absolute
                right:0
                top:0
                width:.4rem
                line-height:.6rem
                font-size:.35rem
                margin:0 .2rem
                color:$iconUp
            .search_input
                width:100%
                border:none
                outline:none
                font-size:.3rem
                line-height:.6rem
                &::-webkit-search-cancel-button
                    display: none
                &::-ms-clear
                    display: none
        .cancel
            width:.6rem
            line-height:.6rem
            font-size:.3rem
            margin:0 .2rem
            color:$grayColor
    .hot_search
        width:100%
        height:auto
        margin-top:.3rem
        padding:0 .3rem
        font-size:0
        .title
            font-size:.3rem
            color:$grayColor
            margin-bottom:.2rem
        a
            font-size:.25rem
            color:#000
            display:inline-block
            height:.5rem
            line-height:.5rem
            padding:0 .2rem
            margin:0 .2rem .2rem 0
            border:1px solid $grayColor
            border-radius:.25rem
            &.special
                color:$iconUp
                border:1px solid $iconUp
    .search_result
        width:100%
        height:auto
        margin-bottom:.3rem
        li.singer,li.song,li.album
            width:100%
            height:1rem
            display:-webkit-box
            -webkit-box-pack:center
            box-shadow: 0px 0.3px 0 0 $grayColor
            .photo
                width:.8rem
                height:.8rem
                margin:.1rem .2rem
                border-radius:.4rem
                overflow:hidden
                img
                    width:100%
                    height:100%
            .info
                -webkit-box-flex:1
                height:100%
                display:-webkit-box
                -webkit-box-orient:vertical
                -webkit-box-pack:center
                margin-left:.1rem
                .name,.title
                    font-size:.3rem
                    white-space: nowrap
                    text-overflow: ellipsis                      
                    overflow:hidden
                .num,.singer
                    font-size:.2rem
                    color:$grayColor
                    font:nth-child(2)
                        margin-left:.1rem
                .alive
                    color:$mainColor
        li.song
            .index
                width:.7rem
                height:1rem
                line-height:1rem
                font-size:.33rem
                text-align:center
                color:$mainColor
        li.album
            .photo
                border-radius:0
</style>
