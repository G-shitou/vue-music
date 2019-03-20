<template>
    <div class='search'>
        <div class='search_bar'>
            <div class='content'>
                <i class='iconfont icon-research'></i>
                <input ref='search' @input.self.stop='inputChange($event)' @focus.self.stop='inputFocus()' @blur.self.stop='inputBlur($event)' class="search_input" type="search" autocomplete="off" autocorrect="off" placeholder="搜索歌曲、歌单、专辑">
                <i v-show='clear' class='clear' @click.self.stop='clearInput()'>×</i>
            </div>
            <p class='cancel' v-show='cancel' @click.self.stop='cancelClick()'>取消</p>
        </div>
        <!-- 搜索结果列表 -->
        <div class='search_result'>
            <ul v-if='type==0?true:false'>
                <li v-for='(item,index) in searchList' :key='index' class='item'>

                </li>
            </ul>
        </div>
        <!-- 热门搜索     根据cancel判断是否显示,只显示前7个加特殊推荐 -->
        <div class='hot_search' v-show='!cancel'>
            <p class='title'>热门搜索</p>
            <a :href="hotsearch.special_url" class='special'>{{hotsearch.special_key}}</a>
            <a href="javascript:;" v-for='(item,index) in hotsearch.hotkey.slice(0,9)' :key='index' @click='search(item.k)'> {{ item.k }} </a>
        </div>
    </div>
</template>

<script>
import api from '../../api/api'
import {get,post} from '../../http/http'
export default {
    name: 'search',
    data(){
        return{
            hotsearch:{
                special_url:'',
                special_key:'',
                hotkey:[]
            },
            clear:false,
            cancel:false,
            searchList:[],
            page:1,
            type:0
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
    computed:{

    },
    mounted(){

    },
    methods:{
        // 搜索框输入时
        inputChange(e){
            this.clear = e.currentTarget.value == '' ? false : true;
        },
        // 搜索框获取焦点
        inputFocus(){
            this.cancel = true;
        },
        // 点击取消
        cancelClick(){
            this.clear = false;
            this.$refs.search.value = '';
            this.$refs.search.blur();
            this.cancel = false;
        },
        // 假如失去焦点时无内容，则cancel为false
        inputBlur(e){
            this.cancel = e.currentTarget.value == '' ? false : true;
        },
        // 点击叉号，清空input内容
        clearInput(){
            this.$refs.search.value = '';
            this.clear = false;
        },
        // 搜索关键字
        search(w){
            this.cancel = true;
            let params = api.search.params;
            params.w = w;
            get(api.search.url,{
                params
            }).then(res => {
                this.type = res.data.data.zhida.type;
                console.log(res.data.data);
                this.searchList = this.searchList.concat(res.data.data.song.list);
            }).catch(error => {
                console.log(error);
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
</style>
