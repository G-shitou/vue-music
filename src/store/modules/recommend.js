import api from '../../api/api'
import {get,post} from '../../http/http'


const state = {
    slider: [],
    songSheets: []
}

// getters
const getters = {
    // someGetters: (state, getters, rootState) => {
    // }
}

// actions
const actions = {
    // 获取推荐页面轮播数据
    getSlide ({ state, commit }){
        get(api.slide.url).then(res => {
            commit('initSlide',{slide:res.data.data.slider})
        }).catch(error => {
            console.log(error);
        });
    },
    // 获取pc端推荐歌单数据
    getRecommends ({ state, commit }){
        get(api.recommends.url,{
            params:api.recommends.params
        }).then(res => {
            commit('initSongSheets',{songSheets:res.data.recomPlaylist.data.v_hot})
        }).catch(error => {
            console.log(error);
        });
    },
    // 获取推荐歌单对应的详情页
    getRecommendList ({ state, commit, rootGetters},id){
        return new Promise((resolve, reject) => {
            let params = api.recommendList.params;
            params.disstid = id;
            get(api.recommendList.url,{
                params
            }).then(res => {
                let resultData = res.data;
                commit('recommendList/initRecommendList',{recommendList:resultData.cdlist[0]},{ root: true });
                resolve()
            }).catch(error => {
                console.log(error);
                reject()
            });  
        })
    },
}

// mutations
const mutations = {
    initSlide (state,payload) {
        state.slider = payload.slide;
        console.log(state.slider);
    },
    initSongSheets (state,payload) {
        state.songSheets = payload.songSheets;
        console.log(state.songSheets);
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}