import api from '../../api/api'
import {get,post} from '../../http/http'


const state = {
    // 排行榜数据
    rankList: [],
    // 排行榜详情
    rank: []
}

// getters
const getters = {
    initsubtitle:(state) => () => {
        let day = state.rank.day_of_year;
        if(!day){
            let date = state.rank.date;
            let week = date.substring(date.length-2);
            return '第'+week+'周';
        }else{
            return '第'+day+'天';
        }
    },
    initSort:(state) => (index) => {
        let obj = state.rank.songlist[index];
        if(Number(obj.old_count) == 0){
            return 'new';    
        }
        if(Number(obj.cur_count) == index + 1){
            if(Number(obj.cur_count) > Number(obj.old_count)){
                return '↓'+ (Number(obj.cur_count) - Number(obj.old_count))
            }else if(Number(obj.cur_count) < Number(obj.old_count)){
                return '↑'+ (Number(obj.old_count) - Number(obj.cur_count))
            }else{
                return '-';
            }
        }else{
            return '↑' + Number(obj.in_count) * 100 + '%';
        }
    }
}

// actions
const actions = {
    // 请求排行榜list
    getRanking ({ state, commit }){
        get(api.getRanking.url,{params:api.getRanking.params}).then( res => {
            commit('initRanklist',{rankList:res.data.data.topList})
        }).catch( error => {
            console.log(error);
        })
    },
    // 获取排行榜对应的详情页
    getTopList ({ state, commit, rootGetters},id){
        return new Promise((resolve, reject) => {
            let params = api.getRankingList.params;
            params.topid = id;
            get(api.getRankingList.url,{
                params
            }).then(res => {
                let resultData = res.data;
                commit('initRank',{rank:resultData});
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
    initRanklist (state,payload) {
        state.rankList = payload.rankList;
        console.log(state.slider);
    },
    initRank(state,payload){
        state.rank = payload.rank;
        console.log(state.rank);
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}