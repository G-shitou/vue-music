import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import recommend from './modules/recommend'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    state:{
        recommendList:{}
    },
    mutations:{
        initRecommendList (state,payload) {
            state.recommendList = payload.recommendList;
        }
    },
    modules: {
        recommend
    },
    strict: debug,
    plugins: debug ? [createLogger()] : []
})