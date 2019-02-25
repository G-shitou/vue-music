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
            params.data_id.param.ids = [payload.id]
            params.data_id.param.types = [payload.type]
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