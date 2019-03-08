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
    getRecommendSong ({state,dispatch},payload){
        return new Promise((resolve, reject) => {
            // 没考虑判断播放列表是否已存在歌曲
            let params = api.getRecommendSong.params;
            params.detail.param.song_id = payload.id
            post(api.getRecommendSong.url,params).then( res => {
                dispatch('player/changeSong',{song:res.data.detail.data},{ root: true });
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