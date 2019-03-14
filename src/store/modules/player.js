import api from '../../api/api'
import {get,post} from '../../http/http'


const state = {
    songs:[],
    singing:{
        title:'仅供交流学习',
        audioSrc:'',
        img:'https://y.gtimg.cn/music/photo_new/T001R300x300M000001BLpXF2DyJe2.jpg?max_age=2592000'
    },
    isPlay:false,
    currentIndex:0,
    playOrder:'loop'
}

// getters
const getters = {
    initLyric:(state) => (arr) => {
        // 格式化歌词
        var lyric = [];
        let lyricArray = arr.split("\n");
        lyricArray.forEach((value,index,arr) => {
            let timeReg = value.match(/\[\d+:\d+(\.\d+)?\]/g);
            if(timeReg){
                let text = value.replace(/\[\d+:\d+(\.\d+)?\]/g,'');
                let min = Number(String(timeReg[0].match(/\[\d+/i)).slice(1));
                let sec = Number(String(timeReg[0].match(/\:\d+/i)).slice(1));
                let ms = Number(String(timeReg[0].match(/\.\d+/i)))*1000;
                let time = (min * 60 + sec) *1000 + ms;
                lyric.push({time,text});
            }
        })
        return lyric.slice(1);
    }
}

// actions
const actions = {
    getLyric:({state,commit,getters,rootState}) => {
        let params = api.getRecommendSong.params;
        params.detail.param.song_id = state.singing.id;
        post(api.getRecommendSong.url,params).then( res => {
            let data = res.data.detail.data.info.pop().content[0].value;
            let lyric = getters.initLyric(data);
            commit('initLyric',{lyric});
        }).catch( error => {

        })
    },
    getAudioSrc:({state,commit,getters,rootState}) => {
        let params = {
            guid:rootState.guid,
            filename:'C400'+state.singing.mid+'.m4a',
            songmid:state.singing.mid,
            format:'json',
            platform:'yqq',
            cid:205361747
        };
        get(api.getVkey.url,{params}).then( res => {
            let audioSrc = 'http://ws.stream.qqmusic.qq.com/'+params.filename+'?fromtag=0&guid='+rootState.guid+'&vkey='+res.data.data.items[0].vkey;
            commit('initAudioSrc',{audioSrc})
        }).catch( error => {
            console.log(error)
        })
    }
}

// mutations
const mutations = {
    // 初次加载歌词
    initLyric(state,payload){
        state.singing.lyric = payload.lyric;
        state.songs[state.currentIndex].lyric = payload.lyric;
    },
    // 初次加载播放源
    initAudioSrc(state,payload){
        state.singing.audioSrc = payload.audioSrc;
        state.songs[state.currentIndex].audioSrc = payload.audioSrc;
    },
    // 添加歌曲并播放该歌曲
    addSong(state,payload){
        state.singing = payload.song;
        state.songs.push(payload.song);
        state.currentIndex = state.songs.length - 1;
        state.isPlay = true;
    },
    // 点击暂停或播放
    changePlay(state){
        state.isPlay = state.isPlay ? false : true;
    },
    // 暂停
    pause(state){
        state.isPlay = false;
    },
    // 播放完之后切换歌曲
    changeSong(state){
        state.isPlay = false;
        let length = state.songs.length;
        switch(state.playOrder){
            case 'loop':
                // 顺序播放
                if(state.currentIndex == length){
                    state.singing = state.songs[0];
                    state.currentIndex = 1;
                    console.log('播完了');
                }else{
                    state.singing = state.songs[state.currentIndex];
                    state.currentIndex += 1;
                }
                break;
            case 2:
                // 随机播放
                break;
            case 3:
                break;
        }
        state.isPlay = true;
    },
    // 切换歌曲
    playIndex(state,payload){
        // 判断是否是当前播放的歌曲
        if(state.currentIndex != payload.index){
            state.singing =state.songs[payload.index];
            state.isPlay = true;
            state.currentIndex = payload.index;
        }
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}