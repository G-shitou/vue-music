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
    // someGetters: (state, getters, rootState) => {
    // }
}

// actions
const actions = {
    changeSong: ({state,commit,rootState},payload) => {
        console.log(payload.song);
        // 格式化歌词
        var lyric = [];
        let lyricArray = payload.song.info.pop().content[0].value.split("\n");
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
        lyric = lyric.slice(1);
        // 格式化singer
        var singer = '';
        payload.song.track_info.singer.forEach((value,index,arr) => {
            singer += value.name + '/'
        });
        singer = singer.substr(0,singer.length-1)
        let params = {
            guid:rootState.guid,
            filename:'C400'+payload.song.track_info.mid+'.m4a',
            songmid:payload.song.track_info.mid,
            format:'json',
            platform:'yqq',
            cid:205361747
        }
        get(api.getVkey.url,{params}).then( res => {
            let song = {
                vkey:res.data.data.items[0].vkey,
                songmid:payload.song.track_info.mid,
                lyric,
                singer,
                title:payload.song.track_info.title,
                audioSrc:'http://ws.stream.qqmusic.qq.com/'+params.filename+'?fromtag=0&guid='+rootState.guid+'&vkey='+res.data.data.items[0].vkey,
                img:'https://y.gtimg.cn/music/photo_new/T002R300x300M000'+payload.song.track_info.album.mid+'.jpg?max_age=2592000'
            }
            commit('addSong',{song});
        }).catch( error => {
            console.log(error)
        })
    }
}

// mutations
const mutations = {
    addSong(state,payload){
        // 修改状态
        state.singing = payload.song;
        state.songs.push(payload.song);
        state.isPlay = true;
        state.currentIndex += 1;
    },
    changePlay(state){
        state.isPlay = state.isPlay ? false : true;
    },
    changeSong(state){
        let length = state.songs.length;
        switch(state.playOrder){
            case 'loop':
                // 顺序播放
                if(state.currentIndex == length){
                    state.singing = state.songs[0];
                    state.currentIndex = 1;
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
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}