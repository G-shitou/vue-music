import api from '../../api/api'
import {get,post} from '../../http/http'


const state = {
    recommendList:{}
}

// getters
const getters = {
    // someGetters: (state, getters, rootState) => {
    // }
}

// actions
const actions = {
    getRecommendSong ({state,dispatch,rootState},payload){
        return new Promise((resolve, reject) => {
            // 没考虑判断播放列表是否已存在歌曲
            let params = api.getRecommendSong.params;
            params.detail.param.song_id = payload.id
            post(api.getRecommendSong.url,params).then( res => {
                let data = res.data.detail.data;
                // 格式化歌词
                var lyric = [];
                let lyricArray = data.info.pop().content[0].value.split("\n");
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
                data.track_info.singer.forEach((value,index,arr) => {
                    singer += value.name + '/'
                });
                singer = singer.substr(0,singer.length-1)
                let msg = {
                    id:data.track_info.id,
                    songmid:data.track_info.mid,
                    lyric,
                    singer,
                    title:data.track_info.title,
                    img:'https://y.gtimg.cn/music/photo_new/T002R300x300M000'+data.track_info.album.mid+'.jpg?max_age=2592000'
                };
                let params = {
                    guid:rootState.guid,
                    filename:'C400'+data.track_info.mid+'.m4a',
                    songmid:data.track_info.mid,
                    format:'json',
                    platform:'yqq',
                    cid:205361747
                }
                dispatch('player/changeSong',{msg,params},{ root: true });
                resolve()
            }).catch( error => {
                console.log(error)
                reject()
            })
        })
    }
}

// mutations
const mutations = {
    initRecommendList: (state,payload) => {
        state.recommendList = payload.recommendList
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}