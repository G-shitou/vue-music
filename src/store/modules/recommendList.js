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