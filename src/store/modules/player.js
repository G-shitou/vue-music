import api from '../../api/api'
import {get,post} from '../../http/http'


const state = {
    songs:[],
    singing:{title:1},
    isPlay:false,
    currentIndex:0
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
    changeSong: (state,payload) => {
        state.singing = payload.song.detail.data;
        songs.push(satte)
        currentIndex += 1
        console.log(state.singing);
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}