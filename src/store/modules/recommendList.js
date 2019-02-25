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
    getRecommendSong ({state,commit},payload){
        return new Promise((resolve, reject) => {
            let params = api.getRecommendSong.params;
            params.detail.param.song_id = payload.id
            post(api.getRecommendSong.url,params).then( res => {
                commit('player/changeSong',{song:res.data},{ root: true });
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