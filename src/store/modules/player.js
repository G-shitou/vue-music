import api from '../../api/api'
import {get,post} from '../../http/http'


const state = {
    songs:[],
    singing:{title:1},
    play:false
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
        state.singing = payload.song.data_id.data.tracks[0]
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